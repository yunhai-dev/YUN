---
title: "使用 EasyTier 构建个人 VPN"
description: "一篇复制即用的 EasyTier 个人 VPN 轮椅教程，覆盖 Docker Compose、systemd、自建公网 peer、家庭内网网段发布和常见排查。"
keywords: ["EasyTier", "VPN", "异地组网", "Docker", "Docker Compose", "内网穿透", "远程访问", "TUN", "SD-WAN"]
---

这篇直接写成轮椅版，不讲太多概念，目标是：**复制命令，改几个变量，然后跑起来**。

适合这几种需求：

- 外面访问家里的 NAS、开发机、路由器后台；
- 多台机器组成一个自己的虚拟内网；
- 不想给每个服务单独做公网暴露；
- 不想手写复杂的 WireGuard / OpenVPN 配置。

EasyTier 的核心就三个东西：

```text
网络名 + 网络密钥 + 自己的公网 peer 节点
```

这篇直接按“自建公网 peer”的方式来。流程是：先在云服务器上起一个稳定入口节点，然后家里服务器、笔记本、其他设备都连接到这台云服务器。

## 先决定你的部署方式

我建议按这个顺序选：

| 场景 | 推荐方式 |
|---|---|
| 服务器 / NAS 已经有 Docker | Docker Compose |
| VPS 很干净，不想装 Docker | systemd / systemctl |
| 只是临时测试 | 命令行直接跑 |

下面流程按这个顺序来：

1. 先在云服务器上搭一个 **自建公网 peer 节点**；
2. 再把家里服务器、笔记本等普通节点接进来；
3. 如果要访问家里内网，再在家里节点发布内网网段。

## 需要先准备的几个值

后面的脚本只需要改这几个变量：

| 变量 | 示例 | 说明 |
|---|---|---|
| `ET_NETWORK_NAME` | `my-home` | VPN 网络名，所有节点保持一致 |
| `ET_NETWORK_SECRET` | `change-me-to-a-strong-password` | VPN 密钥，所有节点保持一致 |
| `ET_HOSTNAME` | `home-server` | 当前设备名称，每台机器建议不同 |
| `ET_PEER` | `tcp://1.2.3.4:11010` | 你的云服务器 peer 地址 |
| `ET_PROXY_NETWORKS` | `192.168.31.0/24` | 可选，把当前机器能访问的内网网段发布出去 |

`ET_PEER` 后面会在云服务器节点搭好之后得到，一般就是：

```bash
export ET_PEER="tcp://<云服务器公网IP>:11010"
```

如果你给云服务器配了域名，也可以写成：

```bash
export ET_PEER="tcp://vpn.example.com:11010"
```

## 最快测试命令

如果你已经下载好了 `easytier-core`，可以先用两条命令理解一下流程。

云服务器上先启动监听节点：

```bash
sudo ./easytier-core \
  -d \
  --network-name my-home \
  --network-secret change-me-to-a-strong-password \
  --hostname cloud-node \
  -l 11010
```

然后其他机器连接它：

```bash
sudo ./easytier-core \
  -d \
  --network-name my-home \
  --network-secret change-me-to-a-strong-password \
  --hostname home-server \
  -p tcp://<云服务器公网IP>:11010
```

默认情况下，EasyTier 会自动分配 `10.126.126.0/24` 里的虚拟 IP。

## 第一步：搭建自建公网 peer 节点

先在云服务器上搭一个固定入口。后面的所有节点都连接它。

云服务器需要放行：

```text
TCP 11010
UDP 11010
```

如果你不想折腾，至少先放行 `TCP 11010`，后面节点的 `ET_PEER` 就用 `tcp://<云服务器公网IP>:11010`。

### Docker Compose 版本

在云服务器上运行下面这段：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="cloud-node"

mkdir -p ~/docker/app/easytier/conf
cd ~/docker/app/easytier

cat > docker-compose.yml <<'EOF'
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier
    container_name: easytier
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_ADMIN
      - NET_RAW
    environment:
      - TZ=Asia/Shanghai
    devices:
      - /dev/net/tun:/dev/net/tun
    volumes:
      - /etc/machine-id:/etc/machine-id:ro
      - ./conf:/config
    command: >
      -c /config/easytier.toml
