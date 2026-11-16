# AI_STATE

Last Updated: 2026-11-16

## Current Goal
以《产品与功能模块（完整版）V1.0》为基准，结合 2026-11-15 会议纪要与 2026-11-16 首页视觉及字标升级完成官网调整并同步上线（`20261116b`）：品牌统一为 `Growth Hub / 企业增长赋能平台`，主办主体全面对齐备案主体 `上海领越人力资源服务中心`，一级导航按 7 项配置，首页首屏移除 `.hero-stats` 并居中下调垂直重心，全站导航与页脚 Logo 升级为 AI 生成精修的「Growth Hub」双色去背字标（V1）。

## Snapshot
- 定位：Growth Hub 企业增长赋能平台 — 面向一人公司（OPC）与成长期中小企业的 AI 驱动企业增长赋能平台，由 `上海领越人力资源服务中心` 主办运营（全站弱化极增科技）。
- 导航结构（一级 7 项，全配下拉，主标题用简称、下拉写全称）：`首页`、`极增商界`、`极增智脑`（纯标题，下拉收纳 `增长顾问 · 经营工作台` 与 `AI 增长赋能工具（九大工具集）`）、`培训活动`（对应 `增长培训服务` 与 `主题交流与研讨会`）、`增长咨询`、`数据方案`、`关于我们`（收纳联系我们、人才招募、商务合作、渠道发展）。
- 六大产品与工作台边界：`增长顾问 · 经营工作台`（`workbench.html`）隶属 `极增智脑` 产品模块；`增长咨询服务`（`consulting.html`）为独立第六大模块；`AI 增长赋能工具`（`tools.html`）收录九大核心业务工具集并归于 `极增智脑` 下拉与首页入口。
- 合规与清理：移除全部备案敏感词（论坛、快讯、投顾、投资对接）；清除所有非 V1.0 文档遗留内容（奥托立夫/Autoliv、六维 24 题、八域 32 项、增长极方法论、企业研究等，`report.html` 与 `research.html` 改为跳转页）；联系方式保留 `待补充`。
- 首屏交互与标识：4 屏核心轮播（`01 平台总览`、`02 内容与培训`、`03 智脑与工具`、`04 方案与咨询`）+ 底部文字进度条交互；已移除第 1 屏 `.hero-stats` 指标条并将首屏正文居中略偏下排布；左上角及页脚「Growth Hub」采用 AI 生成并经透明去背与双色适配精修的文字 Logo（`logo-wordmark-light.png` / `logo-wordmark-dark.png`，V1 宽肩圆方科技折叠风，另备 V2–V5 四版待选）；替换 `img-08.jpg` 为现代办公与数据可视化 AI 配图（`?v=20261115b`）。
- website/：11 个主要静态页面（`index`、`insights`、`zhinao`、`workbench`、`academy`、`consulting`、`solution`、`tools`、`about`、`contact`、`credits`）+ 4 个跳转页（`report`、`research`、`studio`、`talent`），原生 HTML/CSS/JS；`assets/brand/` 新增 `logo-wordmark-light.png` / `logo-wordmark-dark.png`。
- 核心软件尚未开发：无 `server/`、`web/` 应用骨架；后续按 MVP「内容—诊断—转化」推进，评估阿里云 1300 元/年服务器与外部大模型 API 调用。
- 部署：现有阿里云 Windows ECS + nginx，站点 `C:\srv\www`；域名 `https://talentchain.net` 与 `www`，已有 HTTPS 自动续期；`/icp/` 上传页与 `icp-upload` 服务完整保留。

## Latest Run
- result: 官网完成首页首屏精简居中（移除 `.hero-stats`、下移垂直排布）与 AI 生成去背「Growth Hub」文字 Logo（浅色导航与深色页脚双版）上线，同步更新 `?v=20261116b`、`credits`、`.codex-context/` 与 `VIBELOG.md`。
- proof: `node --check website/assets/js/main.js` 通过；内链与锚点检查（132 条引用）0 错误；Playwright Chrome 11 页 × `1440×900`、`1280×800`、`375×812` 检查 0 横向溢出、0 控制台/400+ 错误、`logo-wordmark` 双版加载完成（`naturalWidth=701`）；线上 HTTPS 取回全部更新文件 SHA-256 与本地一致，双版文字 Logo、`/icp/`、`www`、`hero.mp4` 均 HTTP 200。
- risks: 联系方式与公众号/视频号二维码仍为 `待补充`/占位，表单与支付仍为前端演示，待正式服务器与后台开发接入。
- rollback_point: 服务器备份 `C:\srv\www-backup-20261115a.zip`（覆盖 `C:\srv\www` 即可回退）。
- next_step: 待补充真实电话/邮箱/办公地址、购买正式备案服务器完成备案申请，启动 MVP 后台与支付/安全限流开发。
