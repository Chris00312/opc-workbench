/* Growth Hub 企业增长赋能平台公共导航、页脚、首屏轮播与演示表单交互（原生 JS，无第三方依赖）。
   依据《产品与功能模块（完整版）V1.0》5.1 六大产品模块与备案主体对齐：上海领越人力资源服务中心。 */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  var PRODUCTS = [
    { id: 'insights', href: 'insights.html', name: '极增商界 · 内容服务平台' },
    { id: 'zhinao', href: 'zhinao.html', name: '极增智脑 · 四大智能体' },
    { id: 'workbench', href: 'workbench.html', name: '增长顾问 · 经营工作台' },
    { id: 'academy', href: 'academy.html', name: '增长培训与主题活动' },
    { id: 'solution', href: 'solution.html', name: 'AI 增长数据赋能解决方案' },
    { id: 'consulting', href: 'consulting.html', name: '增长咨询服务' },
    { id: 'tools', href: 'tools.html', name: 'AI 增长赋能工具（九大工具集）' }
  ];

  function drop(title, intro, links) {
    return '<div class="drop"><div class="container"><div class="drop-intro"><h4>' + title + '</h4><p>' + intro + '</p></div><div class="drop-list">' +
      links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + (l[2] || '') + '</a>'; }).join('') + '</div></div></div>';
  }

  function item(ids, href, label, fullTitle, intro, links) {
    return '<li class="has-drop"><a href="' + href + '" class="' + (ids.indexOf(page) >= 0 ? 'active' : '') + '">' + label + ' <i class="caret"></i></a>' + drop(fullTitle, intro, links) + '</li>';
  }

  var header =
    '<header class="nav" id="nav"><div class="container">' +
    '<a class="logo" href="index.html" aria-label="Growth Hub 企业增长赋能平台首页"><img class="logo-wordmark" src="assets/brand/logo-wordmark-light.png?v=20261116b" alt="Growth Hub" width="129" height="22"><span class="logo-sub">企业增长赋能平台</span></a>' +
    '<ul class="nav-links">' +
      item(['home'], 'index.html', '首页', 'Growth Hub · AI 驱动企业增长赋能平台',
        '面向一人公司（OPC）与成长期中小企业，以媒体内容与极增智脑双轮驱动，连接六大核心产品模块。',
        [['index.html#agents', '极增智脑 · 智能体入口'], ['index.html#products', '六大核心产品模块'], ['index.html#insights', '商界洞察精选'], ['index.html#cases', '典型应用场景'], ['index.html#membership', '会员权益与转化'], ['index.html#roadmap', '三期建设路线图']]) +
      item(['insights'], 'insights.html', '极增商界', '极增商界 · 内容服务与商界会员',
        '整合商界洞察、行业数据速览、深度报告与商界会员专栏（极增夜话、增长60秒、增长新锐、权益注册）。',
        [['insights.html#columns', '商界洞察 · 行业数据速览'], ['insights.html#latest', '深度报告与最新研究'], ['insights.html#community', '极增夜话 · 增长60秒 · 增长新锐'], ['insights.html#member', '会员注册与权益体系']]) +
      item(['zhinao', 'workbench', 'tools'], 'zhinao.html', '极增智脑', '极增智脑 · 智能体、工作台与九大赋能工具集',
        '涵盖四大智能体、统一入口「增长顾问 · 经营工作台」与覆盖企业全经营场景的九大 AI 增长赋能工具集。',
        [['workbench.html', '增长顾问 · 经营工作台', '<span class="badge new">V1</span>'], ['zhinao.html#content', '内容生成智能体', '<span class="badge hot">MVP</span>'], ['zhinao.html#diagnose', '增长诊断智能体', '<span class="badge hot">MVP</span>'], ['zhinao.html#data', '数据洞察智能体'], ['zhinao.html#ops', '运营自动化智能体'], ['tools.html', 'AI 增长赋能工具（九大工具集）', '<span class="badge new">V1</span>']]) +
      item(['academy'], 'academy.html', '培训活动', '增长培训服务与主题交流研讨会',
        '三层九级成长课程与四大核心学习方向，配合季度主题交流、月度专题研讨会与周度垂直沙龙。',
        [['academy.html#training', '三层九级增长培训体系'], ['academy.html#courses', '首席增长官 · 企业增长分析师'], ['academy.html#courses', '商业增长设计 · 商业模式创新'], ['academy.html#format', '线上录播 · 直播 · 小班工作坊'], ['academy.html#events', '主题交流与研讨会（季 / 月 / 周）'], ['academy.html#certification', '企业增长分析师能力认证规划']]) +
      item(['consulting'], 'consulting.html', '增长咨询', '增长咨询服务（AI 增长咨询工作台）',
        '按企业生命周期五大阶段划分战略咨询议题，采用「AI 辅助整理 + 专家主诊」模式，提供单次、季度与年度陪跑。',
        [['consulting.html#startup', '初创期企业增长战略咨询'], ['consulting.html#growth', '成长期企业增长战略咨询'], ['consulting.html#expansion', '扩张期企业增长战略咨询'], ['consulting.html#maturity', '成熟期企业增长战略咨询'], ['consulting.html#transform', '转型期企业增长战略咨询'], ['consulting.html#process', '咨询预约与六步交付流程']]) +
      item(['solution'], 'solution.html', '数据方案', 'AI 增长数据赋能解决方案',
        '围绕「数据诊断—模型构建—策略生成—效果追踪」四步流程，覆盖七大增长分析方向与三档交付方案。',
        [['solution.html#directions', '多业务（母合）与可持续增长分析'], ['solution.html#directions', '主导性业务与价值链增长分析'], ['solution.html#directions', '跨区域与利基市场增长分析'], ['solution.html#directions', '增长战略与模式匹配度分析'], ['solution.html#plans', '三档交付方案（诊断 · 建模 · 陪跑）'], ['solution.html#flow', '四步标准交付流程']]) +
      item(['about', 'contact', 'credits'], 'about.html', '关于我们', '关于我们 · 上海领越人力资源服务中心',
        '了解主办运营主体上海领越人力资源服务中心、平台定位与六大产品矩阵，以及联系方式、人才招募与商务合作。',
        [['about.html#lingyue', '上海领越人力资源服务中心'], ['about.html#platform', 'Growth Hub 平台介绍'], ['about.html#business', '核心业务与产品矩阵'], ['contact.html#info', '联系我们与在线留言'], ['contact.html#jobs', '人才招募'], ['contact.html#business', '商务合作与渠道发展']]) +
    '</ul>' +
    '<button class="nav-pill" data-open="contact">预约咨询</button>' +
    '<button class="menu-btn" id="menuBtn" aria-label="打开菜单"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var footer =
    '<section class="contact"><div class="bg"><img data-media src="assets/media/img-04.jpg" alt="" loading="lazy"></div><div class="container">' +
      '<div><h2>联系我们</h2><p>成为 Growth Hub 企业增长赋能平台的会员、客户或合作伙伴，让增长变成一套可执行的方法</p><button class="btn btn-primary" data-open="contact">预约咨询</button></div>' +
      '<div class="qrs"><div><i></i>关注公众号<br>获取深度图文与行业洞察</div><div><i></i>关注视频号<br>观看管理与增长实践案例</div></div>' +
    '</div></section>' +
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
      '<div class="about"><a class="logo" href="index.html" aria-label="Growth Hub 企业增长赋能平台"><img class="logo-wordmark" src="assets/brand/logo-wordmark-dark.png?v=20261116b" alt="Growth Hub" width="129" height="22"><span class="logo-sub">企业增长赋能平台</span></a>' +
        '<p>AI 驱动企业增长赋能平台，由上海领越人力资源服务中心主办运营。以媒体内容与极增智脑双轮驱动，连接内容、智能体、培训、研讨、数据方案与咨询服务。</p>' +
        '<ul><li>主办单位：上海领越人力资源服务中心</li><li>联系邮箱：待补充</li><li>联系电话：待补充</li><li>办公地址：待补充</li></ul></div>' +
      '<div><h6>六大产品模块</h6><ul>' +
        '<li><a href="insights.html">内容服务平台（极增商界）</a></li>' +
        '<li><a href="zhinao.html">AI 智能体工具（极增智脑）</a></li>' +
        '<li><a href="academy.html#training">增长培训服务</a></li>' +
        '<li><a href="academy.html#events">主题交流与研讨会</a></li>' +
        '<li><a href="solution.html">数据化增长方案</a></li>' +
        '<li><a href="consulting.html">增长咨询服务</a></li>' +
      '</ul></div>' +
      '<div><h6>工具与延伸</h6><ul>' +
        '<li><a href="workbench.html">增长顾问 · 经营工作台</a></li>' +
        '<li><a href="tools.html">AI 增长赋能工具（九大工具集）</a></li>' +
        '<li><a href="insights.html#columns">商界洞察 · 行业数据速览</a></li>' +
        '<li><a href="insights.html#latest">深度研究报告</a></li>' +
        '<li><a href="index.html#roadmap">产品建设路线图</a></li>' +
      '</ul></div>' +
      '<div><h6>关于与联系</h6><ul>' +
        '<li><a href="about.html#lingyue">上海领越人力资源服务中心</a></li>' +
        '<li><a href="about.html#platform">Growth Hub 平台介绍</a></li>' +
        '<li><a href="contact.html#info">联系方式与留言</a></li>' +
        '<li><a href="contact.html#jobs">人才招募</a></li>' +
        '<li><a href="contact.html#business">商务合作与渠道</a></li>' +
        '<li><a href="credits.html">素材来源</a></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>© 2026 上海领越人力资源服务中心 · Growth Hub 企业增长赋能平台　ICP 备案号：待备案</span><span>联系方式待补充；规划功能尚未上线，服务以正式合同为准　|　<a href="credits.html">图片与视频来源</a></span></div>' +
    '</div></footer>';

  var modals =
    '<div class="modal" id="m-contact" role="dialog" aria-modal="true" aria-labelledby="mc-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mc-t">预约咨询与意向登记</h3><p>了解产品与服务，登记您的诉求。当前表单为演示，尚未接入后台。</p>' +
      '<form data-form="contact">' +
        '<label class="field"><span>您的姓名 / 称呼</span><input required name="name" placeholder="如：王先生 / 张女士"></label>' +
        '<label class="field"><span>公司 / 组织名称</span><input name="company" placeholder="如：XX 有限公司（OPC 可填个人业务）"></label>' +
        '<label class="field"><span>手机号</span><input required name="tel" type="tel" placeholder="请输入 11 位手机号"></label>' +
        '<label class="field"><span>公司规模</span><select name="size"><option>一人公司 / 超级个体</option><option>2–10 人</option><option>11–30 人</option><option>30–100 人</option><option>100–500 人</option><option>500 人以上</option><option>上市公司</option></select></label>' +
        '<label class="field"><span>诉求类型 / 感兴趣模块</span><select name="product">' + PRODUCTS.map(function (p) { return '<option>' + p.name + '</option>'; }).join('') + '<option>商务合作 / 渠道代理</option><option>人才招募应聘</option></select></label>' +
        '<label class="field"><span>简要说明</span><textarea name="note" placeholder="请简述您当前的增长阶段或希望解决的问题（选填）"></textarea></label>' +
        '<button class="btn btn-primary btn-lg" style="width:100%;margin-top:6px">提交登记</button>' +
        '<p class="note" style="margin-top:12px">演示版：表单暂未接入后台，提交后不会真实发送。</p>' +
      '</form></div></div>' +
    '<div class="modal" id="m-pay" role="dialog" aria-modal="true" aria-labelledby="mp-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mp-t">开通 <span data-pay-name>标准方案</span></h3><p>后台与支付系统建设中，上线后支持扫码支付与电子发票申请。</p>' +
      '<div class="pay"><div><i></i>微信支付</div><div><i></i>支付宝</div></div>' +
      '<p class="note">演示占位：当前尚未接入线上收款，意向登记请使用「预约咨询」表单。</p>' +
    '</div></div>' +
    '<div class="toast" id="toast"></div>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML('beforeend', modals);

  // 移动端菜单
  var nav = document.getElementById('nav');
  var mb = document.getElementById('menuBtn');
  if (mb) mb.addEventListener('click', function () { nav.classList.toggle('open'); document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : ''; });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); document.body.style.overflow = ''; });
  });

  // 素材缺失时隐藏
  document.querySelectorAll('img[data-media]').forEach(function (img) {
    img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
  });

  // 首屏轮播：每屏 7 秒，圆点带进度
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var slides = c.querySelectorAll('.slide'), dots = c.querySelector('.dots'), cur = -1, timer, DUR = 7000;
    if (!dots) return;
    var hasTabs = false;
    slides.forEach(function (s, i) {
      var tab = s.getAttribute('data-tab');
      var b = document.createElement('button');
      if (tab) {
        hasTabs = true;
        b.textContent = tab;
        b.setAttribute('aria-label', tab);
      } else {
        b.setAttribute('aria-label', '第 ' + (i + 1) + ' 屏');
      }
      b.style.setProperty('--dur', DUR + 'ms'); b.addEventListener('click', function () { go(i); }); dots.appendChild(b);
    });
    if (hasTabs) dots.classList.add('hero-tabs');
    var bs = dots.querySelectorAll('button');
    function shownVideo(s) {
      var vs = s.querySelectorAll('video');
      for (var k = 0; k < vs.length; k++) if (getComputedStyle(vs[k]).display !== 'none') return vs[k];
      return null;
    }
    function go(i) {
      if (i === cur) return;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === i); if (k !== i) s.querySelectorAll('video').forEach(function (v) { v.pause(); }); });
      var v = shownVideo(slides[i]);
      if (v) { if (v.preload === 'none') { v.preload = 'auto'; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      bs.forEach(function (b, k) { b.classList.remove('on'); if (k === i) { void b.offsetWidth; b.classList.add('on'); } });
      cur = i; clearTimeout(timer); timer = setTimeout(function () { go((cur + 1) % slides.length); }, DUR);
    }
    go(0);
  });

  // 卡片横滑
  document.querySelectorAll('[data-scroll]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.getElementById(b.getAttribute('data-target') || 'ncards'); if (!t) return;
      var card = t.firstElementChild; var w = card ? card.offsetWidth + 30 : 300;
      t.scrollBy({ left: w * +b.getAttribute('data-scroll'), behavior: 'smooth' });
    });
  });

  // 入场动画
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });

  // 弹窗
  function open(id, name) {
    var m = document.getElementById('m-' + id); if (!m) return;
    if (name) { var n = m.querySelector('[data-pay-name]'); if (n) n.textContent = name; }
    m.classList.add('open');
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.getAttribute('data-open'), o.getAttribute('data-name')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) { var m = e.target.closest('.modal'); if (m) m.classList.remove('open'); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(function (m) { m.classList.remove('open'); }); });
  document.addEventListener('submit', function (e) {
    var fm = e.target.closest('[data-form]'); if (!fm) return;
    e.preventDefault(); var m = fm.closest('.modal'); if (m) m.classList.remove('open'); fm.reset();
    var t = document.getElementById('toast'); t.textContent = '已登记（演示版，后台接口接入中）'; t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 2600);
  });
})();