EOF

cat > conf/easytier.toml <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
listeners = [
  "tcp://0.0.0.0:11010",
  "udp://0.0.0.0:11010"
]
EOF

docker compose up -d
docker compose logs -f
```

后面其他节点统一使用这个 peer：

```bash
export ET_PEER="tcp://<云服务器公网IP>:11010"
```

### systemd 版本

如果云服务器不想装 Docker，就用 systemd。

前提：`easytier-core` 和 `easytier-cli` 已经放在：

```text
/opt/easytier/easytier-core
/opt/easytier/easytier-cli
```

复制运行：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="cloud-node"

sudo mkdir -p /etc/easytier
sudo tee /etc/easytier/easytier.toml > /dev/null <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
listeners = [
  "tcp://0.0.0.0:11010",
  "udp://0.0.0.0:11010"
]
EOF

cd /opt/easytier
sudo ./easytier-cli service install \
  --description "EasyTier personal VPN" \
  --display-name "EasyTier" \
  --core-path /opt/easytier/easytier-core \
  --service-work-dir /opt/easytier \
  -- \
  -c /etc/easytier/easytier.toml

sudo ./easytier-cli service start
sudo ./easytier-cli service status
```

## 第二步：接入普通节点

普通节点就是家里的服务器、笔记本、其他 VPS 等。它们都连接第一步的云服务器 peer。

### Docker Compose 一键运行

这是我最推荐的方式。直接复制下面这段，在普通节点上运行。

#### 普通节点

这个版本适合笔记本、家里服务器、普通 VPS 加入 VPN，不发布家庭内网。

只需要改开头的四个变量：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="home-server"
export ET_PEER="tcp://<云服务器公网IP>:11010"

mkdir -p ~/docker/app/easytier/conf
cd ~/docker/app/easytier

cat > docker-compose.yml <<'EOF'
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier
    container_name: easytier
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_ADMIN
      - NET_RAW
    environment:
      - TZ=Asia/Shanghai
    devices:
      - /dev/net/tun:/dev/net/tun
    volumes:
      - /etc/machine-id:/etc/machine-id:ro
      - ./conf:/config
    command: >
      -c /config/easytier.toml
EOF

cat > conf/easytier.toml <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
peers = [
  "${ET_PEER}"
]
EOF

docker compose up -d
docker compose logs -f
```

看到日志正常启动后，按 `Ctrl + C` 退出日志即可，容器会继续在后台运行。

常用命令：

```bash
# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启
docker compose restart easytier

# 停止
docker compose stop

# 删除容器，不删除配置
docker compose down
```

#### 发布家庭内网的节点

如果这台机器在家里，并且你希望人在外面也能访问家里的整个网段，比如：

```text
192.168.31.0/24
```

那就用这个版本。多改一个 `ET_PROXY_NETWORKS`：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="home-server"
export ET_PEER="tcp://<云服务器公网IP>:11010"
export ET_PROXY_NETWORKS="192.168.31.0/24"

mkdir -p ~/docker/app/easytier/conf
cd ~/docker/app/easytier

cat > docker-compose.yml <<'EOF'
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier
    container_name: easytier
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_ADMIN
      - NET_RAW
    environment:
      - TZ=Asia/Shanghai
    devices:
      - /dev/net/tun:/dev/net/tun
    volumes:
      - /etc/machine-id:/etc/machine-id:ro
      - ./conf:/config
    command: >
      -c /config/easytier.toml
EOF

cat > conf/easytier.toml <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
peers = [
  "${ET_PEER}"
]
proxy_networks = [
  "${ET_PROXY_NETWORKS}"
]
EOF

docker compose up -d
docker compose logs -f
```

这个节点启动后，其他 VPN 节点就可以通过它访问 `192.168.31.0/24`。

例如：

```text
192.168.31.1      # 路由器后台
192.168.31.10     # NAS
192.168.31.20     # 开发机
```

注意，这台发布网段的机器自己必须能访问这些内网地址，否则其他节点也访问不了。

### systemd 一键注册

如果普通节点不想用 Docker，就用这个方案。适合干净的 Linux 主机。

