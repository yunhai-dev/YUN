---
title: "用 Docker 隔离 EasyConnect 并配置内网流量转发"
description: "记录在 macOS 上用 Docker / Docker Compose 隔离 EasyConnect，并通过 SOCKS5、系统代理、Git 代理和 SSH ProxyCommand 转发内网流量。"
keywords: ["Docker", "Docker Compose", "EasyConnect", "VPN", "SOCKS5", "代理", "Mac", "内网访问", "SSH代理", "Git代理"]
---

公司内网一般都会用到 EasyConnect，比如访问代码仓库、测试环境、数据库、内部管理后台之类的。

但我不太喜欢直接把 EasyConnect 装在宿主机上。原因很简单：这类 VPN 客户端经常会接管系统网络环境，路由、代理、DNS 都可能被它影响。尤其是 macOS 上，本来就已经有 Clash / Mihomo / Surge 这类代理工具了，再叠一个 EasyConnect，网络问题排查起来会很麻烦，并且 EasyConnect 安装到电脑很难卸载干净，会残留很多内容。

所以我的思路是：**把 EasyConnect 丢到 Docker 里隔离起来，只把它提供出来的 SOCKS5 / HTTP 代理暴露给宿主机使用**。

这样处理之后，整体会清爽很多：

- EasyConnect 只运行在容器里，不直接污染宿主机网络；
- 宿主机按需走代理，不需要所有流量都进 VPN；
- 浏览器、Git、SSH 可以分别配置，哪里需要内网就配置哪里；
- 容器目录挂出来之后，登录状态和配置可以持久化；
- 还可以继续配合 Clash / Mihomo 这类代理客户端做规则分流。

## 启动 EasyConnect 容器

先给一个 `docker run` 版本，适合临时测试。跑通之后，后面再改成 Docker Compose，日常使用会更方便。

使用 `hagb/docker-easyconnect` 镜像启动容器：

```bash
docker run \
  --name app-easyconnect \
  --device /dev/net/tun \
  --cap-add NET_ADMIN \
  --privileged \
  -ti \
  -e PASSWORD=xxxx \
  -e URLWIN=1 \
  -e DISABLE_PKG_VERSION_XML=1 \
  -v /Users/wangwenpeng/docker/app/easy-connect:/root \
  -p 127.0.0.1:5901:5901 \
  -p 127.0.0.1:1080:1080 \
  -p 127.0.0.1:8888:8888 \
  hagb/docker-easyconnect:7.6.7
```

关键参数说明如下：

| 参数 | 作用 |
|---|---|
| `--name app-easyconnect` | 指定容器名称，便于后续管理 |
| `--device /dev/net/tun` | 挂载 TUN 设备，VPN 隧道需要使用 |
| `--cap-add NET_ADMIN` | 允许容器修改网络配置 |
| `--privileged` | 启用特权模式，减少 VPN 客户端的权限问题 |
| `-e PASSWORD=xxxx` | 设置 VNC 连接密码 |
| `-e URLWIN=1` | 启用窗口模式，方便操作图形界面 |
| `-e DISABLE_PKG_VERSION_XML=1` | 禁用包版本检查，部分 ARM64 环境需要 |
| `-v /path:/root` | 持久化 EasyConnect 配置和登录数据 |
| `-p 127.0.0.1:5901:5901` | 暴露 VNC 端口 |
| `-p 127.0.0.1:1080:1080` | 暴露 SOCKS5 代理端口 |
| `-p 127.0.0.1:8888:8888` | 暴露 HTTP 代理端口 |

这里的端口都绑定到了 `127.0.0.1`，也就是只允许本机访问。除非你明确想让局域网里的其他设备也用这个代理，否则不建议绑定到 `0.0.0.0`。

注意，Docker 的特权模式参数是：

```bash
--privileged
```

不要写成：

```bash
-privileged
```

容器启动后，可以用 VNC 客户端连接：

```text
127.0.0.1:5901
```

密码就是启动容器时的 `PASSWORD`。登录 EasyConnect 成功后，宿主机可以通过以下代理端口访问内网：

```text
SOCKS5: 127.0.0.1:1080
HTTP:   127.0.0.1:8888
```

## 使用 Docker Compose 管理

如果只是验证一下，`docker run` 没问题。但这个容器后面大概率会反复启动、停止，甚至需要换机器复用配置，所以我更推荐把它写成 `docker-compose.yml`。

可以新建一个目录，例如：

