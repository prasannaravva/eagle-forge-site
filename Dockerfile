# Eagle Nexa website: build the static site, then serve it with nginx on plain HTTP.
# HTTPS and the domain are handled by the nginx reverse proxy already on the server.
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
FROM nginx:1.27-alpine
COPY deploy/nginx-container.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/healthz || exit 1
