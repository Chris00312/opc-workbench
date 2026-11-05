# AI_STATE

Last Updated: 2026-11-05

## Current Goal
开发产品 1「AI 企业分析报告」：方案已定（docs/产品规划/），下一步 M0 题库 v1。

## Snapshot
- 定位（2026-11-01 定，取代此前的 OPC 顾问工作台）：公司“极增科技”，内容/报告品牌“极增商界”；主客户 100–150 人成长型企业。个人顾问/小机构订阅版（超级个体）是第二产品线，后做。
- 产品路线：1) 展示官网 → 2) AI 辅助企业分析报告（问卷 + AI 起草 + 顾问审校；免费简版 / 标准报告 / 深度诊断，价格待定）→ 3) 经营工作台（AI 专家 / 增长 Skill / 连接器）。
- 方法论内核：增长极方法论（前身「创越企业增长极」，版权已确认可用），见 docs/增长极方法论.md。
- website/：纯静态官网 6 页，版式参考 51WORLD（纯黑、粗体大字、小实心发光按钮），Logo 已定稿“双峰”。素材 Pexels/Mixkit，见 website/credits.html。
- site/：旧 OPC 工作台原型（7 页，含 10-27 的增长体检页与 growth-model.js），已过时，保留作参考；其中的增长体检与方法论数据可复用到产品 1 的问卷。
- brand/：品牌标识导出（SVG + PNG + app 图标）；prototype/：4 组场景原型稿；growthhubs-archive/：旧站文字存档。
- 部署（2026-11-04）：website/ 已上线，过渡域名 http://talentchain.net 与 www（该域名已在阿里云接入备案，@/www A 记录改指新服务器，MX 企业邮箱记录未动；原指向 121.199.62.207 的只是 404 页）。growthhub.cn 与 www 已加 A 记录，但域名被阿里云备案拦截（阿里云只接入了 talentchain.net，growthhub.cn 需在阿里云新增/接入备案，需正式服务器的备案服务码）。win-acme 已装在 C:\srv\wacs，等备案后申请证书。服务器是阿里云 ECS 试用机（华东1，Windows Server 2022，试用到 2027-02-04），nginx for Windows 装在 C:\srv，开机计划任务自启；SSH 用本机 ~/.ssh/jizeng_deploy 登录 administrator。视频已压缩（10MB→2.7MB），开了 gzip 和 /assets/ 7 天缓存。尚无 HTTPS。正式服务器（轻量 79 元/年，Debian 12）买好后迁移。

## Latest Run
- result: 读完奥托立夫样例（23 页），与用户确认 6 个关键问题后写出产品方案 docs/产品规划/AI企业分析报告-产品方案.docx（Word 图文版，15 页） 和规格 .codex-context/REPORT_SPEC.md；样例 PDF 复制到 docs/产品规划/样例/。
- proof: 规格里列出样例的全部 24 题、32 项、判定区间和评分示例（105/120、八域 S 均 3.78），可作为 M0 校验基准。
- risks: 题库评分标准是反推的，待校准；四象限阈值、置信度规则为暂定。
- rollback_point: 54e8f78
- next_step: M0 题库 v1（见 TODO.md）。