```bash
mkdir -p ~/docker/app/easy-connect
cd ~/docker/app/easy-connect
```

然后创建 `docker-compose.yml`：

```yaml
services:
  easyconnect:
    image: hagb/docker-easyconnect:7.6.7
    container_name: app-easyconnect
    privileged: true
    tty: true
    stdin_open: true
    devices:
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - NET_ADMIN
    environment:
      PASSWORD: xxxx
      URLWIN: "1"
      DISABLE_PKG_VERSION_XML: "1"
    volumes:
      - ./data:/root
    ports:
      - "127.0.0.1:5901:5901"
      - "127.0.0.1:1080:1080"
      - "127.0.0.1:8888:8888"
    restart: unless-stopped
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
docker compose down
```

如果只是想停止容器但保留状态，也可以用：

```bash
docker compose stop
```

再次启动：

```bash
docker compose start
```

这里有几个点需要注意。

### 数据持久化目录

```yaml
volumes:
  - ./data:/root
```

这个目录用来保存 EasyConnect 的配置和登录状态。后面只要 `./data` 不删，重新创建容器一般也不用从零开始配置。

### 端口只绑定本机

```yaml
ports:
  - "127.0.0.1:5901:5901"
  - "127.0.0.1:1080:1080"
  - "127.0.0.1:8888:8888"
```

这样做是为了避免把 VNC、SOCKS5、HTTP 代理暴露到局域网。尤其是 VNC 端口，不建议开放给其他机器访问。

### 环境变量最好加引号

```yaml
URLWIN: "1"
DISABLE_PKG_VERSION_XML: "1"
```

YAML 对数字、布尔值有自己的解析规则。虽然这里不加引号大概率也能跑，但我习惯把这类环境变量写成字符串，避免不必要的问题。

### restart 策略

```yaml
restart: unless-stopped
```

这个配置表示 Docker 重启后自动拉起容器，但如果你手动 `docker compose stop` 了，它就不会强行再启动。

日常用起来基本就是：

```bash
# 第一次启动 / 修改配置后启动
docker compose up -d

# 临时停用
docker compose stop

# 再次使用
docker compose start
```

## 配置代理客户端规则

容器只是把 EasyConnect 的代理端口暴露出来了，至于哪些流量要走它，最好还是交给代理客户端做规则分流。

如果本机使用 Clash、Clash Verge、Mihomo Party 等代理客户端，可以通过全局扩展脚本添加一个 EasyConnect 代理节点，然后只让指定内网网段走这个节点。

示例脚本：

```js
function main(config, profileName) {
  // 添加 EasyConnect 代理
  config.proxies.push({
    name: 'ec',
    type: 'socks5',
    server: '127.0.0.1',
    port: 1080,
    udp: true
  });

  // 添加内网规则
  config.rules.unshift(
    "IP-CIDR,10.193.108.0/24,ec"
  );

  return config;
}
```

这里新增了一个名为 `ec` 的 SOCKS5 节点：

```js
{
  name: 'ec',
  type: 'socks5',
  server: '127.0.0.1',
  port: 1080,
  udp: true
}
```

其中：

- `name`：代理节点名称，可以自定义；
- `type`：代理类型，这里是 `socks5`；
- `server`：代理地址，本机访问 Docker 暴露端口，所以是 `127.0.0.1`；
- `port`：EasyConnect 容器暴露的 SOCKS5 端口；
- `udp`：是否允许 UDP 转发。

内网规则如下：

```js
config.rules.unshift(
  "IP-CIDR,10.193.108.0/24,ec"
);
```

含义是：访问 `10.193.108.0/24` 网段时，走名为 `ec` 的代理节点。

这里使用 `unshift` 是为了把规则插入到最前面。代理规则通常是从上到下匹配的，如果内网规则放得太靠后，可能会被前面的 `DIRECT`、`REJECT` 或其他规则提前命中。

这个地方一定要按自己的内网网段改，不要直接照抄。比如你的 GitLab、测试环境、数据库服务器都在不同网段，就需要把这些网段都加进去。

如果你的公司内网网段不同，按实际情况修改即可，例如：

```js
config.rules.unshift(
  "IP-CIDR,10.100.0.0/16,ec",
  "IP-CIDR,172.16.0.0/12,ec"
);
```

## 配置系统代理

如果只是浏览器访问内网后台，配置浏览器代理就够了。如果希望系统中的大部分应用都能通过代理访问内网，可以在 macOS 中配置 SOCKS 代理。

路径如下：

