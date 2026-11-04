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
