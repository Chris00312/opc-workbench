# make_tech_figs.py — 生成《AI企业分析报告-技术方案》的配图（matplotlib）。
# 用法：python3 make_tech_figs.py <figdir>
# 输出：fig-tech-arch / fig-tech-pipeline / fig-tech-deploy / fig-tech-timeline（PNG）。
# 编辑器示意图另由 editor-mockup.html 经无头 Chrome 截图生成（见 README）。
# 依赖：Hiragino Sans GB 字体（macOS 自带）。配色与 make_figs.py 一致。
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
from matplotlib.patches import FancyBboxPatch, Rectangle

OUT = sys.argv[1]
fm.fontManager.addfont("/System/Library/Fonts/Hiragino Sans GB.ttc")
plt.rcParams["font.family"] = "Hiragino Sans GB"
plt.rcParams["axes.unicode_minus"] = False

NAVY, TEAL, PURPLE, AMBER, GREY, INK = "#1f3a68", "#0b6e5c", "#5b4a9e", "#d99a1e", "#8a94a6", "#1a1a1a"
F = {"navy": "#e8f0fb", "teal": "#e6f6f1", "purple": "#f3f0fa", "amber": "#fff4e2", "grey": "#f4f5f7"}


def box(ax, x, y, w, h, text, fc, ec, fs=10, bold=False, tc=INK, lw=1.4, ls="-"):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.1", fc=fc, ec=ec, lw=lw, ls=ls))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fs, color=tc,
            weight="bold" if bold else "normal", linespacing=1.4)


def arrow(ax, x1, y1, x2, y2, c=GREY, style="-|>", lw=1.3):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle=style, color=c, lw=lw, shrinkA=0, shrinkB=0))


