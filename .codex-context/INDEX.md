# INDEX

- `site/` OPC 工作台静态原型（入口 `site/index.html`；`site/assets/petite-vue.iife.js` 为本地 Vue）
- `deploy.sh` 服务器一键部署（nginx，80 端口）
- `scripts/pack.sh` 打包为 `dist/opc-site.tar.gz`
- `docs/部署说明.md` Mac / Windows 部署步骤（服务器信息为占位符）
- `docs/计划书通俗解读.md` 商业计划书解读
- `brand/` 极增科技品牌标识：mark / lockup / favicon（SVG）+ app 图标与 PNG 导出，见 DESIGN_SYSTEM.md
- `prototype/` 场景原型稿（HTML + 截图）
  - `scenario-mockups/mock.html` 咨询师场景（知识库、复盘、策略、轻量诊断、测评、落地页）
  - `opc-scenario-mockups/mock2.html` OPC 场景（首页、知识库、方案、测评等）
  - `smb-mockups/mock3.html` 中小企业场景（对话、咨询、计划、复盘）
  - `report-mockups/mock4.html` 报告与官网（访谈录入、报告草稿、报告、官网分层、约见）
  - `增长体检截图.png` 增长体检页截图
- `deploy/` 部署包（*.tar.gz 不入库）：`opc-site.tar.gz` 工作台原型；`jizeng-site.tar.gz` 极增官网（website/ + deploy.sh，含视频素材）
- `growthhubs-archive/` 旧站 growthhubs.com.cn 全站文字存档（md + html）
- `.codex-context/` 项目状态文件；`VIBELOG.md` 变更日志
