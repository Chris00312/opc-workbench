# REPORT_SPEC — AI 企业分析报告（产品 1）技术规格

Last Updated: 2026-11-05 ｜ Status: v0.1 草案，M0 前，题库未校准
Human doc: `docs/产品规划/AI企业分析报告-产品方案.md` ｜ Template: `docs/产品规划/样例/奥托立夫战略评估报告.pdf`（23 页）

## 1. Scope (phase 1)
- Tiers: `lite`（免费简版，老板单人，~20 题，全自动，无审校）+ `standard`（多人问卷 + 上传资料 + 外部数据 + AI 起草 + 人工审校，SLA 72h）。`deep`（访谈）= later.
- Target: 100–150 人成长型企业，非上市，无公开财报。
- Lifecycle-generic: 同一套题判阶段（原问卷针对成熟期，已决定改造为通用版）。
- Reviewer: 内部 1–2 人（用户/老板）。审校后台从简。
- Models: dev = DeepSeek official API; prod = 阿里云百炼。Local open-weight Qwen ~27B = candidate, decide by M2 blind eval. MUST go through a provider abstraction (`chat(messages, schema)`), no vendor SDK calls in business code.

## 2. Report sections (order = template)
`cover` → `summary`(total, stage, quadrant, 8D avg S, 5 conclusions, one-line prescription) → `p1_profile`(档案卡, 结构, 资料完备度) → `p2_six_dim`(24 items) → `p3_eight_domain`(32 items + radar) → `p4_horizons`(H1/H2/H3 current vs suggested + 更新度 4 判定项) → `p5_core_capabilities`(四标准筛选 + 负债面) → `p6_execution`(三约束 + RACE) → `p7_open_and_hypotheses`(3 open Q + C-grade hypotheses H1..Hn with verify method) → `risks`(反向证据 ≥3 + 坦白一句) → `actions`(exactly 3: 动作/量化口径/验收时点与责任人 + 信息补充清单) → `appendix_a`(score table + intervals + key financials) → `appendix_b`(quadrant chart) → `appendix_c`(evidence grade summary).
Lite output = stage + 8D radar (S only) + 3 tips.

## 3. Six-dimension lifecycle scale (24 items, 1–5, HIGHER = MORE MATURE, not "better")
IDs `A1..F4`. Wording below = from sample; SME rewording pending (M0).
- A 增长动能: A1 近三年营收复合增长率｜A2 增长主要来源｜A3 获客成本与切换成本｜A4 核心市场渗透率
- B 盈利与现金流: B1 毛利率三年走势｜B2 经营现金流/净利润｜B3 资本开支性质｜B4 投入回报相对资本成本（SME: 投入产出与回本周期）
- C 市场地位: C1 份额与竞争格局｜C2 定价权｜C3 行业集中度｜C4 替代威胁（反向保护题）
- D 产品与创新: D1 近三年新品收入占比（占比低=高分）｜D2 研发强度｜D3 核心产品生命周期位置｜D4 产品迭代方式
- E 组织与治理: E1 管理层级与决策链｜E2 流程与制度成熟度｜E3 关键人依赖｜E4 核心人才流失与高管更替
- F 战略与资本: F1 战略规划机制｜F2 新业务(H2/H3)预算占比｜F3 资本动作（SME: 利润分配与再投资）｜F4 战略议题导向
Total /120 → stage (deterministic, code): `<72 成长期` · `72–83 扩张后期` · `84–95 成熟临界` · `>=96 典型成熟期`. Sub-split of 成长期 (初创/成长) = TBD at calibration.
Lite: 12 items (2 per dim, TBD which) → scale ×2 to /120.

## 4. Eight-domain capability (32 items, each S/B/I 1–5)
S=现状, B=对标（客户指定最强竞品；sample used ZF LIFETEC）, I=未来 3–5 年重要性; gap = I − S (positive = need). Domain avg S. IDs prefixed `X-` to avoid clash with six-dim F.
- 财务与资本 X-F1 收入规模与覆盖｜X-F2 毛利率与成本结构｜X-F3 资本回报率｜X-F4 现金流与资本配置纪律
- 市场与客户 X-M1 份额与客户覆盖｜X-M2 客户结构多样性｜X-M3 增量/新兴市场客户覆盖｜X-M4 定价与议价能力
- 运营与供应链 X-O1 产能/交付布局｜X-O2 产能利用率与柔性｜X-O3 垂直整合｜X-O4 供应链韧性
- 技术与创新 X-T1 核心技术领先度｜X-T2 数字化/软件能力｜X-T3 相邻技术集成｜X-T4 新形态/新业务产品
- 组织与人才 X-P1 管理层稳定与继任｜X-P2 管理团队专业化｜X-P3 核心专业人才密度｜X-P4 成本文化与精益
- 信息与数字化 X-I1 ERP 与数据底座｜X-I2 数字化研发/业务工具｜X-I3 自动化｜X-I4 数据驱动决策
- 流程与协同 X-R1 项目管理｜X-R2 质量与风险控制｜X-R3 跨部门/区域协同｜X-R4 客户响应速度
- 战略与治理 X-S1 战略清晰度｜X-S2 利润分配与再投资｜X-S3 决策机制与制衡｜X-S4 外部环境与合规
Website `website/report.html` uses a DIFFERENT 八域 list → decided: report wins, website must be updated (TODO).

