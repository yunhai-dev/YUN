# syntax=docker/dockerfile:1

# Build the static export. The site has no server runtime: `output: 'export'`
# writes everything to /app/out, which the Caddy stage serves as plain files.
# The export is architecture-independent, so build it natively even when the
# target image is linux/amd64.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# libc6-compat keeps the prebuilt native binaries Next/Sharp pull in happy on Alpine.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build


FROM caddy:2-alpine AS runtime

# Caddy serves the exported files and obtains/renews the cn.yhnotes.com certificate.
COPY --from=build /app/out /srv
COPY Caddyfile /etc/caddy/Caddyfile

# AGPL-3.0 distribution notice for the vendored Folia runtime.
COPY --from=build /app/LICENSE /srv/LICENSE
COPY --from=build /app/src/app/media/*/player/folia/NOTICE.md /srv/THIRD-PARTY-NOTICES.md

EXPOSE 80 443 443/udp
