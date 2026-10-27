// 增长极方法论：增长竞争五力 + 6 套增长系统。
// 来源：创越企业增长极官网（growthhubs.com.cn）存档，2026-10-25。体检题目为原型示例措辞。
window.GrowthModel = (() => {
  const FORCES = [
    { key: 'company', name: '公司力', hint: '战略与资源', qs: ['战略方向清晰，管理层有共识', '资金和资源能支撑未来 2–3 年的增长'] },
    { key: 'category', name: '品类力', hint: '赛道与心智', qs: ['所在品类仍在增长', '客户提到这个品类时会想到我们'] },
    { key: 'market', name: '市场力', hint: '渠道与份额', qs: ['渠道能覆盖主要目标客户', '近两年市场份额在提升'] },
    { key: 'product', name: '产品力', hint: '差异与创新', qs: ['产品或服务有明确的差异化', '新产品或新服务能持续贡献收入'] },
    { key: 'execution', name: '执行力', hint: '目标与协同', qs: ['目标能分解到部门和个人，并定期复盘', '跨部门协作顺畅，标准能落到一线'] }
  ];
  const STRUCTS = ['单一业务', '相关多元', '非相关多元'];
  const SIZES = ['中小型', '大中型'];
  const INTENTS = ['提升效率和利润', '跨区域扩张', '深耕细分市场', '增加新业务', '巩固行业地位', '建立长期壁垒'];

  // fit：官网标注的“针对公司类型”，[规模, 业务结构]
  const SYSTEMS = [
    { key: 'value', name: '业务价值链增长系统', intent: '提升效率和利润', forces: ['execution', 'product'],
      fit: [['中小型', '单一业务'], ['中小型', '相关多元']],
      els: ['定义价值链', '关键价值驱动因素', '客户需求分析', '业务流程优化', '资源整合与分配', '供应链管理', '运用技术', '衡量与指标体系'],
      camp: '业务价值链增长训练营' },
    { key: 'region', name: '跨区域增长系统', intent: '跨区域扩张', forces: ['market', 'execution'],
      fit: [['中小型', '单一业务'], ['中小型', '相关多元']],
      els: ['跨区域发展战略', '适应不同区域市场', '跨区域管理团队和流程', '供应链管理', '品牌和网络', '风险管理和合规'],
      camp: '跨区域增长训练营' },
    { key: 'niche', name: '利基市场增长系统', intent: '深耕细分市场', forces: ['category', 'product'],
      fit: [['大中型', '单一业务'], ['中小型', '相关多元']],
      els: ['寻找利基市场', '市场进入策略', '建立竞争优势', '品牌和信誉', '收集市场反馈', '监测竞争对手'],
      camp: '利基市场增长训练营' },
    { key: 'multi', name: '多业务（母合）增长系统', intent: '增加新业务', forces: ['company'],
      fit: [['大中型', '相关多元'], ['大中型', '非相关多元'], ['中小型', '相关多元']],
      els: ['界定并发展核心业务', '打造双核心能力', '复制商业模式', '并购整合与战略联盟', '动态战略管理'],
      camp: '多业务增长训练营' },
    { key: 'dominant', name: '主导性业务增长系统', intent: '巩固行业地位', forces: ['market', 'category'],
      fit: [['大中型', '相关多元']],
      els: ['客户长期关系', '持续创新和改进', '高效运营和交付', '合作网络', '市场营销和推广'],
      camp: '主导性业务增长训练营' },
    { key: 'sustain', name: '可持续增长组合系统', intent: '建立长期壁垒', forces: ['company', 'category'],
      fit: [['大中型', '非相关多元'], ['中小型', '相关多元']],
      els: ['无形资产', '转换成本', '网络效应', '成本优势', '规模优势'],
      camp: '可持续增长训练营' }
  ];

  const nameOf = (k) => FORCES.find((f) => f.key === k).name;

  // 每题 1–5 分，每项力 = 平均分 × 20，低于 60 视为短板
  const score = (ans) => FORCES.map((f) => {
    const a = ans[f.key];
    const v = Math.round(a.reduce((t, n) => t + n, 0) / a.length * 20);
    return { key: f.key, name: f.name, score: v, low: v < 60 };
  });

  const recommend = ({ struct, size, intent, weak }) => SYSTEMS.map((sys) => {
    const fits = sys.fit.some(([z, st]) => z === size && st === struct);
    const wants = sys.intent === intent;
    const fixes = sys.forces.filter((k) => weak.includes(k));
    const why = [];
    if (fits) why.push(`适合${size}${struct}企业`);
    if (wants) why.push(`对应「${intent}」`);
    if (fixes.length) why.push(`能补${fixes.map(nameOf).join('、')}短板`);
    return { ...sys, pts: (fits ? 3 : 0) + (wants ? 3 : 0) + fixes.length, why: why.join('；') || '可作为参考' };
  }).sort((a, b) => b.pts - a.pts);

  const byKey = (k) => SYSTEMS.find((s) => s.key === k);

  return { FORCES, STRUCTS, SIZES, INTENTS, SYSTEMS, score, recommend, byKey };
})();
