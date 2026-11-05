const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType,
  WidthType, ShadingType, BorderStyle, LevelFormat, PageBreak, Footer, Header, PageNumber, HeadingLevel,
} = require("docx");

const FIG = process.argv[2];
const OUT = process.argv[3];

const NAVY = "1F3A68", TEAL = "0B6E5C", AMBER = "B9770E", GREY = "6B7280", LIGHT = "EEF3F8", SOFT = "E6F6F1", WARN = "FFF4E2";
const FONT = { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei", cs: "Arial" };
const W = 9638; // content width DXA (A4, 2cm margins)

const sizeOf = (p) => { const b = fs.readFileSync(p); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };

function runs(text, base = {}) {
  // **bold** markup
  const out = [];
  text.split(/(\*\*[^*]+\*\*)/).forEach((t) => {
    if (!t) return;
    if (t.startsWith("**")) out.push(new TextRun({ ...base, text: t.slice(2, -2), bold: true, font: FONT }));
    else out.push(new TextRun({ ...base, text: t, font: FONT }));
  });
  return out;
}
const P = (text, opt = {}) => new Paragraph({ children: runs(text, opt.run || {}), spacing: { after: 120, line: 320 }, alignment: opt.align, ...(opt.para || {}) });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: "bul", level: lvl }, children: runs(t), spacing: { after: 60, line: 300 } });
const N = (t, ref = "num") => new Paragraph({ numbering: { reference: ref, level: 0 }, children: runs(t), spacing: { after: 60, line: 300 } });
const Caption = (t) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 240 }, children: [new TextRun({ text: t, font: FONT, size: 18, color: GREY })] });
const PB = () => new Paragraph({ children: [new PageBreak()] });

function Img(file, widthPx = 640) {
  const p = path.join(FIG, file);
  const s = sizeOf(p);
  const h = Math.round(widthPx * s.h / s.w);
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, keepNext: true,
    children: [new ImageRun({ type: "png", data: fs.readFileSync(p), transformation: { width: widthPx, height: h },
      altText: { title: file, description: file, name: file } })] });
}

function ImgGrid(items, px = 290) {
  const nb = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const nbs = { top: nb, bottom: nb, left: nb, right: nb };
  const half = W / 2;
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(new TableRow({ cantSplit: true, children: items.slice(i, i + 2).map(([f, cap]) => {
      const p = path.join(FIG, f); const sz = sizeOf(p);
      return new TableCell({ width: { size: half, type: WidthType.DXA }, borders: nbs, margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: fs.readFileSync(p), transformation: { width: px, height: Math.round(px * sz.h / sz.w) }, altText: { title: f, description: cap, name: f } })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 120 }, children: [new TextRun({ text: cap, font: FONT, size: 17, color: GREY })] })] });
    }) }));
  }
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [half, half], rows });
}
const border = { style: BorderStyle.SINGLE, size: 4, color: "C9D3E0" };
const borders = { top: border, bottom: border, left: border, right: border };
function Tbl(header, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (t, i, isHead) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA }, borders,
    shading: isHead ? { fill: NAVY, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    children: String(t).split("\n").map((line) => new Paragraph({ spacing: { after: 0, line: 280 },
      children: runs(line, isHead ? { bold: true, color: "FFFFFF", size: 19 } : { size: 19 }) })),
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, cantSplit: true, children: header.map((h, i) => cell(h, i, true)) }),
      ...rows.map((r) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, i, false)) }))],
  });
}
function Box(lines, fill = SOFT, edge = TEAL) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: fill };
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: true, children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR, color: "auto" },
    borders: { top: b, bottom: b, right: b, left: { style: BorderStyle.SINGLE, size: 24, color: edge } },
    margins: { top: 120, bottom: 120, left: 200, right: 200 },
    children: lines.map((l) => new Paragraph({ spacing: { after: 60, line: 300 }, children: runs(l) })) })] })] });
}
const Gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });

// ---------------- content ----------------
const c = [];

