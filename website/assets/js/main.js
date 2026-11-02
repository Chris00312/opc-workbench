/* 极增科技官网：公共导航与页脚、首屏轮播、弹窗（无第三方依赖） */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  var PRODUCTS = [
    { id: 'report', href: 'report.html', name: '企业分析报告', badge: '<span class="badge hot">Hot</span>' },
    { id: 'workbench', href: 'workbench.html', name: '经营工作台', badge: '<span class="badge new">New</span>' },
    { id: 'talent', href: 'talent.html', name: 'AI 人才测评', badge: '<span class="badge beta">即将上线</span>' },
    { id: 'studio', href: 'studio.html', name: '超级个体', badge: '<span class="badge beta">规划中</span>' }
  ];
  var isProduct = PRODUCTS.some(function (p) { return p.id === page; });

  function drop(title, intro, links) {
    return '<div class="drop"><div class="container"><div class="drop-intro"><h4>' + title + '</h4><p>' + intro + '</p></div><div class="drop-list">' +
      links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + (l[2] || '') + '</a>'; }).join('') + '</div></div></div>';
  }

  var header =
    '<header class="nav" id="nav"><div class="container">' +
    '<a class="logo" href="index.html" aria-label="极增科技首页"><span class="logo-mark">极</span>极增科技</a>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html" class="' + (page === 'home' ? 'active' : '') + '">首页</a></li>' +
      '<li class="has-drop"><a href="index.html#products" class="' + (isProduct ? 'active' : '') + '">产品中心 <i class="caret"></i></a>' +
        drop('产品中心', '从一份企业分析报告开始，到经营工作台持续陪跑，覆盖“诊断 — 规划 — 执行 — 人才”。', PRODUCTS.map(function (p) { return [p.href, p.name, p.badge]; })) + '</li>' +
      '<li class="has-drop"><a href="index.html#roadmap">解决方案 <i class="caret"></i></a>' +
        drop('解决方案', '为 100–150 人的成长型企业设计，解决从“老板管”到“制度管、中层管”的关键问题。',
          [['workbench.html#plan', '年度经营计划'], ['workbench.html#demo', '月度经营分析会'], ['workbench.html#plan', '组织架构与岗位'], ['workbench.html#plan', '绩效与薪酬'], ['talent.html', '中层梯队培养'], ['report.html', '企业经营体检']]) + '</li>' +
      '<li class="has-drop"><a href="index.html#insights">极增商界 <i class="caret"></i></a>' +
        drop('极增商界', '极增商界是极增科技的内容与报告品牌，发布企业分析报告、行业基准与管理实践。',
          [['report.html#sample', '企业分析报告'], ['index.html#insights', '行业经营基准'], ['index.html#insights', '管理实践'], ['index.html#roadmap', '增长路线图']]) + '</li>' +
      '<li><a href="index.html#about">关于我们 <i class="caret"></i></a></li>' +
    '</ul>' +
    '<button class="nav-pill" data-open="contact">预约咨询</button>' +
    '<button class="menu-btn" id="menuBtn" aria-label="打开菜单"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var footer =
    '<section class="contact"><div class="bg"><img data-media src="assets/media/img-04.jpg" alt="" loading="lazy"></div><div class="container">' +
      '<div><h2>联系我们</h2><p>成为极增科技的客户或合作伙伴，让增长变成一套可复制的方法</p><button class="btn btn-primary" data-open="contact">联系我们</button></div>' +
      '<div class="qrs"><div><i></i>关注公众号<br>了解更多企业增长洞察</div><div><i></i>关注视频号<br>观看管理实践案例</div></div>' +
    '</div></section>' +
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
      '<div class="about"><a class="logo" href="index.html"><span class="logo-mark">极</span>极增科技</a>' +
        '<p>用 AI 把企业经营诊断做得更快、更准、更便宜；用真人顾问把结论落到每个月的经营动作里。</p>' +
        '<ul><li>官方邮箱：bd@example.com</li><li>客服热线：400-000-0000</li><li>工作时间：周一至周五 9:00–18:00</li></ul></div>' +
      '<div><h6>产品中心</h6><ul>' + PRODUCTS.map(function (p) { return '<li><a href="' + p.href + '">' + p.name + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h6>极增商界</h6><ul><li><a href="report.html#sample">企业分析报告</a></li><li><a href="index.html#insights">行业经营基准</a></li><li><a href="index.html#roadmap">增长路线图</a></li></ul></div>' +
      '<div><h6>关于我们</h6><ul><li><a href="index.html#about">公司介绍</a></li><li><a href="#" data-open="contact">商务合作</a></li><li><a href="credits.html">素材来源</a></li></ul></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>© 2026 极增科技 · 极增商界　ICP 备案号：待备案</span><span>页面中的联系方式、价格与数据均为示意　|　<a href="credits.html">图片与视频来源</a></span></div>' +
    '</div></footer>';

  var modals =
    '<div class="modal" id="m-contact" role="dialog" aria-modal="true" aria-labelledby="mc-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mc-t">预约顾问沟通</h3><p>留下联系方式，顾问会在 1 个工作日内联系您。</p>' +
      '<form data-form="contact">' +
        '<label class="field"><span>您的称呼</span><input required name="name" placeholder="如：王总"></label>' +
        '<label class="field"><span>手机号</span><input required name="tel" type="tel" placeholder="138 0000 0000"></label>' +
        '<label class="field"><span>公司规模</span><select name="size"><option>50 人以下</option><option selected>50–150 人</option><option>150–500 人</option><option>500 人以上</option></select></label>' +
        '<label class="field"><span>感兴趣的产品</span><select name="product">' + PRODUCTS.map(function (p) { return '<option>' + p.name + '</option>'; }).join('') + '</select></label>' +
        '<button class="btn btn-primary btn-lg" style="width:100%;margin-top:6px">提交预约</button>' +
        '<p class="note" style="margin-top:12px">演示版：表单暂未接入后台，提交后不会真实发送。</p>' +
      '</form></div></div>' +
    '<div class="modal" id="m-pay" role="dialog" aria-modal="true" aria-labelledby="mp-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mp-t">购买 <span data-pay-name>标准报告</span></h3><p>支付完成后可在线查看并下载 PDF 报告。</p>' +
      '<div class="pay"><div><i></i>微信支付</div><div><i></i>支付宝</div></div>' +
      '<p class="note">支付功能开发中：上线后接入微信支付 / 支付宝扫码，这里先占位。</p>' +
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
    slides.forEach(function (s, i) {
      var b = document.createElement('button'); b.setAttribute('aria-label', '第 ' + (i + 1) + ' 屏');
      b.style.setProperty('--dur', DUR + 'ms'); b.addEventListener('click', function () { go(i); }); dots.appendChild(b);
    });
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
    var t = document.getElementById('toast'); t.textContent = '已收到（演示版，未真实提交）'; t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 2600);
  });
})();
