---
title: "使用 EasyTier 构建个人 VPN"
description: "记录使用 EasyTier 搭建个人异地组网环境，通过 Docker Compose 部署节点，实现多设备互联、远程访问家庭内网和服务。"
keywords: ["EasyTier", "VPN", "异地组网", "Docker", "Docker Compose", "内网穿透", "远程访问", "TUN", "SD-WAN"]
---

之前写过一篇 [[docs/Operations/easyconnect-docker.md]]，主要是把公司内网用的 EasyConnect 隔离到 Docker 里，避免它把宿主机网络环境搞乱。

这篇换一个场景：**用 EasyTier 搭一个自己的个人 VPN**。

我的需求其实比较简单：

- 家里的 NAS、开发机、路由器后台，希望在外面也能访问；
- 不想每个服务都单独做公网暴露；
- 不想维护太复杂的 WireGuard / OpenVPN 配置；
- 多台设备之间最好能自动组网，能 P2P 就 P2P，不行再中继；
- 后续最好可以用 Docker Compose 管起来，方便迁移和重启。

EasyTier 比较适合这种个人异地组网场景。它不是传统意义上“所有流量都打到一个 VPN 服务器”的模式，而是更偏去中心化的 mesh VPN。多个节点加入同一个网络之后，会自动尝试 NAT 穿透，能直连就直连，不能直连再通过共享节点或自建节点中继。

## 基本概念

先把几个核心参数说清楚，后面配置的时候不容易乱。

| 参数 | 作用 |
|---|---|
| `--network-name` | 虚拟网络名称，同一个 VPN 网络内要保持一致 |
| `--network-secret` | 虚拟网络密钥，同一个 VPN 网络内要保持一致 |
| `-d` | DHCP 模式，自动分配虚拟 IP |
| `-i, --ipv4` | 手动指定本节点虚拟 IP 或虚拟网段 |
| `-p, --peers` | 指定要连接的对端节点或共享节点 |
| `-l, --listeners` | 指定本节点监听地址 / 端口 / 协议 |
| `-n, --proxy-networks` | 把本地网段发布到 VPN，适合远程访问家庭内网 |
| `--hostname` | 设置节点显示名称，方便识别设备 |
| `-c, --config-file` | 使用配置文件启动 |

最小组网只需要三个东西：

```text
network-name + network-secret + peer
```

也就是说，只要几台设备使用相同的网络名、相同的密钥，并且能连到同一个共享节点或对端节点，它们就可以加入同一个虚拟网络。

## 最小命令行启动

先不用 Docker，直接看最小启动命令更容易理解。

Linux / macOS 上可以这样运行：

```bash
sudo ./easytier-core \
  -d \
  --network-name my-home \
  --network-secret your-strong-password \
  -p tcp://<共享节点IP或域名>:1010
```

Windows PowerShell 中类似：

```powershell
.\easytier-core.exe -d --network-name my-home --network-secret your-strong-password -p tcp://<共享节点IP或域名>:1010
```

其中：

- `-d` 表示自动分配虚拟 IP；
- `--network-name my-home` 是你的个人 VPN 网络名；
- `--network-secret your-strong-password` 是加入这个网络的密钥；
- `-p tcp://<共享节点IP或域名>:1010` 表示连接到一个共享节点。

两台机器都运行同样的 `network-name`、`network-secret` 和 `peer` 之后，理论上就会进入同一个虚拟网络。

如果没有手动指定虚拟网段，EasyTier 默认会分配 `10.126.126.0/24` 这个网段里的地址。

## 查看组网状态

EasyTier 启动后，可以用 `easytier-cli` 查看状态。

查看当前节点信息：

```bash
easytier-cli node
```

查看当前网络里的其他节点：

```bash
easytier-cli peer
```

查看路由：

```bash
easytier-cli route
```

连通性可以直接用 `ping` 测试，例如：

```bash
ping 10.126.126.1
ping 10.126.126.2
```

如果虚拟 IP 能 ping 通，说明基础组网已经没问题。

如果 ping 不通，优先看这几个地方：

- EasyTier 是否还在运行；
- 两边的 `network-name` 和 `network-secret` 是否一致；
- 是否连接到了同一个共享节点或对端节点；
- 系统防火墙是否禁止了入站 ICMP；
- 云服务器安全组是否放行了对应端口。

