# Hosting eaglenexa.ai on the Oracle Cloud VM (Docker behind the existing nginx)

The site runs as one Docker container: the static build served by nginx on plain HTTP, published on `127.0.0.1:8080` only. The nginx already running on the VM is the reverse proxy: it answers for `eaglenexa.ai`, handles HTTPS (certbot), and forwards requests to the container. `www.eaglenexa.ai` redirects to `eaglenexa.ai`.

```
visitor ──https──▶ host nginx (80/443, certbot) ──http──▶ 127.0.0.1:8080 ──▶ container (nginx + site)
```

Files:

- `Dockerfile`: builds the site, then serves it with nginx.
- `deploy/nginx-container.conf`: nginx inside the container (caching, compression, page fallback, `/healthz`).
- `docker-compose.yml`: runs the container on `127.0.0.1:8080`.
- `deploy/nginx-host-eaglenexa.ai.conf`: the site config to add to the existing nginx.

## 1. Point the domain at the VM

At the domain registrar, using the VM's public IP:

| Type | Name | Value |
|------|------|-------|
| A | `@` (eaglenexa.ai) | the VM's public IP |
| A | `www` | the same IP |

Remove the other A records for `@` and `www` (the domain currently points at the registrar's parking servers, `3.33.130.190` and `15.197.148.33`). Check before going on; it should print the VM's IP:

```bash
dig +short eaglenexa.ai
```

Ports 80 and 443 are already open if the existing nginx serves other sites over HTTPS; nothing changes there. Port 8080 is not opened anywhere: the container only listens on the VM itself.

## 2. Start the website container

Install Docker if it is not there yet (Ubuntu: `curl -fsSL https://get.docker.com | sudo sh`, then `sudo usermod -aG docker $USER` and log in again). Then:

```bash
git clone https://github.com/prasannaravva/eagle-forge-site.git && cd eagle-forge-site
```

```bash
docker compose up -d --build
```

The image is built on the VM, so it matches its processor (Ampere arm64 included). Check it answers:

```bash
curl -I http://127.0.0.1:8080
```

If port 8080 is already taken on the VM, start it on another port with `SITE_PORT=8090 docker compose up -d --build` and use that port in step 3.

## 3. Add the site to the existing nginx

On **Ubuntu/Debian** layouts:

```bash
sudo cp deploy/nginx-host-eaglenexa.ai.conf /etc/nginx/sites-available/eaglenexa.ai
```

```bash
sudo ln -s /etc/nginx/sites-available/eaglenexa.ai /etc/nginx/sites-enabled/eaglenexa.ai
```

On **Oracle Linux/RHEL** layouts, copy it to `/etc/nginx/conf.d/eaglenexa.ai.conf` instead. Then test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

On Oracle Linux with SELinux enforcing, nginx needs permission to connect to the container port once:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

## 4. Turn on HTTPS

```bash
sudo certbot --nginx -d eaglenexa.ai -d www.eaglenexa.ai
```

certbot adds the 443 server and the http to https redirect to the same file, and renews the certificate on its own. Then open https://eaglenexa.ai.

## Updating the site

After changes are pushed to `main`:

```bash
cd ~/eagle-forge-site && git pull && docker compose up -d --build
```

The host nginx needs no change for updates.

## Troubleshooting

- **502 Bad Gateway:** the container is not running or is on another port. Check `docker compose ps` and `curl -I http://127.0.0.1:8080`; on Oracle Linux, the SELinux setting in step 3.
- **certbot fails:** DNS does not point at this VM yet (step 1), or another server block already claims `eaglenexa.ai`. Check with `sudo nginx -T | grep -n eaglenexa`.
- **Old page after an update:** the page itself is sent with `no-cache`, so a normal reload shows the new version; if a CDN or cache sits in front of nginx, purge it.
- **Container health:** `docker inspect --format '{{.State.Health.Status}}' eaglenexa-site` should say `healthy`.
