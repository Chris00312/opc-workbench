# VIBELOG

## 2026-10-08
- Done: 商业计划书通俗解读；6 页 UI 原型，改为 Stripe 后台风格。
- Next: 部署到用户服务器。

## 2026-10-14
- Done: deploy.sh（nginx + Debian 归档源兜底）与部署说明。
- Risks: 需要用户自己在服务商后台放行 80 端口。

## 2026-10-25
- Done: 建立 Git 仓库，加入 README、scripts/pack.sh、dev-memory-os 状态文件；文档中的服务器信息替换为占位符。
- Proof: pack.sh 生成的包与原部署包文件列表一致；搜索无敏感信息。
- Rollback: 首次提交。
- Next: 设计撮合平台页面。

## 2026-10-27
- Done: 新增增长体检页（五力自评、雷达图、推荐增长系统、生成需求单）；诊断页匹配增长系统并标出命中要素；方案页模板随增长系统变化；修复方案页按钮样式冲突。
- Proof: Playwright 截图 5 个页面，无控制台错误；375px 宽无横向滚动。
- Risks: 方法论版权待确认；体检题目未经顾问校准。
- Rollback: b6f258c。
- Next: 方法论知识库页、撮合平台。
- Decision: 方法论版权确认；产品形态定为 AI 增长诊断先行、订阅卖给企业；诊断方案文档已起草。

## 2026-11-01
- Done: 新增 website/ 极增科技官网（参考 51WORLD 布局，深色 + 青绿），四款产品（报告、工作台详情页；人才测评、超级个体占位页），素材 Pexels/Mixkit 本地托管并列出来源。
- Proof: Playwright 1440/390 截图检查 6 页，无横向滚动、无 JS 报错。
- Risks: 价格、联系方式、样张分数为示意；支付与表单未接后台；大陆服务器需 ICP 备案。
- Rollback: 回退本次提交即可（website/ 为新增目录）。
- Next: 用户确认 → 阿里云部署 → 产品 1 问卷与报告生成。

## 2026-11-02
- Done: 官网 v3 改版，按钮与版式直接参考 51WORLD：纯黑底、60px 黑色导航（加粗菜单 + 下拉大面板）、首屏视频轮播 + 小号实心发光按钮、使命区地平线辉光、理念双大图、产品平台竖版满版卡、增长路线图、极增商界卡片 + 方形箭头、联系我们条 + 页脚。去掉了卡片描边、图标、描边标签、渐变字等“AI 模板感”元素；产品页改为左右图文大段。
- Proof: Playwright 1440/390 截图 6 页，无横向滚动、无 JS 报错。
- Risks: 部署暂停（用户换电脑后再做；Admin 电脑已配 SSH 公钥，但该电脑上的 Claude Code 权限不允许 scp）。
- Next: 用户看预览确认 → 部署。

## 2026-11-03
- Done: 导航直接罗列四款产品 + 极增商界（参考 51WORLD 一级菜单即产品线），每项悬停出下拉；1100px 以下收进汉堡菜单。
- Next: 用户确认 → 部署。
- Done: Logo 定稿为“双峰”（白色峰 + 青绿渐变峰，叠合处深绿），website/assets/brand/ 放 SVG（标志、横版、favicon）；导航、页脚、首屏和浏览器图标已替换。导出文件在项目文件 brand/。

## 2026-11-04 — 建立 Mac 本地工作区

