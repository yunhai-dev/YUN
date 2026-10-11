---
title: "开发与运维命令笔记汇总"
description: "整理 Linux、Prometheus、SSH、Windows 与常用开发工具相关的命令、安装和操作笔记"
keywords: ["Linux 命令", "运维命令", "SSH", "Prometheus", "Windows", "开发工具", "命令速查"]
---

### delfer/alpine-ftp-server 简单使用教程

这是一个基于 Alpine Linux 的轻量级 Docker FTP 服务器，使用 vsftpd 作为核心。适合快速搭建内网或公网文件传输服务，支持 FTPS（加密）。以下是入门级教程，假设你已安装 Docker。

#### 前置条件
- 安装并运行 Docker。
- 如果用 FTPS（推荐加密），需域名和 80 端口访问（用于证书生成）。
- 创建证书目录：`mkdir -p /etc/letsencrypt`（FTPS 用）。

#### 步骤 1: 基本 FTP 启动（非加密）
运行以下命令，替换用户名/密码和 ADDRESS（内网用 IP 如 192.168.1.100，公网用域名）：

```bash
docker run -d \
    -p "21:21" \
    -p 21000-21010:21000-21010 \
    -e USERS="one|1234" \
    -e ADDRESS=192.168.1.100 \
    delfer/alpine-ftp-server
```

- **连接测试**：用 FTP 客户端（如 FileZilla）连接 `ftp://你的服务器IP:21`，用户名 `one`，密码 `1234`。
- **防火墙**：开放 21 端口和 21000-21010 端口。

#### 步骤 2: 配置关键参数
主要环境变量（通过 `-e` 设置）：

| 变量                    | 描述                                                         | 默认值                 | 示例                                        |
| ----------------------- | ------------------------------------------------------------ | ---------------------- | ------------------------------------------- |
| `USERS`                 | 用户列表（空格分隔，格式：用户名\|密码\|[目录]\|[UID]\|[GID]） | `alpineftp\|alpineftp` | `one\|1234 user\|pass\|/home/user`          |
| `ADDRESS`               | 被动模式外部地址                                             | 无                     | `192.168.1.100`（内网）或 `ftp.example.com` |
| `MIN_PORT` / `MAX_PORT` | 被动端口范围                                                 | 21000 / 21010          | `20000` / `20100`（需调整端口映射）         |

#### 步骤 3: 启用 FTPS（加密，推荐）
1. 生成 Let's Encrypt 证书（替换域名和邮箱）：
   ```bash
   docker run -it --rm \
       -p 80:80 \
       -v "/etc/letsencrypt:/etc/letsencrypt" \
       certbot/certbot certonly \
       --standalone \
       --preferred-challenges http \
       -n --agree-tos \
       --email your@email.com \
       -d ftp.example.com
   ```

2. 启动 FTPS 服务器：
   ```bash
   docker run -d \
       --name ftp \
       -p "21:21" \
       -p 21000-21010:21000-21010 \
       -v "/etc/letsencrypt:/etc/letsencrypt:ro" \
       -e USERS="one|1234" \
       -e ADDRESS=ftp.example.com \
       -e TLS_CERT="/etc/letsencrypt/live/ftp.example.com/fullchain.pem" \
       -e TLS_KEY="/etc/letsencrypt/live/ftp.example.com/privkey.pem" \
       delfer/alpine-ftp-server
   ```

3. **证书续期**：每 3 个月运行 `certbot renew`。

#### 步骤 4: 使用 Docker Compose（可选，简化管理）
创建 `docker-compose.yml`：
```yaml
version: '3'
services:
  ftp:
    image: delfer/alpine-ftp-server
    ports:
      - "21:21"
      - "21000-21010:21000-21010"
    environment:
      - USERS="one|1234"
      - ADDRESS=192.168.1.100
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro  # FTPS 用
```
运行：`docker-compose up -d`。

## Prometheus 组件之 redis_exporter 指标

Prometheus 的架构中，主服务器本身不直接采集 Redis 的各类运行指标。为了监控 Redis 的内存、连接数、命中率等常用性能数据，我们通常借助社区维护的 **redis_exporter** 作为中间桥梁。

**redis_exporter** 由 Golang 编写，零依赖，解压即可运行，非常轻量。

---

### **1. 下载与解压**

