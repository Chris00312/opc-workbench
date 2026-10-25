# OPC 智能工作台

面向 35–55 岁咨询师、培训师、教练的“一人公司（OPC）”AI 工作台原型。纯静态网站，6 个页面，无外部 CDN 依赖（Vue 用本地的 petite-vue）。

## 页面

| 文件 | 内容 |
| --- | --- |
| `site/index.html` | 工作台首页 |
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
- `.codex-context/`：项目状态、待办、决策记录（dev-memory-os）。
- `VIBELOG.md`：变更日志。
