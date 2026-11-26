// src/config/site.ts

import {STORAGE_HOST} from "@/data/baseUrl";

export const siteName = '云云亦海';
/** Per-deployment origin: www on Cloudflare Pages, cn in the Docker/Caddy image. */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yhnotes.com';
export const image = `${STORAGE_HOST}/Avatar.webp`;
