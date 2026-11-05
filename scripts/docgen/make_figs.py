import sys, math
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
from matplotlib.patches import FancyBboxPatch, Rectangle

OUT = sys.argv[1]
fm.fontManager.addfont("/System/Library/Fonts/Hiragino Sans GB.ttc")
plt.rcParams["font.family"] = "Hiragino Sans GB"
plt.rcParams["axes.unicode_minus"] = False

NAVY, TEAL, TEAL2, AMBER, GREY, INK, LIGHT = "#1f3a68", "#0b6e5c", "#14b593", "#d99a1e", "#8a94a6", "#1a1a1a", "#eef3f8"
LANE = {"客户": "#e8f0fb", "AI": "#e6f6f1", "程序": "#f3f0fa", "顾问": "#fff4e2"}
LANE_EDGE = {"客户": NAVY, "AI": TEAL, "程序": "#5b4a9e", "顾问": AMBER}


def box(ax, x, y, w, h, text, fc, ec, fs=10, bold=False, tc=INK):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08", fc=fc, ec=ec, lw=1.4))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fs, color=tc, weight="bold" if bold else "normal", linespacing=1.35)


def arrow(ax, x1, y1, x2, y2, c=GREY):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="-|>", color=c, lw=1.3, shrinkA=0, shrinkB=0))


