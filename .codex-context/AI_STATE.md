# AI_STATE

Last Updated: 2026-11-16

## Current Goal
以《产品与功能模块（完整版）V1.0》为基准，结合 2026-11-16 阿里云 ICP 备案合规核查要求完成官网主体名称与文案调整并同步上线（`20261116c`）：主办主体统一更正为执照法定全称 `上海领越人力资源咨询服务中心`，页脚与联系页补齐公开电话/邮箱/注册地址，规避未获许可的公开「培训/课程/发证」表述（改以 `研习活动 / 管理咨询工作坊 / 企业内训` 呈现），并起草《growthhub.cn 网站建设与组网方案书》（临时目录，不入库）。

## Snapshot
- 定位：Growth Hub 企业增长赋能平台 — 面向一人公司（OPC）与成长期中小企业的 AI 驱动企业增长赋能平台，由 `上海领越人力资源咨询服务中心` 主办运营。
- 导航结构（一级 7 项，全配下拉，主标题用简称、下拉写全称）：`首页`、`极增商界`、`极增智脑`（纯标题，下拉收纳 `增长顾问 · 经营工作台` 与 `AI 增长赋能工具（九大工具集）`）、`研习活动`（对应 `管理咨询研习` 与 `主题交流与研讨会`）、`增长咨询`、`数据方案`、`关于我们`（收纳联系我们、人才招募、商务合作、渠道发展）。
- 六大产品与工作台边界：`增长顾问 · 经营工作台`（`workbench.html`）隶属 `极增智脑` 产品模块；`增长咨询服务`（`consulting.html`）为独立第六大模块；`AI 增长赋能工具`（`tools.html`）收录九大核心业务工具集并归于 `极增智脑` 下拉与首页入口。
- 合规与清理：移除全部备案敏感词（论坛、快讯、投顾、投资对接、公开培训/课程/公开课/训练营等）；清除所有非 V1.0 文档遗留内容；全站联系方式统一更新为 `021-57876227` / `johnsuncq@aliyun.com` / 注册住所。
- 首屏交互与标识：4 屏核心轮播（`01 平台总览`、`02 研习与活动`、`03 智脑与工具`、`04 方案与咨询`）+ 底部文字进度条交互；已移除第 1 屏 `.hero-stats` 指标条并将首屏正文居中略偏下排布；左上角及页脚「Growth Hub」采用 AI 生成并经透明去背与双色适配精修的文字 Logo（`logo-wordmark-light.png` / `logo-wordmark-dark.png`，V1 宽肩圆方科技折叠风）；替换 `img-08.jpg` 为现代办公与数据可视化 AI 配图（`?v=20261115b`）。
- website/：11 个主要静态页面（`index`、`insights`、`zhinao`、`workbench`、`academy`、`consulting`、`solution`、`tools`、`about`、`contact`、`credits`）+ 4 个跳转页（`report`、`research`、`studio`、`talent`），原生 HTML/CSS/JS；`assets/brand/` 新增 `logo-wordmark-light.png` / `logo-wordmark-dark.png`。
- 核心软件尚未开发：无 `server/`、`web/` 应用骨架；后续按 MVP「内容—诊断—转化」推进，正式阿里云 ECS 推荐 `2 vCPU / 4 GiB`（华东 2 上海 / 华东 1 杭州）。
- 部署：现有阿里云 Windows ECS + nginx，站点 `C:\srv\www`；域名 `https://talentchain.net` 与 `www`，已有 HTTPS 自动续期；`/icp/` 上传页与 `icp-upload` 服务完整保留。

## Latest Run
- result: 官网完成上海领越人力资源咨询服务中心主体全称更正、联系方式补齐与「研习活动」合规调整（版本 `20261116c`），已部署上线并推送 GitHub，同时已出具可打印签章的《growthhub.cn 网站建设与组网方案书》（Word + PDF）。
- proof: `node --check website/assets/js/main.js` 通过；全站合规词 grep（原错误主体名/培训/课程/公开课/待补充等）0 命中；Playwright Chrome 11 页 × `1440×900`、`1280×800`、`375×812` 检查 0 横向溢出、0 控制台/400+ 错误；线上 HTTPS 取回全部更新文件 SHA-256 与本地一致。
- risks: 联系方式与公众号/视频号二维码仍为 `待补充`/占位，表单与支付仍为前端演示，待正式服务器与后台开发接入。
- rollback_point: 服务器备份 `C:\srv\www-backup-20261115a.zip`（覆盖 `C:\srv\www` 即可回退）。
- next_step: 待补充真实电话/邮箱/办公地址、购买正式备案服务器完成备案申请，启动 MVP 后台与支付/安全限流开发。
