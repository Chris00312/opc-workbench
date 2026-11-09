# Design System

## Status
- [x] 品牌标识已定稿（brand/）
- [ ] tokens 未抽成独立文件（site/ 各页内联样式）

## Sources of truth
- Assets: `brand/`（mark、lockup 深浅两版 SVG，favicon.svg，1024 app 图标与 PNG 导出）
- 官网实现：`deploy/jizeng-site.tar.gz` 内 `website/assets/brand/` 与 `assets/css/style.css`

## Brand rules
- 名称：极增商界（公司：上海极增科技有限公司）/ JIZENG TECHNOLOGY
- 标识色（mark 渐变）：#0b6e5c → #14b593 → #7ff6dc；文字 #111111
- 字体：中文 PingFang SC / Microsoft YaHei / Noto Sans SC（粗体 800）；英文 Helvetica Neue / Arial
- 后台类 UI：Stripe 后台风格（白底、细分隔线、表格、单一强调色、浅灰侧栏），见 DECISIONS.md

## 官网配色（2026-11-09 起）
- 白底为主、黑底为辅（2026-11-09 实地对照英伟达官网：只有首屏和页脚是黑色）：**白色导航**（浅色版 mark-light.svg）；首屏图片 + 左侧加深渐变；中间区块白 #fff / 浅灰 #e7eaed 严格逐段交替（首屏后第一段为白），不再有黑色强调带；使命区、路线图、高亮价格卡均为浅色；底部「联系我们」条 + 页脚整体黑色。
- 品牌色青绿 #1ed6b0 只做填充（按钮、徽标、进度点）；浅底上的强调文字用深青绿 #0b8a72（变量 --ink）。
- 方角按钮（2px 圆角），无外发光；卡片白底细边框；样张、手机示意用中性阴影。
- 实现：style.css 顶部 :root 为浅色变量，「深色作用域」选择器（.hero/.page-hero/.footer/.pcard/.phone/.toast）重设同名变量；组件只引用变量。HTML 引用 style.css / main.js 带 ?v=版本（当前 20261109e），改样式时同步更新，避免服务器 7 天缓存。

## Recent design work
- 2026-11-09: 官网由纯黑（参考 51WORLD）改为白底为主、黑底为辅。
- 2026-11-03: 品牌标识套件放入项目库，2026-11-04 复制到本地 brand/
