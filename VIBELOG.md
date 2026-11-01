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

## 2026-11-01
- Done: 新增 website/ 极增科技官网（参考 51WORLD 布局，深色 + 青绿），四款产品（报告、工作台详情页；人才测评、超级个体占位页），素材 Pexels/Mixkit 本地托管并列出来源。
- Proof: Playwright 1440/390 截图检查 6 页，无横向滚动、无 JS 报错。
- Risks: 价格、联系方式、样张分数为示意；支付与表单未接后台；大陆服务器需 ICP 备案。
- Rollback: 回退本次提交即可（website/ 为新增目录）。
- Next: 用户确认 → 阿里云部署 → 产品 1 问卷与报告生成。
