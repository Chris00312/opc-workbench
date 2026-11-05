# AI_STATE

Last Updated: 2026-11-05

## Current Goal
产品 1「AI 企业分析报告」阶段 1a：题库 v1 + 公开信息预诊断流水线（技术方案已定，见 TECH_SPEC.md）。

## Snapshot
- 定位（2026-11-01 定，取代此前的 OPC 顾问工作台）：公司“极增科技”，内容/报告品牌“极增商界”；整体定位综合（从一人公司到上市公司）；只有企业分析报告面向中型企业起步、含上市公司（2026-11-05），工作台面向小公司到成长型企业，超级个体面向一人公司/自媒体/个人顾问（第二产品线，后做）。
- 产品路线：1) 展示官网 → 2) AI 辅助企业分析报告（公开信息预诊断 / 标准报告 / 深度诊断，价格待定；网页系统 + 结构化报告编辑器）→ 3) 经营工作台（主动型 AI 经营秘书，内置企微/钉钉 + 投屏网页工作台，见 WORKBENCH_SPEC.md；官网仍是旧的「AI 专家矩阵」写法）。
- 方法论内核：增长极方法论（前身「创越企业增长极」，版权已确认可用），见 docs/增长极方法论.md。
- website/：纯静态官网 6 页，版式参考 51WORLD（纯黑、粗体大字、小实心发光按钮），Logo 已定稿“双峰”。素材 Pexels/Mixkit，见 website/credits.html。
- site/：旧 OPC 工作台原型（7 页，含 10-27 的增长体检页与 growth-model.js），已过时，保留作参考；其中的增长体检与方法论数据可复用到产品 1 的问卷。
- brand/：品牌标识导出（SVG + PNG + app 图标）；prototype/：4 组场景原型稿；growthhubs-archive/：旧站文字存档。
- 部署（2026-11-04）：website/ 已上线，过渡域名 http://talentchain.net 与 www（该域名已在阿里云接入备案，@/www A 记录改指新服务器，MX 企业邮箱记录未动；原指向 121.199.62.207 的只是 404 页）。growthhub.cn 与 www 已加 A 记录，但域名被阿里云备案拦截（阿里云只接入了 talentchain.net，growthhub.cn 需在阿里云新增/接入备案，需正式服务器的备案服务码）。win-acme 已装在 C:\srv\wacs，等备案后申请证书。服务器是阿里云 ECS 试用机（华东1，Windows Server 2022，试用到 2027-02-04），nginx for Windows 装在 C:\srv，开机计划任务自启；SSH 用本机 ~/.ssh/jizeng_deploy 登录 administrator。视频已压缩（10MB→2.7MB），开了 gzip 和 /assets/ 7 天缓存。尚无 HTTPS。正式服务器（轻量 79 元/年，Debian 12）买好后迁移。

## Latest Run
- result: 经营工作台产品方案 v0.1（讨论稿）：主动型 AI 经营秘书（企微/钉钉内置应用）+ 投屏网页工作台；AI 前台、顾问后台；主动程度四级与防打扰；接入与安装可行性；版本与建议价格区间；经贸公司试点计划。产出 docs/产品规划/经营工作台-产品方案.docx（13 页，6 张图）与 .codex-context/WORKBENCH_SPEC.md。
- proof: LibreOffice 渲染 13 页检查排版；配图逐张检查无溢出。
- risks: 平台接口细节（发送频率、卡片参数）未实测；价格为建议区间；开发人力与报告产品冲突，排期待老板定。
- rollback_point: 4c2942f
- next_step: 等老板确认工作台方案 8 个待定事项与技术方案 4 个待定事项；现阶段只出方案、不动手开发，用户说开始再做报告 1a。
