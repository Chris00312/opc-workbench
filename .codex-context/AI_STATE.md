# AI_STATE

Last Updated: 2026-11-05

## Current Goal
产品 1「AI 企业分析报告」阶段 1a（题库 v1 + 公开信息预诊断流水线）；先与用户讨论软件开发技术方案。

## Snapshot
- 定位（2026-11-01 定，取代此前的 OPC 顾问工作台）：公司“极增科技”，内容/报告品牌“极增商界”；整体定位综合（从一人公司到上市公司）；只有企业分析报告面向中型企业起步、含上市公司（2026-11-05），工作台面向小公司到成长型企业，超级个体面向一人公司/自媒体/个人顾问（第二产品线，后做）。
- 产品路线：1) 展示官网 → 2) AI 辅助企业分析报告（问卷 + AI 起草 + 顾问审校；免费简版 / 标准报告 / 深度诊断，价格待定）→ 3) 经营工作台（AI 专家 / 增长 Skill / 连接器）。
- 方法论内核：增长极方法论（前身「创越企业增长极」，版权已确认可用），见 docs/增长极方法论.md。
- website/：纯静态官网 6 页，版式参考 51WORLD（纯黑、粗体大字、小实心发光按钮），Logo 已定稿“双峰”。素材 Pexels/Mixkit，见 website/credits.html。
- site/：旧 OPC 工作台原型（7 页，含 10-27 的增长体检页与 growth-model.js），已过时，保留作参考；其中的增长体检与方法论数据可复用到产品 1 的问卷。
- brand/：品牌标识导出（SVG + PNG + app 图标）；prototype/：4 组场景原型稿；growthhubs-archive/：旧站文字存档。
- 部署（2026-11-04）：website/ 已上线，过渡域名 http://talentchain.net 与 www（该域名已在阿里云接入备案，@/www A 记录改指新服务器，MX 企业邮箱记录未动；原指向 121.199.62.207 的只是 404 页）。growthhub.cn 与 www 已加 A 记录，但域名被阿里云备案拦截（阿里云只接入了 talentchain.net，growthhub.cn 需在阿里云新增/接入备案，需正式服务器的备案服务码）。win-acme 已装在 C:\srv\wacs，等备案后申请证书。服务器是阿里云 ECS 试用机（华东1，Windows Server 2022，试用到 2027-02-04），nginx for Windows 装在 C:\srv，开机计划任务自启；SSH 用本机 ~/.ssh/jizeng_deploy 登录 administrator。视频已压缩（10MB→2.7MB），开了 gzip 和 /assets/ 7 天缓存。尚无 HTTPS。正式服务器（轻量 79 元/年，Debian 12）买好后迁移。

## Latest Run
- result: 目标客户改为中型起步含上市公司；方案 docx 重写为 v0.2（14 页：服务分层、问卷减负、质量标准、保密、新路线），REPORT_SPEC/PRODUCT/HANDOFF/TODO 同步；官网 report/index/main.js/workbench 文案按新定位修改（三档改为预诊断/标准/深度，八域换成报告八域并用奥托立夫真实分数）；随后按用户更正把首页、页脚、工作台、超级个体改回综合定位，只有报告写中型与上市公司。已部署上线。
- proof: LibreOffice 渲染 docx 14 页逐页检查；官网本地预览 report.html 无控制台错误。
- risks: 价格未定；技术方案未定。（官网改动已于 2026-11-05 部署上线，服务器备份 C:\srv\www-backup-20261105.zip）
- rollback_point: 849c7fa
- next_step: 讨论软件开发技术方案。
