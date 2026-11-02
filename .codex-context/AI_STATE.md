# AI_STATE

Last Updated: 2026-11-02

## Current Goal
做极增科技 / 极增商界的产品展示官网（website/），参考 51WORLD 官网布局，四款产品：企业分析报告、经营工作台（已确定），AI 人才测评、超级个体（占位）。

## Snapshot
- 定位已变（2026-11-01）：公司名“极增科技”，内容/报告品牌“极增商界”。主客户为 100–150 人中型企业；不再做面向顾问的 OPC 工作台。
- 产品路线：1) 展示网站 → 2) AI 辅助企业分析报告（问卷 + AI 起草 + 顾问审校，三档：免费简版/标准报告/深度诊断，价格待定）→ 3) 经营工作台（AI 专家/Skill/连接器）。
- website/：纯静态官网 6 页（index、report、workbench、talent、studio、credits），v3 版式与按钮直接参考 51WORLD（纯黑、粗体大字、居中标题、小实心发光按钮），不要卡片/图标/描边标签；素材来自 Pexels/Mixkit（见 website/credits.html）。
- 部署：尚未部署。用户 Admin 电脑和 ROG16 笔记本均已加 SSH 公钥到 VPS；Admin 上 Claude Code 自动权限拦截 scp，需用户自己跑 scp/ssh 或放开权限。
- site/：旧的 OPC 工作台原型，已过时，保留作参考。
- 部署：计划阿里云（大陆服务器需 ICP 备案 1–3 周）；支付（微信/支付宝）与表单后台均为占位。

## Last Run
- result: 新增 website/ 官网（首屏视频轮播、产品平台竖卡、生命周期路线图、极增商界卡片、联系我们条），两个确定产品有详情页，两个占位产品有预约页。
- proof: Playwright 在 1440 和 390 宽度截图检查 6 页，无横向滚动、无 JS 报错。
- risks: 联系方式、价格、报告样张分数均为示意；首屏 hero.mp4 为竖版，仅手机端播放，桌面端用天际线图片。
- rollback_point: 本次提交前的 claude/project-thread-cekjgr 分支头。
- next_step: 见 TODO.md。