## 部署方式选择

命令行跑通之后，长期运行一般有两种方式：

1. **Docker Compose**：适合服务器、NAS、容器化环境，迁移和更新方便；
2. **systemd / systemctl**：适合直接跑二进制文件的 Linux 主机，不依赖 Docker。

如果机器上本来就有 Docker，我会优先用 Docker Compose。如果是比较干净的 VPS，或者不想为了一个 EasyTier 单独装 Docker，那注册成 systemd 服务也挺合适。

## 使用 Docker Compose 部署

尤其是把 EasyTier 放在家里的服务器、NAS 或云服务器上时，Compose 会更方便维护。

新建目录：

```bash
mkdir -p ~/docker/app/easytier
cd ~/docker/app/easytier
```

创建 `docker-compose.yml`：

```yaml
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier-home
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
    command: >
      -d
      --network-name my-home
      --network-secret your-strong-password
      --hostname home-server
      -p tcp://<共享节点IP或域名>:1010
```

启动：

```bash
docker compose up -d
```

查看日志：

```bash
docker compose logs -f
```

停止：

```bash
docker compose stop
```

更新配置后重启：

```bash
docker compose restart easytier
```

这里几个配置比较关键。

### network_mode: host

```yaml
network_mode: host
```

EasyTier 需要创建虚拟网卡、监听端口、处理节点间连接，直接使用 host 网络最省事。

如果用普通 bridge 网络，还要额外映射端口，排查起来麻烦。个人使用场景下，我会优先选 `network_mode: host`。

### NET_ADMIN 和 NET_RAW

```yaml
cap_add:
  - NET_ADMIN
  - NET_RAW
```

`NET_ADMIN` 用于网络管理，`NET_RAW` 用于原始包能力。EasyTier 做 TUN 设备和网络转发时需要这些权限。

### 挂载 TUN 设备

```yaml
devices:
  - /dev/net/tun:/dev/net/tun
```

这是 VPN / TUN 类程序常见配置。没有这个设备，容器里通常无法创建虚拟网卡。

### 挂载 machine-id

```yaml
volumes:
  - /etc/machine-id:/etc/machine-id:ro
```

这个配置用于让节点身份更稳定。容器重建后，节点不会因为机器 ID 变化而被识别成一个全新的设备。

## 使用配置文件启动

如果参数比较多，全部写在 `command` 里会越来越长。更推荐把配置拆到 `easytier.toml` 里。

目录结构：

```text
~/docker/app/easytier
├── docker-compose.yml
└── conf
    └── easytier.toml
```

`docker-compose.yml`：

```yaml
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier-home
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
```

`conf/easytier.toml` 可以先保持最小配置：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "home-server"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
```

修改配置后重启：

```bash
docker compose restart easytier
```

我个人更喜欢配置文件方式，因为后面加 `proxy_networks`、多个 peers、监听端口时，不需要把一长串参数都塞到 Compose 的 `command` 里。

## 注册为 systemd 服务

如果不想用 Docker，也可以直接把 EasyTier 注册成系统服务，让它跟着 Linux 开机自启。

官方提供了 `easytier-cli service` 这一组命令，本质上就是帮你把 `easytier-core` 注册成系统服务。Linux 上注册之后，可以继续用 EasyTier 自带命令管理，也可以用 `systemctl` 查看和控制。

前提是 `easytier-core` 和 `easytier-cli` 在同一个目录下，例如：

```bash
/opt/easytier
├── easytier-cli
└── easytier-core
```

进入目录：

```bash
cd /opt/easytier
```

### 直接用参数注册

最简单的方式是把启动参数直接跟在 `service install` 后面：

```bash
sudo ./easytier-cli service install \
  -d \
  --network-name my-home \
  --network-secret your-strong-password \
  --hostname home-server \
  -p tcp://<共享节点IP或域名>:1010
```

注册后启动服务：

```bash
sudo ./easytier-cli service start
```

查看状态：

```bash
sudo ./easytier-cli service status
```

停止服务：

```bash
sudo ./easytier-cli service stop
```

卸载服务：

```bash
sudo ./easytier-cli service uninstall
```

默认情况下，注册服务后会启用开机自启。也就是说机器重启后，EasyTier 会自动拉起来。

### 使用配置文件注册

如果参数比较多，我更建议用配置文件，然后服务只负责加载这个配置文件。

例如配置文件放在：

```text
/etc/easytier/easytier.toml
```

内容可以类似这样：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "home-server"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
```

