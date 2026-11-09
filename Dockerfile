# Eagle Nexa website: build the static site, then serve it with Caddy (automatic HTTPS).
# Works on x86 and on Oracle's Ampere (arm64) VMs: both base images are multi-arch.

# 1. Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# The site is served from the domain root, so no PAGES_BASE here.
RUN npm run build

# 2. Serve
FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80 443 443/udp
