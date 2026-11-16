#!/usr/bin/env node
/**
 * 同步 https://storytelling.noomoagency.com/ 所需的全部 3D 模型、贴图、字体、SVG、音频与案例视频至 public/noomo/
 * 用法:
 *   node scripts/sync-noomo-assets.mjs           # 下载缺失文件
 *   node scripts/sync-noomo-assets.mjs --verify  # 仅校验完整性
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';

const ORIGIN = 'https://storytelling.noomoagency.com';
const OUT_ROOT = path.resolve(process.cwd(), 'public/noomo');

const ASSETS = [
  // Fonts
  { remote: '/_nuxt/fonnts.com-theseasons-it.CUCq9ttA.otf', local: 'fonts/fonnts.com-theseasons-it.otf' },
  { remote: '/_nuxt/TTNeorisTrialRegular.CykOY4gR.ttf', local: 'fonts/TTNeorisTrialRegular.ttf' },

  // Audio
  '/audio/BG_music_ST.mp3',
  '/audio/ReleaseSpirit.mp3',
  '/audio/hover1.mp3',
  '/audio/hover2.mp3',
  '/audio/hover3.mp3',
  '/audio/hover4.mp3',
  '/audio/hover5.mp3',

  // Images & SVG
  '/images/loader.gif',
  '/images/svg/UnionWhite.svg',
  '/images/svg/backArrowNew.svg',
  '/images/svg/buttonStar.svg',
  '/images/svg/close.svg',
  '/images/svg/cursor_border.svg',
  '/images/svg/fromError.svg',
  '/images/svg/logo.svg',
  '/images/svg/logo2.svg',
  '/images/svg/logoSimple.svg',
  '/images/svg/newStar.svg',
  '/images/svg/soundBorder.svg',
  '/images/svg/tagsStar.svg',
  '/images/text_icons/black_bird.svg',
  '/images/text_icons/black_bird_2.svg',
  '/images/text_icons/blue_bird.svg',
  '/images/text_icons/fater_white.svg',
  '/images/text_icons/flow_white.svg',
  '/images/text_icons/pixelBird.png',

  // 3D Models & Timelines
  '/models/feather.glb',
  '/models/v20.glb',
  ...Array.from({ length: 7 }, (_, i) => `/models/crystal${i}.glb`),
  '/timelines/cam-mob.glb',
  '/timelines/cam.glb',
  '/timelines/dev.glb',

  // Draco & Basis WASM Decoders
  '/libs/draco/draco_decoder.js',
  '/libs/draco/draco_decoder.wasm',
  '/libs/draco/draco_wasm_wrapper.js',
  '/libs/basis/basis_transcoder.js',
  '/libs/basis/basis_transcoder.wasm',

  // Textures & HDR
  '/textures/404.jpg',
  '/textures/LDR_RG01_0.png',
  '/textures/contact.jpg',
  '/textures/ftrail.jpg',
  '/textures/ice.jpg',
  '/textures/iced.jpg',
  '/textures/icen.jpg',
  '/textures/icon.png',
  '/textures/mountains.png',
  '/textures/noises.jpg',
  '/textures/sprite.png',
  '/textures/waves.jpg',
  '/textures/wooden_studio_19_1k.hdr',
  ...Array.from({ length: 7 }, (_, i) => `/textures/crystals/${i}.jpg`),

  // Case Videos
  '/videos/cases/AMDcase.mp4',
  '/videos/cases/AMDcaseMobile.mp4',
  '/videos/cases/AiCase.mp4',
  '/videos/cases/AiCaseMobile.mp4',
  '/videos/cases/CoinbaseCase.mp4',
  '/videos/cases/CoinbaseCaseMobile.mp4',
  '/videos/cases/LabsCase.mp4',
  { remote: '/videos/cases/LabsCaseMobile.mp4', local: 'videos/cases/LabsCaseMobile.mp4', optional: true },
  '/videos/cases/SFcase.mp4',
  '/videos/cases/SFcaseMobile.mp4',
  '/videos/cases/ValentimeCase.mp4',
  '/videos/cases/ValentimeCaseMobile.mp4',
  '/videos/cases/VogueCase.mp4',
  '/videos/cases/VogueCaseMobile.mp4',
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
        timeout: 60000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : `${ORIGIN}${res.headers.location}`;
          res.resume();
          downloadFile(nextUrl, destPath).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const tmpPath = `${destPath}.tmp`;
        const file = fs.createWriteStream(tmpPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            fs.renameSync(tmpPath, destPath);
            const stat = fs.statSync(destPath);
            resolve(stat.size);
          });
        });
        file.on('error', (err) => {
          fs.rmSync(tmpPath, { force: true });
          reject(err);
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function main() {
  const verifyOnly = process.argv.includes('--verify');
  const entries = ASSETS.map((item) => {
    if (typeof item === 'string') {
      return { remote: item, local: item.replace(/^\//, '') };
    }
    return item;
  });

  if (verifyOnly) {
    let missing = 0;
    let totalBytes = 0;
    for (const { local, optional } of entries) {
      const dest = path.join(OUT_ROOT, local);
      if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
        if (!optional) {
          console.error(`[MISSING] ${local}`);
          missing++;
        }
      } else {
        totalBytes += fs.statSync(dest).size;
      }
    }
    console.log(`Verified ${entries.length - missing}/${entries.length} assets (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
    process.exit(missing > 0 ? 1 : 0);
  }

  let completed = 0;
  let totalBytes = 0;
  const concurrency = 6;
  const queue = [...entries];

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      const dest = path.join(OUT_ROOT, item.local);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        completed++;
        totalBytes += fs.statSync(dest).size;
        continue;
      }
      const url = `${ORIGIN}${item.remote}`;
      try {
        const size = await downloadFile(url, dest);
        completed++;
        totalBytes += size;
        console.log(`[${completed}/${entries.length}] ${item.local} (${(size / 1024).toFixed(1)} KB)`);
      } catch (err) {
        if (item.optional) {
          completed++;
          console.log(`[SKIP optional] ${item.local}: ${err.message}`);
        } else {
          throw err;
        }
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`All ${completed} assets synced to public/noomo/ (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