前提：`easytier-core` 和 `easytier-cli` 已经放在同一个目录，比如：

```text
/opt/easytier/easytier-core
/opt/easytier/easytier-cli
```

#### 普通节点

复制运行：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="home-server"
export ET_PEER="tcp://<云服务器公网IP>:11010"

sudo mkdir -p /etc/easytier
sudo tee /etc/easytier/easytier.toml > /dev/null <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
peers = [
  "${ET_PEER}"
]
EOF

cd /opt/easytier
sudo ./easytier-cli service install \
  --description "EasyTier personal VPN" \
  --display-name "EasyTier" \
  --core-path /opt/easytier/easytier-core \
  --service-work-dir /opt/easytier \
  -- \
  -c /etc/easytier/easytier.toml

sudo ./easytier-cli service start
sudo ./easytier-cli service status
```

#### 发布家庭内网的节点

如果这台 Linux 主机在家里，还要把家庭网段发布出去，用这个版本：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
export ET_HOSTNAME="home-server"
export ET_PEER="tcp://<云服务器公网IP>:11010"
export ET_PROXY_NETWORKS="192.168.31.0/24"

sudo mkdir -p /etc/easytier
sudo tee /etc/easytier/easytier.toml > /dev/null <<EOF
network_name = "${ET_NETWORK_NAME}"
network_secret = "${ET_NETWORK_SECRET}"
hostname = "${ET_HOSTNAME}"
dhcp = true
peers = [
  "${ET_PEER}"
]
proxy_networks = [
  "${ET_PROXY_NETWORKS}"
]
EOF

cd /opt/easytier
sudo ./easytier-cli service install \
  --description "EasyTier personal VPN" \
  --display-name "EasyTier" \
  --core-path /opt/easytier/easytier-core \
  --service-work-dir /opt/easytier \
  -- \
  -c /etc/easytier/easytier.toml

sudo ./easytier-cli service start
sudo ./easytier-cli service status
```

常用管理命令：

```bash
# 启动
sudo systemctl start easytier

# 停止
sudo systemctl stop easytier

# 重启
sudo systemctl restart easytier

# 查看状态
sudo systemctl status easytier

# 查看日志
journalctl -u easytier -f

# 开机自启
sudo systemctl enable easytier

# 取消开机自启
sudo systemctl disable easytier
```

如果服务名不是 `easytier`，先查一下：

```bash
systemctl list-units --type=service | grep -i easytier
```

如果要卸载服务：

```bash
cd /opt/easytier
sudo ./easytier-cli service stop
sudo ./easytier-cli service uninstall
```

## 多节点怎么配置

多节点其实不用单独学，记住一句话：

```text
同一个 VPN 里的所有节点，network_name 和 network_secret 必须一样，hostname 不一样。
```

比如三台机器：

| 设备 | hostname | 用哪个脚本 |
|---|---|---|
| 家里服务器 | `home-server` | 发布家庭内网的节点 |
| 云服务器 | `cloud-node` | 第一步：自建公网 peer 节点 |
| 笔记本 | `macbook` | 普通节点 |

它们都用：

```bash
export ET_NETWORK_NAME="my-home"
export ET_NETWORK_SECRET="change-me-to-a-strong-password"
```

只把 `ET_HOSTNAME` 改成各自的名字就行。

## 发布家庭内网是什么意思

假设家里网段是：

```text
192.168.31.0/24
```

你在家里的服务器上用了“发布家庭内网的节点”那段脚本，并设置：

```bash
export ET_PROXY_NETWORKS="192.168.31.0/24"
```

那么人在外面，笔记本连上 EasyTier 后，就可以访问：

```text
192.168.31.1      # 路由器后台
192.168.31.10     # NAS
192.168.31.20     # 开发机
```

这里有几个注意点：

1. 发布网段的那台机器自己必须能访问 `192.168.31.0/24`；
2. 目标设备的防火墙要允许访问；
3. 路由器如果开了 AP 隔离 / 访客网络隔离，可能会访问失败；
4. 不要随便发布 `0.0.0.0/0`，除非你明确要做全局出口。

## 可选：多个自建 peer 提高可用性

如果只配置一个云服务器 peer，这台云服务器挂了，新节点就不容易发现其他节点。

