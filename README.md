# 极增科技 · 极增商界

## 官网（当前主线）：`website/`

极增科技产品展示网站，纯静态、无第三方依赖。参考 51WORLD 官网布局，深色科技风。

| 文件 | 内容 |
| --- | --- |
| `website/index.html` | 首页：首屏视频轮播、使命、产品平台、解决方案、生命周期路线图、极增商界、联系我们 |
| `website/report.html` | 产品 1：企业分析报告（三档） |
| `website/workbench.html` | 产品 2：经营工作台 |
| `website/talent.html` | 产品 3：AI 人才测评（占位） |
| `website/studio.html` | 产品 4：超级个体（占位） |
| `website/credits.html` | 图片、视频来源（Pexels / Mixkit） |

本地预览：`cd website && python3 -m http.server 8000`。部署：`SITE_DIR=website bash deploy.sh`。
价格、联系方式、二维码、备案号、报告样张分数均为示意；支付和表单尚未接后台。

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
