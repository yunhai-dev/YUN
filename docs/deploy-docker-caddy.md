# Docker + Caddy 部署（cn.yhnotes.com）

本站是 Next.js 静态导出（`next.config.mjs` 的 `output: 'export'`），构建后全部页面在 `out/`。
镜像分两段：Node 构建静态文件，Caddy 只负责静态托管与自动 HTTPS，不运行 Node 服务。

## 文件

| 文件 | 作用 |
| --- | --- |
| `Dockerfile` | `node:22-alpine` 执行 `npm ci && npm run build`，把 `out/` 复制进 `caddy:2-alpine` |
| `Caddyfile` | 站点 `cn.yhnotes.com`、缓存/安全头、404、自动证书 |
| `docker-compose.yml` | 80/443 端口、`caddy_data`/`caddy_config` 持久化卷 |
| `.dockerignore` | 排除 `node_modules`、`out`、`.next`、`.git` 等 |

## 前置条件

1. 服务器已安装 Docker 与 Compose 插件。
2. `cn.yhnotes.com` 的 A/AAAA 记录指向这台服务器：
   ```bash
   dig +short cn.yhnotes.com
   ```
3. 安全组/防火墙放行 **80/tcp、443/tcp、443/udp**（UDP 用于 HTTP/3；至少放行 80 和 443/tcp）。
4. 80/443 没有被 nginx/Apache 等其他服务占用：
   ```bash
   sudo ss -lntp '( sport = :80 or sport = :443 )'
   ```

## 启动

```bash
cd /path/to/YUN
docker compose up -d --build
docker compose logs -f web
```

> 镜像默认按 **linux/amd64** 构建并运行（`docker-compose.yml` 的 `platform`），
> 构建阶段用 `$BUILDPLATFORM` 原生编译静态文件，因此在 Apple Silicon 上也不会走 QEMU。
> 直接 `docker build` 时带上平台：
>
> ```bash
> docker buildx build --platform linux/amd64 --load -t yun-web:latest .
> ```
>
> 需要把镜像带到服务器时：
>
> ```bash
> docker save yun-web:latest | gzip > yun-web-amd64.tar.gz
> # 服务器上
> gunzip -c yun-web-amd64.tar.gz | docker load
> ```

首次启动时 Caddy 会向 Let's Encrypt 申请证书。日志出现
`certificate obtained successfully`（或 `certificate renewed`）后验证：

```bash
curl -I https://cn.yhnotes.com
openssl s_client -connect cn.yhnotes.com:443 -servername cn.yhnotes.com </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

证书与 ACME 账户保存在 `caddy_data` 卷里，重建镜像不会重新申请。

## 更新与回滚

```bash
git pull
docker compose up -d --build
```

回滚到上一镜像标签（如果自行打了 tag）：

```bash
docker compose down
docker run -d --name yun-web -p 80:80 -p 443:443 \
  -v caddy_data:/data -v caddy_config:/config yun-web:previous
```

停止服务但保留证书：

```bash
docker compose down
```

`docker compose down -v` 会删除 `caddy_data`，证书会在下次启动时重新申请；非必要不要执行。

## Cloudflare / DNS 注意事项

- **首次签发建议把 DNS 设为仅解析（灰云）**，让 Let's Encrypt 直接访问源站 80/443。
- 如果必须开 Cloudflare 代理（橙云）：
  - SSL/TLS 模式设为 **Full (strict)**；
  - 确认 Cloudflare 没有把 `/.well-known/acme-challenge/*` 重定向到 HTTPS 以外的路径；
  - 也可以改用 DNS-01（需要 Caddy DNS 插件，当前镜像未内置）。
- 换域名只需：
  ```bash
  SITE_ADDRESS=example.com docker compose up -d
  ```
  同时把 DNS 指到本机；Caddyfile 的默认值是 `cn.yhnotes.com`。

## 测试证书（避免 Let's Encrypt 速率限制）

临时把 `Caddyfile` 顶部注释的 staging 配置取消：

```caddyfile
{
    acme_ca https://acme-staging-v02.api.letsencrypt.org/directory
}
```

重建启动确认流程后，再注释回去并删除 `caddy_data` 卷重新申请正式证书：

```bash
docker compose down
docker volume rm yun_caddy_data
docker compose up -d --build
```

卷名前缀默认是 Compose 项目目录名（这里是 `yun_`），用 `docker volume ls` 确认。

## 缓存与安全头

`Caddyfile` 复刻了 `public/_headers` 的约定：

- `/_next/static/*`、根级 `*.js` / `*.css` / `*.woff2` / `*.svg`：一年 immutable；
- 图片：30 天；
- `sw.js`、`index.json`、`tools/manifest.json`：不缓存；
- HTML 与其他路径：10 分钟；
- `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`。

## 已知限制

- 站点内的 canonical、sitemap、RSS、结构化数据仍固定为 `https://www.yhnotes.com`：
  - `src/config/site.ts`
  - `next-sitemap.config.js`
  - `scripts/generateRSS.ts`
  - `public/robots.txt`

  如果 `cn.yhnotes.com` 要作为主站而不是备用入口，需要把这些值改成 cn 域名后重新构建，否则搜索引擎会把 cn 页面归一到 www。
- Caddy 容器以默认用户运行并直接绑定 80/443；如果需要非 root，请改为高位端口 + 宿主机反向代理。
- 镜像内包含 `LICENSE` 与 `THIRD-PARTY-NOTICES.md`（Folia AGPL 说明），源码对应仓库当前提交。
