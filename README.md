# 极增科技 · 极增商界

## 官网（当前主线）：`website/`

GrowthHub 由上海极增科技有限公司主办，展示极增商界、极增智脑、企业增长数据分析与咨询服务。

- 首页：四屏平台导览、四类内容栏目与精选推荐、平台概览、会员意向与留言入口。
- 极增商界 `insights.html`：商界洞察、前沿资讯、深度报告、公司消息与会员权益。
- 极增智脑 `zhinao.html`、经营工作台 `workbench.html`、AI 工具 `tools.html`、数据方案 `solution.html` 与增长咨询 `consulting.html`。
- 企业研习和主题交流位于 `academy.html`；联系方式与留言位于 `contact.html`。

官网使用原生 HTML/CSS/JS。本地预览可运行 `python3 -m http.server 8000 --directory website`。搜索覆盖官网栏目和精选内容。留言及会员意向表单生成邮件草稿，由访客确认发送。账号、支付和实时业务数据仍在规划中。

[过渡站 talentchain.net](https://talentchain.net) 运行在现有 Windows nginx 服务器。发布时先备份再覆写官网文件，保留已压缩视频和备案上传页。正式域名 growthhub.cn 按备案流程推进。根目录 `deploy.sh` 用于 Debian/Ubuntu，默认发布旧 `site/`。

---

# （旧）OPC 智能工作台

面向 35–55 岁咨询师、培训师、教练的“一人公司（OPC）”AI 工作台原型。纯静态网站，7 个页面，无外部 CDN 依赖（Vue 用本地的 petite-vue）。

## 页面

| 文件 | 内容 |
| --- | --- |
| `site/index.html` | 工作台首页 |
| `site/checkup.html` | 增长体检（五力自评 → 推荐增长系统） |
| `site/diagnose.html` | 需求诊断 |
| `site/proposal.html` | 方案与报告 |
| `site/course.html` | 课程生成 |
| `site/delivery.html` | 交付管理 |
| `site/brand.html` | 个人 IP |

## 本地预览

```
cd site && python3 -m http.server 8000
```

然后打开 http://localhost:8000/

## 部署

- `deploy.sh`：在 Debian/Ubuntu 服务器上安装 nginx 并发布 `site/` 到 80 端口。
- `scripts/pack.sh`：打包成 `dist/opc-site.tar.gz`，上传到服务器后执行部署。
- 详细步骤见 [docs/部署说明.md](docs/部署说明.md)。

## 文档

- [docs/计划书通俗解读.md](docs/计划书通俗解读.md)：商业计划书的通俗解读和建议。
- [docs/增长极方法论.md](docs/增长极方法论.md)：前身「创越企业增长极」的业务框架，以及原型怎样使用它。
- `brand/`：品牌标识；`prototype/`：场景原型稿；`growthhubs-archive/`：旧站文字存档。
- `.codex-context/`：项目状态、待办、决策记录（dev-memory-os）。
- `VIBELOG.md`：变更日志。
