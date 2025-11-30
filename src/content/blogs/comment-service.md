---
title: YUN 评论静态网站评论服务
category: "API服务"
excerpt: 适用于个人网站的评论服务
lastEdited: 2025年10月4日
tags: [后端,FastAPI,Python]
imageUrl: https://rustfs-endpoint.yhnotes.com/content/comment-service.png
---

由于我的网站使用的是 NextJS 构建的纯静态页面，所以没法在这个项目内去实现数据库交互，我需要一个评论系统来让网站更具有交互性也利于后续发展，所以就有了本期介绍的评论服务。

整体采用 Python FastAPI 快速构建，数据库采用 Redis 与 PostgreSQL，Redis主要用于限流，pgsql用于存储评论数据，由于目前为止我只在我的网站中用了所以暂时没有除 React 以外的前端实现，如果你有兴趣可以将该项目的 openapi 格式 json 交给大模型来实现快速对接服务。

React 实现：[仓库地址](https://github.com/yunhai-dev/YUN/tree/main/src/components/comment-system)

后端服务：[仓库地址](https://github.com/yunhai-dev/yun-comments)

后端服务支持 Docker 快速部署，可以使用项目中提供的 docker-compose 文件直接部署，上方首图即为我的 React 实现效果，项目根据 IP 来进行流量限制，可以通过环境变量来修改限制次数。项目支持回复等操作，目前暂时为打算我的前端实现中未实现对富文本编辑器或 markdown 语法的支持，有能力的可以自行实现。