注册服务：

```bash
sudo ./easytier-cli service install \
  -c /etc/easytier/easytier.toml
```

之后服务启动时就会用这份配置。

如果你想显式指定 `easytier-core` 路径、工作目录、服务名称描述，可以使用更完整的写法：

```bash
sudo ./easytier-cli service install \
  --description "EasyTier personal VPN" \
  --display-name "EasyTier" \
  --core-path /opt/easytier/easytier-core \
  --service-work-dir /opt/easytier \
  -- \
  -c /etc/easytier/easytier.toml
```

这里的 `--` 很关键。它前面是服务安装选项，后面才是传给 `easytier-core` 的启动参数。

也就是说：

```text
service install 的参数 -- easytier-core 的参数
```

如果你只写简单参数，不需要区分服务安装选项，也可以不用 `--`。但一旦混合 `--description`、`--display-name`、`--core-path` 这类服务选项，我建议都显式加上 `--`，不容易混。

### 使用 systemctl 管理

注册成系统服务之后，除了 EasyTier 自带的命令，也可以用 `systemctl` 管理。

先查看服务名：

```bash
systemctl list-units --type=service | grep -i easytier
```

假设服务名是 `easytier.service`，那么常用命令就是：

```bash
# 启动
sudo systemctl start easytier

# 停止
sudo systemctl stop easytier

# 重启
sudo systemctl restart easytier

# 查看状态
sudo systemctl status easytier

# 设置开机自启
sudo systemctl enable easytier

# 取消开机自启
sudo systemctl disable easytier
```

查看日志：

```bash
journalctl -u easytier -f
```

如果服务名不是 `easytier`，就把命令里的 `easytier` 换成实际服务名。

### 修改配置后重启

如果你使用的是配置文件方式，修改：

```text
/etc/easytier/easytier.toml
```

之后重启服务即可：

```bash
sudo systemctl restart easytier
```

或者用 EasyTier 自带命令：

```bash
sudo ./easytier-cli service stop
sudo ./easytier-cli service start
```

我更习惯用 `systemctl restart`，因为和其他 Linux 服务的管理方式一致。

### 不想开机自启

如果只是临时测试，不想注册后自动开机启动，可以在安装服务时加上：

```bash
sudo ./easytier-cli service install \
  --disable-autostart \
  -- \
  -c /etc/easytier/easytier.toml
```

后面需要时手动启动：

```bash
sudo systemctl start easytier
```

## 多节点加入同一个 VPN

假设我现在有三台设备：

| 设备 | 位置 | hostname |
|---|---|---|
| 家里服务器 | 家里内网 | `home-server` |
| 云服务器 | 公网 | `cloud-node` |
| 笔记本 | 外出办公 | `macbook` |

它们都使用相同的：

```text
network_name = "my-home"
network_secret = "your-strong-password"
```

区别主要是 `hostname` 不同。

例如家里服务器：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "home-server"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
```

云服务器：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "cloud-node"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
```

笔记本：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "macbook"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
```

启动后，用下面命令查看节点：

```bash
easytier-cli peer
```

能看到其他设备，就说明它们已经在同一个虚拟网络里了。

## 暴露家庭内网网段

只让几台设备互 ping，其实意义不大。更常见的需求是：**人在外面，通过 VPN 访问家里的整个内网网段**。

比如家里内网是：

```text
192.168.31.0/24
```

我希望笔记本在外面也能访问：

```text
192.168.31.1      # 路由器后台
192.168.31.10     # NAS
192.168.31.20     # 开发机
```

这时需要在家里服务器这个节点上发布本地网段：

```toml
proxy_networks = [
  "192.168.31.0/24"
]
```

完整配置类似：

```toml
network_name = "my-home"
network_secret = "your-strong-password"
hostname = "home-server"
dhcp = true
peers = [
  "tcp://<共享节点IP或域名>:1010"
]
proxy_networks = [
  "192.168.31.0/24"
]
```

这样其他 EasyTier 节点就可以通过 `home-server` 访问 `192.168.31.0/24` 这个网段。

注意，这里有几个坑：

1. 家里服务器本身必须能访问 `192.168.31.0/24`；
2. 目标设备的防火墙要允许来自 VPN 的访问；
3. 如果家里路由器有隔离策略，也可能导致访问失败；
4. 不要把太大的网段随便发布出去，比如 `0.0.0.0/0`，除非你明确知道自己在做全局出口。

## 使用自建公网节点

如果没有公网 IP，可以直接使用共享节点。但如果你有一台云服务器，我更建议拿它做一个稳定的中转 / 入口节点。

云服务器节点可以直接运行 EasyTier，并监听一个固定端口，例如：

```bash
sudo ./easytier-core \
  -d \
  --network-name my-home \
  --network-secret your-strong-password \
  --hostname cloud-node \
  -l 11010
