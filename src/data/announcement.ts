type Announcement = {
    content: string
    link?: string
    createdAt: Date
}

const announcements: Announcement[] = [
    {
        content: "🎉 Clouisle Beta Now Live 🎉",
        link: "https://clouisle.asia",
        createdAt: new Date("2026-2-11")
    },
    {
        content: "🎉 DockerHub Registry Proxy Service is now available 🎉",
        link: "/blog/dockerhub-proxy/",
        createdAt: new Date("2026-1-13")
    },
    {
        content: "🎉 The comment and sharing service has been taken offline 🎉",
        createdAt: new Date("2025-12-3")
    },
    {
        content: "🎉 YunHai review service is launched 🎉",
        link: "/blog/comment-service/",
        createdAt: new Date("2025-10-9")
    },
    {
        content: "🎉 The original domain name will expire in November, click Go to the migrated address 🎉",
        link: "https://www.yhnotes.com/",
        createdAt: new Date("2025-8-5")
    },
    {
        content: "🎉 Yun Share Static Resource Web Hosting Service is launched 🎉",
        link: "/blog/yun-share/",
        createdAt: new Date("2025-7-7")
    },
    {
        content: "🎉 The Minio Manage plugin is now available in Raycast. 🎉",
        link: "https://www.raycast.com/2214372851/minio-manager",
        createdAt: new Date("2025-6-21")
    },
    {
        content: "🎉 The Yun API documentation feature is launched 🎉",
        link: "/api/",
        createdAt: new Date("2025-6-21")
    },
    {
        content: "🎉 Yun Music MCP Officially Launched 🎉",
        link: "/blog/yun-music/",
        createdAt: new Date("2025-6-5")
    }
]

export const getAnnouncement = () => {
    return announcements[0]
}