可以多准备几台自己的公网节点，然后把配置文件里的 `peers` 改成多个：

```toml
peers = [
  "tcp://1.1.1.1:11010",
  "udp://1.1.1.2:11010",
  "tcp://vpn.example.com:11010"
]
```

我一般会让所有节点使用同一份 peer 列表，这样网络结构更稳定，也更容易排查。

## 验证是否成功

### Docker Compose 节点

进入部署目录：

```bash
cd ~/docker/app/easytier
```

查看日志：

```bash
docker compose logs -f
```

查看容器状态：

```bash
docker compose ps
```

进入容器查看 EasyTier 状态：

```bash
docker exec -it easytier easytier-cli node
docker exec -it easytier easytier-cli peer
docker exec -it easytier easytier-cli route
```

### systemd 节点

查看服务：

```bash
sudo systemctl status easytier
```

查看日志：

```bash
journalctl -u easytier -f
```

查看 EasyTier 状态：

```bash
/opt/easytier/easytier-cli node
/opt/easytier/easytier-cli peer
/opt/easytier/easytier-cli route
```

如果能看到其他节点，就说明组网成功。

## 安全建议

个人 VPN 虽然只是自己用，但也不要太随意。

几个基本建议：

- `network-secret` 不要用弱密码；
- 不要把配置文件随手传到公开仓库；
- 云服务器安全组只放行必要端口；
- 能绑定固定端口就绑定固定端口，方便审计；
- `proxy_networks` 只发布必要网段，不要一上来就全局代理；
- 不需要公网访问的管理后台，不要额外暴露 HTTP 端口。

如果是长期使用，建议把 `network-secret` 当作密码管理，泄露后及时更换。

## 常见问题

### 容器启动失败

先看日志：

```bash
cd ~/docker/app/easytier
docker compose logs -f
```

如果看到 TUN 或权限相关错误，检查宿主机有没有 `/dev/net/tun`：

```bash
ls -l /dev/net/tun
```

再确认 Compose 里有这些配置：

```yaml
network_mode: host
cap_add:
  - NET_ADMIN
  - NET_RAW
devices:
  - /dev/net/tun:/dev/net/tun
```

### systemd 服务启动失败

先看服务状态：

```bash
sudo systemctl status easytier
```

再看实时日志：

```bash
journalctl -u easytier -f
```

常见原因：

- `/opt/easytier/easytier-core` 路径不对；
- `/etc/easytier/easytier.toml` 路径不对；
- 配置文件语法写错；
- 端口被占用；
- 没有权限创建 TUN 设备。

### 节点看不到彼此

检查这几项：

- 所有节点的 `network_name` 是否一致；
- 所有节点的 `network_secret` 是否一致；
- `peers` 是否能连通；
- 云服务器安全组是否放行 `11010`；
- 本机防火墙是否拦截 EasyTier。

### 能看到节点，但是 ping 不通

这种情况一般看防火墙和路由：

- 目标系统是否禁止 ICMP；
- EasyTier 虚拟网卡是否正常创建；
- `easytier-cli route` 中是否有目标路由；
- 如果访问家庭内网，发布网段的节点是否配置了 `proxy_networks`。

### 能访问 VPN 虚拟 IP，但不能访问家庭内网

先确认家里的发布节点配置了：

```toml
proxy_networks = [
  "192.168.31.0/24"
]
```

再确认这台节点自己能访问家庭内网目标设备：

```bash
ping 192.168.31.1
ping 192.168.31.10
```

如果发布节点自己都访问不了，那其他 VPN 节点更访问不了。

## 总结

这篇的最短路径就是：

1. 先在云服务器上搭自建公网 peer，并放行 `11010`；
2. 把其他节点的 `ET_PEER` 指向这台云服务器；
3. 普通节点有 Docker 就用 Docker Compose 脚本；
4. 不想用 Docker 就用 systemd 脚本；
5. 家里节点需要访问整个内网，就用带 `ET_PROXY_NETWORKS` 的版本；
6. 最后用 `easytier-cli peer`、`route`、`node` 看状态。

这样搭完之后，人在外面也可以像在家里一样访问 NAS、开发机和内网服务，不需要把每个服务单独暴露到公网。