```

Docker Compose 中可以这样写：

```yaml
services:
  easytier:
    image: easytier/easytier:latest
    hostname: easytier-cloud
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
    command: >
      -d
      --network-name my-home
      --network-secret your-strong-password
      --hostname cloud-node
      -l 11010
```

然后其他节点连接它：

```toml
peers = [
  "tcp://<云服务器公网IP>:11010"
]
```

云服务器安全组需要放行对应端口。为了兼容性，可以同时考虑 TCP / UDP，具体以你的监听协议为准。

这种方式的好处是：

- 不依赖第三方共享节点；
- 节点地址稳定；
- 后续所有设备都可以先连云服务器，再自动尝试 P2P；
- 排查问题更可控。

## 多个 peer 提高可用性

如果只配置一个 peer，这个 peer 挂了，新节点就不容易发现其他节点。

可以配置多个 peer：

```toml
peers = [
  "tcp://1.1.1.1:11010",
  "udp://1.1.1.2:11011",
  "tcp://vpn.example.com:11010"
]
```

命令行参数则是多个 `-p`：

```bash
-p tcp://1.1.1.1:11010 \
-p udp://1.1.1.2:11011 \
-p tcp://vpn.example.com:11010
```

我一般会让所有节点使用同一份 peer 列表，这样网络结构更稳定，也更容易排查。

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
docker compose logs -f
```

如果看到 TUN 或权限相关错误，检查：

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

常见原因有几个：

- `easytier-core` 路径不对；
- 配置文件路径不对；
- 配置文件语法错误；
- 没有 root 权限创建 TUN 设备；
- 端口被其他程序占用。

如果不确定服务名，先查一下：

```bash
systemctl list-units --type=service | grep -i easytier
```

### 节点看不到彼此

检查这几项：

- `network-name` 是否一致；
- `network-secret` 是否一致；
- `peers` 是否配置到了同一个入口；
- 云服务器端口 / 安全组是否放行；
- 本机防火墙是否拦截 EasyTier。

### 能看到节点，但是 ping 不通

这种情况一般看防火墙和路由：

- 目标系统是否禁止 ICMP；
- EasyTier 虚拟网卡是否正常创建；
- `easytier-cli route` 中是否有目标路由；
- 如果访问家庭内网，发布网段的节点是否配置了 `proxy_networks`。

### 能访问 VPN 虚拟 IP，但不能访问家庭内网

重点检查发布网段的节点：

```toml
proxy_networks = [
  "192.168.31.0/24"
]
```

然后确认这台节点本身能访问家庭内网目标设备：

```bash
ping 192.168.31.1
ping 192.168.31.10
```

如果发布节点自己都访问不了，那其他 VPN 节点更访问不了。

## 总结

EasyTier 很适合拿来做个人 VPN / 异地组网。

我的推荐路径是：

1. 先用命令行最小参数跑通；
2. 服务器 / NAS 上优先用 Docker Compose 常驻运行；
3. 不想用 Docker 的 Linux 主机，可以注册成 systemd 服务，用 `systemctl` 管理；
4. 多设备使用相同的 `network-name` 和 `network-secret` 加入同一网络；
5. 有公网服务器的话，用它做稳定 peer；
6. 需要访问家庭内网时，在家里节点配置 `proxy_networks`；
7. 最后用 `easytier-cli peer`、`route`、`node` 排查网络状态。

这样搭完之后，人在外面也可以像在家里一样访问 NAS、开发机和内网服务，不需要把每个服务单独暴露到公网。