// cover
c.push(new Paragraph({ spacing: { before: 1800, after: 120 }, children: [new TextRun({ text: "极增科技 · 极增商界", font: FONT, size: 24, color: TEAL, bold: true })] }));
c.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "AI 企业分析报告", font: FONT, size: 56, bold: true, color: NAVY })] }));
c.push(new Paragraph({ spacing: { after: 480 }, children: [new TextRun({ text: "产品方案", font: FONT, size: 44, bold: true, color: NAVY })] }));
c.push(P("面向 100–150 人成长型企业 · AI 辅助分析 + 人工审校", { run: { size: 24, color: GREY } }));
c.push(P("版本 v0.1 ｜ 2026 年 11 月 5 日", { run: { size: 22, color: GREY } }));
c.push(Gap());
c.push(Img("s-cover-01.png", 300));
c.push(Caption("报告模板参考：奥托立夫战略评估报告（样例第 1 页）"));
c.push(PB());

// 0
c.push(H1("一、一页总结"));
c.push(Box([
  "**做什么：**面向 100–150 人成长型企业的「AI 辅助企业分析报告」。企业在线答题、上传资料，AI 收集外部信息、逐题打分、起草报告，再由审校人复核后交付。",
  "**报告长什么样：**完全参照奥托立夫样例的结构和版式（六维 24 题、八域 32 项、四象限、三地平线、证据分级），约 20 页。原问卷针对成熟期企业，我们改成「通用生命周期版」：同一套题判断企业处在哪个阶段，处方随阶段变化。",
  "**第一期上线两档：**免费简版（老板 15 分钟自测，全自动，用于获客）和标准报告（管理层多人作答 + 资料上传 + AI 起草 + 人工审校，目标 72 小时交付）。",
  "**AI 的定位：**AI 负责收集、整理、建议分、起草和自查，**人负责最终判断**。分数由程序按规则计算；AI 写的每个数字都必须注明出处，没有出处的只能标为「C 级假设」。",
  "**模型：**测试阶段用 DeepSeek，正式用阿里云百炼；预留**本地部署千问 Qwen3.8-27B** 的保密选项，数据不出公司。",
  "**排期：**约 10 周做到试点（给 3–5 家种子客户出真实报告），第一步是把题库和评分标准定下来。",
]));
c.push(Gap());
c.push(H2("已确认的决定（2026-11-05）"));
c.push(Tbl(["事项", "决定"], [
  ["题库来源", "从奥托立夫样例反推题库和评分标准，再由内部审校人校准"],
  ["适用阶段", "通用生命周期版：同一套题判定阶段，处方随阶段变化"],
  ["第一期范围", "免费简版 + 标准报告（深度诊断放后续）"],
  ["审校人", "初期由内部（产品负责人或老板）审校，后台从简"],
  ["八域命名", "以报告为准，官网报告页跟着改"],
  ["数据来源", "管理层多人问卷、企业上传资料、外部企业数据接口、AI 联网搜索，四种都用"],
  ["大模型", "测试先用 DeepSeek，正式用阿里云百炼；本地 Qwen3.8-27B 作为保密选项，评测后决定"],
], [2200, 7438]));
c.push(PB());

// 1
c.push(H1("二、产品定位"));
c.push(Tbl(["项目", "内容"], [
  ["目标客户", "100–150 人的成长型企业，决策人是老板或总经理"],
  ["客户要解决的问题", "企业现在处在哪个阶段？哪里卡住了？接下来先做哪三件事？"],
  ["和传统咨询的区别", "传统诊断要 2–4 周、费用几万到几十万；我们用 AI 把交付压到 72 小时，价格降一个数量级，审校人只把关关键判断"],
  ["和纯 AI 报告的区别", "有方法论（六维、八域、四象限）、有证据分级、有人工审校，每条结论都能追溯到出处"],
  ["和后续产品的关系", "报告里的「三条可验收动作」和行动计划，可以导入「经营工作台」持续跟进"],
], [2400, 7238]));

