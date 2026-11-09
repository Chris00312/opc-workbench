/* 极增商界官网：公共导航与页脚、首屏轮播、弹窗（无第三方依赖）。导航按老板商业计划书 202611 版的模块组织。 */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  var PRODUCTS = [
    { id: 'zhinao', href: 'zhinao.html', name: '极增智脑' },
    { id: 'workbench', href: 'workbench.html', name: '经营工作台' },
    { id: 'solution', href: 'solution.html', name: '数据化增长方案' },
    { id: 'report', href: 'report.html', name: '企业分析报告' },
    { id: 'academy', href: 'academy.html', name: '增长培训与论坛' },
    { id: 'insights', href: 'insights.html', name: '商界洞察 · 会员' }
  ];

  function drop(title, intro, links) {
    return '<div class="drop"><div class="container"><div class="drop-intro"><h4>' + title + '</h4><p>' + intro + '</p></div><div class="drop-list">' +
      links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + (l[2] || '') + '</a>'; }).join('') + '</div></div></div>';
  }

  // ids：本菜单在哪些页面上高亮
  function item(ids, href, name, intro, links) {
    return '<li class="has-drop"><a href="' + href + '" class="' + (ids.indexOf(page) >= 0 ? 'active' : '') + '">' + name + ' <i class="caret"></i></a>' + drop(name, intro, links) + '</li>';
  }

  var header =
    '<header class="nav" id="nav"><div class="container">' +
    '<a class="logo" href="index.html" aria-label="极增商界首页"><img class="logo-img" src="assets/brand/mark-light.svg" alt="">极增商界</a>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html" class="' + (page === 'home' ? 'active' : '') + '">首页</a></li>' +
      item(['zhinao', 'workbench'], 'zhinao.html', '极增智脑', '主动型 AI 智能体：知道你的目标，每天盯着数据，发现问题先来找你。',
        [['workbench.html', '经营秘书 · 经营工作台', '<span class="badge new">New</span>'], ['zhinao.html#diagnose', '增长诊断智能体'], ['zhinao.html#content', '内容生成智能体'], ['zhinao.html#ops', '运营自动化智能体'], ['zhinao.html#match', '用户匹配智能体'], ['zhinao.html#tiers', '版本与订阅']]) +
      item(['solution', 'report'], 'solution.html', '增长方案', '数据化增长方案：诊断 → 建模 → 策略 → 追踪，用数据找到卡点，用 AI 盯到落地。',
        [['solution.html#checkup', 'AI 经营体检'], ['report.html', '企业分析报告', '<span class="badge hot">Hot</span>'], ['solution.html#coach', '顾问陪跑'], ['solution.html#coach', '专项咨询']]) +
      item(['academy'], 'academy.html', '培训活动', '从 AI 工具实操到增长方法论和行业专项；季度论坛、月度研讨、周度沙龙。',
        [['academy.html#training', '增长培训'], ['academy.html#cert', '企业增长分析师认证'], ['academy.html#events', '论坛 · 研讨 · 沙龙']]) +
      item(['insights'], 'insights.html', '商界洞察', '围绕「可验证的增长洞察」：行业快讯、方法论拆解、月度数据报告。',
        [['insights.html#columns', '每日动态 · 每周深度'], ['insights.html#columns', '月度洞察报告'], ['insights.html#latest', '最新文章'], ['insights.html#member', '商界会员']]) +
      '<li><a href="index.html#about">关于我们</a></li>' +
    '</ul>' +
    '<button class="nav-pill" data-open="contact">预约咨询</button>' +
    '<button class="menu-btn" id="menuBtn" aria-label="打开菜单"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var footer =
    '<section class="contact"><div class="bg"><img data-media src="assets/media/img-04.jpg" alt="" loading="lazy"></div><div class="container">' +
      '<div><h2>联系我们</h2><p>成为极增商界的会员、客户或合作伙伴，让增长变成一套可执行的方法</p><button class="btn btn-primary" data-open="contact">联系我们</button></div>' +
      '<div class="qrs"><div><i></i>关注公众号<br>了解更多企业增长洞察</div><div><i></i>关注视频号<br>观看管理实践案例</div></div>' +
    '</div></section>' +
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
      '<div class="about"><a class="logo" href="index.html"><img class="logo-img" src="assets/brand/mark-dark.svg" alt="">极增商界</a>' +
        '<p>AI 赋能企业提效平台。智能体、数据、服务与内容四位一体，让各规模企业的老板和团队少做重复的事、早发现问题、把定了的事办成。</p>' +
        '<ul><li>官方邮箱：bd@example.com</li><li>客服热线：400-000-0000</li><li>工作时间：周一至周五 9:00–18:00</li></ul></div>' +
      '<div><h6>产品中心</h6><ul>' + PRODUCTS.map(function (p) { return '<li><a href="' + p.href + '">' + p.name + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h6>商界洞察</h6><ul><li><a href="insights.html#columns">内容栏目</a></li><li><a href="insights.html#member">商界会员</a></li><li><a href="report.html#sample">报告样张</a></li><li><a href="index.html#roadmap">增长路线图</a></li></ul></div>' +
      '<div><h6>关于我们</h6><ul><li><a href="index.html#about">公司介绍</a></li><li><a href="#" data-open="contact">商务合作</a></li><li><a href="credits.html">素材来源</a></li></ul></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>© 2026 上海极增科技有限公司 · 极增商界　ICP 备案号：待备案</span><span>页面中的联系方式、价格与数据均为示意　|　<a href="credits.html">图片与视频来源</a></span></div>' +
    '</div></footer>';

  var modals =
    '<div class="modal" id="m-contact" role="dialog" aria-modal="true" aria-labelledby="mc-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mc-t">预约沟通</h3><p>留下联系方式，顾问会在 1 个工作日内联系您。</p>' +
      '<form data-form="contact">' +
        '<label class="field"><span>您的称呼</span><input required name="name" placeholder="如：王总"></label>' +
        '<label class="field"><span>手机号</span><input required name="tel" type="tel" placeholder="138 0000 0000"></label>' +
        '<label class="field"><span>公司规模</span><select name="size"><option>30 人以下</option><option>30–100 人</option><option>100–500 人</option><option>500 人以上</option><option>上市公司</option></select></label>' +
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
