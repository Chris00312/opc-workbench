# make_wb_figs.py — 生成《经营工作台-产品方案》的配图（matplotlib）。
# 用法：python3 make_wb_figs.py <figdir>
# 输出：fig-wb-form（产品形态）/ fig-wb-levels（主动程度四级）/ fig-wb-rhythm（一个月的节奏）/ fig-wb-onboard（安装与初始化）。
# 企微对话示意、经营会工作台示意另由 wb-chat-mockup.html / wb-meeting-mockup.html 截图（见 README）。
# 配色与 make_tech_figs.py 一致；示例公司为虚构的经贸公司。
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


def box(ax, x, y, w, h, text, fc, ec, fs=10, bold=False, tc=INK, lw=1.4, ls="-", ha="center"):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.1", fc=fc, ec=ec, lw=lw, ls=ls))
    tx = x + w / 2 if ha == "center" else x + 0.2
    ax.text(tx, y + h / 2, text, ha=ha, va="center", fontsize=fs, color=tc,
            weight="bold" if bold else "normal", linespacing=1.45)


def arrow(ax, x1, y1, x2, y2, c=GREY, style="-|>", lw=1.3):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle=style, color=c, lw=lw, shrinkA=0, shrinkB=0))


def save(fig, name):
    fig.savefig(f"{OUT}/{name}.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


# 1. 产品形态 ------------------------------------------------------------
fig, ax = plt.subplots(figsize=(13.5, 7.6))
# left: what the customer sees
ax.add_patch(FancyBboxPatch((0.2, 0.9), 5.6, 7.3, boxstyle="round,pad=0.02,rounding_size=0.15", fc="#fafbfc", ec=NAVY, lw=1.6))
ax.text(0.5, 7.85, "客户看到的（不用另装软件）", fontsize=12, weight="bold", color=NAVY, va="center")
box(ax, 0.5, 6.15, 5.0, 1.35, "企业微信 / 钉钉 里的「极增经营秘书」\n① 工作台图标  ② 秘书会话  ③ 群里 @ 它", F["navy"], NAVY, fs=10, bold=True)
for y, t in [(5.2, "老板：每天晨报（只说异常）· 随时问 · 点按钮确认"),
             (4.4, "中层：收到追问，直接回复原因和计划"),
             (3.6, "全员：行动项提醒、到期催办")]:
    box(ax, 0.7, y, 4.6, 0.62, t, "white", GREY, fs=9, lw=1.0, ha="left")
box(ax, 0.5, 1.4, 5.0, 1.55, "网页工作台（电脑浏览器，企微扫码登录）\n月度经营会投屏 · 目标与行动项看板\n数据上传与设置", F["navy"], NAVY, fs=9.6)
# middle: our cloud
ax.add_patch(FancyBboxPatch((6.6, 0.9), 4.6, 7.3, boxstyle="round,pad=0.02,rounding_size=0.15", fc="#fafbfc", ec=TEAL, lw=1.6))
ax.text(6.9, 7.85, "极增云端（客户看不见）", fontsize=12, weight="bold", color=TEAL, va="center")
for y, t, k in [(6.4, "目标与决定\n年度目标 · 月度目标 · 会上定的行动项", "teal"),
                (5.0, "主动引擎\n盯目标 → 发现异常\n决定推给谁 · 说什么 · 何时说", "teal"),
                (3.6, "AI 大脑（大模型）\n分析 · 回答 · 起草材料 · 汇总中层回复", "teal"),
                (2.2, "方法论 + 行业包\n指标模板 · 异常规则 · 追问话术", "amber")]:
    box(ax, 6.9, y, 4.0, 1.1, t, F[k], TEAL if k == "teal" else AMBER, fs=9.2)
box(ax, 6.9, 1.1, 4.0, 0.75, "顾问后台：审核关键推送 · 每月经营会", F["purple"], PURPLE, fs=9.2, bold=True)
# right: data
ax.add_patch(FancyBboxPatch((12.0, 0.9), 3.3, 7.3, boxstyle="round,pad=0.02,rounding_size=0.15", fc="#fafbfc", ec=PURPLE, lw=1.6))
ax.text(12.3, 7.85, "数据从哪来", fontsize=12, weight="bold", color=PURPLE, va="center")
for y, t in [(6.5, "每月上传 Excel\n（保底，零配置）"), (5.15, "金蝶 / 用友\n开放接口"), (3.8, "企微 / 钉钉\n审批 · 日志 · 待办"), (2.45, "中层的回复\n（AI 追问得来）"), (1.1, "同行年报\n行业公开数据")]:
    box(ax, 12.25, y, 2.8, 1.0, t, F["purple"], PURPLE, fs=9)
arrow(ax, 5.8, 5.0, 6.6, 5.0, style="<|-|>", c=NAVY, lw=1.8)
ax.text(6.2, 5.25, "推送\n对话", fontsize=8.5, color=NAVY, ha="center", va="bottom", linespacing=1.2)
arrow(ax, 12.0, 4.6, 11.2, 4.6, c=PURPLE, lw=1.8)
ax.text(3.0, 0.45, "一个装在企业微信 / 钉钉里的主动型 AI 秘书，加一个能投屏的网页工作台；后端是同一套系统", fontsize=10, color=GREY, ha="left")
ax.set_xlim(0.1, 15.4); ax.set_ylim(0.25, 8.35); ax.axis("off")
save(fig, "fig-wb-form")

# 2. 主动程度四级 ----------------------------------------------------------
fig, ax = plt.subplots(figsize=(13, 4.6))
levels = [
    ("① 主动提醒", "「本月回款进度 41%，\n比去年同期落后 15 个点」", "不需要确认", "teal"),
    ("② 主动建议", "「建议本周约 3 家逾期客户，\n名单和话术已备好」", "老板看一眼", "teal"),
    ("③ 代办（需确认）", "「要不要我替你问销售总监\n要回款计划？」老板点「好」\nAI 才去发", "老板点一下", "amber"),
    ("④ 授权范围内自动做", "每周一自动追问行动项进度，\n逾期升级给老板", "事先授权一次", "purple"),
]
ec = {"teal": TEAL, "amber": AMBER, "purple": PURPLE}
for i, (t, ex, who, k) in enumerate(levels):
    x, y, w, h = 0.3 + i * 3.2, 0.9, 3.0, 2.5
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.12", fc=F[k], ec=ec[k], lw=1.6))
    ax.text(x + 0.18, y + h - 0.35, t, fontsize=12, weight="bold", color=ec[k], va="center")
    ax.text(x + 0.18, y + 1.25, ex, fontsize=9.4, color=INK, va="center", linespacing=1.5)
    ax.text(x + 0.18, y + 0.3, "确认：" + who, fontsize=9.2, color=GREY, va="center")
    if i < 3:
        arrow(ax, x + w, y + h / 2, x + 3.2, y + h / 2)
arrow(ax, 0.3, 3.85, 12.9, 3.85, c=GREY, lw=1.6)
ax.text(0.3, 4.1, "AI 自主程度 →", fontsize=10, color=GREY)
ax.text(12.9, 4.1, "前期 ③④ 由顾问审核后再发；审核通过率稳定后逐步放开", fontsize=9.5, color=PURPLE, ha="right")
ax.text(0.3, 0.35, "防打扰：只推异常 · 晨报每天最多 1 条 · ③④ 级每人每周有上限 · 老板可随时调低级别", fontsize=9.6, color=INK)
ax.set_xlim(0.1, 13.1); ax.set_ylim(0.1, 4.4); ax.axis("off")
save(fig, "fig-wb-levels")

# 3. 一个月的节奏 ----------------------------------------------------------
fig, ax = plt.subplots(figsize=(13.5, 5.4))
# days axis
ax.add_patch(Rectangle((0.5, 3.55), 12.5, 0.08, fc="#c9d3e0", ec="none"))
events = [
    (0.5, "每个工作日 8:30", "晨报：只说异常", NAVY, 4.25),
    (1.6, "月初第 1–3 天", "数据到位\n（Excel / ERP）", PURPLE, 2.55),
    (3.6, "第 3–4 天", "AI 找出差异\n追问对应中层", AMBER, 4.25),
    (5.6, "第 5 天", "AI 汇总回复\n起草经营会材料", TEAL, 2.55),
    (7.6, "第 6 天", "月度经营会\n（投屏 · 顾问主持）", PURPLE, 4.25),
    (9.6, "会后当天", "决定 → 行动项\n负责人 + 截止日", TEAL, 2.55),
    (11.6, "此后每周一", "催办进度\n逾期升级给老板", AMBER, 4.25),
]
for x, when, what, c, ty in events:
    ax.add_patch(plt.Circle((x + 0.6, 3.59), 0.13, color=c, zorder=3))
    up = ty > 3.6
    y0 = ty if up else ty - 1.45
    ax.plot([x + 0.6, x + 0.6], [3.59, y0 if up else y0 + 1.45], color=c, lw=1.0)
    box(ax, x, y0, 1.85, 1.45, f"{when}\n\n{what}", "white", c, fs=8.8)
ax.text(0.5, 6.05, "示例：某经贸公司（虚构）· 65 人 · 张总 + 5 位部门负责人", fontsize=10, color=GREY)
ax.text(0.5, 0.65, "随时：老板在企微里问「这个月能完成吗」「哪个客户回款最慢」，AI 当场回答，并可一键转给负责人", fontsize=9.6, color=INK)
ax.text(0.5, 0.2, "每年：年初 AI 帮老板把年度目标拆到部门和月份，之后每天都按这张目标表盯", fontsize=9.6, color=INK)
ax.set_xlim(0.3, 13.6); ax.set_ylim(0.0, 6.3); ax.axis("off")
save(fig, "fig-wb-rhythm")

# 4. 安装与初始化 ----------------------------------------------------------
fig, ax = plt.subplots(figsize=(13, 3.6))
steps = [
    ("① 扫码安装", "管理员扫码授权\n选可见范围", "约 3 分钟 · 客户自己", NAVY, "navy"),
    ("② 定目标", "AI 在企微里问老板\n年度目标、最担心什么", "约 10 分钟 · AI 引导", TEAL, "teal"),
    ("③ 认人", "AI 问「回款谁负责」\n老板从通讯录点选", "约 5 分钟 · AI 引导", TEAL, "teal"),
    ("④ 接数据", "先上传 12 个月 Excel\nERP 接口另行配置", "Excel 10 分钟\nERP 由我们远程配", PURPLE, "purple"),
    ("⑤ 第一份晨报", "次日早上收到\n开始按目标盯", "", AMBER, "amber"),
]
for i, (t, d, who, c, k) in enumerate(steps):
    x = 0.2 + i * 2.6
    box(ax, x, 1.0, 2.25, 1.75, "", F[k], c)
    ax.text(x + 1.125, 2.45, t, ha="center", va="center", fontsize=11, weight="bold", color=c)
    ax.text(x + 1.125, 1.65, d, ha="center", va="center", fontsize=9, color=INK, linespacing=1.4)
    if who:
        ax.text(x + 1.125, 0.6, who, ha="center", va="center", fontsize=8.6, color=GREY, linespacing=1.3)
    if i < len(steps) - 1:
        arrow(ax, x + 2.25, 1.875, x + 2.6, 1.875)
ax.text(0.2, 3.15, "试点阶段由顾问远程陪老板做一次（约 1 小时）；正式产品目标：小公司 15 分钟自助完成", fontsize=10, color=INK)
ax.set_xlim(0.1, 13.1); ax.set_ylim(0.25, 3.4); ax.axis("off")
save(fig, "fig-wb-onboard")
print("ok")
