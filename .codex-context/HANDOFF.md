# HANDOFF

项目：Growth Hub 企业增长赋能平台（主办主体：上海领越人力资源服务中心）。面向一人公司（OPC）与成长期中小企业的 AI 驱动企业增长赋能平台。

- 本地路径：`/Users/c/Documents/极増科技本地`（GitHub：`Chris00312/opc-workbench`，`main`）
- 当前状态（2026-11-15）：官网已完成会议纪要改版、7 栏一级导航（`首页 / 极增商界 / 极增智脑 / 培训活动 / 增长咨询 / 数据方案 / 关于我们`）、首屏 4 屏文字进度条及全站 V1.0 文档严格对齐，版本 `20261115g` 已部署上线；核心后台软件尚未开发。
- 官网：11 个主要静态页 + 4 个跳转页，原生 HTML/CSS/JS；本地预览 `python3 -m http.server 8000 --directory website`。
- 发布：现有 Windows ECS nginx 静态站 `C:\srv\www`（保留 `C:\srv\www\icp\` 与视频），使用既有 SSH 部署身份；不使用根目录 Linux `deploy.sh`。域名 `https://talentchain.net` 与 `www`。
- 最新备份：`C:\srv\www-backup-20261115a.zip`；21 个发布文件（15 HTML + CSS + JS + `img-08.jpg` + `CREDITS.md` + 2 lockup SVG）线上 HTTPS SHA-256 与本地一致。
- 待办：真实联系方式/地址替换、正式备案服务器采购与备案申请书/截图制作、后台（会员/支付/验证码/IP 限流）与外部大模型 API 接入。
- 关键文件：`website/index.html`、`website/assets/js/main.js`、`website/assets/css/style.css`、`.codex-context/DECISIONS.md`、`VIBELOG.md`。旧原型 `site/` 与旧 Word 文档仅作历史参考。
- 注意：不要把服务器 IP、端口、密码写进仓库；素材只用可商用或内部 AI 自制来源并登记到 `website/assets/media/CREDITS.md` 与 `website/credits.html`。
