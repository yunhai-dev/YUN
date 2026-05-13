---
title: "3x-ui 自用代理服务搭建"
description: "整理 3x-ui 面板的 Docker Compose 部署、证书目录、端口开放、初始化安全配置与日常维护"
keywords: ["3x-ui", "Xray", "Docker Compose", "代理服务", "运维", "VPS"]
---

# 3x-ui

> 3x-ui 是一个基于 Xray 的 Web 管理面板，适合用来管理自用代理节点。
>
> 我这里主要记录 Docker Compose 部署方式，方便后续迁移、备份和更新。

## 使用场景

> 如果只是临时测试，可以直接脚本安装。
>
> 如果是长期使用，更推荐 Docker Compose，目录清晰，后续迁移也简单。

主要关注几个点：

- 面板数据需要持久化
- 证书文件需要单独保存
- 节点端口可能比较多，网络模式尽量简单
- 面板入口不要直接裸奔
- 部署完成后第一时间修改默认账号密码

## 目录结构

在服务器上新建一个目录，例如：

```bash
mkdir -p /opt/3x-ui
cd /opt/3x-ui

mkdir -p db cert
```

目录说明：

```text
/opt/3x-ui
├── docker-compose.yml
├── db/      # 面板数据库，节点和用户信息
└── cert/    # 证书文件
```

> 之后备份的时候，重点备份 `db` 和 `cert` 目录。

## Docker Compose 配置

创建 `compose.yml`：

```yaml
services:
  x-ui:
    image: ghcr.io/mhsanaei/3x-ui:latest
    container_name: 3x-ui
    volumes:
      - ./db/:/etc/x-ui/           # 数据库持久化，存放节点和用户信息
      - ./cert/:/root/cert/        # 证书存放路径
    environment:
      - XRAY_VMESS_AEAD_FORCED=false
    network_mode: host             # 推荐使用 host 模式，方便监听多个端口
    restart: unless-stopped
```

这里几个配置需要注意：

- `./db/:/etc/x-ui/`
  - 面板数据库在这里
  - 节点、用户、配置都会保存到这个目录
  - 服务器迁移时，把这个目录带走即可

- `./cert/:/root/cert/`
  - 证书统一放这里
  - 后续在面板里填写证书路径时，可以使用 `/root/cert/xxx.pem`

- `network_mode: host`
  - 3x-ui 通常会监听多个入站端口
  - 使用 host 模式可以少处理 Docker 端口映射问题
  - 缺点是端口直接暴露在宿主机上，需要自己做好防火墙限制

- `XRAY_VMESS_AEAD_FORCED=false`
  - 兼容旧版 VMess 客户端
  - 如果确认客户端都比较新，也可以不设置这个环境变量

## 启动服务

```bash
docker compose up -d
```

查看容器状态：

```bash
docker ps | grep 3x-ui
```

查看日志：

```bash
docker logs -f 3x-ui
```

停止服务：

```bash
docker compose down
```

重启服务：

```bash
docker compose restart
```

## 初始化面板

启动完成后，默认可以通过 `2053` 端口进入控制台：

```text
http://服务器IP:2053
```

默认账号密码：

```text
admin/admin
```

> 第一次登录后，先不要急着创建节点，先处理安全配置。
> 
> 默认端口和默认账号密码都不适合长期暴露在公网。

建议初始化后立刻做这几件事：

1. 修改默认用户名
2. 修改默认密码
3. 修改面板访问路径
4. 修改面板端口
5. 只开放必要端口
6. 如果条件允许，给面板套一层 HTTPS 或反向代理

## 防火墙端口

如果使用的是云服务器，需要同时检查两层端口：

- 云厂商安全组
- 服务器本机防火墙

常见需要开放的端口：

```text
面板端口：只建议自己访问，不建议全网开放
节点端口：按实际创建的入站端口开放
80/443：如果需要申请证书或走 HTTPS
```

如果使用 `ufw`：

```bash
# 开放 HTTPS
ufw allow 443/tcp

# 开放某个节点端口，按实际情况修改
ufw allow 10086/tcp

# 查看状态
ufw status
```

> 面板端口最好不要对所有 IP 开放。
>
> 如果有固定公网 IP，可以只允许自己的 IP 访问面板。

例如：

```bash
ufw allow from 你的公网IP to any port 面板端口 proto tcp
```

## 证书路径

证书放到宿主机的 `cert` 目录：

```text
/opt/3x-ui/cert/
```

容器内部对应路径是：

```text
/root/cert/
```

所以面板里填写证书路径时，一般写容器内部路径：

```text
/root/cert/fullchain.pem
/root/cert/privkey.pem
```

> 不要把宿主机路径 `/opt/3x-ui/cert/...` 填到面板里。
>
> 面板运行在容器内部，它看到的是容器里的路径。

## 更新 3x-ui

更新前先备份：

```bash
cd /opt/3x-ui

tar -czf 3x-ui-backup-$(date +%F).tar.gz db cert compose.yml
```

拉取新镜像并重启：

```bash
docker compose pull
docker compose up -d
```

查看日志确认服务正常：

```bash
docker logs -f 3x-ui
```

如果更新后有问题，可以回退数据目录和镜像版本。

## 备份与迁移

迁移时，核心就是带走这几个东西：

```text
compose.yml
db/
cert/
```

在旧服务器打包：

```bash
cd /opt

tar -czf 3x-ui.tar.gz 3x-ui
```

传到新服务器后解压：

```bash
cd /opt

tar -xzf 3x-ui.tar.gz
cd /opt/3x-ui

docker compose up -d
```

> 迁移后需要重新检查安全组和防火墙端口。
>
> 如果域名解析到了旧机器，也要记得修改 DNS。

## 安全建议

这类服务最容易出问题的地方不是部署，而是后续裸奔。

建议：

- 面板端口不要使用默认端口
- 面板路径不要使用默认路径
- 管理员密码使用强密码
- 不要把面板端口全网开放
- 定期备份 `db` 目录
- 更新前先备份，不要直接莽
- 只开放实际需要的节点端口
- 不要在服务器上保存无关敏感文件

> 简单说：节点可以开放，面板尽量收起来。

## 常用命令

```bash
# 进入部署目录
cd /opt/3x-ui

# 启动
docker compose up -d

# 停止
docker compose down

# 重启
docker compose restart

# 查看容器
docker ps | grep 3x-ui

# 查看日志
docker logs -f 3x-ui

# 更新镜像
docker compose pull && docker compose up -d

# 备份数据
tar -czf 3x-ui-backup-$(date +%F).tar.gz db cert compose.yml
```

## 总结

用 Docker Compose 部署 3x-ui 的好处是结构清楚：

- `compose.yml` 管服务
- `db` 管数据
- `cert` 管证书

后续无论是更新、备份还是迁移，都比较方便。

真正需要注意的是安全配置：部署完成之后，第一时间修改默认账号、默认端口和默认路径，面板不要直接暴露在公网。