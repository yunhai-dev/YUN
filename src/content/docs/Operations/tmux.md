---
title: "tmux 使用入门指南"
description: "整理 tmux 的安装、会话管理、窗口分屏与常用快捷键，适合日常终端工作流入门"
keywords: ["tmux", "终端复用", "会话管理", "分屏", "SSH", "快捷键", "命令行"]
---

## tmux 是什么

tmux 是一个终端复用工具，可以在一个终端窗口中管理多个会话、窗口和面板。它特别适合远程连接服务器、运行长时间任务、查看日志以及同时处理多个命令行任务。

一句话理解：**tmux 让你的终端可分屏、可后台、可恢复。**

## 为什么要使用 tmux

相比普通终端，tmux 的主要优势有：

### 1. 会话可保持

即使 SSH 断开，tmux 中运行的任务通常仍然会继续存在。下次重新连接服务器后，可以直接恢复之前的工作状态。

### 2. 一个终端管理多个任务

你可以在一个 tmux 会话中创建多个窗口，也可以把一个窗口拆成多个面板，同时执行不同命令。

### 3. 非常适合远程开发

在服务器上部署服务、执行脚本、排查日志时，tmux 会比频繁新开多个 SSH 连接更方便，也更容易保持上下文。

## tmux 的核心概念

开始使用之前，先理解 tmux 里的三个核心概念。

### Session（会话）

一个独立的工作空间。你可以把它理解为一个项目级上下文，例如 `blog`、`server`、`test`。

### Window（窗口）

一个会话中可以包含多个窗口，类似浏览器中的多个标签页。

### Pane（面板）

一个窗口还可以继续拆分成多个面板，类似终端分屏。

它们的关系可以简单理解为：

```bash
Session -> Window -> Pane
```

## 安装 tmux

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install tmux
```

### CentOS / RHEL

```bash
sudo yum install tmux
```

### macOS

```bash
brew install tmux
```

安装完成后，可以执行以下命令确认版本：

```bash
tmux -V
```

## 快速开始

### 创建一个新会话

```bash
tmux
```

或者指定会话名：

```bash
tmux new -s work
```

### 查看当前会话列表

```bash
tmux ls
```

### 连接到指定会话

```bash
tmux attach -t work
```

### 分离当前会话

在 tmux 中按下：

```bash
Ctrl+b d
```

这表示从当前会话中暂时退出，但会话不会被关闭，里面运行的任务也会继续保留。

### 关闭会话

可以直接退出会话中所有 shell，或者执行：

```bash
tmux kill-session -t work
```

## 常用快捷键

tmux 默认前缀键是：

```bash
Ctrl+b
```

也就是说，大部分快捷操作都需要先按一次 `Ctrl+b`，然后再按后续按键。

### 会话相关

- `Ctrl+b d`：分离当前会话
- `tmux ls`：查看会话列表
- `tmux attach -t <name>`：重新连接指定会话

### 窗口相关

- `Ctrl+b c`：创建新窗口
- `Ctrl+b n`：切换到下一个窗口
- `Ctrl+b p`：切换到上一个窗口
- `Ctrl+b ,`：重命名当前窗口
- `Ctrl+b &`：关闭当前窗口

### 面板相关

- `Ctrl+b %`：左右分屏
- `Ctrl+b "`：上下分屏
- `Ctrl+b o`：在面板之间切换
- `Ctrl+b x`：关闭当前面板
- `Ctrl+b z`：临时最大化当前面板

### 复制模式

- `Ctrl+b [`：进入复制模式
- 方向键 / PageUp / PageDown：滚动查看历史输出
- `q`：退出复制模式

## 常见使用场景

### 1. 远程服务器运行长任务

例如运行一个训练脚本、爬虫任务或构建命令：

```bash
tmux new -s task
python main.py
```

即使你断开 SSH，只要没有主动关闭 tmux 会话，任务通常也会继续运行。

### 2. 一边看日志一边执行命令

你可以把一个窗口拆成两个面板：

- 左边启动服务
- 右边实时查看日志

这样在排查问题时会方便很多。

### 3. 多项目切换

你可以给不同项目创建不同会话：

```bash
tmux new -s blog
tmux new -s server
tmux new -s test
```

之后按需连接即可，不同工作上下文也更清晰。

## 一个简单的工作流示例

例如在服务器开发时，可以这样组织：

- 一个 `session` 对应一个项目
- 第一个 `window` 用来编辑代码
- 第二个 `window` 用来运行服务
- 第三个 `window` 用来查看日志
- 某些窗口再拆成两个 `pane`，一边执行命令，一边观察输出

这种方式可以减少频繁新开 SSH 连接的麻烦，也更容易保留工作状态。

## 常用命令汇总

```bash
# 创建新会话
tmux new -s work

# 查看会话列表
tmux ls

# 连接会话
tmux attach -t work

# 关闭会话
tmux kill-session -t work

# 关闭所有会话
tmux kill-server
```

## 简单配置示例

tmux 的配置文件通常是：

```bash
~/.tmux.conf
```

例如可以加入以下配置：

```conf
# 将前缀键从 Ctrl+b 改为 Ctrl+a
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# 启用鼠标支持
set -g mouse on

# 窗口序号从 1 开始
set -g base-index 1
setw -g pane-base-index 1
```

修改配置后，可以执行：

```bash
tmux source-file ~/.tmux.conf
```

重新加载配置。

## tmux 与 screen 的区别

`screen` 也是终端复用工具，但 tmux 在窗口管理、面板拆分、配置灵活性方面通常更现代一些。如果你是刚开始接触终端复用工具，通常更推荐直接学习 tmux。

## 使用建议

如果你刚开始接触 tmux，不必一次记住所有快捷键，先掌握以下这些就足够应付大多数日常使用场景：

- `tmux new -s 名称`
- `tmux ls`
- `tmux attach -t 名称`
- `Ctrl+b d`
- `Ctrl+b c`
- `Ctrl+b %`
- `Ctrl+b "`

先学会创建、分离、恢复和分屏，后面再逐步补充窗口管理和配置能力即可。

## 总结

tmux 的价值不只是分屏，更重要的是它能帮助你保持终端工作状态，尤其适合服务器运维、远程开发和命令行重度用户。

如果你经常需要：

- SSH 到远程机器
- 运行长时间任务
- 同时打开多个终端
- 提升命令行工作效率

那么 tmux 是一个非常值得掌握的工具。
