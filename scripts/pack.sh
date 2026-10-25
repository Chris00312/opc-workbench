#!/usr/bin/env bash
# 把 site/ 和 deploy.sh 打包成 dist/opc-site.tar.gz
set -e
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
mkdir -p "$tmp/opc-site" dist
cp -r site deploy.sh "$tmp/opc-site/"
tar czf dist/opc-site.tar.gz -C "$tmp" opc-site
rm -rf "$tmp"
echo "已生成 dist/opc-site.tar.gz"