// 2
c.push(H1("三、报告模板（以奥托立夫样例为蓝本）"));
c.push(H2("3.1 报告结构"));
c.push(Tbl(["章节", "内容", "样例页码"], [
  ["封面", "企业名称、4 个关键数字（六维总分、阶段判定、两个关键经营指标）、评估框架、基准日、免责声明", "1"],
  ["评估摘要", "总分、阶段、四象限位置、八域均分；**五条结论**（每条有依据、含义、证据等级）；处方一句话", "3–4"],
  ["一、企业基本情况", "企业档案卡；业务、区域、客户结构；**资料完备度盘点**（决定报告可信度）", "5–6"],
  ["二、生命周期六维诊断", "6 个维度各 4 题，共 24 题，每题 1–5 分，附证据和等级；合计 120 分，判定阶段", "7–9"],
  ["三、战略能力八域评估", "8 个领域各 4 项，共 32 项；每项打现状 S、对标 B、未来重要性 I；缺口 = I − S；雷达图", "10–13"],
  ["四、战略更新度与三地平线", "H1 核心 / H2 相邻 / H3 新兴业务的资源占比（现状 vs 建议）；更新度打分", "14"],
  ["五、核心能力筛选", "四条标准（客户价值、相对优势、难以模仿、可延展）筛核心能力，登记「负债面」", "15–16"],
  ["六、执行约束与 RACE", "资金、人才、见效窗口三项约束；可靠度、认同度、清晰度、支持度四项自评", "17"],
  ["七、开放题与假设登记", "最不该丢的业务、最该砍的投入、最怕的竞争变量；所有 C 级判断登记为待验证假设", "18"],
  ["风险提示", "「这个结论可能错在哪」：反向证据及其对结论的影响", "19"],
  ["结论与建议", "**三条可验收的战略动作**（量化口径、验收时点、责任人）；需要企业补充的资料清单", "20"],
  ["附录", "A 评分汇总与判定区间；B 四象限图；C 证据分级汇总", "21–23"],
], [2300, 6238, 1100]));
c.push(Gap());
c.push(P("下面是样例报告的几页，用来直观感受成品的样子："));
c.push(ImgGrid([
  ["s-summary-03.png", "样例第 3 页：一页结论（总分、象限与五条判断）"],
  ["s-sixdim-07.png", "样例第 7 页：六维逐题评分，附证据和 A/B/C 等级"],
  ["s-radar-13.png", "样例第 13 页：八域「现状 vs 未来要求」雷达对比"],
  ["s-actions-20.png", "样例第 20 页：三条可验收动作 + 信息补充清单"],
]));
c.push(H2("3.2 报告里的三套评分模型"));
c.push(Img("fig-models.png", 640));
c.push(Caption("图 1　三套评分模型（图中为奥托立夫样例数据）"));
c.push(P("**① 六维定阶段。**六个维度共 24 题。注意：**分越高代表越接近成熟期，不代表经营越好**。例如「近三年新品收入占比低」在这套题里记高分，因为这是成熟期的特征。所以六维总分的作用是判断企业处在哪个阶段："));
c.push(Tbl(["总分", "阶段", "处方方向"], [
  ["< 72", "成长期", "规模复制优先，避免过早分散资源"],
  ["72–83", "扩张后期", "规模复制 + 组织建设，先不急于讲第二曲线"],
  ["84–95", "成熟临界", "补组织能力，验证第二曲线，暂不收缩主业"],
  ["≥ 96", "典型成熟期", "效率再定义 + 第二曲线 + 资本配置"],
], [1500, 2000, 6138]));
c.push(P("我们的客户大多在前两个区间。成长期内部是否再细分出「初创期」，在题库校准时决定。", { run: { color: GREY, size: 19 } }));
c.push(P("**② 八域看缺口。**32 项能力，每项打现状 S、对标 B、未来重要性 I 三个分，缺口 = I − S。缺口最大的几项就是最该投入的方向。雷达图上蓝线是现状、橙线是未来要求，**看形状比看面积更重要**。"));
c.push(P("**③ 动能 × 更新度定象限。**增长动能（由六维的 A 维换算）和战略更新度组成四象限：① 成长/扩张期、② 扩张后期、③ 成熟期、④ 停滞/衰退前夜，每个象限对应不同的处方。"));