def save(fig, name):
    fig.savefig(f"{OUT}/{name}.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 1. production flow with swimlanes
fig, ax = plt.subplots(figsize=(13, 5.2))
lanes = ["客户", "AI", "程序", "顾问"]
H = 1.2
XW = 15.0
for i, l in enumerate(lanes):
    y = (len(lanes) - 1 - i) * H
    ax.add_patch(Rectangle((0, y), XW, H, fc=LANE[l], ec="white", lw=2))
    ax.text(0.35, y + H / 2, l, ha="center", va="center", fontsize=11, weight="bold", color=LANE_EDGE[l], rotation=90)
steps = [
    ("客户", 0.75, "1. 签约\n+保密协议"), ("客户", 1.95, "2. 提供资料\n3. 管理层问卷"),
    ("AI", 3.15, "4. 解析资料\n+公开信息"), ("AI", 4.35, "5. 生成\n访谈提纲"), ("顾问", 5.55, "6. 高管访谈"),
    ("AI", 6.75, "7. 转写访谈\n提取证据"), ("AI", 7.95, "8. 逐项建议分\n+证据等级"), ("程序", 9.15, "9. 计分判定\n阶段/缺口/象限"),
    ("AI", 10.35, "10. 起草报告\n+自动质检"), ("顾问", 11.55, "11. 资深顾问\n审校定稿"), ("顾问", 12.75, "12. 管理层\n解读会"),
]
pos = []
for lane, x, t in steps:
    i = lanes.index(lane)
    y = (len(lanes) - 1 - i) * H + 0.2
    w = 1.08
    box(ax, x, y, w, 0.8, t, "white", LANE_EDGE[lane], fs=8.4)
    pos.append((x, y, w))
for (x1, y1, w1), (x2, y2, w2) in zip(pos, pos[1:]):
    if y1 == y2:
        arrow(ax, x1 + w1, y1 + 0.4, x2, y2 + 0.4)
    else:
        arrow(ax, x1 + w1, y1 + 0.4, x2, y2 + (0.8 if y2 < y1 else 0.0))
ax.text(XW / 2, 4 * H + 0.15, "标准报告：自资料齐全起约 2 周交付；AI 负责整理与起草，资深顾问负责访谈、判断与定稿", ha="center", fontsize=10, color=GREY)
ax.set_xlim(0, XW + 0.05); ax.set_ylim(-0.05, 4 * H + 0.45); ax.axis("off")
save(fig, "fig-flow")

# 2. three scoring models
fig = plt.figure(figsize=(12.5, 4.4))
# 2a stage bar
ax = fig.add_axes([0.02, 0.18, 0.30, 0.62])
bands = [(24, 72, "成长期", "#cfe3f7"), (72, 84, "扩张\n后期", "#a9cdf0"), (84, 96, "成熟\n临界", "#7fb1e3"), (96, 120, "典型\n成熟期", "#4f86c6")]
for a, b, n, c in bands:
    ax.add_patch(Rectangle((a, 0), b - a, 1, fc=c, ec="white", lw=2))
    ax.text((a + b) / 2, 0.5, n, ha="center", va="center", fontsize=8.5, color=INK, linespacing=1.2)
for v in (72, 84, 96):
    ax.text(v, -0.18, str(v), ha="center", va="top", fontsize=8, color=GREY)
ax.annotate("样例：105", xy=(105, 1), xytext=(105, 1.55), ha="center", fontsize=9, color=AMBER, weight="bold", arrowprops=dict(arrowstyle="-|>", color=AMBER))
ax.set_xlim(24, 120); ax.set_ylim(-0.5, 2.0); ax.axis("off")
ax.set_title("① 六维 24 题 → 判定阶段\n（分越高越接近成熟期，不代表好坏）", fontsize=10.5, color=NAVY, pad=4)
# 2b radar
ax = fig.add_axes([0.37, 0.06, 0.27, 0.80], polar=True)
labels = ["财务与资本", "市场与客户", "运营与供应链", "技术与创新", "组织与人才", "信息与数字化", "流程与协同", "战略与治理"]
S = [4.25, 3.75, 4.25, 3.00, 4.50, 4.25, 3.75, 4.00]
I = [4.25, 4.50, 4.50, 4.25, 4.00, 4.25, 4.50, 4.25]
ang = [n / 8 * 2 * math.pi for n in range(8)] + [0]
ax.set_theta_offset(math.pi / 2); ax.set_theta_direction(-1)
ax.plot(ang, I + I[:1], color=AMBER, lw=1.6, ls="--", label="未来重要性 I"); ax.fill(ang, I + I[:1], color=AMBER, alpha=0.10)
ax.plot(ang, S + S[:1], color=NAVY, lw=2, label="现状 S"); ax.fill(ang, S + S[:1], color=NAVY, alpha=0.15)
ax.set_xticks(ang[:-1]); ax.set_xticklabels(labels, fontsize=7.8)
ax.set_ylim(0, 5); ax.set_yticks([1, 2, 3, 4, 5]); ax.set_yticklabels([]); ax.grid(color="#d5dbe5")
ax.legend(loc="lower center", bbox_to_anchor=(0.5, -0.22), ncol=2, fontsize=8, frameon=False)
ax.set_title("② 八域 32 项 → 看能力缺口（I - S）", fontsize=10.5, color=NAVY, pad=14)
# 2c quadrant
ax = fig.add_axes([0.72, 0.15, 0.26, 0.66])
q = [(0, 1, "① 成长/扩张期", "#e8f0fb"), (1, 1, "② 扩张后期", "#dbe8f7"), (0, 0, "④ 停滞/衰退前夜", "#f3f4f6"), (1, 0, "③ 成熟期", "#fff4e2")]
for x, y, t, c in q:
    ax.add_patch(Rectangle((x, y), 1, 1, fc=c, ec="#b8c2d3"))
    ax.text(x + 0.06, y + 0.86, t, fontsize=8.5, color=NAVY, weight="bold", va="top")
ax.plot(1.08, 0.36, "o", ms=9, mec=AMBER, mfc="white", mew=2); ax.text(1.16, 0.33, "样例位置\n动能 1.8 / 更新度 2.2", fontsize=7.5, color=AMBER)
ax.set_xlim(0, 2); ax.set_ylim(0, 2); ax.set_xticks([]); ax.set_yticks([])
ax.set_xlabel("战略更新度 →", fontsize=8.5); ax.set_ylabel("增长动能 →", fontsize=8.5)
for s in ax.spines.values(): s.set_visible(False)
ax.set_title("③ 动能 × 更新度 → 四象限", fontsize=10.5, color=NAVY, pad=6)
save(fig, "fig-models")

# 3. evidence grading
fig, ax = plt.subplots(figsize=(11, 3.6))
srcs = [("企业内部资料\n审计报表/经营数据/制度", 2.85), ("公开披露信息\n年报/公告/评级报告", 2.15), ("外部数据接口\n工商/专利/招投标", 1.45), ("管理层问卷与访谈\n老板 + 高管团队", 0.75), ("AI 联网搜索\n新闻/行业/竞品", 0.05)]
for t, y in srcs:
    box(ax, 0.1, y, 2.3, 0.58, t, "#f5f7fa", GREY, fs=8.8)
grades = [("A 硬数据", "有文件或官方记录直接支撑", 2.45, "#2e7d4f"), ("B 结构化判断", "多源交叉印证 / 多人一致", 1.45, AMBER), ("C 推断假设", "无出处 → 必须进入假设清单", 0.45, "#c0392b")]
for t, d, y, c in grades:
    box(ax, 5.2, y, 3.0, 0.75, f"{t}\n{d}", "white", c, fs=9.2, tc=c, bold=False)
links = [(2.85, 2.45), (2.15, 2.45), (1.45, 2.45), (1.45, 1.45), (0.75, 1.45), (0.75, 0.45), (0.05, 1.45), (0.05, 0.45)]
for ys, yg in links:
    arrow(ax, 2.4, ys + 0.29, 5.2, yg + 0.37, c="#b5bfcc")
box(ax, 8.8, 1.2, 2.0, 1.0, "封面置信度\n高 / 中高 / 中 / 低\n按 A/B/C 比例计算", LIGHT, NAVY, fs=8.8)
arrow(ax, 8.2, 1.7, 8.8, 1.7, c=NAVY)
ax.set_xlim(0, 11); ax.set_ylim(-0.05, 3.5); ax.axis("off")
save(fig, "fig-evidence")

# 4. system architecture
fig, ax = plt.subplots(figsize=(11.5, 6.2))
box(ax, 0.3, 5.1, 4.6, 1.0, "企业端\n资料上传 · 管理层问卷 · 访谈预约 · 报告查看", "#e8f0fb", NAVY, fs=9.5)
box(ax, 6.6, 5.1, 4.6, 1.0, "顾问工作台\n访谈提纲 · 逐项审校 · 证据出处 · 解读材料 · 发布", "#fff4e2", AMBER, fs=9)
ax.add_patch(FancyBboxPatch((0.3, 1.55), 10.9, 3.05, boxstyle="round,pad=0.02,rounding_size=0.1", fc="#f7f9fb", ec=TEAL, lw=1.6))
ax.text(5.75, 4.38, "后端服务（一个，报告与以后的工作台共用）", ha="center", fontsize=10.5, weight="bold", color=TEAL)
mods = [("题库与评分规则\n（版本化）", 0.55, 3.15), ("计分引擎\n程序计算·可复算", 3.2, 3.15), ("AI 流水线\n解析→收集→打分→起草→质检", 5.85, 3.15), ("报告渲染\nHTML → PDF", 8.5, 3.15),
        ("账号 · 订单 · 支付\n支付宝 / 微信", 0.55, 1.8), ("外部数据接口\n企业数据 / 联网搜索", 3.2, 1.8), ("模型切换层\nDeepSeek · 百炼 · 本地 27B", 5.85, 1.8), ("任务队列\n本地模型可主动领取", 8.5, 1.8)]
for t, x, y in mods:
    box(ax, x, y, 2.45, 0.95, t, "white", "#9fb3c8", fs=8.8)
box(ax, 2.6, 0.2, 6.3, 0.85, "PostgreSQL 数据库  +  文件存储（先本地，后迁阿里云 OSS）", "#eef0f7", "#5b4a9e", fs=9.5)
arrow(ax, 2.6, 5.1, 3.5, 4.6, NAVY); arrow(ax, 8.9, 5.1, 8.0, 4.6, AMBER); arrow(ax, 5.75, 1.55, 5.75, 1.05, "#5b4a9e")
ax.set_xlim(0, 11.5); ax.set_ylim(0, 6.3); ax.axis("off")
save(fig, "fig-arch")

# 5. local model deployment
fig, ax = plt.subplots(figsize=(11, 3.3))
box(ax, 0.2, 0.6, 3.6, 2.0, "阿里云服务器（Linux）\n网站 · 数据库 · 任务队列\n企业资料只存在这里", "#e8f0fb", NAVY, fs=9.5)
box(ax, 7.0, 0.6, 3.7, 2.0, "办公室本地机器\nMac Studio 64–128GB\n或 48GB 显存 GPU 主机\n运行千问 27B 模型", "#e6f6f1", TEAL, fs=9.5)
arrow(ax, 7.0, 2.0, 3.8, 2.0, TEAL); ax.text(5.4, 2.15, "① 主动领取任务（只出不进，无需开端口）", ha="center", fontsize=8.6, color=TEAL)
arrow(ax, 3.8, 1.15, 7.0, 1.15, NAVY); ax.text(5.4, 0.85, "② 下发资料 → ③ 回传打分与草稿", ha="center", fontsize=8.6, color=NAVY)
ax.text(5.4, 2.85, "全程不经过任何第三方模型服务商", ha="center", fontsize=10, weight="bold", color=AMBER)
ax.set_xlim(0, 11); ax.set_ylim(0.3, 3.1); ax.axis("off")
save(fig, "fig-local")

# 6. timeline
fig, ax = plt.subplots(figsize=(11, 3.4))
ms = [("阶段 1a 题库 v1 + 预诊断流水线", 1, 4, NAVY), ("阶段 1b 预诊断 3–5 家并拜访", 3, 6, NAVY), ("阶段 2 首批标准报告（半自动工具）", 5, 10, TEAL), ("阶段 3 系统化（按需）", 10, 14, AMBER)]
for i, (n, a, b, c) in enumerate(ms):
    y = len(ms) - 1 - i
    ax.barh(y, b - a + 1, left=a - 1, height=0.55, color=c, alpha=0.88)
    ax.text(a - 1 + 0.12, y, n, va="center", fontsize=9, color="white", weight="bold")
ax.set_yticks([]); ax.set_xticks([w - 0.5 for w in range(1, 15)]); ax.set_xticklabels([f"第{w}周" for w in range(1, 15)], fontsize=8)
ax.set_xlim(0, 14.2)
for s_ in ("top", "right", "left"): ax.spines[s_].set_visible(False)
save(fig, "fig-timeline")

# 7. service ladder
fig, ax = plt.subplots(figsize=(11.5, 2.6))
tiers = [("公开信息预诊断", "邀约制 · 获客敲门砖\n年报/公告/公开资料", NAVY), ("标准报告", "资料 + 问卷 + 访谈\nAI 起草 · 资深顾问审校", TEAL), ("深度诊断", "现场调研 · 专项方案\n现场汇报 · 陪跑", AMBER), ("经营工作台", "三条动作导入\n按月复盘 · 持续服务", "#5b4a9e")]
for k, (t, d, c) in enumerate(tiers):
    x = 0.2 + k * 2.85
    ax.add_patch(FancyBboxPatch((x, 0.3), 2.35, 1.6, boxstyle="round,pad=0.02,rounding_size=0.1", fc="white", ec=c, lw=1.8))
    ax.text(x + 1.175, 1.5, t, ha="center", va="center", fontsize=11, weight="bold", color=c)
    ax.text(x + 1.175, 0.85, d, ha="center", va="center", fontsize=8.8, color=INK, linespacing=1.4)
    if k < 3:
        arrow(ax, x + 2.4, 1.1, x + 2.8, 1.1, c=GREY)
ax.set_xlim(0, 11.6); ax.set_ylim(0.1, 2.1); ax.axis("off")
save(fig, "fig-tiers")
print("ok")
