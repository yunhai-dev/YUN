type Announcement = {
    content: string
    link?: string
    createdAt: Date
}

const announcements: Announcement[] = [
    {
        content: "🎉 Clouisle Beta 正式上线 🎉",
        link: "https://clouisle.asia",
        createdAt: new Date("2026-2-11")
    },
    {
        content: "🎉 DockerHub 镜像代理服务现已可用 🎉",
        link: "/blog/dockerhub-proxy/",
        createdAt: new Date("2026-1-13")
    },
    {
        content: "🎉 评论与分享服务已下线 🎉",
        createdAt: new Date("2025-12-3")
    },
    {
        content: "🎉 YunHai 评论服务正式上线 🎉",
        link: "/blog/comment-service/",
        createdAt: new Date("2025-10-9")
    },
    {
        content: "🎉 原域名将于11月到期，点击前往迁移后的新地址 🎉",
        link: "https://www.yhnotes.com/",
        createdAt: new Date("2025-8-5")
    },
    {
        content: "🎉 云分享静态资源托管服务正式上线 🎉",
        link: "/blog/yun-share/",
        createdAt: new Date("2025-7-7")
    },
    {
        content: "🎉 Minio Manager 插件已登陆 Raycast 🎉",
        link: "https://www.raycast.com/2214372851/minio-manager",
        createdAt: new Date("2025-6-21")
    },
    {
        content: "🎉 云 API 文档功能正式上线 🎉",
        link: "/api/",
        createdAt: new Date("2025-6-21")
    },
    {
        content: "🎉 云音乐 MCP 正式发布 🎉",
        link: "/blog/yun-music/",
        createdAt: new Date("2025-6-5")
    }
]

export const getAnnouncement = () => {
    return announcements[0]
}