c.push(H2("3.3 证据分级：报告可信度的核心"));
c.push(Img("fig-evidence.png", 620));
c.push(Caption("图 2　四类数据来源如何对应到 A/B/C 证据等级"));
c.push(Tbl(["等级", "含义", "在我们产品里的来源"], [
  ["A 硬数据", "有文件或数据直接支撑", "企业上传的财务报表、合同、制度；外部接口返回的工商、专利、招投标等官方记录"],
  ["B 结构化判断", "多个来源交叉印证", "多位管理层答案一致；行业报告或公开数据推算；联网搜索到的可信来源"],
  ["C 推断假设", "只能推测，尚未验证", "AI 基于结构的推演；单人回答且无资料佐证；资料缺失时的估算"],
], [1700, 2600, 5338]));
c.push(Gap());
c.push(Box(["**规则：**每个分数、每条结论都必须标等级；所有 C 级判断必须登记进「假设清单」并写明验证方式；全报告的 A/B/C 比例决定封面上的「置信度」（高 / 中高 / 中 / 低）。"], LIGHT, NAVY));

c.push(H2("3.4 从上市公司样例到中小企业的改动"));
c.push(Tbl(["样例的做法", "我们的做法"], [
  ["数据来自年报、季报、评级报告", "数据来自管理层问卷、企业上传的报表、外部企业数据接口和 AI 联网搜索"],
  ["题目针对成熟期（ROCE、回购、董事会独立性等）", "改成中小企业语言：如「投入资本回报」→「投入产出与回本周期」，「回购与分红」→「利润分配与再投资」，「董事会制衡」→「决策机制与制衡」"],
  ["对标对象是最强竞争对手（ZF）", "由企业填写最强的 1–2 个竞争对手，AI 收集公开信息给出对标分，审校人确认；逐步积累同行业、同规模基准库"],
  ["管理层访谈留到下一步", "标准报告用多人问卷代替访谈；深度诊断（后续）再加入访谈"],
  ["一人分析", "**新增「老板与管理层认知差」分析**：同一道题老板和高管打分差距大的地方，往往就是管理问题所在"],
], [3600, 6038]));


// 3 tiers
c.push(H1("四、第一期的两档产品"));
c.push(Tbl(["", "免费简版", "标准报告"], [
  ["用途", "官网获客，留下线索", "核心收费产品"],
  ["谁来答", "老板一人", "老板 + 3–5 位高管，各自作答"],
  ["题量", "约 20 题，15 分钟\n（六维每维 2 题 + 八域每域 1 题）", "六维 24 题 + 八域 32 项 + 开放题，每人约 40 分钟"],
  ["资料", "不需要", "上传近三年财务报表、组织架构、核心制度等（可选）"],
  ["外部数据", "只查工商基本信息", "企业数据接口 + AI 联网搜索"],
  ["产出", "阶段判定、八域雷达图、3 条关键提示，在线查看", "完整报告约 20 页，在线查看 + PDF 下载 + 线上解读"],
  ["人工审校", "否，全自动；注明「AI 自动生成、仅供参考」", "是，审校人逐条复核后才交付"],
  ["交付时间", "即时", "目标 72 小时（从资料齐全起算）"],
  ["转化", "结果页引导「升级为标准报告」", "结尾引导深度诊断或经营工作台"],
], [1700, 3700, 4238]));
c.push(P("**深度诊断**（顾问入企访谈 + 专项方案）放在后续版本，复用同一套报告引擎，再加上访谈录音转写和证据提取。"));

