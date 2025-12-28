---
title: MinerU 本地化部署
---

基于 **python:3.12-bookworm** 构建 MinerU 镜像，并在本地启动 **Web UI** 或 **API 服务**。

## 一、Dockerfile

在任意目录创建 `Dockerfile`：

```Dockerfile
FROM python:3.12-bookworm

# 可选：安装基础工具，便于调试与网络排查
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

# 安装 MinerU 核心组件
RUN pip install --no-cache-dir "mineru[core]"

# 预下载模型
# -s modelscope   指定模型源为 ModelScope
# -m pipeline     CPU 场景（推荐纯 CPU 机器使用）
# -m vlm          GPU 场景（视觉语言模型）
# -m all          同时下载 pipeline + vlm（镜像更大）
RUN mineru-models-download -s modelscope -m all

# 工作目录（按需更改）
WORKDIR /app

# 入口设置为 /bin/bash，启动容器后先进入 Shell
ENTRYPOINT ["/bin/bash"]
```

> 按环境修改：
> - **只用 CPU**：把 `-m all` 改成 `-m pipeline`
> - **只用 GPU 模型**：把 `-m all` 改成 `-m vlm`

---

## 二、构建镜像

::: tip
构建镜像时需要注意平台架构是 x86 还是 arm64
:::


在 `Dockerfile` 所在目录执行：

```bash
docker build -t mineru-local:bookworm .
```

成功后可简单检查：

```bash
docker images | grep mineru-local
```

---

## 三、启动容器（默认进入 /bin/bash）

镜像中 `ENTRYPOINT` 已设置为 `/bin/bash`，所以容器启动后会直接进入 Shell。

```bash
docker run -it --rm -p 8000:8000 mineru-local:bookworm
```

参数说明：

- `-it`：交互模式，方便在容器内输入命令
- `--rm`：容器退出后自动删除
- `-p 8000:8000`：将容器内的 8000 端口映射到宿主机的 8000 端口

执行后你会看到类似：

```bash
root@<container-id>:/app#
```

此时你已经在容器内部，可以选择启动 Web UI 或 API 服务。

---

## 四、运行 MinerU 服务

### 4.1 启动 Web UI（mineru-gradio）

适用于交互式使用、验证效果、内部小范围使用。

在容器内执行：

```bash
mineru-gradio --server-port 8000 --server-name 0.0.0.0
```

说明：

- `--server-port 8000`：服务监听容器内 8000 端口
- `--server-name 0.0.0.0`：对所有网卡开放，配合 `-p 8000:8000` 从宿主机访问

然后在宿主机浏览器访问：

- http://localhost:8000

即可看到 MinerU 的 Gradio UI 页面。

---

### 4.2 启动 API 服务（mineru-api）

适用于与其他系统集成，通过 HTTP 接口调用 MinerU 能力。

在容器内执行：

```bash
mineru-api --host 0.0.0.0 --port 8000
```

说明：

- `--host 0.0.0.0`：监听所有地址
- `--port 8000`：与 Docker 端口映射一致

在宿主机可以直接访问：

```bash
curl http://localhost:8000
```

或由你的应用通过 `http://localhost:8000` 调用具体 API 路由（接口细节以 MinerU 官方文档为准）。

### 4.3 使用 docker compose 启动

```yaml
services:
  mineru:
    image: mineru-local:bookworm
    container_name: mineru-app
    ports:
      - "8000:8000"
    volumes:
      - "./mineru.json:/root/mineru.json:ro"  # 挂载配置文件，只读权限
    environment:
      - MINERU_TOOLS_CONFIG_JSON=/root/mineru.json
      - MINERU_MODEL_SOURCE=local
      - YOLO_MODEL_DIR=/root/models  # 新增：设置YOLO模型目录，防止网络下载
      - ULTRAALYTICS_HUB_OFFLINE=True  # 新增：强制Ultralytics离线
    entrypoint: /bin/bash
    command: -c "mineru-gradio --server-port 8000 --server-name 0.0.0.0"
    restart: unless-stopped  # 容器退出时自动重启（除非手动停止）
```



---

## 五、不同场景的建议配置

### 5.1 纯 CPU 机器

- Dockerfile 中：
  ```Dockerfile
  RUN mineru-models-download -s modelscope -m pipeline
  ```
- 其余步骤相同：构建镜像 → 启动容器 → 选择用 `mineru-gradio` 或 `mineru-api` 启动。

### 5.2 带 GPU 环境（NVIDIA）

前提：宿主机已安装 NVIDIA 驱动和 NVIDIA Container Toolkit。

- Dockerfile 中：
  ```Dockerfile
  RUN mineru-models-download -s modelscope -m vlm
  ```
- 启动容器时带上 GPU 参数，例如：
  ```bash
  docker run -it --rm \
    --gpus all \
    -p 8000:8000 \
    mineru-local:bookworm
  ```
- 在容器内启动 `mineru-gradio` 或 `mineru-api` 即可。

---

## 六、可选：让容器启动时自动运行服务

如果你不想每次都在容器里手动输入命令，可以改造 Dockerfile 的最后一行，根据你的使用习惯选择其一：

### 6.1 容器启动即跑 Web UI

```Dockerfile
ENTRYPOINT []
CMD ["mineru-gradio", "--server-port", "8000", "--server-name", "0.0.0.0"]
```

运行：

```bash
docker run -it --rm -p 8000:8000 mineru-local:bookworm
```

容器启动后会直接打开 Web UI 服务。

### 6.2 容器启动即跑 API 服务

```Dockerfile
ENTRYPOINT []
CMD ["mineru-api", "--host", "0.0.0.0", "--port", "8000"]
```

运行：

```bash
docker run -it --rm -p 8000:8000 mineru-local:bookworm
```

容器启动后会直接提供 HTTP API 服务。
