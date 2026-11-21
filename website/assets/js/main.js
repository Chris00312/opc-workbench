/* GrowthHub 公共导航、站内检索、内容轮播与邮件留言（原生 JS，无第三方依赖）。
   依据《产品与功能模块（完整版）V1.0》5.1 六大产品模块与备案主体对齐：上海极增科技有限公司。 */
(function () {
  var page = document.body.getAttribute('data-page') || 'home';

  var PRODUCTS = [
    { id: 'insights', href: 'insights.html', name: '极增商界 · 内容服务平台' },
    { id: 'zhinao', href: 'zhinao.html', name: '极增智脑 · 四大智能体' },
    { id: 'workbench', href: 'workbench.html', name: '增长顾问 · 经营工作台' },
    { id: 'academy', href: 'academy.html', name: '企业研习与主题活动' },
    { id: 'solution', href: 'solution.html', name: 'AI 增长数据赋能解决方案' },
    { id: 'consulting', href: 'consulting.html', name: '增长咨询服务' },
    { id: 'tools', href: 'tools.html', name: 'AI 增长赋能工具（九大工具集）' }
  ];

  // 二级菜单：links 为平铺列表，groups 为分组（极增商界按四组展开）。cols 控制列数。
  function linkHtml(l) {
    return l[0] ? '<a href="' + l[0] + '">' + l[1] + (l[2] || '') + '</a>' : '<span class="soon">' + l[1] + (l[2] || '') + '</span>';
  }
  function drop(title, intro, spec) {
    var body = spec.groups
      ? '<div class="drop-groups">' + spec.groups.map(function (g) {
          return '<div class="drop-group"><h5>' + g.t + '</h5>' + g.links.map(linkHtml).join('') + '</div>';
        }).join('') + '</div>'
      : '<div class="drop-list c' + (spec.cols || 2) + '">' + spec.links.map(linkHtml).join('') + '</div>';
    return '<div class="drop"><div class="container"><div class="drop-intro"><h4>' + title + '</h4><p>' + intro + '</p></div>' + body + '</div></div>';
  }

  function item(ids, href, label, fullTitle, intro, spec) {
    return '<li class="has-drop"><a href="' + href + '" class="' + (ids.indexOf(page) >= 0 ? 'active' : '') + '">' + label + ' <i class="caret"></i></a>' +
      '<button class="mobile-subnav" type="button" aria-expanded="false" aria-label="展开' + label + '子菜单">⌄</button>' +
      drop(fullTitle, intro, spec) + '</li>';
  }

  var NAV_SPECS = {
    zhinao: { ids: ['zhinao', 'workbench'], href: 'zhinao.html', label: '极增智脑', title: '极增智脑 · AI 智能体与增长赋能工作台',
      intro: '定位为增长顾问 · 赋能工作台，四大智能体统一汇入经营工作台。',
      spec: { cols: 2, links: [['workbench.html', '增长赋能工作台', '<span class="badge new">V1</span>'], ['zhinao.html#content', '内容生成智能体', '<span class="badge hot">MVP</span>'], ['zhinao.html#diagnose', '增长诊断智能体', '<span class="badge hot">MVP</span>'], ['zhinao.html#data', '数据洞察智能体'], ['zhinao.html#ops', '运营自动化智能体']] } },
    consulting: { ids: ['consulting'], href: 'consulting.html', label: 'AI 增长咨询工作台', title: 'AI 增长咨询工作台',
      intro: '按企业生命周期五大阶段划分战略咨询议题，「AI 辅助整理 + 专家主诊」，提供单次、季度与年度陪跑。',
      spec: { cols: 3, links: [['consulting.html#startup', '初创期企业增长战略咨询'], ['consulting.html#growth', '成长期企业增长战略咨询'], ['consulting.html#expansion', '扩张期企业增长战略咨询'], ['consulting.html#maturity', '成熟期企业增长战略咨询'], ['consulting.html#transform', '转型期企业增长战略咨询'], ['consulting.html#process', '咨询预约与交付流程']] } },
    solution: { ids: ['solution'], href: 'solution.html', label: 'AI 增长数据赋能', title: 'AI 增长数据赋能解决方案',
      intro: '「数据诊断—模型构建—策略生成—效果追踪」四步流程，覆盖七大增长分析方向。',
      spec: { cols: 2, links: [['solution.html#directions', '多业务（母合）增长分析'], ['solution.html#directions', '可持续增长组合分析'], ['solution.html#directions', '主导性业务增长分析'], ['solution.html#directions', '业务价值链增长分析'], ['solution.html#directions', '跨区域增长分析'], ['solution.html#directions', '利基市场增长分析'], ['solution.html#directions', '增长战略与模式匹配度分析']] } },
    tools: { ids: ['tools'], href: 'tools.html', label: 'AI 增长赋能工具', title: 'AI 增长赋能工具 · 九大工具集',
      intro: '覆盖企业全经营场景的九大 AI 增长赋能工具集。',
      spec: { cols: 3, links: [['tools.html#strategy', '公司战略与定位'], ['tools.html#management', '管理赋能与学习成长'], ['tools.html#digital', '数字化管理与 AI 赋能'], ['tools.html#finance', '财税规划'], ['tools.html#finance', '法务与融资'], ['tools.html#ma', '投资与并购'], ['tools.html#marketing', '营销与市场'], ['tools.html#product', '产品与创新'], ['tools.html#product', '客户与服务']] } },
    insights: { ids: ['insights', 'academy'], href: 'insights.html', label: '极增商界', title: '极增商界 · 内容、研习与会员',
      intro: '商界洞察、增长研习与商界会员，沉淀可检索的知识资产。',
      spec: { groups: [
        { t: '商界洞察', links: [['insights.html#business-insight', '商界洞察'], ['insights.html#frontier', '前沿资讯'], ['insights.html#latest', '深度报告'], ['insights.html#announcements', '公司消息']] },
        { t: '增长研习', links: [['academy.html#training', '三层九级研习体系'], ['academy.html#courses', '首席增长官 · 增长分析师'], ['academy.html#courses', '商业增长设计 · 商业模式创新']] },
        { t: '商界会员', links: [['insights.html#community', '极增夜话 · 增长60秒'], ['insights.html#community', '增长新锐'], ['insights.html#member', '会员注册']] }
      ] } },
    about: { ids: ['about', 'credits', 'privacy'], href: 'about.html', label: '关于我们', title: '关于我们',
      intro: '了解主办运营主体与平台定位，展示核心业务与核心产品。',
      spec: { cols: 2, links: [['about.html#host', '极增科技'], ['about.html#platform', '极增商界'], ['about.html#business', '核心业务'], ['about.html#products', '核心产品']] } },
    contact: { ids: ['contact'], href: 'contact.html', label: '联系我们', title: '联系我们',
      intro: '联系入口、人才招募、商务合作与渠道发展。',
      spec: { cols: 2, links: [['contact.html#info', '联系我们'], ['contact.html#jobs', '人才招募'], ['contact.html#business', '商务合作'], ['contact.html#channel', '渠道发展']] } }
  };
  var NAV_ORDER = ['zhinao', 'consulting', 'solution', 'tools', 'insights', 'about', 'contact'];

  // 站内搜索索引：取自上面的导航数据（页面级检索，不含正文）
  var SEARCH_INDEX = [['index.html', '首页']];
  NAV_ORDER.forEach(function (k) {
    var n = NAV_SPECS[k];
    SEARCH_INDEX.push([n.href, n.label]);
    (n.spec.groups ? n.spec.groups.reduce(function (a, g) { return a.concat(g.links); }, []) : n.spec.links).forEach(function (l) { if (l[0]) SEARCH_INDEX.push([l[0], l[1]]); });
  });

  var navItems = '<li><a href="index.html" class="' + (page === 'home' ? 'active' : '') + '">首页</a></li>' +
    NAV_ORDER.map(function (k) { var n = NAV_SPECS[k]; return item(n.ids, n.href, n.label, n.title, n.intro, n.spec); }).join('');

  SEARCH_INDEX.push(
    ['insights.html#business-insight', '从哪一步开始用 AI 改善企业经营？'],
    ['insights.html#frontier', '用一张周表观察增长指标'],
    ['insights.html#latest', '企业增长专项报告样张'],
    ['insights.html#announcements', '极增商界官网栏目更新']
  );

  var brand = '<a class="logo site-brand" href="index.html"><span class="brand-name">Growth<span>Hub</span></span><span class="logo-sub">AI 驱动企业增长 · 赋能平台</span></a>';
  var email = 'johnsun@growthhub.com.cn';

  var header =
    '<header class="nav" id="nav"><div class="container">' + brand +
      '<ul class="nav-links" id="primaryNavigation">' + navItems + '</ul>' +
      '<button class="menu-btn" id="menuBtn" type="button" aria-label="导航菜单" aria-controls="primaryNavigation" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="topbar"><div class="container">' +
      '<form class="site-search" role="search">' +
        '<input type="search" id="searchInput" aria-label="站内搜索" aria-controls="searchResults" placeholder="搜索栏目和内容" autocomplete="off" maxlength="80">' +
        '<button type="submit">搜索</button>' +
        '<div class="search-results" id="searchResults" aria-live="polite" hidden></div>' +
      '</form>' +
      '<div class="topbar-links"><button type="button" data-open="login">登录</button><a href="insights.html#member">注册</a></div>' +
    '</div></div>';

  var footer =
    '<section class="contact"><div class="bg"><img data-media src="assets/media/img-04.jpg" alt="" loading="lazy"></div><div class="container">' +
      '<div><h2>联系我们</h2><p>咨询增长服务、会员或商务合作。</p><a class="btn btn-primary" href="insights.html#member">会员注册</a> <button class="btn btn-line" data-open="message">给我们留言</button></div>' +
    '</div></section>' +
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
      '<div class="about">' + brand +
        '<p>上海极增科技有限公司运营的企业增长赋能平台，提供行业内容、数据分析与增长咨询。</p>' +
        '<ul><li>主办单位：上海极增科技有限公司</li><li>统一社会信用代码：91310118MADNBJRT2N</li><li>联系邮箱：<a href="mailto:' + email + '">' + email + '</a></li><li>联系电话：<a href="tel:18021058625">18021058625</a></li><li>注册地址：上海市青浦区赵巷镇沪青平公路 3398 号 1 幢 1 层</li></ul></div>' +
      '<div><h6>六大产品模块</h6><ul>' +
        '<li><a href="insights.html">内容服务平台（极增商界）</a></li>' +
        '<li><a href="zhinao.html">AI 智能体工具（极增智脑）</a></li>' +
        '<li><a href="academy.html#training">企业研习与咨询工作坊</a></li>' +
        '<li><a href="academy.html#events">主题交流与研讨会</a></li>' +
        '<li><a href="solution.html">数据化增长方案</a></li>' +
        '<li><a href="consulting.html">增长咨询服务</a></li>' +
      '</ul></div>' +
      '<div><h6>工具与延伸</h6><ul>' +
        '<li><a href="workbench.html">增长顾问 · 经营工作台</a></li>' +
        '<li><a href="tools.html">AI 增长赋能工具（九大工具集）</a></li>' +
        '<li><a href="insights.html#columns">商界洞察 · 行业数据速览</a></li>' +
        '<li><a href="insights.html#latest">深度研究报告</a></li>' +
      '</ul></div>' +
      '<div><h6>关于与联系</h6><ul>' +
        '<li><a href="about.html#host">上海极增科技有限公司</a></li>' +
        '<li><a href="about.html#platform">GrowthHub 平台介绍</a></li>' +
        '<li><a href="contact.html#info">联系方式与留言</a></li>' +
        '<li><a href="contact.html#jobs">人才招募</a></li>' +
        '<li><a href="contact.html#business">商务合作与渠道</a></li>' +
        '<li><a href="credits.html">素材来源</a></li>' +
        '<li><a href="privacy.html">隐私说明</a></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="footer-bottom"><span>© 2026 上海极增科技有限公司 · GrowthHub 企业增长赋能平台</span><span>规划功能尚未上线，服务以正式合同为准　|　<a href="credits.html">图片与视频来源</a></span></div>' +
    '</div></footer>';

  function messageDialog(id, title, description, label) {
    return '<div class="modal" id="m-' + id + '" role="dialog" aria-modal="true" aria-labelledby="title-' + id + '"><div class="modal-box">' +
      '<button class="modal-close" type="button" data-close aria-label="关闭">×</button>' +
      '<h3 id="title-' + id + '">' + title + '</h3><p>' + description + '</p>' +
      '<form data-form="' + id + '">' +
        '<label class="field"><span>' + label + '</span><textarea name="message" required maxlength="800"></textarea></label>' +
        '<button class="btn btn-primary" type="submit">打开邮件草稿</button>' +
        '<p class="note">请在邮件应用中确认并发送。<a href="privacy.html">隐私说明</a></p>' +
      '</form></div></div>';
  }

  var modals =
    '<div class="modal" id="m-contact" role="dialog" aria-modal="true" aria-labelledby="mc-t"><div class="modal-box">' +
      '<button class="modal-close" data-close aria-label="关闭">×</button>' +
      '<h3 id="mc-t">预约咨询与意向登记</h3><p>填写您的需求，通过邮件联系顾问。</p>' +
      '<form data-form="contact">' +
        '<label class="field"><span>您的姓名 / 称呼</span><input required name="name" placeholder="如：王先生 / 张女士"></label>' +
        '<label class="field"><span>公司 / 组织名称</span><input name="company" placeholder="如：如适用，填写公司名称"></label>' +
        '<label class="field"><span>手机号</span><input required name="tel" type="tel" placeholder="请输入 11 位手机号"></label>' +
        '<label class="field"><span>公司规模</span><select name="size"><option>一人公司 / 超级个体</option><option>2–10 人</option><option>11–30 人</option><option>30–100 人</option><option>100–500 人</option><option>500 人以上</option><option>上市公司</option></select></label>' +
        '<label class="field"><span>诉求类型 / 感兴趣模块</span><select name="product">' + PRODUCTS.map(function (p) { return '<option>' + p.name + '</option>'; }).join('') + '<option>商务合作 / 渠道代理</option><option>人才招募应聘</option></select></label>' +
        '<label class="field"><span>简要说明</span><textarea name="note" placeholder="请简述您当前的增长阶段或希望解决的问题（选填）"></textarea></label>' +
        '<button class="btn btn-primary btn-lg" style="width:100%;margin-top:6px">打开邮件草稿</button>' +
        '<p class="note" style="margin-top:12px">请在邮件应用中确认并发送。<a href="privacy.html">隐私说明</a></p>' +
      '</form></div></div>' +
    messageDialog('message', '给我们留言', '写下您的问题。需要回复时，请在邮件中留下联系方式。', '留言内容') +
    messageDialog('member', '登记会员开通意向', '会员账号系统筹备中。请通过邮件告诉我们您感兴趣的内容或服务。', '感兴趣的内容或服务') +
    '<div class="modal" id="m-login" role="dialog" aria-modal="true" aria-labelledby="title-login"><div class="modal-box">' +
      '<button class="modal-close" type="button" data-close aria-label="关闭">×</button>' +
      '<h3 id="title-login">会员登录</h3><p>会员登录正在筹备，您可以先登记开通意向。</p>' +
      '<a class="btn btn-primary" href="insights.html#member">查看会员登记</a>' +
    '</div></div>' +
    '<aside class="quick-actions" aria-label="常用入口"><a href="insights.html#member">会员注册</a><button type="button" data-open="message">留言</button></aside>';


  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML('beforeend', modals);

  // 移动端菜单
  var nav = document.getElementById('nav');
  var mb = document.getElementById('menuBtn');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    mb.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (mb) {
    mb.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    nav.querySelectorAll('.mobile-subnav').forEach(function (button) {
      button.addEventListener('click', function () {
        var expanded = button.parentElement.classList.toggle('expanded');
        button.setAttribute('aria-expanded', String(expanded));
      });
    });
    window.matchMedia('(max-width: 1120px)').addEventListener('change', function () { setMenu(false); });
  }

  // 站内搜索覆盖公共导航和精选内容。
  var si = document.getElementById('searchInput');
  var sr = document.getElementById('searchResults');
  if (si) {
    var search = si.form;
    function showResults() {
      var terms = si.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      var seen = new Set();
      var matches = SEARCH_INDEX.filter(function (entry) {
        var key = entry.join(' ');
        if (seen.has(key) || !terms.every(function (term) { return key.toLowerCase().includes(term); })) return false;
        seen.add(key);
        return true;
      });
      sr.hidden = !terms.length;
      sr.innerHTML = !terms.length ? '' : matches.map(linkHtml).join('') || '<p class="note">没有找到相关内容</p>';
    }
    si.addEventListener('input', showResults);
    si.addEventListener('focus', showResults);
    search.addEventListener('submit', function (event) { event.preventDefault(); showResults(); });
    search.addEventListener('focusout', function (event) { if (!search.contains(event.relatedTarget)) sr.hidden = true; });
    sr.addEventListener('click', function (event) { if (event.target.closest('a')) sr.hidden = true; });
    search.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { si.focus(); sr.hidden = true; }
    });
  }

  // 素材缺失时隐藏
  document.querySelectorAll('img[data-media]').forEach(function (img) {
    img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
  });

  // 首屏与精选轮播共用切换和播放状态
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var slides = c.querySelectorAll('.slide'), dots = c.querySelector('.dots'), cur = -1, timer, duration = 7000;
    if (!dots || !slides.length) return;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var paused = motion.matches;
    var buttons = Array.from(slides).map(function (slide, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = slide.dataset.tab;
      button.style.setProperty('--dur', duration + 'ms');
      button.addEventListener('click', function () { go(index); });
      dots.appendChild(button);
      return button;
    });
    dots.classList.add('hero-tabs');

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'carousel-toggle';
    c.appendChild(toggle);
    function schedule() {
      clearTimeout(timer);
      toggle.textContent = paused ? '播放' : '暂停';
      c.classList.toggle('carousel-paused', paused || c.matches(':hover, :focus-within'));
      if (!c.classList.contains('carousel-paused')) timer = setTimeout(function () { go((cur + 1) % slides.length); }, duration);
    }
    toggle.addEventListener('click', function () { paused = !paused; schedule(); });
    c.addEventListener('mouseenter', schedule);
    c.addEventListener('mouseleave', schedule);
    c.addEventListener('focusin', schedule);
    c.addEventListener('focusout', function () { setTimeout(schedule, 0); });
    motion.addEventListener('change', function () { paused = motion.matches; schedule(); });

    function go(index) {
      slides.forEach(function (slide, position) {
        var active = position === index;
        slide.classList.toggle('on', active);
        slide.inert = !active;
        buttons[position].classList.toggle('on', active);
        buttons[position].setAttribute('aria-pressed', String(active));
        slide.querySelectorAll('video').forEach(function (video) {
          if (active && !motion.matches && getComputedStyle(video).display !== 'none') video.play().catch(function () {});
          else video.pause();
        });
      });
      cur = index;
      schedule();
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

  // 弹窗及邮件草稿
  var trigger;
  function closeModal(modal) {
    modal.classList.remove('open');
    if (trigger) trigger.focus();
    trigger = null;
  }
  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-open]');
    if (opener) {
      var modal = document.getElementById('m-' + opener.getAttribute('data-open'));
      if (!modal) return;
      event.preventDefault();
      trigger = opener;
      modal.classList.add('open');
      (modal.querySelector('textarea, input, a.btn') || modal.querySelector('[data-close]')).focus();
      return;
    }
    if (event.target.closest('[data-close]') || event.target.classList.contains('modal')) {
      var openModal = event.target.closest('.modal');
      if (openModal) closeModal(openModal);
    }
  });
  document.addEventListener('keydown', function (event) {
    var modal = document.querySelector('.modal.open');
    if (!modal) {
      if (event.key === 'Escape' && mb && nav.classList.contains('open')) { setMenu(false); mb.focus(); }
      return;
    }
    if (event.key === 'Escape') { closeModal(modal); return; }
    if (event.key !== 'Tab') return;
    var controls = modal.querySelectorAll('a[href], button, input, select, textarea');
    var first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('submit', function (event) {
    var form = event.target.closest('[data-form]');
    if (!form) return;
    event.preventDefault();
    var subjects = { contact: '增长咨询与意向登记', page: '官网联系留言', message: '官网留言', member: '会员开通意向' };
    var lines = Array.from(new FormData(form)).filter(function (pair) { return pair[1].trim(); }).map(function (pair) {
      var field = form.elements.namedItem(pair[0]);
      return field.labels[0].textContent.trim() + '：' + pair[1].trim();
    });
    if (!lines.length) return;
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subjects[form.dataset.form]) + '&body=' + encodeURIComponent(lines.join('\r\n'));
  });
})();