// 4 flow
c.push(H1("五、标准报告的生产流程"));
c.push(Img("fig-flow.png", 640));
c.push(Caption("图 3　标准报告生产流程（按客户 / AI / 程序 / 审校人分泳道）"));
c.push(Tbl(["#", "环节", "谁来做", "做什么", "耗时"], [
  ["1", "下单与建档", "客户", "付款或获得试用资格；填写企业名称、行业、规模、主要竞争对手", "5 分钟"],
  ["2", "邀请作答", "客户", "老板发链接邀请高管作答；系统提醒并追踪进度", "1–3 天"],
  ["3", "上传资料", "客户", "上传报表、组织架构、制度等，系统提示还缺什么", "并行"],
  ["4", "资料解析", "AI", "从文件里提取收入、毛利、现金流、人数等关键数字，标注页码出处", "分钟级"],
  ["5", "外部信息", "AI + 接口", "查询工商、股权、专利、招投标、舆情；联网搜索行业和竞品", "分钟级"],
  ["6", "逐题建议分", "AI", "综合问卷、资料、外部信息，对 24 题和 32 项给出建议分、理由、证据和等级；分析多人差异", "分钟级"],
  ["7", "计分与判定", "程序", "按固定规则算总分、阶段、缺口、象限、置信度，**不交给 AI 算**", "秒级"],
  ["8", "报告起草", "AI", "起草五条结论、各章节判断、三地平线、核心能力、RACE、假设清单、反向证据、三条动作", "分钟级"],
  ["9", "自动质检", "AI + 程序", "检查数字与出处是否一致、分数与文字是否矛盾、C 级是否都进假设清单、有无空话", "分钟级"],
  ["10", "人工审校", "审校人", "逐条接受 / 修改 / 驳回，重点看五条结论和三条动作；所有修改留痕", "2–4 小时"],
  ["11", "交付", "系统", "生成在线报告和 PDF，通知客户，预约线上解读会", "即时"],
], [500, 1500, 1300, 5038, 1300]));


// 5 AI
c.push(H1("六、AI 在哪里辅助、在哪里不让它做"));
c.push(Tbl(["环节", "AI 做什么", "不让 AI 做什么", "人怎么把关"], [
  ["问卷", "按行业改写题目说明；答案模糊时追问一句；检查前后矛盾", "不能替企业作答", "题库由审校人定稿"],
  ["资料解析", "读报表、PDF、Excel，提取数字并标注出处页码", "不能补全缺失数字", "审校时点开出处核对"],
  ["外部信息", "整理接口数据；联网搜索并摘要", "搜索结果不能作 A 级证据", "审校人可删除不可信来源"],
  ["打分", "给出建议分 + 理由 + 证据 + 等级", "不能算总分、阶段、象限", "审校人确认或改分，改分要写原因"],
  ["起草", "写结论、含义、处方、风险提示、假设清单", "不写无出处的数字；不给投资建议", "审校人逐条确认"],
  ["质检", "自查矛盾、空话、缺漏", "—", "未通过项在审校后台标红"],
  ["学习改进", "汇总审校修改，找出 AI 常错的地方", "不自动改题库和规则", "我们定期调整提示词和题库"],
], [1300, 3200, 2400, 2738]));
c.push(Gap());
c.push(Box([
  "**四条硬规则**",
  "1. 每个数字必须有出处（问卷第几题、哪份文件第几页、哪个接口），否则只能写成 C 级假设。",
  "2. 所有计分、区间判定由程序完成，结果可以复算。",
  "3. 每条结论都要配「可能错在哪」的反向证据，避免只说好话或只说坏话。",
  "4. 付费报告必须经过人工审校才能交付；审校前客户看不到草稿。",
], WARN, AMBER));

// 6 data
c.push(H1("七、数据来源"));
c.push(Tbl(["来源", "内容", "证据等级", "说明"], [
  ["管理层多人问卷", "24 题 + 32 项 + 开放题", "单人 C；多人一致 B；有资料支撑 A", "可分析老板与团队的认知差"],
  ["企业上传资料", "财务报表、组织架构、制度、合同样本", "A", "AI 自动提取，标注页码"],
  ["外部企业数据接口", "工商、股权、分支机构、专利、招投标、司法、舆情", "A（登记类）/ B（舆情类）", "企查查、天眼查等按次付费，需询价签约"],
  ["AI 联网搜索", "公开新闻、行业报告、竞品信息", "B 或 C", "保留来源链接，审校人可剔除"],
], [2000, 3000, 2100, 2538]));