```text
系统设置 -> 网络 -> 当前网络 -> 详细信息 -> 代理
```

开启 `SOCKS 代理`，并填写地址和端口。

如果系统直接走 EasyConnect 容器：

```text
服务器：127.0.0.1
端口：1080
```

流量链路是：

```text
系统应用 -> 127.0.0.1:1080 -> EasyConnect Docker -> 公司内网
```

如果系统先走代理客户端，再由规则转发到 EasyConnect：

```text
服务器：127.0.0.1
端口：7897
```

流量链路是：

```text
系统应用 -> 127.0.0.1:7897 -> Clash / Mihomo -> ec 节点 -> EasyConnect Docker -> 公司内网
```

我更推荐第二种方式，因为它能通过规则控制哪些流量走 EasyConnect，哪些流量直连，哪些流量走其他代理，不容易把整个系统网络搞乱。

需要注意的是，macOS 代理设置中通常有一个“绕过代理设置”的列表。如果你希望某个内网地址走代理，需要确认这个地址或网段没有出现在绕过列表中。

例如，如果绕过列表里包含：

```text
10.0.0.0/8
192.168.0.0/16
*.local
```

访问 `10.x.x.x` 的请求可能会直接绕过代理，导致 EasyConnect 代理不生效。

## SOCKS5 和 HTTP 代理的区别

EasyConnect Docker 同时暴露了 SOCKS5 和 HTTP 代理端口。一般情况下，我会优先使用 SOCKS5。

SOCKS5 是传输层代理：

- 不关心上层协议内容；
- 可以转发 TCP 流量；
- 部分场景支持 UDP；
- HTTP、HTTPS、FTP、SSH 等协议都可以通过 SOCKS5 转发。

HTTP 代理是应用层代理：

- 理解 HTTP 协议；
- 主要用于 HTTP / HTTPS 流量；
- HTTPS 通常通过 `CONNECT` 方法建立隧道；
- 不适合直接代理 SSH 等非 HTTP 协议。

所以对于 Git、SSH、数据库客户端等场景，SOCKS5 通常更合适。

## 配置 Git 走代理

系统代理不一定能覆盖到所有命令行工具，所以 Git 这里最好单独确认一下。

如果公司 Git 仓库使用 HTTP 协议，例如：

```text
http://10.100.108.110:8600/project/your-project.git
```

可以让 Git 通过 SOCKS5 代理访问。

先查看当前远程地址：

```bash
git remote -v
```

如果当前是 SSH 地址，并且你不想折腾 SSH 代理，也可以直接改成 HTTP 地址：

```bash
git remote set-url origin http://10.100.108.110:8600/project/your-project.git
```

再次验证：

```bash
git remote -v
```

然后配置 Git 全局代理：

```bash
git config --global http.proxy socks5://127.0.0.1:7897
git config --global https.proxy socks5://127.0.0.1:7897
```

这里的 `7897` 是本机代理客户端端口。如果你本机代理客户端不是这个端口，就改成自己的端口。

如果直接使用 EasyConnect 容器暴露的 SOCKS5 端口，可以改成：

```bash
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
```

测试是否可用：

```bash
git ls-remote origin
```

如果配置正确，会看到类似输出：

```text
92d4dd02b3698daef0054b450ae8cd6268d5723e	HEAD
c922d1de1a7fa6f6786505b11328a45eb0db7d23	refs/heads/dev
92d4dd02b3698daef0054b450ae8cd6268d5723e	refs/heads/main
```

## 配置 SSH 走代理

如果你还是更习惯使用 SSH 格式的 Git 地址，例如：

```text
git@10.193.100.100:gysk/project.git
```

那只配置系统代理通常是不够的。macOS 系统代理主要影响浏览器、curl 等 HTTP / HTTPS 流量，而 SSH 客户端通常不会自动使用系统代理。

所以这里需要单独配置 SSH 的 `ProxyCommand`。

编辑 SSH 配置文件：

```bash
touch ~/.ssh/config
chmod 600 ~/.ssh/config
```

添加配置：

```sshconfig
Host 10.193.108.*
    ProxyCommand nc -X 5 -x 127.0.0.1:7897 %h %p
    StrictHostKeyChecking ask
    SendEnv -LC_*
```

含义如下：

| 配置 | 作用 |
|---|---|
| `Host 10.193.108.*` | 匹配所有 `10.193.108.x` 网段主机 |
| `ProxyCommand nc -X 5 -x 127.0.0.1:7897 %h %p` | 通过 SOCKS5 代理连接目标主机 |
| `StrictHostKeyChecking ask` | 首次连接时询问是否信任主机指纹 |
| `SendEnv -LC_*` | 不发送 `LC_` 开头的语言环境变量 |