## 5. Other models (code computes, AI drafts text)
- Momentum = 6 − avg(A1..A4) (sample: A=17/20 → 4.25 → momentum ≈1.8). Renewal (更新度) = 1–5 from 4 判定项 (新增战略方向/新业务独立号位与损益/新业务可验收/资本动作指向增长还是回报); AI proposes, reviewer confirms.
- Quadrant: ①成长/扩张 = 动能高×更新度高 ②扩张后期 = 动能高×更新度低 ③成熟 = 动能低×更新度高 ④停滞 = 动能低×更新度低. Thresholds TBD; sample put 动能1.8/更新度2.2 in ③ near ④ border → renewal threshold ≤2.2 (tentative 2.0), momentum threshold tentative 3.0.
- Horizons: H1/H2/H3 current % vs suggested %.
- Core capability screen: each candidate × {客户价值, 相对优势, 难以模仿, 可延展} → 核心/准核心/待建; healthy count 3–5; each core cap gets a 负债面 text.
- RACE: Reliability/Acceptance/Clarity/Support 1–5; avg ≥4.0 = 可全速执行.

## 6. Evidence & confidence
- Grade per score/claim: A 硬数据（上传文件、官方登记类接口）｜B 结构化判断（多人一致、行业数据、可信检索）｜C 推断（AI 推演、单人回答无佐证）.
- Every number in text MUST carry `source_ref` (answer id / doc id+page / api call id / url). No source → must be C and appear in hypotheses list.
- Confidence (cover): from grade mix over 24 items. Tentative: 高 = A≥85% & C=0; 中高 = A≥65% & C≤10% (sample 17A/5B/2C → 中高); 中 = A≥40%; else 低. Calibrate.
- Multi-respondent: per item store each respondent's score; flag `perception_gap` when boss vs team mean differ ≥1.5 → feed into conclusions.

## 7. Pipeline (standard tier)
intake → invite respondents → upload docs → `parse_docs`(extract metrics w/ page refs) → `collect_external`(企业数据接口 + web search, keep URLs) → `suggest_scores`(per item: score, rationale, evidence_refs, grade; structured JSON) → `compute`(code: totals/stage/gaps/quadrant/confidence) → `draft_sections` → `qa_check`(numbers↔sources, score↔text contradictions, C→hypotheses, banned vague phrases, exactly 5 conclusions/3 actions) → reviewer accept/edit/reject (diff logged, edit reason required for score changes) → `render`(HTML→PDF, SVG radar/quadrant) → deliver.
All LLM calls: JSON schema-validated output, retry on invalid, prompt+response logged per assessment.

## 8. Data model (sketch)
Company · Assessment(tier, status, questionnaire_version, rules_version) · Respondent(role: owner/exec) · Answer(item_id, score, note) · Document(file, type, pages) · Evidence(kind, ref, grade, excerpt) · ItemScore(item_id, ai_score, final_score, rationale, evidence_ids[], grade, reviewer_note) · SectionDraft(section, ai_text, final_text) · ReviewEvent(diff, reason, by, at) · ReportVersion(html, pdf, published_at) · LlmCall(provider, model, tokens, cost).

## 9. Tech (proposed, not yet built)
Python FastAPI + PostgreSQL; files local → OSS later; worker pulls jobs (same worker can run on an office machine for local model, outbound only); report HTML template replicating sample look → headless Chromium PDF. Repo layout target: `apps/report/`, `server/`, `packages/methodology/` (versioned YAML/JSON question bank + rules). Needs a Linux server 2C4G (current Windows trial ECS unsuitable).

## 10. Acceptance for M0/M1
- M0: question bank v1 (24+32 items, 1–5 anchors each, lite 20 items) signed off by user/boss; back-fill Autoliv answers → totals match sample (six-dim 105 = 17/18/17/17/17/19; 8D S avg 3.78; ALV per-domain S avgs 4.25/3.75/4.25/3.00/4.50/4.25/3.75/4.00).
- M1: Autoliv structured data → rendered report with same sections/order as sample.