// 7 tech
c.push(H1("八、系统组成与技术方案"));
c.push(Img("fig-arch.png", 640));
c.push(Caption("图 4　系统组成：两个前端 + 一个后端 + 数据库"));
c.push(Tbl(["部分", "选择", "原因"], [
  ["后端", "Python（FastAPI）", "读 PDF、Excel 和调用 AI 的生态最成熟"],
  ["数据库", "PostgreSQL", "结构化数据和 JSON 都能存，以后可迁阿里云 RDS"],
  ["前端", "先用与官网一致的轻量方案；问卷和审校后台单独做页面", "上线快；工作台阶段再上完整前端框架"],
  ["报告 PDF", "HTML 模板 + 无头浏览器导出", "版式能做到和样例一致，中文排版好"],
  ["图表", "雷达图、四象限图由程序生成", "清晰、可复现"],
  ["大模型", "测试用 DeepSeek，正式用阿里云百炼（可调用千问、DeepSeek 等）；预留本地 Qwen3.8-27B", "国内模型，数据不出境；可申请阿里云「OPC 创新助力计划」Token 补贴"],
  ["服务器", "**Linux 服务器，建议 2 核 4G**", "现在的试用机是 Windows、到期也早，不适合；PDF 导出和数据库需要 4G 内存"],
], [1500, 4300, 3838]));

c.push(H2("8.1 本地部署 Qwen3.8-27B（保密方案）"));
c.push(P("为了让企业数据不经过任何第三方模型服务商，可以在本地部署开源可商用的 Qwen3.8-27B。系统的「模型切换层」从一开始就同时支持云端和本地，所以是否本地化**用评测结果决定，不影响开发进度**。"));
c.push(Img("fig-local.png", 600));
c.push(Caption("图 5　本地模型部署方式：本地机器主动领取任务，数据只在自己的服务器和机器之间流转"));
c.push(Tbl(["项目", "说明"], [
  ["保密效果", "企业资料只存在我们自己的服务器和机器上，不发送给任何模型服务商；可作为面向保密要求高的客户的卖点"],
  ["硬件需求", "27B 模型 4-bit 量化后权重约 16–18GB，加上长文档上下文，建议 **48GB 以上显存，或 64GB 以上统一内存的 Mac**。可选 64–128GB 的 Mac Studio（省心安静、速度一般），或配 48GB 显卡的 GPU 主机（更快）。现在这台 16GB 的 MacBook 跑不动"],
  ["速度", "报告是后台批量生成，不需要实时。估计一份标准报告在 Mac Studio 上需几十分钟到一两小时，在 72 小时时限内可以接受"],
  ["质量", "资料提取、逐题打分这类结构化任务一般够用；五条结论、处方这类深度写作需要与云端旗舰模型实测对比"],
  ["部署位置", "网站和数据库在阿里云；本地机器主动去服务器领任务、回传结果，不需要对外开放端口。也可租阿里云 GPU 服务器，但月费较高"],
], [1700, 7938]));
c.push(Gap());
c.push(Box([
  "**建议做法：**M2 阶段用同一家测试企业，分别跑云端旗舰模型和本地 Qwen3.8-27B，由审校人盲评对比。",
  "· 质量够用 → 全部本地化，再采购硬件；",
  "· 不够 → 混合模式：报表提取等敏感环节在本地，起草时只把脱敏后的结构化摘要发给云端；对有保密要求的客户提供「全本地」选项。",
  "**评测之前不要采购硬件。**使用云端模型时，也可以通过与服务商签订数据不用于训练的协议，从合同层面保护数据。",
], SOFT, TEAL));

// 8 security
c.push(H1("九、数据安全与合规"));
c.push(B("企业资料加密存储，只用于生成该企业的报告；客户可以申请删除。"));
c.push(B("审校后台按账号授权，所有查看和修改都留记录。"));
c.push(B("发送给云端模型的内容尽量脱敏（企业名用代号）；和服务商确认数据不用于训练。"));
c.push(B("报告注明「基于企业提供资料与公开信息整理推演，不构成投资建议」，沿用样例的声明。"));
c.push(B("上线前准备好用户协议和隐私政策，支付审核也会检查。"));


