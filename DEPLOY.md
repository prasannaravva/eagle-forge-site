# Hosting eaglenexa.ai on an Oracle Cloud VM (Docker)

The site runs as one Docker container: the static build served by [Caddy](https://caddyserver.com), which gets and renews the HTTPS certificate for `eaglenexa.ai` by itself (Let's Encrypt). `www.eaglenexa.ai` redirects to `eaglenexa.ai`.

Files: `Dockerfile` (build + serve), `deploy/Caddyfile` (web server), `docker-compose.yml` (ports, domain, certificate storage).

## 1. Point the domain at the VM

At your domain registrar's DNS settings, using the VM's **public IP** (OCI Console → Compute → Instances → your instance):

| Type | Name | Value |
|------|------|-------|
| A | `@` (eaglenexa.ai) | the VM's public IP |
| A | `www` | the same IP |

Remove any other A or AAAA records for `@` and `www` (for example a registrar's parking page), or the certificate request can fail. Check it from your Mac before going on:

```bash
dig +short eaglenexa.ai
```

It should print the VM's IP. DNS changes can take a few minutes to an hour.

## 2. Open ports 80 and 443

Oracle blocks these twice: in the cloud network and in the VM's own firewall. Both must be opened.

**Cloud network.** OCI Console → Networking → Virtual Cloud Networks → your VCN → Security Lists → Default Security List → Add Ingress Rules:

- Source CIDR `0.0.0.0/0`, IP protocol TCP, destination port `80`
- Source CIDR `0.0.0.0/0`, IP protocol TCP, destination port `443`
- (optional, for HTTP/3) Source CIDR `0.0.0.0/0`, IP protocol UDP, destination port `443`

**VM firewall.** On **Ubuntu** images (OCI ships them with iptables rules that reject everything except SSH):

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
```

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
```

```bash
sudo netfilter-persistent save
```

On **Oracle Linux** images:

```bash
sudo firewall-cmd --permanent --add-service=http --add-service=https && sudo firewall-cmd --reload
```

## 3. Install Docker on the VM

SSH in (`ssh ubuntu@<ip>` on Ubuntu, `ssh opc@<ip>` on Oracle Linux), then on Ubuntu:

```bash
curl -fsSL https://get.docker.com | sudo sh
```

```bash
sudo usermod -aG docker $USER
```

Log out and back in so the group change applies. On Oracle Linux, install Docker CE from Docker's repository (`dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`, then `sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin` and `sudo systemctl enable --now docker`).

## 4. Get the site and start it

```bash
git clone https://github.com/prasannaravva/eagle-forge-site.git && cd eagle-forge-site
```

```bash
docker compose up -d --build
```

The image is built on the VM itself, so it matches the VM's processor (the free Ampere VMs are arm64; that works as is). The first start takes a minute or two; Caddy then requests the certificate. Watch it with:

```bash
docker compose logs -f
```

Look for `certificate obtained successfully` for `eaglenexa.ai` and `www.eaglenexa.ai`, then open https://eaglenexa.ai.

## 5. Updating the site

After changes are pushed to `main`:

```bash
cd ~/eagle-forge-site && git pull && docker compose up -d --build
```

Certificates are kept in the `caddy_data` volume, so rebuilds do not request new ones.

## Troubleshooting

- **Certificate errors in the logs:** DNS does not point at this VM yet (step 1), or port 80/443 is still blocked (step 2). Fix it and run `docker compose restart`. Let's Encrypt limits repeated failures, so check DNS with `dig` first.
- **Site does not load at all:** check the container is up with `docker compose ps`, and test from the VM with `curl -I http://localhost`.
- **Different domain or a staging test:** `DOMAIN=staging.eaglenexa.ai docker compose up -d --build`.
- **Never use `docker compose down -v`**: `-v` deletes the certificate volume.
