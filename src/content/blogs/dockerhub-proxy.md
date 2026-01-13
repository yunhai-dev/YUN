---
title: "DockerHub 镜像代理使用指南"
category: "技术, Docker"
excerpt: "使用自建 DockerHub 代理加速镜像拉取"
lastEdited: "2026年1月13日"
tags: ["Docker", "代理", "镜像加速"]
imageUrl: https://rustfs-endpoint.yhnotes.com/content/docker.png
---

由于众所周知的原因，国内服务器已无法直接访问 `docker.io`，导致无法正常拉取 Docker 镜像。本文介绍如何使用 `registry.yhnotes.com` 代理来解决这一问题。

## 使用方法

### 方式一：直接替换镜像地址

在拉取镜像时，将 `docker.io` 替换为 `registry.yhnotes.com` 即可：

```bash
# 原始命令
docker pull nginx:latest

# 使用代理
docker pull registry.yhnotes.com/library/nginx:latest
```

对于非官方镜像（带有用户名前缀的），格式如下：

```bash
# 原始命令
docker pull bitnami/redis:latest

# 使用代理
docker pull registry.yhnotes.com/bitnami/redis:latest
```

### 方式二：配置 Docker daemon

编辑 Docker 配置文件 `/etc/docker/daemon.json`：

```json
{
  "registry-mirrors": ["https://registry.yhnotes.com"]
}
```

重启 Docker 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

配置完成后，直接使用原始命令即可自动走代理：

```bash
docker pull nginx:latest
```

## 在 Kubernetes 中使用

### 修改 containerd 配置

编辑 `/etc/containerd/config.toml`，添加镜像代理配置：

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
    endpoint = ["https://registry.yhnotes.com"]
```

重启 containerd：

```bash
sudo systemctl restart containerd
```

### 在 Pod 中直接使用

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: registry.yhnotes.com/library/nginx:latest
```

## 常见问题

**Q: 支持哪些镜像？**

A: 支持 DockerHub 上的所有公开镜像。

**Q: 镜像是实时同步的吗？**

A: 是的，代理会实时从 DockerHub 拉取镜像并缓存，首次拉取可能稍慢，后续会使用缓存加速。

**Q: 可以推送镜像吗？**

A: 不支持，仅提供拉取代理服务。
