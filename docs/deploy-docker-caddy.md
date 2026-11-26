# Docker + Caddy 部署（cn.yhnotes.com）

本站是 Next.js 静态导出（`next.config.mjs` 的 `output: 'export'`），构建后全部页面在 `out/`。
镜像分两段：Node 构建静态文件，Caddy 只负责静态托管与自动 HTTPS，不运行 Node 服务。

## 文件

| 文件 | 作用 |
| --- | --- |
| `Dockerfile` | `node:22-alpine` 执行 `npm ci && npm run build`，把 `out/` 复制进 `caddy:2-alpine` |
| `Caddyfile` | 站点 `cn.yhnotes.com`、缓存/安全头、404、自动证书、非 CN 访客回 www |
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

## 国内外动态分流

目标：国内访客用 `cn.yhnotes.com`，国外访客回 `www.yhnotes.com`。分流分两层，互不依赖：

| 层 | 规则 |
| --- | --- |
| Cloudflare Pages（www） | Redirect Rule：`ip.geoip.country eq "CN"` → `https://cn.yhnotes.com`，302，保留路径和查询串 |
| Caddy（cn） | 读取 Cloudflare 注入的 `CF-IPCountry`；非 `CN` → `https://www.yhnotes.com{uri}`，302；ACME 路径豁免 |
| 构建 | cn 镜像用 `NEXT_PUBLIC_SITE_URL=https://cn.yhnotes.com`；www 保持默认 |

### Cloudflare 侧

在 **Rules → Redirect Rules** 新建：

- When incoming requests match：`(ip.geoip.country eq "CN")`
- Then：Dynamic redirect
- Expression：`concat("https://cn.yhnotes.com", http.request.uri.path)`
- Preserve query string：开启
- Status code：`302`

### Caddy 侧

`Caddyfile` 已包含：

```caddyfile
@overseas {
    expression {http.request.header.CF-IPCountry} != "" && {http.request.header.CF-IPCountry} != "CN"
    not path /.well-known/acme-challenge/*
}
redir @overseas https://www.yhnotes.com{uri} 302
```

这要求 `cn.yhnotes.com` 走 **Cloudflare 橙云代理**：只有代理时 Cloudflare 才会注入
`CF-IPCountry`。如果 cn 是灰云直连，Caddy 拿不到国家信息，这条规则不会触发；直连也要分流
必须给 Caddy 加 MaxMind GeoIP 插件并挂载 `GeoLite2-Country.mmdb`（当前镜像未内置）。

验证（先不要对 `/.well-known/acme-challenge/*` 之外的路径做缓存）：

```bash
curl -sI -H 'CF-IPCountry: US' https://cn.yhnotes.com/ | head -5   # 302 -> www
curl -sI -H 'CF-IPCountry: CN' https://cn.yhnotes.com/ | head -5   # 200
```

### 构建参数

`NEXT_PUBLIC_SITE_URL` 在构建时写死到 canonical、sitemap、RSS 与结构化数据：

```bash
# Docker 默认就是 cn，等价于：
docker buildx build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://cn.yhnotes.com \
  --load -t yun-web:latest .

# 如果同一个镜像要服务 www：
docker buildx build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.yhnotes.com \
  --load -t yun-web:www .
```

Cloudflare Pages 的 www 构建不要设置该变量，默认值就是 `https://www.yhnotes.com`。
改了变量必须重新构建，运行时再改环境变量无效。

### SEO 注意

- 搜索引擎爬虫也会按 IP 被分流：Googlebot 多在美国，访问 cn 会被 302 到 www，因此 cn 基本不会被 Google 收录；Baidu 在中国，会收录 cn。
- 如果希望 www 和 cn 都被各自搜索市场收录，不要对爬虫做 302，改为两个域名都返回 200，并加 `hreflang`/各自 canonical。当前站点还没有 `hreflang`。
- 两个 302 不要同时配反：Cloudflare 已经把 www 的 CN 访客送去 cn，Caddy 再把 cn 的非 CN 访客送回 www，属于预期；但如果再加一条 Cloudflare 的 cn→www 规则，会多一跳，容易造成循环，二选一。

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

- Docker 镜像的 canonical、sitemap、RSS、结构化数据由 `NEXT_PUBLIC_SITE_URL` 决定，默认
  `https://cn.yhnotes.com`；www 由 Cloudflare Pages 用默认值 `https://www.yhnotes.com` 构建。
  两边必须各自用对应域名构建，不能共用一个镜像。
- `public/robots.txt` 是旧静态文件，实际导出由 `src/app/robots.ts` 覆盖，不需要单独改。
- Caddy 容器以默认用户运行并直接绑定 80/443；如果需要非 root，请改为高位端口 + 宿主机反向代理。
- 镜像内包含 `LICENSE` 与 `THIRD-PARTY-NOTICES.md`（Folia AGPL 说明），源码对应仓库当前提交。
