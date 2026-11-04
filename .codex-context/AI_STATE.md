# AI_STATE

Last Updated: 2026-11-04

## Current Goal
三条开发线已合并到 main（10-27 增长体检、11-01~03 极增官网、11-04 本地资料）。主线是 website/ 极增科技官网：待用户确认设计和文案后部署到阿里云。

## Snapshot
- 定位（2026-11-01 定，取代此前的 OPC 顾问工作台）：公司“极增科技”，内容/报告品牌“极增商界”；主客户 100–150 人成长型企业。个人顾问/小机构订阅版（超级个体）是第二产品线，后做。
- 产品路线：1) 展示官网 → 2) AI 辅助企业分析报告（问卷 + AI 起草 + 顾问审校；免费简版 / 标准报告 / 深度诊断，价格待定）→ 3) 经营工作台（AI 专家 / 增长 Skill / 连接器）。
- 方法论内核：增长极方法论（前身「创越企业增长极」，版权已确认可用），见 docs/增长极方法论.md。
- website/：纯静态官网 6 页，版式参考 51WORLD（纯黑、粗体大字、小实心发光按钮），Logo 已定稿“双峰”。素材 Pexels/Mixkit，见 website/credits.html。
- site/：旧 OPC 工作台原型（7 页，含 10-27 的增长体检页与 growth-model.js），已过时，保留作参考；其中的增长体检与方法论数据可复用到产品 1 的问卷。
- brand/：品牌标识导出（SVG + PNG + app 图标）；prototype/：4 组场景原型稿；growthhubs-archive/：旧站文字存档。
- 部署：尚未部署。计划阿里云（大陆服务器需 ICP 备案 1–3 周）；`SITE_DIR=website bash deploy.sh`。支付与表单均为占位。

## Last Run
- result: 合并 origin/claude/project-thread-fp97ce 与 origin/claude/project-thread-cekjgr 到本地 main，状态文件按时间线整合。
- proof: 代码文件全部自动合并，冲突只在状态文件 / README；本地 deploy/jizeng-site.tar.gz 与分支里的 website/ 逐文件一致；本地预览 site/ 与 website/ 页面可打开。
- risks: 联系方式、价格、报告样张分数为示意；增长体检题目未经顾问校准。
- rollback_point: 25c3e2e（合并前的本地 main）。
- next_step: 见 TODO.md。
