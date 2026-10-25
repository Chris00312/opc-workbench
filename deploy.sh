#!/usr/bin/env bash
# OPC 智能工作台：在 Debian/Ubuntu 上用 nginx 部署静态网站
set -e
cd "$(dirname "$0")"

if ! apt-get update -y; then
  # Debian 11 停止维护后，软件源会迁到 archive.debian.org
  echo "默认软件源不可用，切换到 archive.debian.org 重试"
  cp /etc/apt/sources.list /etc/apt/sources.list.bak
  echo "deb http://archive.debian.org/debian bullseye main contrib non-free" > /etc/apt/sources.list
  echo "deb http://archive.debian.org/debian-security bullseye-security main contrib non-free" >> /etc/apt/sources.list
  apt-get -o Acquire::Check-Valid-Until=false update -y
fi
apt-get install -y nginx

mkdir -p /var/www/opc
rm -rf /var/www/opc/*
cp -r site/* /var/www/opc/

cat > /etc/nginx/sites-available/opc <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/opc;
    index index.html;
    charset utf-8;
    gzip on;
    gzip_types text/css application/javascript;
    location / { try_files $uri $uri/ =404; }
}
NGINX
ln -sf /etc/nginx/sites-available/opc /etc/nginx/sites-enabled/opc
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

IP=$(hostname -I | awk '{print $1}')
echo ""
echo "部署完成：http://${IP}/"
echo "如果浏览器打不开，请到服务商后台的“安全组”放行 TCP 80 端口。"