**What changed:**
- 在 /Users/c/Documents/极増科技本地 从项目 bundle 克隆仓库，origin 指向 GitHub
- 新增 brand/、prototype/（4 组原型稿）、growthhubs-archive/；deploy/*.tar.gz 本地保留但不入库
- 未复制含真实服务器信息的部署说明、与 docs/ 重复的计划书解读、11 月 1 日音视频
- 状态文件更新：AI_STATE、INDEX、TODO、HANDOFF，新建 DESIGN_SYSTEM

**Why:** 之后在本地 Mac 上继续开发，资料集中在一个仓库。

**Next:** 校正系统时间 → git fetch 核对 → 提交推送。

Risks: Mac 时钟慢约一周导致 HTTPS 失败；bundle 可能落后于 GitHub。
Rollback: b6f258c

## 2026-11-04 — 合并三条开发线
- Done: 把 claude/project-thread-fp97ce（10-27 增长体检）和 claude/project-thread-cekjgr（11-01~03 极增官网 website/、双峰 Logo）合并进 main；AI_STATE、TODO、HANDOFF、INDEX、PRODUCT、README 按最新定位（极增科技，面向中型企业）整合。
- Proof: 代码文件自动合并无冲突；deploy/jizeng-site.tar.gz 与 website/ 逐文件一致；本地预览 site/ 与 website/ 无控制台报错。
- Rollback: 25c3e2e。
- Next: 用户确认官网 → 阿里云部署 → 产品 1 问卷与报告。

## 2026-11-04 — 官网上线 growthhub.cn
- Done: 阿里云 ECS 试用机（Windows Server 2022，换不了系统）上用云助手开启 OpenSSH，装 nginx for Windows，部署 website/；视频重新编码 10MB→2.7MB；gzip + 静态资源缓存；DNS 添加 @、www 两条 A 记录。
- Proof: 阿里 DoH 查询两个域名均解析到服务器；IP 访问返回首页 200。
- 更正：几分钟后域名访问被阿里云拦截（403 Non-compliance ICP Filing）。阿里云备案账号里只接入了 talentchain.net（沪ICP备11027906号-2），growthhub.cn 未在阿里云接入备案；Let's Encrypt 验证因此失败，HTTPS 未配成。
- Risks: 试用机 2027-02-04 到期；Windows 环境与正式 Debian 不同；暂无 HTTPS。
- Next: 买正式服务器拿备案服务码 → 在阿里云新增/接入 growthhub.cn 备案 → HTTPS → 关旧服务器。

## 2026-11-04 — 过渡域名 talentchain.net
- Done: talentchain.net（已在阿里云接入备案）@ 和 www 改指向新服务器；nginx server_name 加上 talentchain.net。
- Proof: 连续 5 分钟每 30 秒访问一次未被拦截；首页、report、workbench、视频、CSS 均 200；公共 DNS 上 www 已生效，@ 旧缓存 1 小时内过期。
- Risks: 品牌域名不一致，仅作过渡；nginx 以 SYSTEM 运行，管理员会话里 `nginx -s reload` 无权限，改配置要重启计划任务。

## 2026-11-05 — AI 企业分析报告方案
- Done: 读完奥托立夫样例；确认题库反推、通用生命周期版、首期简版+标准版、内部审校、八域以报告为准、四类数据源、DeepSeek→百炼（本地 27B 待评测）；写产品方案（docs/产品规划/）与 REPORT_SPEC。
- Proof: 规格含样例全部题项与分数，可用于 M0 回填校验。
- Risks: 评分锚点为反推；象限阈值与置信度规则暂定。
- Rollback: 54e8f78。
- Next: M0 题库 v1。

## 2026-11-05 — 方案改为 Word 图文版
- Done: 按用户要求，给人看的方案改为 docx（15 页，6 张配图 + 4 页样例截图），删除 md 版；生成脚本放入 scripts/docgen/。用户确认 Qwen3.8-27B 开源可商用。
- Proof: LibreOffice 渲染 15 页逐页检查，无跨页断裂的提示框、无孤行。
- Next: M0 题库 v1。

## 2026-11-05 — 目标客户上移，方案 v0.2 与官网同步
- Done: 目标客户改为中型起步含上市公司；方案 docx 重写为 v0.2（预诊断先行、问卷减负、质量标准、保密前置、新路线）；REPORT_SPEC 等状态文件同步；官网文案改为预诊断/标准报告/深度诊断三档，八域与报告一致，样张用奥托立夫真实分数。
- Proof: docx 渲染 14 页检查；report.html 本地预览正常。
- Risks: 官网改动未部署；价格、技术方案未定。
- Rollback: 849c7fa。
- Next: 讨论软件开发技术方案。

## 2026-11-05 — 官网新定位版部署上线
- Done: 打包 website/（不含视频，服务器上保留已压缩视频）上传试用 ECS 并解压覆盖到 C:\srv\www；覆盖前把旧 html/js/css 备份到 C:\srv\www-backup-20261105.zip。
- Proof: 经服务器 IP 访问 talentchain.net / www，index/report/workbench/main.js/style.css 均 200 且与本地文件逐字节一致；视频 200。
- Note: 本机走 127.0.0.1:7897 代理时 DNS 不通，验证需 `curl --noproxy '*' --resolve talentchain.net:80:47.111.38.66`。
- Rollback: 服务器上解压 www-backup-20261105.zip 覆盖回去。

## 2026-11-05 官网定位改回综合，只有报告面向中型企业
- Done: 用户指出只有企业分析报告面向中型企业与上市公司。首页 title/meta/首屏/使命/理念/产品卡/路线图/资讯、页脚、工作台页、超级个体页、导航描述、预约表单规模选项（加个人/一人公司、50 人以下、50–300 人）改为综合或各自的目标客户；PRODUCT/DECISIONS/AI_STATE 同步。
- Proof: 本地预览桌面与手机宽度无横向滚动、无报错；部署后线上 index/report/workbench/studio/main.js 与本地一致。
- Rollback: 216808d（服务器上可再次上传旧包覆盖）。

## 2026-11-05 软件技术方案 v0.1
- Done: 与用户确认：网页系统、AI 辅助开发、Python 后端、默认阿里云可选本地、结构化报告编辑器（一人编辑他人批注）、客户收 PDF、阶段 2 前买服务器。写 TECH_SPEC.md 与技术方案 docx（架构、流水线、编辑器示意、部署、排期、费用、风险）；REPORT_SPEC §9 指向 TECH_SPEC。docgen 抽出 lib.js 共用。
- Proof: docx 11 页渲染检查；build-report-plan.js 重构后输出不变。
- Next: 阶段 1a 开发。

## 2026-11-05 经营工作台产品方案 v0.1
- Done: 与用户讨论工作台形态（客户在哪用、行业不熟、AI 要让客户看得见、参考 Muse 的主动型 AI、企微/钉钉可行性与安装难度），写成 WORKBENCH_SPEC.md 与 Word 方案（13 页：形态图、一个月节奏、企微对话示意、经营会投屏示意、主动四级、安装初始化），示例为虚构经贸公司。
- Proof: LibreOffice 渲染 13 页检查。
- Risks: 平台接口未实测；价格为建议区间。
- Next: 老板确认待定事项。

## 2026-11-06 对照老板商业计划书（202611 版）
- Done: 读计划书，映射到现有产品（报告+工作台 = 数据化增长方案；经营秘书归极增智脑；人才测评不在计划内）；用户确认一人公司为主、报告作现金流、人才测评暂停、先做工作台。写入 PRODUCT/DECISIONS/TODO/AI_STATE。
- Next: 定工作台第一版服务对象，出官网重排方案。

## 2026-11-06 官网与三份方案按老板计划书改版
- Done: 官网重排为极增商界（一人公司为主），新增极增智脑/增长方案/培训活动/商界洞察页，重写首页与工作台页，人才测评与超级个体改为跳转；工作台方案 v0.2（一人公司版、定位映射、待定方案比较、新价格与试点）；报告方案 v0.3、技术方案 v0.2 更新归属与排期；SPEC 文件同步。
- Proof: 本地 http 预览 375 宽度各页无横向滚动、无控制台错误、导航高亮正确；1440 宽度截图检查；三份 docx 经 LibreOffice 渲染检查（16/15/11 页）。
- Risks: 官网改动未部署；工作台待定事项待老板决定。
- Next: 部署官网；老板确认工作台待定事项。

## 2026-11-06 官网改版部署上线
- Done: 先在服务器备份旧版 html/js/css 到 C:\srv\www-backup-20261106.zip，再上传 website/（不含视频）解压覆盖。
- Proof: 经服务器 IP 访问 talentchain.net 的 10 个页面与 main.js、style.css 均与本地逐字节一致；www 与视频 200。
- Rollback: 服务器上解压 www-backup-20261106.zip 覆盖回 C:\srv\www（新增的 zhinao/solution/academy/insights 需手动删除）。

## 2026-11-09 宣传口径改为「AI 赋能企业提效平台」
- Done: 官网 7 个文件去掉一人公司 / OPC 表述并改写首屏、使命、痛点、路线图、产品卡顺序、三档名称、表单规模；工作台方案 v0.3（建议先做团队版，老板版补充）、报告方案 v0.4；PRODUCT/DECISIONS/SPEC/AI_STATE/TODO 同步。临时目录被清空，重建 docx 环境与全部配图（与上一版一致）。
- Proof: 本地预览抓取各页无相关字样；docx 渲染检查。
- Next: 部署官网。

## 2026-11-09 口径调整版官网部署
- Done: 服务器先备份旧版 html/js/css 到 C:\srv\www-backup-20261109.zip，再上传 website/（不含视频）解压覆盖。
- Proof: 经服务器 IP 访问 12 个文件与本地逐字节一致；首页标题为「极增商界 — AI 赋能企业提效平台」；www 与视频 200。
- Rollback: 服务器上解压 www-backup-20261109.zip 覆盖回 C:\srv\www。