如果直接走 EasyConnect 容器的 SOCKS5 端口，可以改成：

```sshconfig
ProxyCommand nc -X 5 -x 127.0.0.1:1080 %h %p
```

有些配置里会直接把主机密钥校验关掉：

```sshconfig
StrictHostKeyChecking no
```

这样确实省事，但安全性比较低。除非是明确可控的测试环境，否则我更推荐使用：

```sshconfig
StrictHostKeyChecking ask
```

可以用调试模式验证 SSH 是否走代理：

```bash
ssh -v git@10.193.108.100
```

如果配置命中，会看到类似信息：

```text
Executing proxy command: exec nc -X 5 -x 127.0.0.1:7897 ...
```

## 不方便配置代理的软件怎么办

有些软件本身不支持配置代理，比如部分数据库客户端、旧版本 Navicat 或内部工具。这类软件最麻烦，因为它既不看系统代理，也没有自己的代理入口。

可以考虑三种方式：

1. **使用软件自带的 SSH Tunnel**：适合数据库、Redis 等客户端；
2. **使用系统代理**：如果软件遵守 macOS 系统代理，则可以直接生效；
3. **使用代理客户端的 TUN 模式**：在网卡层面接管流量，兼容性更强，但也更接近全局代理，耗电和误伤正常网络的概率都会更高。

如果只是少量工具需要访问内网，优先尝试软件自带代理或 SSH Tunnel。只有在软件完全不支持代理时，再考虑 TUN 模式。

## 常见问题排查

### Docker Compose 启动失败

先看日志：

```bash
docker compose logs -f
```

如果是权限或网络设备相关问题，重点检查这几个配置是否还在：

```yaml
privileged: true
devices:
  - /dev/net/tun:/dev/net/tun
cap_add:
  - NET_ADMIN
```

如果是端口占用，换掉左边的宿主机端口即可，例如：

```yaml
ports:
  - "127.0.0.1:15901:5901"
  - "127.0.0.1:11080:1080"
  - "127.0.0.1:18888:8888"
```

此时宿主机访问端口也要跟着改成 `15901`、`11080`、`18888`。

### 容器启动失败

检查 Docker 参数是否写错，尤其是：

```bash
--privileged
```

同时确认 Docker Desktop 是否正常运行。

### VNC 连不上

检查容器是否运行：

```bash
docker ps
```

检查端口映射：

```bash
docker port app-easyconnect
```

如果使用 Docker Compose，也可以执行：

```bash
docker compose ps
```

确认连接地址是：

```text
127.0.0.1:5901
```

### 代理连不上内网

先确认 EasyConnect 已经在容器中登录成功。

然后测试 SOCKS5 代理：

```bash
curl --socks5 127.0.0.1:1080 http://10.193.108.10
```

如果通过代理客户端中转，则测试代理客户端端口：

```bash
curl --socks5 127.0.0.1:7897 http://10.193.108.10
```

### Git 仍然无法访问

检查 Git 代理配置：

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

检查远程地址：

```bash
git remote -v
```

如果是 HTTP 地址，确认 Git 代理端口是否正确。如果是 SSH 地址，则检查 `~/.ssh/config` 中的 `ProxyCommand` 是否匹配目标主机。

## 总结

通过 Docker / Docker Compose 运行 EasyConnect，可以把 VPN 客户端隔离在容器中，避免它直接影响宿主机网络环境。

整体流量链路可以设计为：

```text
应用程序
  -> 本机 SOCKS5 / HTTP 代理
  -> 代理客户端规则分流
  -> EasyConnect Docker 容器
  -> 公司内网
```

核心步骤是：

1. 用 `docker run` 快速验证 EasyConnect 容器是否能正常启动；
2. 跑通后改成 Docker Compose，方便后续启动、停止和迁移；
3. 暴露 `1080` SOCKS5 代理端口和 `8888` HTTP 代理端口；
4. 在代理客户端中添加 EasyConnect SOCKS5 节点；
5. 使用规则让指定内网网段走 EasyConnect；
6. 根据需要配置系统代理、Git 代理和 SSH 代理；
7. 对不支持代理的软件，考虑 SSH Tunnel 或 TUN 模式。

这样既能访问公司内网，又能最大程度减少 EasyConnect 对本机网络环境的影响。