def save(fig, name):
    fig.savefig(f"{OUT}/{name}.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 1. 系统架构 ------------------------------------------------------------
fig, ax = plt.subplots(figsize=(13, 8))
# users
for x, t in [(1, "客户高管 · 手机\n微信里点链接填问卷"), (5.4, "老板 / 顾问 · 电脑\n审校、改分、批注、导出"), (9.8, "客户董事长\n收 PDF + 解读会（不登录）")]:
    box(ax, x, 9.0, 3.9, 0.95, t, "white", NAVY, fs=9.5)
for x in (2.95, 7.35):
    arrow(ax, x, 9.0, x, 8.45)
box(ax, 1, 7.75, 12.7, 0.65, "Nginx · HTTPS（已备案域名的子域名，如 app.talentchain.net）", F["grey"], GREY, fs=9.5)
ax.text(0.85, 7.25, "前端  Vue 3", fontsize=9, color=GREY, ha="left")
box(ax, 1, 6.05, 6.1, 1.05, "问卷 H5（/q/专属链接，免登录）\n手机填写 · 自动保存进度", F["navy"], NAVY, fs=9.5)
box(ax, 7.6, 6.05, 6.1, 1.05, "顾问工作台 + 结构化报告编辑器（/app）\n评分面板 · 正文 · 批注 · 版本", F["navy"], NAVY, fs=9.5, bold=True)
for x in (4.05, 10.65):
    arrow(ax, x, 7.75, x, 7.1)
    arrow(ax, x, 6.05, x, 5.45)
ax.text(0.85, 5.6, "后端  Python", fontsize=9, color=GREY, ha="left")
box(ax, 1, 4.35, 6.1, 1.1, "API 服务 · FastAPI\n账号 · 项目 · 评分 · 批注 · 版本 · 导出", F["teal"], TEAL, fs=9.5)
box(ax, 7.6, 4.35, 6.1, 1.1, "任务执行器 Worker\nAI 流水线 · 计分引擎 · PDF 渲染", F["teal"], TEAL, fs=9.5, bold=True)
arrow(ax, 7.1, 4.9, 7.6, 4.9, style="<|-|>")
ax.text(7.35, 5.05, "任务", fontsize=8, color=GREY, ha="center")
for x in (2.85, 7.15, 11.45):
    arrow(ax, x, 4.35, x, 3.75, style="<|-|>")
box(ax, 1, 2.65, 3.75, 1.1, "PostgreSQL\n业务数据 + 任务队列", F["purple"], PURPLE, fs=9.5)
box(ax, 5.3, 2.65, 3.75, 1.1, "文件存储\n本地磁盘 → 阿里云 OSS", F["purple"], PURPLE, fs=9.5)
box(ax, 9.6, 2.65, 4.1, 1.1, "方法论包（YAML，带版本号）\n题库 · 评分锚点 · 判定规则", F["amber"], AMBER, fs=9.5)
box(ax, 1, 1.55, 12.7, 0.7, "一套 Docker Compose：云端（阿里云 Linux）和本地（办公室显卡机器）用同一套部署", "white", GREY, fs=9, ls="--", tc=GREY)
# right column
box(ax, 14.6, 8.0, 3.6, 0.75, "统一模型接口\nchat(消息, 输出格式)", "white", TEAL, fs=9, bold=True)
for y, t in [(7.05, "DeepSeek · 开发测试"), (6.2, "阿里云百炼 · 正式"), (5.35, "本地 Qwen3.8-27B · 保密")]:
    box(ax, 14.9, y, 3.0, 0.65, t, F["teal"], TEAL, fs=8.8)
box(ax, 14.6, 3.85, 3.6, 0.75, "外部数据", "white", NAVY, fs=9, bold=True)
for y, t in [(2.95, "年报公告（巨潮/披露易）"), (2.15, "联网搜索接口"), (1.35, "企业数据接口"), (0.55, "录音转文字")]:
    box(ax, 14.9, y, 3.0, 0.62, t, F["navy"], NAVY, fs=8.8)
arrow(ax, 13.7, 5.1, 14.6, 8.25)
arrow(ax, 13.7, 4.6, 14.6, 4.2)
ax.set_xlim(0.7, 18.4); ax.set_ylim(0.35, 10.1); ax.axis("off")
save(fig, "fig-tech-arch")

# 2. AI 流水线 ------------------------------------------------------------
fig, ax = plt.subplots(figsize=(13.5, 6.2))
inputs = ["年报 / 公告\nPDF", "企业内部资料", "管理层问卷", "访谈录音", "联网搜索\n企业数据接口"]
for i, t in enumerate(inputs):
    box(ax, 0.3 + i * 2.75, 5.3, 2.35, 0.95, t, "white", NAVY, fs=9)
    arrow(ax, 1.475 + i * 2.75, 5.3, 1.475 + i * 2.75, 4.75)
box(ax, 0.3, 3.85, 13.35, 0.9, "解析与抽取：按章节切分 → 抽取「事实卡片」（指标 · 数值 · 期间 · 页码/网址 · 原文引用）→ 程序核对数字确在原文中", F["teal"], TEAL, fs=9.6)
arrow(ax, 6.975, 3.85, 6.975, 3.35)
box(ax, 3.3, 2.5, 7.35, 0.85, "证据库：每条证据带出处和 A/B/C 等级，后续所有数字只能引用证据编号", F["purple"], PURPLE, fs=9.6, bold=True)
steps = [("逐项建议分\n24+32 项\n理由 · 证据", "teal"), ("计分判定\n总分 · 阶段\n缺口 · 象限", "purple"),
         ("起草章节\n5 条结论\n3 条动作", "teal"), ("自动质检\n数字有出处\n前后一致", "purple"),
         ("编辑器审校\n改分填理由\n批注", "amber"), ("导出 PDF\n解读会交付", "navy")]
ec = {"teal": TEAL, "purple": PURPLE, "amber": AMBER, "navy": NAVY}
xs = [0.3 + i * 2.27 for i in range(6)]
for x, (t, k) in zip(xs, steps):
    box(ax, x, 0.65, 2.0, 1.25, t, F[k], ec[k], fs=8.8)
for a, b in zip(xs, xs[1:]):
    arrow(ax, a + 2.0, 1.275, b, 1.275)
for i in (0, 2, 3):
    cx = xs[i] + 1.0
    arrow(ax, min(max(cx, 3.6), 10.3), 2.5, cx, 1.9, c="#b8bfcb", lw=1.0)
for i, (k, t) in enumerate([("teal", "AI"), ("purple", "程序（确定性计算/检查）"), ("amber", "资深顾问"), ("navy", "数据/交付")]):
    x = [0.3, 1.5, 4.9, 6.9][i]
    ax.add_patch(Rectangle((x, 0.1), 0.3, 0.25, fc=F[k], ec=ec[k]))
    ax.text(x + 0.4, 0.22, t, fontsize=9, va="center", color=INK)
ax.text(13.65, 0.22, "每一步：提示词有版本 · 输出格式校验 · 调用全部留档", fontsize=9, va="center", ha="right", color=GREY)
ax.set_xlim(0.1, 13.8); ax.set_ylim(-0.05, 6.4); ax.axis("off")
save(fig, "fig-tech-pipeline")

# 3. 部署：云端 / 本地 ------------------------------------------------------
fig, ax = plt.subplots(figsize=(13, 5.6))
for x0, title, sub, host, model, note, col in [
    (0.2, "云端模式（默认）", "适合大多数客户", "阿里云 Linux 服务器（2 核 4G 起）", "阿里云百炼 API", "数据存在阿里云国内机房\n保密协议中写明", TEAL),
    (6.8, "本地模式（保密要求高的客户）", "按客户要求启用", "办公室显卡机器\n（48GB+ 显存，或 64GB+ 内存的 Mac）", "本地 Qwen3.8-27B\n（vLLM / Ollama）", "资料和模型调用都不出办公室\n可完全断网运行", AMBER)]:
    ax.add_patch(FancyBboxPatch((x0, 0.2), 6.1, 5.0, boxstyle="round,pad=0.02,rounding_size=0.15", fc="#fafbfc", ec=col, lw=1.6))
    ax.text(x0 + 0.3, 4.85, title, fontsize=12, weight="bold", color=col, va="center")
    ax.text(x0 + 0.3, 4.45, sub, fontsize=9, color=GREY, va="center")
    box(ax, x0 + 0.3, 2.7, 5.5, 1.45, "", "white", GREY, lw=1.0)
    ax.text(x0 + 3.05, 3.9, host, fontsize=9.5, ha="center", va="center", weight="bold", color=INK, linespacing=1.3)
    for i, t in enumerate(["Nginx", "API", "Worker", "PostgreSQL", "前端"]):
        box(ax, x0 + 0.45 + i * 1.06, 2.85, 0.96, 0.55, t, F["teal"], TEAL, fs=8)
    box(ax, x0 + 0.3, 1.45, 2.6, 0.95, model, F["navy"], NAVY, fs=9)
    box(ax, x0 + 3.2, 1.45, 2.6, 0.95, note, F["amber"] if col == AMBER else F["teal"], col, fs=8.6)
    arrow(ax, x0 + 1.6, 2.7, x0 + 1.6, 2.4)
    ax.text(x0 + 3.05, 0.65, "同一套 Docker Compose，只改配置", fontsize=9, ha="center", color=GREY)
ax.set_xlim(0.1, 13.0); ax.set_ylim(0.1, 5.3); ax.axis("off")
save(fig, "fig-tech-deploy")

# 4. 开发排期 -------------------------------------------------------------
rows = [
    ("1a", "方法论包 + 计分引擎（奥托立夫回填对齐）", 1, 2),
    ("1a", "年报解析 + 事实卡片 + 模型接口", 2, 3),
    ("1a", "建议分 · 起草 · 质检 · 报告 PDF 模板", 3, 4),
    ("1a", "试跑 2–3 家上市公司 · 本地模型对比评测", 4, 4),
    ("1b", "买 Linux 服务器 · 部署 · HTTPS", 4, 5),
    ("1b", "结构化报告编辑器（评分面板/正文/批注/版本）", 3, 6),
    ("1b", "3–5 家预诊断在编辑器里审校", 5, 6),
    ("2", "问卷 H5 · 资料上传", 5, 7),
    ("2", "访谈提纲 · 录音转写 · 外部数据接口", 6, 8),
    ("2", "首批标准报告全流程 · Word 导出", 8, 10),
]
col = {"1a": TEAL, "1b": PURPLE, "2": AMBER}
fig, ax = plt.subplots(figsize=(12.5, 5.4))
for i, (ph, t, a, b) in enumerate(rows):
    y = len(rows) - 1 - i
    ax.add_patch(FancyBboxPatch((a - 1 + 0.06, y + 0.18), b - a + 1 - 0.12, 0.64, boxstyle="round,pad=0,rounding_size=0.12", fc=col[ph], ec="none", alpha=0.88))
    ax.text(-0.15, y + 0.5, t, ha="right", va="center", fontsize=9.5, color=INK)
    ax.text(a - 1 + 0.18, y + 0.5, "阶段 " + ph, ha="left", va="center", fontsize=8.2, color="white", weight="bold")
for w in range(11):
    ax.axvline(w, color="#e3e7ee", lw=0.8, zorder=0)
ax.set_xticks([w + 0.5 for w in range(10)]); ax.set_xticklabels([f"第{w + 1}周" for w in range(10)], fontsize=9)
ax.set_yticks([]); ax.set_xlim(0, 10); ax.set_ylim(-0.1, len(rows))
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.tick_params(axis="x", length=0)
save(fig, "fig-tech-timeline")
print("ok")