// 9 timeline
c.push(H1("十、里程碑与排期（约 10 周到试点）"));
c.push(Img("fig-timeline.png", 640));
c.push(Caption("图 6　里程碑排期"));
c.push(Tbl(["阶段", "时间", "交付物", "怎么算完成"], [
  ["M0 方法论定稿", "第 1–2 周", "从样例反推的题库 v1（24 题 + 32 项 + 每题 1–5 分评分标准）、免费简版 20 题、判定区间、证据规则", "产品负责人和老板审定；用奥托立夫数据回填，分数能对上（105/120、八域均分 3.78）"],
  ["M1 报告引擎", "第 3–4 周", "数据结构、计分引擎、报告模板、PDF 导出", "输入奥托立夫数据，生成的报告与样例结构一致"],
  ["M2 AI 流水线", "第 5–7 周", "资料解析、外部信息、逐题建议分、起草、质检；云端 vs 本地模型盲评", "2–3 家企业试跑，审校修改量可接受"],
  ["M3 问卷与审校后台", "第 7–8 周", "多人问卷、资料上传、审校后台、账号", "走通一份报告的完整流程"],
  ["M4 免费简版上线", "第 9 周", "官网入口、结果页、留资", "官网可自助做简版"],
  ["M5 试点", "第 10 周起", "3–5 家种子客户的标准报告", "收集反馈，校准题库和提示词"],
], [1900, 1300, 3400, 3038]));
c.push(P("**前置条件：**Linux 服务器（M1 前）；正式域名接入备案和支付开通（收费前）；外部数据接口签约（M2 前）。"));

// 10 cost
c.push(H1("十一、成本估算（需试跑后实测）"));
c.push(Tbl(["项目", "估算"], [
  ["大模型调用", "每份标准报告预计几元到几十元（取决于资料多少）；免费简版每份几分到几毛钱；本地模型则只有电费和硬件折旧"],
  ["外部数据接口", "按调用次数付费，每份报告预计 10–30 次查询，需向服务商询价"],
  ["服务器", "Linux 2 核 4G，活动价约每年几百元"],
  ["本地模型硬件（可选）", "评测通过后再定：Mac Studio 或 GPU 主机，一次性投入"],
  ["审校人时", "目标每份 2–4 小时，是最主要的成本，也是 AI 重点要压缩的部分"],
], [2600, 7038]));

// 11 risks
c.push(H1("十二、主要风险与对策"));
c.push(Tbl(["风险", "对策"], [
  ["题库从报告反推，评分标准可能不够准", "M0 用奥托立夫回填校准；试点期按审校修改持续调整；题库做版本管理"],
  ["AI 编造数字或结论", "出处强制规则 + 程序计分 + 自动质检 + 人工审校"],
  ["中小企业资料少，报告空洞", "资料完备度盘点写进报告，坦白置信度；用多人问卷和认知差弥补"],
  ["审校人手有限，72 小时难保证", "审校后台把五条结论、三条动作、改分项排在最前；控制试点数量"],
  ["对标数据冷启动", "先用客户指定的竞品 + 公开信息；每份报告沉淀一份行业样本"],
  ["本地模型质量不足", "模型切换层兼容云端；评测后再决定，必要时采用混合模式"],
], [3600, 6038]));

// 12 asks
c.push(H1("十三、需要产品负责人和老板确认或提供的"));
c.push(N("题库 v1 出来后，**审定措辞和评分标准**（M0 最关键的一步）。"));
c.push(N("免费简版和标准报告的**价格**。"));
c.push(N("用于试点的 **3–5 家种子客户**。"));
c.push(N("外部企业数据接口用哪一家（企查查 / 天眼查等），需以公司名义签约。"));
c.push(N("购买一台 **Linux 服务器（2 核 4G）**。"));
c.push(N("官网报告页同步修改：八域名称改为报告的八域；「五个阶段」的说法与报告判定区间一致。"));

// ---------------- document ----------------
const doc = new Document({
  creator: "极增科技", title: "AI 企业分析报告 · 产品方案",
  styles: {
    default: { document: { run: { font: FONT, size: 21, color: "1A1A1A" } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 32, bold: true, color: NAVY },
        paragraph: { spacing: { before: 360, after: 180 }, keepNext: true, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 26, bold: true, color: TEAL },
        paragraph: { spacing: { before: 240, after: 120 }, keepNext: true, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 480, hanging: 280 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 480, hanging: 320 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "极增科技 · AI 企业分析报告产品方案 v0.1", font: FONT, size: 16, color: GREY })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "第 ", font: FONT, size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY }),
      new TextRun({ text: " 页 / 共 ", font: FONT, size: 16, color: GREY }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: GREY }),
      new TextRun({ text: " 页", font: FONT, size: 16, color: GREY })] })] }) },
    children: c,
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("written", OUT, buf.length); });
