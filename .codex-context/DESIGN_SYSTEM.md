# Design System

## Status
- [x] 品牌标识已定稿（brand/）
- [ ] tokens 未抽成独立文件（site/ 各页内联样式）

## Sources of truth
- Assets: `brand/`（mark、lockup 深浅两版 SVG，favicon.svg，1024 app 图标与 PNG 导出）
- 官网实现：`deploy/jizeng-site.tar.gz` 内 `website/assets/brand/` 与 `assets/css/style.css`

## Brand rules（2026-11-15 / 11-16 更新）
- 名称：Growth Hub · 企业增长赋能平台（主办主体：上海领越人力资源咨询服务中心）
- Logo：双行组合标识，上行为 AI 生成去背双色精修 `Growth Hub` 文字标图片（`.logo-wordmark`，浅色导航用 `assets/brand/logo-wordmark-light.png`，深色页脚用 `assets/brand/logo-wordmark-dark.png`，桌面高度 `22px`、1360px 以下 `20px`），下行为纯文字副标 `企业增长赋能平台`（`.logo-sub`，`--ink` `#0b8a72`，深色页脚自动切至 `#1ed6b0`）
- 字体：中文 `Alibaba PuHuiTi` / `PingFang SC` / `Microsoft YaHei`；英文正文字体 `Helvetica Neue` / `Arial`
- 后台类 UI：Stripe 后台风格（白底、细分隔线、表格、单一强调色、浅灰侧栏），见 DECISIONS.md

## 官网配色与首屏规范（2026-11-09 至 2026-11-16）
- 白底为主、黑底为辅：**白色导航**（`--nav-h: 66px`，7 个一级栏目 + 预约咨询）；首屏图片 + 左侧加深渐变；中间区块白 `#fff` / 浅灰 `#e7eaed` 严格逐段交替；底部「联系我们」条 + 页脚整体黑色。
- 首屏（`.hero`）：4 屏轮播 + 底部 4 栏文字进度条（`.dots.hero-tabs`），不包含 `.hero-stats`；桌面端 `.slide .container` 采用 `padding-top: calc(var(--nav-h) + 24px); padding-bottom: 48px`，令正文居于可视高度偏中略下位置；眉标 `.slide .brand` 字号为 `clamp(17px, 1.6vw, 22px)`。
- 品牌色青绿 `#1ed6b0` 只做填充（按钮、徽标、进度条）；浅底上的强调文字用深青绿 `#0b8a72`（变量 `--ink`）。
- 卡片：`.card-box`（`.cards-grid` 三列 / 四列 / 两列）与 `.ncard` 均为白底圆角细边框 + 轻悬停反馈；价格卡 `.plan.hl` 白底配顶部青绿强调条。
- 样式与脚本：`style.css` / `main.js` 带 `?v=20261116e`，改样式时同步更新，避免服务器 7 天缓存。

## Recent design work
- 2026-11-16: 移除首屏 `.hero-stats` 并居中下移 `.slide .container`；全站导航与页脚 `Growth Hub` 英文主标更换为 AI 生成去背双色精修 PNG 字标（V1），版本升至 `20261116b`。
- 2026-11-15: 品牌调整为「Growth Hub 企业增长赋能平台」，7 栏导航 + 4 屏文字进度条首屏 + 全站 V1.0 对齐（`20261115g`）。
- 2026-11-12: 首页六模块复用图片卡片，桌面 3 列、平板 2 列、手机 1 列。
- 2026-11-09: 官网由纯黑（参考 51WORLD）改为白底为主、黑底为辅。
