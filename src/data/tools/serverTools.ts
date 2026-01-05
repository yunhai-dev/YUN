import {Tool} from "@/types/tools";

export const serverTools: Tool[] = [
    // https://github.com/dromara/orion-visor
    {
        id: 'orion-visor',
        name: 'Orion Visor',
        description: '一款高颜值、现代化的自动化运维及轻量堡垒机，提供全面的服务器智能运维解决方案。',
        href: 'https://github.com/dromara/orion-visor',
        category: '服务器工具'
    },
    {
        id: 'warpgate',
        name: 'Warpgate',
        description: '完全透明的 SSH、HTTPS、MySQL 和 Postgres 堡垒机/PAM，无需额外的客户端软件',
        href: 'https://github.com/warp-tech/warpgate',
        category: '服务器工具'
    },
    {
        id: 'mole',
        name: 'Mole',
        description: 'Mac 深度清理优化工具，集成 CleanMyMac、AppCleaner、DaisyDisk、Sensei、iStat 功能于一身。',
        href: 'https://github.com/tw93/Mole',
        category: '命令行工具'
    },
    {
        id: 'fastfetch',
        name: 'Fastfetch',
        description: '终端系统信息获取工具，注重性能和可定制性。',
        href: 'https://github.com/fastfetch-cli/fastfetch',
        category: '命令行工具',
    },
    {
        id: 'fd-find',
        name: 'fd (fd-find)',
        description: 'find 命令的简单、快速和用户友好的替代品。',
        href: 'https://github.com/sharkdp/fd',
        category: '命令行工具',
    },
    {
        id: 'starship',
        name: 'Starship',
        description: '轻量、迅速、客制化的高颜值终端！',
        href: 'https://starship.rs/zh-CN/',
        category: '命令行工具',
    },
    {
        id: 'trzsz-tssh',
        name: 'trzsz / tssh',
        description: '优秀的文件传输工具 (trz/tsz) 和兼容 tmux 的 ssh 客户端替代品 (tssh)。',
        href: 'https://trzsz.github.io/cn/',
        category: '命令行工具',
    },
    {
        id: 'akile-monitor',
        name: 'Akile Monitor',
        description: '开源、轻量、易用、简洁的服务器监控。',
        href: 'https://github.com/akile-network/akile_monitor',
        category: '服务器监控',
    },
    {
        id: 'uptime-kuma',
        name: 'uptime Kuma',
        description: '开源免费的易于使用的自托管的服务监控工具。',
        href: 'https://github.com/louislam/uptime-kuma',
        category: '服务器监控',
    },
    {
        id: 'beszel-monitor',
        name: 'Beszel',
        description: '轻量级服务器监控平台，包含 Docker 统计、历史数据和警报功能。',
        href: 'https://github.com/henrygd/beszel',
        category: '服务器监控',
    },
]