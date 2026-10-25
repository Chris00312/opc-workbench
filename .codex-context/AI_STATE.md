# AI_STATE

Last Updated: 2026-10-25

## Current Goal
把项目整理成 Git 仓库并推送到 GitHub（Chris00312/opc-workbench，私有，main 分支）。

## Snapshot
- 产品：OPC 智能工作台，帮助 35–55 岁咨询师/培训师/教练做一人公司（培训 + 工具 + 撮合 + 社群）。
- 已完成：6 个页面的静态 UI 原型（Stripe 后台风格），nginx 一键部署脚本，商业计划书通俗解读。
- 未完成：撮合平台页面未设计；没有后端、账号、数据存储；页面数据为演示数据。
- 部署：用户自己的 VPS（Debian 11），用户在 Mac 上 scp/ssh 执行部署。

## Last Run
- result: 从项目文件整理出仓库（site/、deploy.sh、scripts/pack.sh、docs/、状态文件）。
- proof: `scripts/pack.sh` 生成的包与原 opc-site.tar.gz 文件列表一致；全仓库搜索无服务器 IP、端口、密码。
- risks: 原商业计划书 PDF 未放入仓库（体积 14MB 且属商业机密）。
- rollback_point: 首次提交。
- next_step: 见 TODO.md。
