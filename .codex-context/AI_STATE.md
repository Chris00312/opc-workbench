# AI_STATE

Last Updated: 2026-11-05

## Current Goal
产品 1「AI 企业分析报告」阶段 1a：题库 v1 + 公开信息预诊断流水线（技术方案已定，见 TECH_SPEC.md）。

## Snapshot
- 定位（2026-11-01 定，取代此前的 OPC 顾问工作台）：公司“极增科技”，内容/报告品牌“极增商界”；整体定位综合（从一人公司到上市公司）；只有企业分析报告面向中型企业起步、含上市公司（2026-11-05），工作台面向小公司到成长型企业，超级个体面向一人公司/自媒体/个人顾问（第二产品线，后做）。
- 产品路线：1) 展示官网 → 2) AI 辅助企业分析报告（公开信息预诊断 / 标准报告 / 深度诊断，价格待定；网页系统 + 结构化报告编辑器）→ 3) 经营工作台（AI 专家 / 增长 Skill / 连接器）。
- 方法论内核：增长极方法论（前身「创越企业增长极」，版权已确认可用），见 docs/增长极方法论.md。
- website/：纯静态官网 6 页，版式参考 51WORLD（纯黑、粗体大字、小实心发光按钮），Logo 已定稿“双峰”。素材 Pexels/Mixkit，见 website/credits.html。
- site/：旧 OPC 工作台原型（7 页，含 10-27 的增长体检页与 growth-model.js），已过时，保留作参考；其中的增长体检与方法论数据可复用到产品 1 的问卷。
- brand/：品牌标识导出（SVG + PNG + app 图标）；prototype/：4 组场景原型稿；growthhubs-archive/：旧站文字存档。
- 部署（2026-11-04）：website/ 已上线，过渡域名 http://talentchain.net 与 www（该域名已在阿里云接入备案，@/www A 记录改指新服务器，MX 企业邮箱记录未动；原指向 121.199.62.207 的只是 404 页）。growthhub.cn 与 www 已加 A 记录，但域名被阿里云备案拦截（阿里云只接入了 talentchain.net，growthhub.cn 需在阿里云新增/接入备案，需正式服务器的备案服务码）。win-acme 已装在 C:\srv\wacs，等备案后申请证书。服务器是阿里云 ECS 试用机（华东1，Windows Server 2022，试用到 2027-02-04），nginx for Windows 装在 C:\srv，开机计划任务自启；SSH 用本机 ~/.ssh/jizeng_deploy 登录 administrator。视频已压缩（10MB→2.7MB），开了 gzip 和 /assets/ 7 天缓存。尚无 HTTPS。正式服务器（轻量 79 元/年，Debian 12）买好后迁移。

## Latest Run
- result: 软件技术方案 v0.1 定稿：网页系统；Python/FastAPI + PostgreSQL + Vue 3；结构化报告编辑器（TipTap）；Docker Compose 云端/本地两种部署；阶段 1a（Mac 命令行出 PDF）→ 1b（编辑器 + 服务器）→ 2（问卷/上传/转写）。产出 docs/产品规划/AI企业分析报告-技术方案.docx（11 页，5 张图）与 .codex-context/TECH_SPEC.md；docgen 抽出公共 lib.js。
- proof: LibreOffice 渲染 11 页逐页检查；产品方案脚本改用 lib.js 后 document.xml 与原文件逐字节一致。
- risks: 待老板确认 4 个事项（在线审校时间、Word 导出时机、试跑公司、数据接口预算）；价格未定。
- rollback_point: 987ac11
- next_step: 用户 2026-11-05 要求：现阶段只出方案、不动手开发。当前在构思经营工作台的产品形态；报告产品的 1a 开发等用户说开始再做。
