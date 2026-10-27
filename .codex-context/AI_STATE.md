# AI_STATE

Last Updated: 2026-11-04

## Current Goal
在用户 Mac 本地（/Users/c/Documents/极増科技本地）建立可继续开发的工作区：仓库 + 项目共享资料 + 状态文件。

## Snapshot
- 产品：OPC 智能工作台，帮助 35–55 岁咨询师/培训师/教练做一人公司（培训 + 工具 + 撮合 + 社群）。品牌名「极增科技 / JIZENG TECHNOLOGY」。
- 已完成：6 页静态 UI 原型（site/，Stripe 后台风格）；nginx 一键部署脚本；商业计划书解读；品牌标识（brand/）；4 组场景原型稿（prototype/）；极增官网部署包（deploy/jizeng-site.tar.gz，源码未入库）；旧站 growthhubs 文字存档。
- 未完成：撮合平台页面；后端、账号、数据存储；页面数据为演示数据。
- 部署：用户自己的 VPS（Debian 11），用户在 Mac 上 scp/ssh 执行部署。

## Latest Run
- result: 本地仓库来自项目里的 git bundle（10-25 版，单个提交 b6f258c），origin 已指向 GitHub；复制了 brand/、prototype/、growthhubs-archive/、deploy/*.tar.gz。
- proof: 65 个文件全部落盘、大小与项目库一致；全仓库搜索无服务器 IP/端口。
- risks: Mac 系统时间比实际慢约一周（显示 10-28，实际 11-04），HTTPS 证书校验失败，无法 git fetch/push；GitHub 上可能有比 bundle 更新的提交，未核对。
- rollback_point: b6f258c（新文件尚未提交）。
- next_step: 校正系统时间后 `git fetch origin && git status`，确认与 GitHub 一致再提交本次新增资料。
