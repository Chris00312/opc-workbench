/* 极增科技官网：公共头尾 + 交互（无第三方依赖） */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  var PRODUCTS = [
    { id: 'report', href: 'report.html', tag: '已上线', cls: 'tag-live', name: '极增 · 企业分析报告', d: '在线问卷 + AI 起草 + 顾问审校，三档报告' },
    { id: 'workbench', href: 'workbench.html', tag: '内测中', cls: 'tag-live', name: '极增 · 经营工作台', d: 'AI 专家 + 增长 Skill + 连接器的管理层工作台' },
    { id: 'talent', href: 'talent.html', tag: '即将上线', cls: 'tag-soon', name: '极增 · AI 人才测评', d: '中层干部测评与梯队盘点，扫码答题出报告' },
    { id: 'studio', href: 'studio.html', tag: '规划中', cls: 'tag-plan', name: '极增 · 超级个体', d: '面向个人顾问与小型咨询机构的 AI 订阅版' }
  ];

  var header =
    '<header class="nav' + (page === 'home' ? '' : ' always-solid') + '" id="nav"><div class="container">' +
    '<a class="logo" href="index.html" aria-label="极增科技首页"><span class="logo-mark">极</span><span>极增科技<small>极增商界</small></span></a>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html" class="' + (page === 'home' ? 'active' : '') + '">首页</a></li>' +
      '<li class="has-mega"><a href="index.html#products" class="' + (PRODUCTS.some(function (p) { return p.id === page; }) ? 'active' : '') + '">产品中心</a>' +
        '<div class="mega"><div class="container"><div class="mega-inner">' +
        PRODUCTS.map(function (p) {
          return '<a class="mega-item" href="' + p.href + '"><span class="tag ' + p.cls + '">' + p.tag + '</span><h4>' + p.name + '</h4><p>' + p.d + '</p></a>';
        }).join('') +
        '</div></div></div></li>' +
      '<li><a href="index.html#solutions">解决方案</a></li>' +
      '<li><a href="index.html#method">方法论</a></li>' +
      '<li><a href="index.html#insights">极增商界</a></li>' +
      '<li><a href="index.html#about">关于我们</a></li>' +
    '</ul>' +
    '<div class="nav-cta"><a class="btn btn-ghost btn-sm" href="report.html#tiers">免费体检</a><button class="btn btn-primary btn-sm" data-open="contact">预约咨询</button></div>' +
    '<button class="menu-btn" id="menuBtn" aria-label="打开菜单"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var footer =
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
      '<div><a class="logo" href="index.html"><span class="logo-mark">极</span><span>极增科技<small>极增商界</small></span></a>' +
        '<p style="margin-top:18px;max-width:300px">用 AI 把企业经营诊断做得更快、更准、更便宜；用真人顾问把结论落到每个月的经营动作里。</p>' +
        '<div class="qr">公众号二维码</div></div>' +
      '<div><h6>产品</h6><ul>' + PRODUCTS.map(function (p) { return '<li><a href="' + p.href + '">' + p.name.replace('极增 · ', '') + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h6>解决方案</h6><ul><li><a href="index.html#solutions">年度经营计划</a></li><li><a href="index.html#solutions">月度经营分析会</a></li><li><a href="index.html#solutions">组织与岗位</a></li><li><a href="index.html#solutions">绩效与薪酬</a></li><li><a href="index.html#solutions">中层梯队培养</a></li></ul></div>' +
      '<div><h6>极增商界</h6><ul><li><a href="index.html#insights">企业分析报告</a></li><li><a href="index.html#insights">行业洞察</a></li><li><a href="index.html#method">方法论</a></li><li><a href="credits.html">素材来源</a></li></ul></div>' +
      '<div><h6>联系我们</h6><ul><li>商务合作：bd@example.com</li><li>咨询热线：400-000-0000</li><li>地址：待定</li><li><a href="#" data-open="contact">在线预约 →</a></li></ul></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>© 2026 极增科技 · 极增商界　ICP备案号：待备案</span><span>页面中的联系方式、价格与数据均为示意，正式上线前替换　｜　<a href="credits.html">图片与视频来源</a></span></div>' +
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
        '<button class="btn btn-dark" style="width:100%">提交预约</button>' +
        '<p class="note" style="margin-top:10px">演示版：表单暂未接入后台，提交后不会真实发送。</p>' +
      '</form></div></div>' +
    '<div class="modal" id="m-pay" role="dialog" aria-modal="true" aria-labelledby="mp-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mp-t">购买 <span data-pay-name>标准报告</span></h3><p>支付完成后可在线查看并下载 PDF 报告。</p>' +
      '<div class="pay"><div><b></b>微信支付</div><div><b></b>支付宝</div></div>' +
      '<p class="note">支付功能开发中：上线后接入微信支付 / 支付宝扫码，这里先占位。</p>' +
    '</div></div>' +
    '<div class="toast" id="toast"></div>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML('beforeend', modals);

  // 导航：滚动变实色、移动端菜单
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var mb = document.getElementById('menuBtn');
  if (mb) mb.addEventListener('click', function () { nav.classList.toggle('open'); document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : ''; });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); document.body.style.overflow = ''; });
  });

  // 素材缺失时回退到渐变占位
  document.querySelectorAll('img[data-media]').forEach(function (img) {
    function fail() { img.style.display = 'none'; if (img.parentElement) img.parentElement.classList.add('ph'); }
    img.addEventListener('error', fail);
    if (img.loading !== 'lazy' && img.complete && img.naturalWidth === 0) fail();
  });
  document.querySelectorAll('video[data-media]').forEach(function (v) {
    var src = v.querySelector('source');
    if (src) src.addEventListener('error', function () { v.style.display = 'none'; });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
  });


  // 首屏轮播（视频自动播放，圆点带进度）
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var slides = c.querySelectorAll('.slide'), dots = c.querySelector('.dots'), cur = -1, timer;
    var DUR = 7000;
    slides.forEach(function (s, i) {
      var b = document.createElement('button'); b.setAttribute('aria-label', '第 ' + (i + 1) + ' 屏');
      b.style.setProperty('--dur', DUR + 'ms');
      b.addEventListener('click', function () { go(i); });
      dots.appendChild(b);
    });
    var bs = dots.querySelectorAll('button');
    function visibleVideo(s) {
      var vs = s.querySelectorAll('video');
      for (var k = 0; k < vs.length; k++) if (vs[k].offsetParent !== null || getComputedStyle(vs[k]).display !== 'none') return vs[k];
      return null;
    }
    function go(i) {
      if (i === cur) return;
      slides.forEach(function (s, k) {
        s.classList.toggle('on', k === i);
        s.querySelectorAll('video').forEach(function (v) { if (k !== i) v.pause(); });
      });
      var v = visibleVideo(slides[i]);
      if (v) { if (v.preload === 'none') { v.preload = 'auto'; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      bs.forEach(function (b, k) { b.classList.remove('on'); if (k === i) { void b.offsetWidth; b.classList.add('on'); } });
      cur = i;
      clearTimeout(timer); timer = setTimeout(function () { go((cur + 1) % slides.length); }, DUR);
    }
    go(0);
  });

  // 新闻卡片左右切换
  document.querySelectorAll('[data-scroll]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.getElementById('ncards'); if (!t) return;
      var card = t.querySelector('.ncard'); var w = card ? card.offsetWidth + 24 : 300;
      t.scrollBy({ left: w * +b.getAttribute('data-scroll'), behavior: 'smooth' });
    });
  });

  // 产品矩阵：悬停/点击切换，自动轮播
  document.querySelectorAll('[data-matrix]').forEach(function (m) {
    var items = m.querySelectorAll('.matrix-item');
    var panels = m.querySelectorAll('.matrix-panel');
    var cur = 0, timer;
    function show(i) {
      cur = i;
      items.forEach(function (it, k) { it.classList.toggle('on', k === i); it.setAttribute('aria-selected', k === i); });
      panels.forEach(function (p, k) {
        p.classList.toggle('on', k === i);
        var v = p.querySelector('video'); if (v) { if (k === i) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }
      });
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { show((cur + 1) % items.length); }, 6000); }
    items.forEach(function (it, i) {
      it.addEventListener('mouseenter', function () { show(i); auto(); });
      it.addEventListener('click', function () { show(i); auto(); });
    });
    show(0); auto();
  });

  // 入场动画 + 数字滚动
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .15 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
  function countUp(el) {
    var to = +el.getAttribute('data-count'), t0 = null, unit = el.querySelector('small'); var u = unit ? unit.outerHTML : '';
    function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1200); el.innerHTML = Math.round(to * (1 - Math.pow(1 - p, 3))) + u; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  // 弹窗
  function open(id, name) {
    var m = document.getElementById('m-' + id); if (!m) return;
    if (name) { var n = m.querySelector('[data-pay-name]'); if (n) n.textContent = name; }
    m.classList.add('open');
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.getAttribute('data-open'), o.getAttribute('data-name')); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) {
      var m = e.target.closest('.modal'); if (m) m.classList.remove('open');
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(function (m) { m.classList.remove('open'); }); });
  document.addEventListener('submit', function (e) {
    var fm = e.target.closest('[data-form]'); if (!fm) return;
    e.preventDefault();
    var m = fm.closest('.modal'); if (m) m.classList.remove('open');
    fm.reset(); toast('已收到（演示版，未真实提交）');
  });
  function toast(t) { var el = document.getElementById('toast'); el.textContent = t; el.classList.add('show'); setTimeout(function () { el.classList.remove('show'); }, 2600); }
})();