你可以从 redis_exporter 的 [GitHub Releases](https://github.com/oliver006/redis_exporter/releases) 页面获取最新版本。

以 1.63.0 版本为例，下载并解压：

```bash
wget https://github.com/oliver006/redis_exporter/releases/download/v1.63.0/redis_exporter-v1.63.0.linux-amd64.tar.gz
tar -zxf redis_exporter-v1.63.0.linux-amd64.tar.gz
```

此时可以直接使用以下命令启动 redis_exporter（假设 Redis 在本地 6379，无密码）：

```bash
./redis_exporter-v1.63.0.linux-amd64/redis_exporter \
  --redis.addr=redis://127.0.0.1:6379
```

默认监听 `9121` 端口，访问 `http://<host-ip>:9121/metrics` 可看到采集到的 Redis 指标。

---

### **2. 注册为 systemd 服务**

和 node_exporter 一样，建议以 systemd 服务方式运行，便于后台运行和开机自启。

1. **复制可执行文件到环境路径：**

   ```bash
   sudo cp redis_exporter-v1.63.0.linux-amd64/redis_exporter /usr/local/bin/
   ```

2. **创建服务文件 `/usr/lib/systemd/system/redis_exporter.service`：**

   ```ini
   [Unit]
   Description=redis_exporter
   Documentation=https://github.com/oliver006/redis_exporter
   After=network.target

   [Service]
   Type=simple
   User=root
   Group=root
   ExecStart=/usr/local/bin/redis_exporter \
     --redis.addr=redis://127.0.0.1:6379
   ExecReload=/bin/kill -s HUP $MAINPID
   ExecStop=/bin/kill -s QUIT $MAINPID
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

   > 如果 Redis 有密码，`--redis.addr` 可写为 `redis://:密码@127.0.0.1:6379`

3. **加载服务并启动：**

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start redis_exporter
   sudo systemctl enable redis_exporter
   ```

4. **查看运行状态：**

   ```bash
   sudo systemctl status redis_exporter
   ```

---

### **3. 在 Prometheus 中配置抓取**

修改 `prometheus.yml`，添加 redis_exporter 抓取配置：

```yaml
scrape_configs:
  - job_name: 'redis_exporter'
    static_configs:
      - targets: ['localhost:9121']
```

加载配置：

```bash
curl -X POST http://localhost:9090/-/reload
```

或者：

```bash
sudo systemctl restart prometheus
```

---

### **4. 验证 redis_exporter**

- **浏览器访问：** `http://<host-ip>:9121/metrics`  
  可看到导出的各类 Redis 性能数据。

- **Prometheus 界面验证：** 打开 http://<prometheus-ip>:9090，执行：

  ```
  up{job="redis_exporter"}
  ```

  返回 `1` 表示成功采集。

---

### **5. 常用优化参数**

- **指定 Redis 密码：**

  ```bash
  --redis.addr=redis://:yourpassword@127.0.0.1:6379
  ```

- **同时采集多个 Redis 实例：**

  ```bash
  --redis.addr=redis://127.0.0.1:6379 --redis.addr=redis://192.168.1.100:6379
  ```

- **自定义监听端口：**

  ```bash
  --web.listen-address=:9121
  ```

- **设置日志级别：**

  ```bash
  --log.level=warn
  ```

---

## Prometheus 组件之 node_exporter 机器指标

Prometheus 的架构中 Prometheus Server 本身并不直接提供主机级别的监控指标，但我们通常希望对宿主机 CPU、内存、磁盘等基础指标进行收集。**node_exporter** 就是 Prometheus 官方提供的系统级指标导出器。  
它由 Golang 编写，零依赖，解压即可运行，非常轻量。

### **1. 下载与解压**

你可以从 Prometheus 的官网获取最新版本的构建包：  
[下载地址](https://prometheus.io/download/)

下载完成后解压：
```bash
tar -zxf node_exporter-1.9.1.linux-amd64.tar.gz
```

此时可以直接使用以下命令启动 node_exporter：
```bash
./node_exporter-1.9.1.linux-amd64/node_exporter
```
默认会监听在 `9100` 端口，访问 `http://<host-ip>:9100/metrics` 可以看到导出的系统指标。

### **2. 注册为 systemd 服务**

直接运行会占用前台，当 shell 关闭时进程也会停止，因此推荐注册为 systemd 服务，以便后台运行和开机自启。

1. **复制可执行文件到环境路径：**
   ```bash
   sudo cp node_exporter-1.9.1.linux-amd64/node_exporter /usr/local/bin/
   ```

2. **创建服务文件 `/usr/lib/systemd/system/node_exporter.service`：**
   
   ```ini
   [Unit]
   Description=Node_exporter
   Documentation=https://prometheus.io/
   After=network.target
   
   [Service]
   Type=simple
   User=root
   Group=root
   ExecStart=/usr/local/bin/node_exporter \
     --web.listen-address=:9100
   ExecReload=/bin/kill -s HUP $MAINPID
   ExecStop=/bin/kill -s QUIT $MAINPID
   Restart=on-failure
   
   [Install]
   WantedBy=multi-user.target
   ```
   
3. **加载服务并启动：**
   
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start node_exporter
   sudo systemctl enable node_exporter
   ```
   
4. **查看运行状态：**
   ```bash
   sudo systemctl status node_exporter
   ```

### **3. 在 Prometheus 中配置抓取**

修改 `prometheus.yml`：
```yaml
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```
加载配置：
```bash
curl -X POST http://localhost:9090/-/reload
```
或者：
```bash
sudo systemctl restart prometheus
```

### **4. 验证 node_exporter**

- **浏览器访问：** `http://<host-ip>:9100/metrics`  
  可看到各种系统指标（CPU、内存、磁盘、网络）。
- **Prometheus 界面验证：** 打开 http://<prometheus-ip>:9090，执行：
  ```
  up{job="node_exporter"}
  ```
  返回 `1` 表示成功采集。

### **5. 常用优化参数**

- **只监听特定网卡：**
  ```bash
  --web.listen-address=0.0.0.0:9100
  ```
- **禁用不需要的指标收集器：**
  ```bash
  --collector.disable-defaults --collector.cpu --collector.meminfo
  ```
- **自定义日志级别：**
  ```bash
  --log.level=warn
  ```

---

## 内网穿透（云服务器）

#### **🎯 目标**

将本地机器的 22 端口（SSH 服务端口）通过 SSH 隧道映射到远程服务器的 3000 端口，实现内网穿透访问本地的 SSH 服务。

### **一、命令说明**

#### **1. 命令格式**

```bash
ssh -N -R [远程端口]:[本地地址]:[本地端口] user@remote_host
```

#### **2. 示例**

将本地 22 端口转发到远程服务器的 3000 端口：

```bash
ssh -fN -R 3000:localhost:22 user@remote_host
```

#### **3. 参数解释**

- -f：后台运行 SSH 连接
- -N：不执行远程命令，仅用于端口转发
- -R 3000:localhost:22：远程服务器监听 3000 端口，转发连接到本地的 22 端口
- user@remote_host：远程服务器的用户名和地址

### **二、远程服务器配置要求**

远程服务器需要允许远程端口转发。

#### **1. 修改 SSH 配置文件**

```bash
sudo vim /etc/ssh/sshd_config
```

添加或修改以下内容：

```bash
AllowTcpForwarding yes
GatewayPorts yes
```

#### **2. 重启 SSH 服务**

```bash
sudo systemctl restart sshd
```

### **三、连接测试**

在远程服务器上测试连接：

```bash
ssh -p 3000 localhost
```

如果一切设置正确，这条命令将登录本地机器的 SSH 服务。

### **四、关闭后台运行的 SSH 隧道**

#### **方法一：使用 ps + kill**

1. 查找 SSH 转发进程：

```bash
ps aux | grep 'ssh -fN -R'
```

1. 杀掉对应进程：

```bash
kill [PID]
```

示例：

```bash
kill 12345
```

#### **方法二：使用 pkill 快速关闭**

```bash
pkill -f 'ssh -fN -R'
```

注意：这将关闭所有使用该命令格式启动的 SSH 转发进程。

### **五、使用 autossh 实现自动重连（可选）**

#### **1. 安装 autossh**

```bash
sudo apt install autossh
```

#### **2. 启动命令**

```bash
autossh -fN -R 3000:localhost:22 user@remote_host
```

也可以配合 systemd 或 supervisor 等工具长期运行。

---



## SSH 免密登录

1. 在本地机器生成密钥对
   `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

   连续按几次回车，默认生成在 ~/.ssh/id_rsa 和 ~/.ssh/id_rsa.pub

2. 将公钥复制到被连接主机

   - 使用 ssh-copy-id 自动拷贝

     `ssh-copy-id username@remotehost`

   - 手动复制

     `cat ~/.ssh/id_rsa.pub | ssh username@remotehost 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh'`

     将`~/.ssh/id_rsa.pub`里的文本放到远程主机 `~/.ssh/authorized_keys`

---



## scp 基本使用：通过 SSH 复制文件

`scp` 适合临时上传、下载文件或复制整个目录，传输通过 SSH 加密。它不会做增量同步，重复执行会重新传输文件；经常同步大目录时，更适合使用下一节的 `rsync`。

以下示例中的 `user`、`remote_host` 和路径都需要替换为实际值。请先确认能通过 `ssh user@remote_host` 登录，且目标目录已存在、当前用户有写入权限。配置了 SSH 免密登录后，文件传输也可以使用相同的密钥。

### 1. 基本语法

```bash
scp [选项] 源路径 目标路径
```

远程路径写成 `user@remote_host:/path/to/file`；不带主机信息的路径表示本地路径。

### 2. 上传与下载文件

```bash
# 将本地文件上传到远程服务器
scp ./report.txt user@remote_host:/home/user/

# 上传时重命名文件
scp ./report.txt user@remote_host:/home/user/report-backup.txt

# 将远程文件下载到本地当前目录
scp user@remote_host:/home/user/report.txt ./
```

### 3. 复制目录

使用 `-r` 递归复制目录及其内容：

```bash
# 上传本地目录（结果为 /home/user/project）
scp -r ./project user@remote_host:/home/user/

# 下载远程目录到本地当前目录
scp -r user@remote_host:/home/user/project ./
```

### 4. 指定端口与私钥

```bash
# 使用 2222 端口，注意 scp 的端口参数是大写 -P
scp -P 2222 ./report.txt user@remote_host:/home/user/

# 指定私钥，并保留文件的修改时间、访问时间和权限模式
scp -i ~/.ssh/id_ed25519 -p ./report.txt user@remote_host:/home/user/
```

| 选项 | 作用 |
| --- | --- |
| `-r` | 递归复制目录 |
| `-P 2222` | 指定 SSH 端口（大写 `P`） |
| `-i 私钥路径` | 指定身份验证使用的私钥 |
| `-p` | 保留修改时间、访问时间和权限模式（小写 `p`） |
| `-C` | 启用传输压缩，对文本更有帮助，已压缩文件通常收益有限 |

> 注意：目标位置已有同名文件时，`scp` 通常会直接覆盖，不会询问。重要文件请先备份；路径含空格时，应使用引号包裹整个路径参数。

---

## rsync 基本使用：增量同步文件与目录

`rsync` 适合备份、部署以及反复同步目录。默认根据文件大小和修改时间判断是否需要更新；通过 SSH 同步时，可仅传输文件中发生变化的数据，减少重复传输。

### 1. 安装与基本语法

通过 SSH 使用 `rsync` 时，本地和远程服务器都需要安装 `rsync`，并确保 SSH 登录可用。

```bash
# Ubuntu / Debian（本地和远程按需安装）
sudo apt update
sudo apt install rsync

# 查看版本
rsync --version
```

```bash
rsync [选项] 源路径 目标路径
```

以下示例使用单冒号的 `user@remote_host:/path/` 写法，通过 SSH 连接，不需要单独启动 rsync 守护进程。

### 2. 本地同步、上传与下载

```bash
# 本地目录同步
rsync -avh ./source/ ./backup/

# 上传本地目录的内容到远程目录
rsync -avh --progress ./project/ user@remote_host:/home/user/project/

# 将远程目录的内容下载到本地目录
rsync -avh --progress user@remote_host:/home/user/project/ ./project/

# 上传单个文件
rsync -avh ./report.txt user@remote_host:/home/user/
```

请确保目标父目录已存在且可写。重复执行同一条命令时，`rsync` 会跳过其判断为未变化的文件。默认不会删除目标目录中多出来的文件，但会更新同路径的文件。

### 3. 注意源目录末尾的斜杠

这是使用 `rsync` 时最容易混淆的地方。假设 `/backup/` 已存在：

```bash
# 带斜杠：复制 project 目录中的内容到 /backup/
rsync -avh ./project/ /backup/

# 不带斜杠：复制 project 目录本身，结果为 /backup/project/
rsync -avh ./project /backup/
```

简单记忆：**源目录末尾有 `/`，同步内容；没有 `/`，同步目录本身。**

### 4. 指定 SSH 端口与私钥

```bash
rsync -avh --progress \
  -e "ssh -p 2222 -i ~/.ssh/id_ed25519" \
  ./project/ user@remote_host:/home/user/project/
```

这里使用的是 SSH 的小写 `-p` 端口参数。`rsync` 自身的 `-p` 表示保留权限，不能用来指定 SSH 端口。

### 5. 排除不需要同步的内容

```bash
rsync -avh \
  --exclude='node_modules/' \
  --exclude='.git/' \
  --exclude='.env' \
  ./project/ user@remote_host:/home/user/project/
```

也可以把规则写入 `rsync-exclude.txt`，每行一条，再使用 `--exclude-from=rsync-exclude.txt` 加载。排除规则不会清理目标端已经存在的敏感文件，因此不要仅依靠排除 `.env` 来处理已经上传的凭据。

### 6. 先预演，再执行镜像同步

加上 `--delete` 后，目标目录中源目录没有的文件也会被删除（默认排除规则保护的文件除外）。**只有确实需要让目标与源保持一致时才使用，并先检查同步方向和目录路径。**

```bash
# 第一步：仅预览变更和删除，不实际修改文件
rsync -avhn --delete --itemize-changes \
  ./project/ user@remote_host:/home/user/project/

# 第二步：确认预览无误后，去掉 -n 执行
rsync -avh --delete --itemize-changes \
  ./project/ user@remote_host:/home/user/project/
```

### 7. 常用选项速查

| 选项 | 作用 |
| --- | --- |
| `-a` | 归档模式，递归同步并保留符号链接、权限、时间等元数据；属主、属组等能否保留取决于权限 |
| `-v` | 显示详细信息 |
| `-h` | 以易读格式显示大小 |
| `-z` | 压缩传输数据，适合文本；已压缩文件通常不必开启 |
| `--progress` | 显示单个文件的传输进度 |
| `-P` | 等同于 `--partial --progress`，保留未完成文件并显示进度，便于再次运行时复用已传输的数据 |
| `-n` / `--dry-run` | 预演操作，不实际修改文件 |
| `--itemize-changes` | 列出各文件的变化类型 |
| `--exclude='规则'` | 排除匹配的文件或目录 |
| `--delete` | 删除目标目录中源目录没有的文件，谨慎使用 |
| `-e "ssh ..."` | 自定义 SSH 连接参数 |

> `-a` 不包含硬链接、ACL 和扩展属性的保留；如果需要完整的系统级备份，应根据文件系统、权限和 rsync 版本另外评估 `-H`、`-A`、`-X` 等选项。

---

## fd 的安装及使用

[fd](https://github.com/cha0ran/fd-zh)

### 安装

在Ubuntu上和其他基于Debian的Linux发行版。

`sudo apt install fd-find`


> 安装好后命令为 `fdfind`，因为另一个软件包已经使用了 `fd` 这个名称。通过执行 `ln -s $(which fdfind) ~/.local/bin/fd` 命令来添加 `fd` 的链接，以便以与本文档相同的方式使用 `fd`。请确保 `$HOME/.local/bin` 在你的 `$PATH` 中。或者通过 `alias fd=fdfind`。

### 使用

```bash
# 简单搜索:递归搜索当前目录中任何包含 netfl 模式的条目
fd search-string

# 正则表达式搜索:搜索模式被当作一个正则表达式来处理，以 x 开头、以 rc 结尾的条目
fd '^x.*rc$' # X11/xinit/xinitrc

# 指定根目录
fd passwd /etc

# 列出所有文件，递归。类似ls -R
fd
# 列出所有文件，递归。列出一个给定目录中的所有文件，必须使用一个全包模式，如 . 或 ^
fd . /data

# 搜索一个特定的文件扩展名
fd -e py
# 配合搜索模式使用
fd -e py task # src/fshelper/task.py

# 搜索一个特定的文件名
fd -g libc.so /usr
fd -g *.so /user

# 隐藏和忽略的文件
fd -H pre-commit

# 匹配完整路径
fd -p -g '**/.git/config'
fd -p '.*/lesson-\d+/[a-z]+.(jpg|png)'

# 命令执行
fd -e zip -x unzip # 递归找到所有的压缩文件并解压
# 占位符语法
# {}： 一个占位符，将被替换为搜索结果的路径（documents/images/party.jpg）。
# {.}：和 {} 一样，但没有文件扩展名（documents/images/party）。
# {/}：一个占位符，将被搜索结果的基本名称（party.jpg）取代。
# {//}：已发现路径的父级（documents/images）。
# {/.}：去掉扩展名的基本名（party）。
fd -e jpg -x convert {} {.}.png
# 并行执行与串行执行
# 对于 -x/--exec，你可以通过使用 -j/--threads 选项控制并行作业的数量。使用 --threads=1 进行串行执行

# 排除特定的文件或目录
fd -H -E .git
fd -E /mnt/external-drive
fd -E '*.bak'
```

---



## Windows 安装 NeoVim 及 LazyVim

[LazyVim](https://lazyvim-github-io.vercel.app/zh-Hans/keymaps)

```bash
# 安装必备软件
scoop install neovim git gcc ripgrep fd unzip tree-sitter luarocks
 
# 下载安装 LazyVim 配置
git clone https://github.com/LazyVim/starter $env:LOCALAPPDATA\nvim --depth=1
```

---



## Windows 安装 Scoop

```bash
# 脚本执行策略更改，默认自动同意
Set-ExecutionPolicy RemoteSigned -scope CurrentUser -Force
 
# 执行安装命令（默认安装在用户目录下，如需更改请执行 “自定义安装目录” 命令）
iwr -useb scoop.201704.xyz | iex # 如果想自定义安装目录请不要执行这行命令
 
## 自定义安装目录（注意将目录修改为合适位置)
irm scoop.201704.xyz -outfile 'install.ps1'
 
.\install.ps1 -ScoopDir 'E:\Scoop' -ScoopGlobalDir 'E:\GlobalScoopApps'
```

---



## Ubuntu 安装 Google Chrome

### 1.下载谷歌浏览器

通过使用`Ctrl+Alt+T`键盘快捷键或单击终端图标来打开终端

使用wget下载最新的Google Chrome `.deb`软件包：

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

### 2.安装Google Chrome

在Ubuntu上安装软件包需要管理权限。以具有sudo特权的用户身份运行以下命令，以`.deb`在系统上安装Chrome 软件包：

```bash
sudo apt install ./google-chrome-stable_current_amd64.deb
```

---



## 服务器速度测试

### 完整测试

`bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh)`

或

`wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh | sudo bash`

### **精简模式**

跳过 Geekbench v5 和国际 speedtest [网络测试](https://zhida.zhihu.com/search?content_id=211258886&content_type=Article&match_order=1&q=网络测试&zhida_source=entity)

```bash
bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh) -f
```

### **Speedtest**

仅进行 speedtest 国内网络测试

```bash
bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh) --speed
```

### **流媒体测试**

```bash
bash <(wget -qO- https://down.vpsaff.net/linux/speedtest/superbench.sh) -m
```

---



## Git仓库代码行数统计

### 不显示内容

`git ls-files | xargs cat | wc -l`

### 显示内容

`git ls-files | xargs wc -l`

---



## VMware 挂载本地文件夹

查看共享文件夹是否存在

`vmware-hgfsclient`

将所有文件夹挂载到 `/mnt/hgfs`

`sudo vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other`

---



## Miniconda 静默安装

```shell
#!/bin/bash

# 创建miniconda3目录
mkdir -p ~/miniconda3

# 下载Miniconda安装脚本
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh

# 执行安装脚本
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3

# 初始化Conda
~/miniconda3/bin/conda init bash

# 刷新shell
source ~/.bashrc

echo "Miniconda安装和初始化完成"

```

---



## ffmpeg ts视频转mp4视频

```bash
ffmpeg -i input.ts -c copy -map 0:v -map 0:a -bsf:a aac_adtstoasc .\output.mp4
```

---



## Linux统计文件夹及其子文件夹中文件个数

```bash
find /path/dir -type f | wc -l
```

---



## Linux把查询出来的进程全部杀死

```bash
ps -ef | grep workcommod | awk '{print $2}' | xargs kill -9
```

---



## Linux查看文件列表时排序

在n后面加上r可倒序

```bash
ll | awk '{print $9}' | sort -k1.1n
```

---



## ssh 端口转发至本地

这里是将服务器本地的9090端口转发到当前机器实现当前机器的`localhost:9090`访问远程主机的`9090`端口

```bash
ssh -CNgv -L 9090:127.0.0.1:9090 username@host -p port
```
