(function () {
  'use strict';

  var STORAGE_KEY = 'gift_showcase_audit_completed_v4';

  var bundle = window.SHOWCASE_BUNDLE;
  if (!bundle) {
    document.body.innerHTML = '<div style="padding:24px;font-family:sans-serif;font-size:16px;color:#0F172A;">未找到演示数据包 data/showcase-bundle.js，请先运行 python tools/build-showcase-data.py。</div>';
    return;
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── 精致内联 SVG 图标库（0 Emoji） ── */
  function svgIcon(key, size) {
    var s = size || 18;
    var paths = {
      gift: '<path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
      sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
      sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>',
      truck: '<rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
      edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
      users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      check: '<polyline points="20 6 9 17 4 12"/>',
      copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
      share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
      chevron: '<polyline points="6 9 12 15 18 9"/>',
      home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
      star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    };
    var body = paths[key] || paths.sparkles;
    return '<span class="svg-ic" aria-hidden="true"><svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg></span>';
  }

  /* ── 全彩多层次渐变高光立体商品矢量插画库 ── */
  var svgUid = 0;
  function giftSvg(illustration, accent, size) {
    svgUid += 1;
    var uid = svgUid;
    var s = size || 58;
    var map = {
      tea: '<defs>' +
        '<linearGradient id="gt-tray-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#D97706"/><stop offset="100%" stop-color="#78350F"/></linearGradient>' +
        '<linearGradient id="gt-pot-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6EE7B7"/><stop offset="55%" stop-color="#10B981"/><stop offset="100%" stop-color="#047857"/></linearGradient>' +
        '<linearGradient id="gt-cup-' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#A7F3D0"/><stop offset="100%" stop-color="#059669"/></linearGradient>' +
        '</defs>' +
        '<ellipse cx="32" cy="52" rx="25" ry="5.5" fill="url(#gt-tray-' + uid + ')" opacity="0.9"/>' +
        '<ellipse cx="32" cy="50.5" rx="22" ry="3.5" fill="#FDE68A" opacity="0.25"/>' +
        '<path d="M12 31c-4 0-6 3-4 6 1.5 2 4 2 6 1" stroke="#065F46" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
        '<path d="M36 28h6a4.5 4.5 0 0 1 0 9h-6" stroke="#047857" stroke-width="2.8" fill="none"/>' +
        '<rect x="13" y="24" width="24" height="22" rx="10" fill="url(#gt-pot-' + uid + ')"/>' +
        '<ellipse cx="25" cy="24" rx="9" ry="3" fill="#065F46"/>' +
        '<path d="M19 23c0-3.5 2.7-6 6-6s6 2.5 6 6" fill="#34D399"/>' +
        '<circle cx="25" cy="16" r="2.5" fill="#FDE68A"/>' +
        '<ellipse cx="20" cy="33" rx="3" ry="6" fill="#FFFFFF" opacity="0.32"/>' +
        '<rect x="43" y="36" width="12" height="11" rx="4" fill="url(#gt-cup-' + uid + ')"/>' +
        '<ellipse cx="49" cy="36.5" rx="5.5" ry="2" fill="#ECFDF5"/>',
      pan: '<defs>' +
        '<radialGradient id="gp-body-' + uid + '" cx="38%" cy="35%" r="65%"><stop offset="0%" stop-color="#475569"/><stop offset="65%" stop-color="#1E293B"/><stop offset="100%" stop-color="#0F172A"/></radialGradient>' +
        '<linearGradient id="gp-rim-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E2E8F0"/><stop offset="100%" stop-color="#94A3B8"/></linearGradient>' +
        '<linearGradient id="gp-hdl-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#B45309"/></linearGradient>' +
        '</defs>' +
        '<ellipse cx="27" cy="34" rx="18" ry="15" fill="rgba(15,23,42,0.14)"/>' +
        '<circle cx="27" cy="30" r="17" fill="url(#gp-rim-' + uid + ')"/>' +
        '<circle cx="27" cy="30" r="14.5" fill="url(#gp-body-' + uid + ')"/>' +
        '<circle cx="27" cy="30" r="9.5" stroke="#64748B" stroke-width="1" stroke-dasharray="3 2" fill="none"/>' +
        '<circle cx="23" cy="27" r="4" fill="#FDE047" opacity="0.9"/>' +
        '<circle cx="30" cy="32" r="3" fill="#FB7185" opacity="0.88"/>' +
        '<path d="M41 37l15 10" stroke="url(#gp-hdl-' + uid + ')" stroke-width="5.5" stroke-linecap="round"/>' +
        '<path d="M41 37l4 2.7" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>',
      suitcase: '<defs>' +
        '<linearGradient id="gs-shell-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#60A5FA"/><stop offset="50%" stop-color="#2563EB"/><stop offset="100%" stop-color="#1E3A8A"/></linearGradient>' +
        '<linearGradient id="gs-frame-' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F1F5F9"/><stop offset="100%" stop-color="#94A3B8"/></linearGradient>' +
        '</defs>' +
        '<ellipse cx="32" cy="56" rx="16" ry="3" fill="rgba(15,23,42,0.14)"/>' +
        '<path d="M25 18v-7a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 39 11v7" stroke="#475569" stroke-width="2.8" fill="none"/>' +
        '<rect x="16" y="17" width="32" height="36" rx="6" fill="url(#gs-frame-' + uid + ')"/>' +
        '<rect x="18" y="19" width="28" height="32" rx="4.5" fill="url(#gs-shell-' + uid + ')"/>' +
        '<rect x="22" y="23" width="4" height="24" rx="2" fill="#93C5FD" opacity="0.5"/>' +
        '<rect x="30" y="23" width="4" height="24" rx="2" fill="#93C5FD" opacity="0.35"/>' +
        '<rect x="38" y="23" width="4" height="24" rx="2" fill="#1E40AF" opacity="0.45"/>' +
        '<rect x="44" y="28" width="3" height="8" rx="1" fill="#FDE68A"/>' +
        '<circle cx="22" cy="54" r="3" fill="#1E293B"/><circle cx="42" cy="54" r="3" fill="#1E293B"/>',
      thermos: '<defs>' +
        '<linearGradient id="gth-body-' + uid + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#334155"/><stop offset="35%" stop-color="#64748B"/><stop offset="100%" stop-color="#0F172A"/></linearGradient>' +
        '<linearGradient id="gth-cap-' + uid + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706"/></linearGradient>' +
        '</defs>' +
        '<ellipse cx="32" cy="54" rx="12" ry="3" fill="rgba(15,23,42,0.14)"/>' +
        '<rect x="22" y="17" width="20" height="36" rx="6" fill="url(#gth-body-' + uid + ')"/>' +
        '<rect x="25" y="20" width="3.5" height="29" rx="1.8" fill="#FFFFFF" opacity="0.28"/>' +
        '<rect x="24" y="10" width="16" height="7" rx="2.5" fill="url(#gth-cap-' + uid + ')"/>' +
        '<rect x="22" y="23" width="20" height="2.5" fill="#FDE68A" opacity="0.85"/>',
      card: '<defs>' +
        '<linearGradient id="gc-bg-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FB7185"/><stop offset="50%" stop-color="#DC2626"/><stop offset="100%" stop-color="#881337"/></linearGradient>' +
        '<linearGradient id="gc-gold-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FEF08A"/><stop offset="100%" stop-color="#D97706"/></linearGradient>' +
        '</defs>' +
        '<rect x="11" y="20" width="44" height="28" rx="6" fill="rgba(136,19,55,0.18)"/>' +
        '<rect x="9" y="17" width="44" height="28" rx="6" fill="url(#gc-bg-' + uid + ')"/>' +
        '<rect x="9" y="26" width="44" height="6" fill="url(#gc-gold-' + uid + ')" opacity="0.92"/>' +
        '<rect x="28" y="17" width="6" height="28" fill="url(#gc-gold-' + uid + ')" opacity="0.92"/>' +
        '<circle cx="31" cy="29" r="4.5" fill="#FEF08A" stroke="#B45309" stroke-width="1.5"/>' +
        '<rect x="14" y="35" width="10" height="5" rx="1.5" fill="#FEF08A" opacity="0.85"/>',
      dryer: '<defs>' +
        '<linearGradient id="gd-head-' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#A5B4FC"/><stop offset="55%" stop-color="#4F46E5"/><stop offset="100%" stop-color="#312E81"/></linearGradient>' +
        '<linearGradient id="gd-ring-' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDBA74"/><stop offset="100%" stop-color="#EA580C"/></linearGradient>' +
        '</defs>' +
        '<ellipse cx="30" cy="54" rx="13" ry="3" fill="rgba(49,46,129,0.14)"/>' +
        '<rect x="26" y="30" width="8.5" height="22" rx="4" fill="url(#gd-head-' + uid + ')"/>' +
        '<path d="M16 19h26a7.5 7.5 0 0 1 0 15H16l-5-7.5L16 19z" fill="url(#gd-head-' + uid + ')"/>' +
        '<rect x="40" y="19" width="4" height="15" rx="2" fill="url(#gd-ring-' + uid + ')"/>' +
        '<ellipse cx="26" cy="23" rx="8" ry="2.2" fill="#FFFFFF" opacity="0.32"/>' +
        '<circle cx="20" cy="26.5" r="3" fill="#1E1B4B"/>',
    };
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 64 64" fill="none">' + (map[illustration] || map.tea) + '</svg>';
  }

  var state = {
    section: 'preview',
    perspective: 'customer',
    uiThemeId: (bundle.uiThemes && bundle.uiThemes[0] && bundle.uiThemes[0].id) || 'obsidian',
    currencyKey: bundle.meta.currencyPresets[0].key,
    customShopName: '',
    customUnitName: '',
    painGainMode: 'pain',
    tickerIndex: 0,
    customerTab: 'home',
    selectedCategory: '全部',
    selectedCostFilter: 'all',
    teaBookmark: '全部雅礼',
    glacierRange: 'all',
    wishlistIds: clone(bundle.previewData.customerScreens.initialWishlist || []),
    applies: clone(bundle.previewData.customerScreens.initialApplies || []),
    gifts: clone(bundle.previewData.customerScreens.gifts || []),
    ownerTab: 'applies',
    ownerShowAddGift: false,
    ownerApplyFilter: 'all',
    shopSyncedNotice: false,
    customers: clone(bundle.previewData.ownerScreens.customers || []),
    logs: clone(bundle.previewData.ownerScreens.initialLogs || []),
    shopSettings: clone(bundle.previewData.ownerScreens.shopSettings),
    applyFormGiftId: (bundle.previewData.customerScreens.gifts[0] && bundle.previewData.customerScreens.gifts[0].id) || '',
    applyFormReceiver: '示例周女士',
    applyFormPhone: '13800001099',
    applyFormAddress: '示例市新区样板路66号',
    selectedModules: [],
    customWishText: '',
    pickedFeatures: [],
    auditOpenId: (bundle.auditTutorial.steps[0] && bundle.auditTutorial.steps[0].id) || 'audit-1',
    auditCompleted: loadCompletedSteps(),
  };

  function loadCompletedSteps() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCompletedSteps() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.auditCompleted));
    } catch (e) {
      // ignore storage errors
    }
  }

  function currentPreset() {
    var list = bundle.meta.currencyPresets || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === state.currencyKey) return list[i];
    }
    return list[0] || { key: 'jifen', label: '积分', shopName: '甄选好礼馆', unitSuffix: '积分' };
  }

  function unit() {
    return state.customUnitName.trim() || currentPreset().unitSuffix || '积分';
  }

  function activeShopName() {
    return state.customShopName.trim() || state.shopSettings.shopName || currentPreset().shopName || '甄选好礼馆';
  }

  function formatTerms(text) {
    var u = unit();
    return String(text == null ? '' : text)
      .replace(/币值/g, u)
      .replace(/积分/g, u);
  }

  var toastTimer = null;
  function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.hidden = true;
    }, 2400);
  }

  function copyText(text, okMsg) {
    var val = String(text || '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(function () {
        showToast(okMsg || '已复制');
      }).catch(function () {
        fallbackCopy(val, okMsg);
      });
    } else {
      fallbackCopy(val, okMsg);
    }
  }

  function fallbackCopy(val, okMsg) {
    try {
      var ta = document.createElement('textarea');
      ta.value = val;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(okMsg || '已复制');
    } catch (e) {
      showToast('请长按复制：' + val);
    }
  }

  function currentCustomer() {
    return state.customers[0] || { code: '8801', nickname: '示例张先生', balance: 120 };
  }

  function findGift(id) {
    for (var i = 0; i < state.gifts.length; i++) {
      if (state.gifts[i].id === id) return state.gifts[i];
    }
    return null;
  }

  /* ── 导航与全局交互 ── */
  function bindGlobalNav() {
    var shareIconEl = document.getElementById('ic-share-hero');
    if (shareIconEl) shareIconEl.innerHTML = svgIcon('share', 16);

    document.querySelectorAll('.dock-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchSection(btn.getAttribute('data-section'));
      });
    });

    document.querySelectorAll('.seg-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.perspective = btn.getAttribute('data-perspective');
        closePhoneModal();
        renderAll();
      });
    });

    var resetBtn = document.getElementById('audit-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state.auditCompleted = [];
        state.auditOpenId = (bundle.auditTutorial.steps[0] && bundle.auditTutorial.steps[0].id) || 'audit-1';
        saveCompletedSteps();
        renderAuditTutorial();
        showToast('已重置进度');
      });
    }

    ['open-poster-btn', 'open-poster-btn-2'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', openPosterModal);
    });
    var customWallBtn = document.getElementById('open-custom-wall-btn');
    if (customWallBtn) customWallBtn.addEventListener('click', openCustomModal);

    var closePosterBtn = document.getElementById('close-poster-btn');
    if (closePosterBtn) closePosterBtn.addEventListener('click', closePosterModal);
    var posterMask = document.getElementById('poster-modal-mask');
    if (posterMask) {
      posterMask.addEventListener('click', function (e) {
        if (e.target === posterMask) closePosterModal();
      });
    }

    var shopInput = document.getElementById('custom-shop-input');
    var unitInput = document.getElementById('custom-unit-input');
    if (shopInput) {
      shopInput.addEventListener('input', function () {
        state.customShopName = shopInput.value;
        renderThemePicker();
        renderPhone();
      });
    }
    if (unitInput) {
      unitInput.addEventListener('input', function () {
        state.customUnitName = unitInput.value;
        renderThemePicker();
        renderCurrencyPills();
        renderPhone();
        renderBackendTutorial();
      });
    }
  }

  function switchSection(section) {
    state.section = section;
    document.querySelectorAll('.dock-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-section') === section);
    });
    ['preview', 'audit', 'backend'].forEach(function (key) {
      var panel = document.getElementById('panel-' + key);
      if (!panel) return;
      var active = key === section;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }

  /* ── 首屏：深色头卡 + 三栏合作明白卡 ── */
  function renderHero() {
    var md = bundle.marketingData || {};
    var sloganEl = document.getElementById('hero-slogan');
    var subEl = document.getElementById('hero-subslogan');
    if (sloganEl && md.heroSlogan) sloganEl.textContent = md.heroSlogan;
    if (subEl && md.subSlogan) subEl.textContent = md.subSlogan;

    var trioEl = document.getElementById('hero-value-trio');
    var vt = bundle.valueTrio || {};
    if (trioEl) {
      var cols = [vt.whatYouGet, vt.whatYouPay, vt.whatToDo].filter(Boolean);
      trioEl.innerHTML = cols.map(function (c) {
        return '<div class="clarity-col">' +
          '<div class="clarity-col__head">' +
            '<span class="clarity-col__num">' + esc(c.num) + '</span>' +
            svgIcon(c.iconKey, 16) +
          '</div>' +
          '<span class="clarity-col__title">' + esc(c.title) + '</span>' +
          '<span class="clarity-col__line">' + esc(c.headline) + '</span>' +
          '<span class="clarity-col__desc">' + esc(c.summary) + '</span>' +
        '</div>';
      }).join('');
    }
  }

  /* ── 首屏痛点暴击：过去手工管店 vs 换上这套小程序 ── */
  function renderPainVsGain() {
    var box = document.getElementById('pain-vs-gain');
    var pg = bundle.painVsGain;
    if (!box || !pg) return;
    var isPain = state.painGainMode === 'pain';
    box.innerHTML =
      '<div class="pain-gain-card__head">' +
        '<h2 class="pain-gain-card__title">' + esc(pg.title) + '</h2>' +
        '<span class="pain-gain-card__sub">' + esc(pg.subtitle) + '</span>' +
      '</div>' +
      '<div class="pain-gain-tabs">' +
        '<button type="button" class="pain-gain-tab ' + (isPain ? 'is-pain' : '') + '" data-pg-mode="pain">过去手工管店（太累）</button>' +
        '<button type="button" class="pain-gain-tab ' + (!isPain ? 'is-gain' : '') + '" data-pg-mode="gain">换上小程序后（躺赢）</button>' +
      '</div>' +
      '<div class="pain-gain-rows">' +
        (pg.rows || []).map(function (r) {
          return '<div class="pain-gain-row ' + (isPain ? 'pain-gain-row--pain' : 'pain-gain-row--gain') + '">' +
            '<span class="pain-gain-num">' + esc(r.num) + '</span>' +
            '<span>' + esc(isPain ? r.pain : r.gain) + '</span>' +
          '</div>';
        }).join('') +
      '</div>';

    box.querySelectorAll('[data-pg-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.painGainMode = btn.getAttribute('data-pg-mode');
        renderPainVsGain();
      });
    });
  }

  /* ── 模拟器下方：苹果官网式定制功能互动选配台 ── */
  function renderConfigurator() {
    var box = document.getElementById('custom-configurator');
    var cfg = bundle.customConfigurator;
    if (!box || !cfg) return;
    var mods = cfg.optionalModules || [];
    var pickedMods = mods.filter(function (m) { return state.selectedModules.indexOf(m.id) >= 0; });
    var cur = currentUiTheme();

    box.innerHTML =
      '<h2 class="configurator-card__title">' + esc(cfg.title) + '</h2>' +
      '<p class="configurator-card__sub">' + esc(cfg.subtitle) + '</p>' +
      '<div class="config-base-row">' +
        (cfg.baseIncluded || []).map(function (b) {
          return '<span class="config-base-chip">标配：' + esc(b) + '</span>';
        }).join('') +
      '</div>' +
      '<div class="config-mod-grid">' +
        mods.map(function (m) {
          var sel = state.selectedModules.indexOf(m.id) >= 0;
          return '<button type="button" class="config-mod-tile ' + (sel ? 'is-selected' : '') + '" data-cfg-mod="' + esc(m.id) + '">' +
            '<span class="config-mod-tile__scene">' + (sel ? '已选 · ' : '') + esc(m.scene) + '</span>' +
            '<span class="config-mod-tile__title">' + esc(m.title) + '</span>' +
            '<span class="config-mod-tile__benefit">' + esc(m.benefit) + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="config-wish-box">' +
        '<input type="text" class="custom-brand-input" id="custom-wish-input" value="' + esc(state.customWishText) + '" placeholder="' + esc(cfg.wishPlaceholder || '') + '" aria-label="自由定制心愿">' +
      '</div>' +
      '<div class="config-summary-bar">' +
        '<div style="font-size:15px;font-weight:700;">已配方案：版本' + esc(cur.code) + '（' + esc(cur.name) + '）· 店名「' + esc(activeShopName()) + '」· ' + pickedMods.length + ' 项扩展功能</div>' +
        '<button type="button" class="m-btn m-btn--emerald m-btn--block" id="copy-wishlist-config-btn">' + svgIcon('copy', 16) + '一键复制《我的定制心愿单》发给开发者</button>' +
      '</div>';

    box.querySelectorAll('[data-cfg-mod]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-cfg-mod');
        var idx = state.selectedModules.indexOf(id);
        if (idx >= 0) state.selectedModules.splice(idx, 1);
        else state.selectedModules.push(id);
        renderConfigurator();
      });
    });

    var wishEl = document.getElementById('custom-wish-input');
    if (wishEl) {
      wishEl.addEventListener('input', function () {
        state.customWishText = wishEl.value;
      });
    }

    var copyCfgBtn = document.getElementById('copy-wishlist-config-btn');
    if (copyCfgBtn) {
      copyCfgBtn.addEventListener('click', function () {
        var modNames = pickedMods.map(function (m) { return m.title; }).join('、') || '仅标配基础版';
        var wish = state.customWishText.trim();
        var text = '【我的定制心愿单】风格：版本' + cur.code + '（' + cur.name + '）｜店名：' + activeShopName() +
          '｜积分叫：' + unit() + '｜定制模块：' + modNames +
          (wish ? '｜补充想法：' + wish : '') + '（随时改到满意为止，不满意不要钱）';
        copyText(text, '已复制《我的定制心愿单》，可直接发微信');
      });
    }
  }

  function currentUiTheme() {
    var themes = bundle.uiThemes || [];
    for (var i = 0; i < themes.length; i++) {
      if (themes[i].id === state.uiThemeId) return themes[i];
    }
    return themes[0] || { id: 'obsidian', code: 'A', name: '曜石黑金', layoutMode: 'gallery', copyTemplate: '' };
  }

  function renderThemePicker() {
    var themes = bundle.uiThemes || [];
    var cur = currentUiTheme();
    var hero = document.querySelector('.studio-hero');
    var frame = document.getElementById('phone-frame');
    if (hero) hero.setAttribute('data-ui-theme', cur.id);
    if (frame) {
      frame.setAttribute('data-ui-theme', cur.id);
      frame.setAttribute('data-layout-mode', cur.layoutMode);
    }

    var grid = document.getElementById('theme-grid');
    if (grid) {
      grid.innerHTML = themes.map(function (t) {
        var active = t.id === cur.id ? 'is-active' : '';
        var dots = (t.swatches || []).map(function (hex) {
          return '<span class="theme-dot" style="background:' + esc(hex) + '"></span>';
        }).join('');
        return '<button type="button" class="theme-tile ' + active + '" data-theme-id="' + esc(t.id) + '" role="radio" aria-checked="' + (t.id === cur.id) + '">' +
          '<div class="theme-tile__top">' +
            '<span class="theme-tile__code">版本' + esc(t.code) + ' · ' + esc(t.name) + '</span>' +
            '<span class="theme-swatches">' + dots + '</span>' +
          '</div>' +
          '<span class="theme-tile__sub">' + esc(t.subtitle) + '</span>' +
          '<span class="theme-tile__for">' + esc(t.industryTag || t.bestFor) + ' · 推荐店名「' + esc(t.recommendedShopName || '') + '」</span>' +
        '</button>';
      }).join('');
      grid.querySelectorAll('[data-theme-id]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.uiThemeId = btn.getAttribute('data-theme-id');
          var chosen = currentUiTheme();
          if (!state.customShopName.trim() && chosen.recommendedShopName) {
            state.shopSettings.shopName = chosen.recommendedShopName;
          }
          renderAll();
          showToast('已切换「版本' + chosen.code + '：' + chosen.name + '」' + (chosen.recommendedShopName ? '（' + chosen.recommendedShopName + '）' : ''));
        });
      });
    }

    var copyBtn = document.getElementById('copy-theme-btn');
    if (copyBtn) {
      copyBtn.textContent = '已选中：版本' + cur.code + ' · ' + cur.name + ' · 一键复制我喜欢的方案';
      copyBtn.onclick = function () {
        var msg = String(cur.copyTemplate || '')
          .replace(/\{shopName\}/g, activeShopName())
          .replace(/\{currency\}/g, unit());
        copyText(msg, '已复制：版本' + cur.code + '（' + cur.name + '）定制方案');
      };
    }
  }

  function renderCurrencyPills() {
    var box = document.getElementById('currency-pills');
    if (!box) return;
    var presets = bundle.meta.currencyPresets || [];
    var hasCustomUnit = !!state.customUnitName.trim();
    box.innerHTML = presets.map(function (p) {
      var active = !hasCustomUnit && p.key === state.currencyKey ? 'is-active' : '';
      return '<button type="button" class="currency-pill ' + active + '" data-currency="' + esc(p.key) + '">' + esc(p.label) + '</button>';
    }).join('');
    box.querySelectorAll('.currency-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.currencyKey = btn.getAttribute('data-currency');
        state.customShopName = '';
        state.customUnitName = '';
        var shopInput = document.getElementById('custom-shop-input');
        var unitInput = document.getElementById('custom-unit-input');
        if (shopInput) shopInput.value = '';
        if (unitInput) unitInput.value = '';
        state.shopSettings.shopName = currentPreset().shopName;
        renderAll();
        showToast('已切换称呼为「' + unit() + '」');
      });
    });
  }

  function openPhoneModal(html) {
    var mask = document.getElementById('phone-modal-mask');
    var sheet = document.getElementById('phone-modal-sheet');
    if (!mask || !sheet) return;
    sheet.innerHTML = html;
    mask.hidden = false;
    mask.onclick = function (e) {
      if (e.target === mask) closePhoneModal();
    };
    var closeBtn = sheet.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.addEventListener('click', closePhoneModal);
  }

  function closePhoneModal() {
    var mask = document.getElementById('phone-modal-mask');
    if (mask) mask.hidden = true;
  }

  /* ── 01 实机预览 ── */
  function renderPhone() {
    var preset = currentPreset();
    var isOwner = state.perspective === 'owner';

    document.querySelectorAll('.seg-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-perspective') === state.perspective);
    });

    var brandMark = document.getElementById('wx-brand-mark');
    var navTitle = document.getElementById('wx-nav-title');
    var sName = activeShopName();
    if (brandMark) brandMark.textContent = (sName || '礼').slice(0, 1);
    if (navTitle) navTitle.textContent = isOwner ? '店主后台 · ' + sName : sName;

    var strip = document.getElementById('phone-mode-strip');
    if (strip) {
      strip.classList.toggle('is-owner', isOwner);
      strip.innerHTML = isOwner
        ? '<span>店主手机后台</span><span>四项核心操作</span>'
        : '<span>顾客选礼前台</span><span>称呼：' + esc(unit()) + '</span>';
    }

    var ownerNavBar = document.getElementById('owner-nav-bar');
    var tabbar = document.getElementById('wx-tabbar');
    if (ownerNavBar) ownerNavBar.hidden = !isOwner;
    if (tabbar) tabbar.hidden = isOwner;

    if (isOwner) {
      renderOwnerNavBar();
      renderOwnerScreen();
    } else {
      renderCustomerTabBar();
      renderCustomerScreen();
    }
  }

  function renderCustomerTabBar() {
    var tabbar = document.getElementById('wx-tabbar');
    if (!tabbar) return;
    var themeId = currentUiTheme().id;
    tabbar.className = 'wx-tabbar wx-tabbar--' + themeId;
    var tabs = [
      { key: 'home', ic: 'home', label: '首页' },
      { key: 'category', ic: 'grid', label: '全部分类' },
      { key: 'wishlist', ic: 'star', label: '礼栈', badge: state.wishlistIds.length },
      { key: 'applies', ic: 'truck', label: '进度' },
    ];
    tabbar.innerHTML = tabs.map(function (t) {
      var active = t.key === state.customerTab ? 'is-active' : '';
      var badgeHtml = t.badge ? '<span class="wx-tabbar__badge">' + t.badge + '</span>' : '';
      return '<button type="button" class="wx-tabbar__item ' + active + '" data-ctab="' + t.key + '">' +
        badgeHtml +
        svgIcon(t.ic, 18) +
        '<span>' + esc(t.label) + '</span>' +
      '</button>';
    }).join('');
    tabbar.querySelectorAll('[data-ctab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.customerTab = btn.getAttribute('data-ctab');
        renderPhone();
      });
    });
  }

  function openRulesSheet() {
    var cs = bundle.previewData.customerScreens;
    var entries = cs.guideEntries || [];
    openPhoneModal(
      '<div class="m-card__head"><p class="m-card__title">活动规则与常见疑问</p><button type="button" class="text-btn" data-close-modal>关闭</button></div>' +
      entries.map(function (item) {
        return '<div class="m-list-item" style="margin-bottom:8px;">' +
          '<strong style="font-size:16px;">' + esc(formatTerms(item.title)) + '</strong>' +
          (item.lines || []).map(function (ln) { return '<div class="m-card__meta" style="margin-top:4px;">' + esc(formatTerms(ln)) + '</div>'; }).join('') +
        '</div>';
      }).join('')
    );
  }

  function liveTickerHtml() {
    var tickers = (bundle.previewData.customerScreens.liveTickers) || [];
    if (!tickers.length) return '';
    var text = tickers[state.tickerIndex % tickers.length];
    return '<div class="live-ticker-bar" id="live-ticker-bar"><span class="live-ticker-dot"></span><span>' + esc(text) + '</span></div>';
  }

  function openGiftDetailSheet(giftId) {
    var g = findGift(giftId);
    if (!g) return;
    var u = unit();
    var cust = currentCustomer();
    var specs = (g.specs && g.specs.length) ? g.specs : ['标准礼盒装'];
    var activeSpec = specs[0];
    var tags = (g.tags && g.tags.length) ? g.tags : ['顺丰包邮', '专柜正品'];

    openPhoneModal(
      '<div class="m-card__head"><p class="m-card__title">商品详情</p><button type="button" class="text-btn" data-close-modal>关闭</button></div>' +
      '<div class="detail-hero-box" style="background:' + esc(g.tint || '#ECFDF5') + '">' + giftSvg(g.illustration, g.accent, 96) + '</div>' +
      '<strong style="font-size:19px;color:var(--ink);">' + esc(g.name) + '</strong>' +
      '<div class="detail-price-row">' +
        '<span class="detail-cost-big">' + g.cost + ' ' + esc(u) + '</span>' +
        (g.marketPrice ? '<span class="market-price-del">市场价 ' + esc(g.marketPrice) + '</span>' : '') +
        '<span class="stock-hot-tag">仅剩 ' + (g.stockLeft || 6) + ' 件</span>' +
      '</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">' +
        tags.map(function (t) { return '<span class="config-base-chip">' + esc(t) + '</span>'; }).join('') +
      '</div>' +
      '<div class="m-form-label">选择规格</div>' +
      '<div class="spec-pills" id="detail-spec-pills">' +
        specs.map(function (sp, idx) {
          return '<button type="button" class="spec-pill ' + (idx === 0 ? 'is-active' : '') + '" data-spec-val="' + esc(sp) + '">' + esc(sp) + '</button>';
        }).join('') +
      '</div>' +
      '<p style="margin:0 0 12px;font-size:15px;color:var(--ink-2);">' + esc(g.detailSummary || g.desc) + '</p>' +
      '<button type="button" class="m-btn m-btn--emerald m-btn--block" id="detail-redeem-now">立即用 ' + g.cost + ' ' + esc(u) + ' 兑换（余 ' + cust.balance + '）</button>'
    );

    var sheet = document.getElementById('phone-modal-sheet');
    if (sheet) {
      sheet.querySelectorAll('[data-spec-val]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeSpec = btn.getAttribute('data-spec-val');
          sheet.querySelectorAll('[data-spec-val]').forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
          });
        });
      });
    }
    var redeemBtn = document.getElementById('detail-redeem-now');
    if (redeemBtn) {
      redeemBtn.addEventListener('click', function () {
        if (cust.balance < g.cost) {
          showToast('当前演示余额不足，可切到店主后台给客户充值');
          return;
        }
        cust.balance -= g.cost;
        state.applies.unshift({
          id: 'ord-demo-' + (103 + state.applies.length),
          giftId: g.id,
          giftName: g.name + '（' + activeSpec + '）',
          cost: g.cost,
          status: 'pending',
          statusLabel: '待发货',
          isNew: true,
          receiver: state.applyFormReceiver,
          phone: state.applyFormPhone,
          address: state.applyFormAddress,
          expressCompany: '',
          trackingNo: '',
          createdAt: '刚刚',
        });
        state.logs.unshift({
          id: 'log-' + Date.now(),
          customerCode: cust.code,
          customerName: cust.nickname,
          delta: -g.cost,
          balanceAfter: cust.balance,
          reason: '兑换 ' + g.name,
          time: '刚刚',
        });
        closePhoneModal();
        renderPhone();
        showToast('兑换成功！切到「店主手机后台 → 发货」可立即看到这笔新订单');
      });
    }
  }

  /* ── 版本 A：曜石黑金（尊享黑卡 + 2x2 专柜画廊） ── */
  function renderCustomerHomeObsidian(screen, cs, cust, u) {
    var cats = ['全部', '茶具礼盒', '厨房电器', '出行箱包', '个护好物'];
    var list = state.gifts.filter(function (g) {
      return state.selectedCategory === '全部' || g.category === state.selectedCategory;
    }).slice(0, 4);

    screen.innerHTML =
      liveTickerHtml() +
      '<div class="obs-vip-card">' +
        '<div class="obs-vip-card__top">' +
          '<div><div style="font-size:14px;color:#CBD5E1;">' + esc(state.shopSettings.welcomeTitle) + '</div><div class="obs-vip-card__num">' + cust.balance + ' ' + esc(u) + '</div></div>' +
          '<div class="obs-vip-card__acts">' +
            '<button type="button" class="obs-pill-btn" id="obs-rules-btn">规则说明</button>' +
            '<button type="button" class="obs-pill-btn" id="obs-wx-btn">联系顾问</button>' +
          '</div>' +
        '</div>' +
        '<div class="obs-vip-card__foot">臻选正品 · 达标即兑 · 顺丰直发</div>' +
      '</div>' +
      '<div class="obs-cat-rail">' +
        cats.map(function (cat) {
          var lbl = cat === '全部' ? '全部臻品' : cat;
          return '<button type="button" class="obs-cat-pill ' + (state.selectedCategory === cat ? 'is-active' : '') + '" data-obs-cat="' + esc(cat) + '">' + esc(lbl) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="obs-gallery-grid">' +
        list.map(function (g) {
          return '<div class="obs-gift-card">' +
            '<div class="obs-gift-stage" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' +
              '<span class="obs-gift-badge">' + g.cost + ' ' + esc(u) + '</span>' +
              giftSvg(g.illustration, '#FDE68A', 62) +
            '</div>' +
            '<div class="obs-gift-body">' +
              '<div class="obs-gift-name" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + esc(g.name) + '</div>' +
              '<div class="stock-meta-row">' + (g.marketPrice ? '<span class="market-price-del">' + esc(g.marketPrice) + '</span>' : '') + '<span>已兑 ' + (g.soldCount || 88) + '</span></div>' +
              '<button type="button" class="obs-gold-btn" data-open-detail="' + esc(g.id) + '">看详情兑换</button>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';

    var rb = document.getElementById('obs-rules-btn');
    if (rb) rb.addEventListener('click', openRulesSheet);
    var wb = document.getElementById('obs-wx-btn');
    if (wb) wb.addEventListener('click', function () { copyText(state.shopSettings.serviceWechat, '已复制顾问微信：' + state.shopSettings.serviceWechat); });
    screen.querySelectorAll('[data-obs-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selectedCategory = btn.getAttribute('data-obs-cat');
        renderCustomerHomeObsidian(screen, cs, cust, u);
      });
    });
    bindGiftCardActions(screen);
  }

  /* ── 版本 B：朱砂喜庆（弧形红金头图 + 金色福袋 + 通栏大横幅抢兑） ── */
  function renderCustomerHomeCrimson(screen, cs, cust, u) {
    var pcts = ['86%', '91%', '78%', '84%'];
    var list = state.gifts.slice(0, 4);
    screen.innerHTML =
      liveTickerHtml() +
      '<div class="cri-curved-hero">' +
        '<div class="cri-curved-hero__top">' +
          '<h3 class="cri-curved-hero__title">' + esc(state.shopSettings.welcomeTitle) + '</h3>' +
          '<button type="button" class="cri-rule-circle" id="cri-rules-btn">规则</button>' +
        '</div>' +
        '<div class="cri-steps-row"><span>01 挑好礼</span><span>→</span><span>02 办业务</span><span>→</span><span>03 填地址</span></div>' +
      '</div>' +
      '<div class="cri-bag-bar">' +
        '<span class="cri-bag-bar__val">我的福利账户：' + cust.balance + ' ' + esc(u) + '</span>' +
        '<button type="button" class="cri-bag-btn" id="cri-wx-btn">找店主核销</button>' +
      '</div>' +
      '<div class="cri-banner-list">' +
        list.map(function (g, idx) {
          var pct = pcts[idx % pcts.length];
          return '<div class="cri-banner-card">' +
            '<span class="cri-banner-tag">仅剩 ' + (g.stockLeft || 5) + ' 件</span>' +
            '<div class="cri-banner-illus" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + giftSvg(g.illustration, '#DC2626', 62) + '</div>' +
            '<div class="cri-banner-info">' +
              '<div class="cri-banner-name" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + esc(g.name) + '</div>' +
              '<div class="cri-banner-cost">' + g.cost + ' ' + esc(u) + '免费兑' + (g.marketPrice ? '<span class="market-price-del">' + esc(g.marketPrice) + '</span>' : '') + '</div>' +
              '<div class="cri-prog-wrap"><div class="cri-prog-track"><div class="cri-prog-fill" style="width:' + pct + '"></div></div><span>已兑 ' + pct + '</span></div>' +
              '<button type="button" class="cri-grab-btn" data-open-detail="' + esc(g.id) + '">立即抢兑</button>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';

    var rb = document.getElementById('cri-rules-btn');
    if (rb) rb.addEventListener('click', openRulesSheet);
    var wb = document.getElementById('cri-wx-btn');
    if (wb) wb.addEventListener('click', function () { copyText(state.shopSettings.serviceWechat, '已复制店主微信：' + state.shopSettings.serviceWechat); });
    bindGiftCardActions(screen);
  }

  /* ── 版本 C：温润茶白（东方杂志 · 书眉顶条 + 左竖书签 + 右画册流） ── */
  function renderCustomerHomeTea(screen, cs, cust, u) {
    var bookmarks = [
      { key: '全部雅礼', label: '全部雅礼' },
      { key: '茶具礼盒', label: '茶食雅器' },
      { key: '厨房电器', label: '居家好物' },
      { key: '出行箱包', label: '旅途随行' },
      { key: '礼册须知', label: '礼册须知' },
    ];
    var cnNums = ['壹', '贰', '叁', '肆'];
    var sName = activeShopName();
    var rightHtml = '';
    if (state.teaBookmark === '礼册须知') {
      rightHtml = (cs.guideEntries || []).map(function (entry) {
        return '<div class="tea-gift-card" style="display:block;">' +
          '<div class="tea-gift-name" style="padding-right:0;">' + esc(formatTerms(entry.title)) + '</div>' +
          (entry.lines || []).map(function (ln) { return '<div class="tea-gift-note" style="margin-top:4px;">' + esc(formatTerms(ln)) + '</div>'; }).join('') +
        '</div>';
      }).join('');
    } else {
      var list = state.gifts.filter(function (g) {
        return state.teaBookmark === '全部雅礼' || g.category === state.teaBookmark;
      }).slice(0, 3);
      rightHtml = list.map(function (g, i) {
        return '<div class="tea-gift-card">' +
          '<span class="tea-no-tag">编号 ' + (cnNums[i] || (i + 1)) + '</span>' +
          '<div class="tea-gift-illus" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + giftSvg(g.illustration, '#7C3F1C', 58) + '</div>' +
          '<div class="tea-gift-info">' +
            '<div class="tea-gift-name" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + esc(g.name) + '</div>' +
            '<div class="tea-gift-note">' + g.cost + ' ' + esc(u) + (g.marketPrice ? ' · 原价' + esc(g.marketPrice) : '') + '</div>' +
            '<button type="button" class="tea-outline-btn" data-open-detail="' + esc(g.id) + '">品鉴兑换</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    screen.innerHTML =
      liveTickerHtml() +
      '<div class="tea-scope">' +
        '<div class="tea-masthead">' +
          '<div><span class="tea-seal">甄选</span><strong style="font-size:16px;color:#3E2723;">' + esc(sName) + '</strong></div>' +
          '<div class="tea-masthead__meta"><span>余韵：' + cust.balance + ' ' + esc(u) + '</span><button type="button" class="text-btn" style="color:#7C3F1C;" id="tea-wx-btn">[顾问]</button></div>' +
        '</div>' +
        '<div class="tea-split-body">' +
          '<div class="tea-bookmarks">' +
            bookmarks.map(function (b) {
              return '<button type="button" class="tea-bookmark-btn ' + (state.teaBookmark === b.key ? 'is-active' : '') + '" data-tea-bm="' + esc(b.key) + '">' + esc(b.label) + '</button>';
            }).join('') +
          '</div>' +
          '<div class="tea-stream">' + rightHtml + '</div>' +
        '</div>' +
      '</div>';

    var wb = document.getElementById('tea-wx-btn');
    if (wb) wb.addEventListener('click', function () { copyText(state.shopSettings.serviceWechat, '已复制茶礼顾问微信：' + state.shopSettings.serviceWechat); });
    screen.querySelectorAll('[data-tea-bm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.teaBookmark = btn.getAttribute('data-tea-bm');
        renderCustomerHomeTea(screen, cs, cust, u);
      });
    });
    bindGiftCardActions(screen);
  }

  /* ── 版本 D：冰川科技（Bento 双拼磁贴 + 区间过滤 + 紧凑网格 + 悬浮结算条） ── */
  function renderCustomerHomeGlacier(screen, cs, cust, u) {
    var ranges = [
      { key: 'all', label: '全部' },
      { key: 'le60', label: '<=60' + u },
      { key: 'r61_100', label: '61-100' + u },
      { key: 'gt100', label: '100+' + u },
    ];
    var list = state.gifts.filter(function (g) {
      if (state.glacierRange === 'le60') return g.cost <= 60;
      if (state.glacierRange === 'r61_100') return g.cost >= 61 && g.cost <= 100;
      if (state.glacierRange === 'gt100') return g.cost > 100;
      return true;
    }).slice(0, 4);

    var wishGifts = state.wishlistIds.map(findGift).filter(Boolean);
    var totalCost = wishGifts.reduce(function (s, g) { return s + Number(g.cost || 0); }, 0);

    screen.innerHTML =
      liveTickerHtml() +
      '<div class="gla-bento-top">' +
        '<div class="gla-dash-tile">' +
          '<div style="font-size:14px;opacity:0.88;">' + esc(state.shopSettings.welcomeTitle) + '</div>' +
          '<div class="gla-dash-num">' + cust.balance + '</div>' +
          '<div class="gla-dash-id">ID:' + esc(cust.code) + ' · ' + esc(u) + '</div>' +
        '</div>' +
        '<div class="gla-side-tiles">' +
          '<button type="button" class="gla-quick-tile" id="gla-rules-btn">30秒看懂规则 ›</button>' +
          '<button type="button" class="gla-quick-tile" id="gla-wx-btn">复制客服微信</button>' +
        '</div>' +
      '</div>' +
      '<div class="gla-filter-bar">' +
        ranges.map(function (r) {
          return '<button type="button" class="gla-filter-pill ' + (state.glacierRange === r.key ? 'is-active' : '') + '" data-gla-range="' + esc(r.key) + '">' + esc(r.label) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="gla-compact-grid">' +
        (list.length ? list.map(function (g) {
          return '<div class="gla-gift-card">' +
            '<div class="gla-gift-illus" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + giftSvg(g.illustration, '#2563EB', 54) + '</div>' +
            '<div class="gla-gift-name" data-open-detail="' + esc(g.id) + '" style="cursor:pointer;">' + esc(g.name) + '</div>' +
            '<div class="gla-gift-foot">' +
              '<span class="gla-gift-cost">' + g.cost + ' ' + esc(u) + (g.marketPrice ? '<span class="market-price-del">' + esc(g.marketPrice) + '</span>' : '') + '</span>' +
              '<button type="button" class="gla-plus-btn" data-toggle-wish="' + esc(g.id) + '" aria-label="加入礼栈">+</button>' +
            '</div>' +
          '</div>';
        }).join('') : '<div class="m-card" style="grid-column:1/-1;text-align:center;">该区间暂无商品</div>') +
      '</div>' +
      '<div class="gla-floating-cart">' +
        '<span>已选 ' + wishGifts.length + ' 件 · 共 ' + totalCost + ' ' + esc(u) + '</span>' +
        '<button type="button" class="gla-checkout-btn" id="gla-go-apply">去提交兑换 →</button>' +
      '</div>';

    var rb = document.getElementById('gla-rules-btn');
    if (rb) rb.addEventListener('click', openRulesSheet);
    var wb = document.getElementById('gla-wx-btn');
    if (wb) wb.addEventListener('click', function () { copyText(state.shopSettings.serviceWechat, '已复制客服微信：' + state.shopSettings.serviceWechat); });
    var goApply = document.getElementById('gla-go-apply');
    if (goApply) {
      goApply.addEventListener('click', function () {
        state.customerTab = 'wishlist';
        renderPhone();
      });
    }
    screen.querySelectorAll('[data-gla-range]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.glacierRange = btn.getAttribute('data-gla-range');
        renderCustomerHomeGlacier(screen, cs, cust, u);
      });
    });
    bindGiftCardActions(screen);
  }

  function renderCustomerScreen() {
    var screen = document.getElementById('phone-screen');
    if (!screen) return;
    var cs = bundle.previewData.customerScreens;
    var cust = currentCustomer();
    var u = unit();

    if (state.customerTab === 'home') {
      var themeId = currentUiTheme().id;
      if (themeId === 'crimson') return renderCustomerHomeCrimson(screen, cs, cust, u);
      if (themeId === 'tea') return renderCustomerHomeTea(screen, cs, cust, u);
      if (themeId === 'glacier') return renderCustomerHomeGlacier(screen, cs, cust, u);
      return renderCustomerHomeObsidian(screen, cs, cust, u);
    }

    if (state.customerTab === 'category') {
      var filtered = state.gifts.filter(function (g) {
        var catOk = state.selectedCategory === '全部' || g.category === state.selectedCategory;
        var costOk = true;
        if (state.selectedCostFilter === 'low') costOk = g.cost <= 30;
        if (state.selectedCostFilter === 'mid') costOk = g.cost > 30 && g.cost <= 80;
        if (state.selectedCostFilter === 'high') costOk = g.cost > 80;
        return catOk && costOk;
      });
      screen.innerHTML =
        '<div class="m-chip-row">' +
          cs.categories.map(function (cat) {
            return '<button type="button" class="m-chip ' + (state.selectedCategory === cat ? 'is-active' : '') + '" data-cat="' + esc(cat) + '">' + esc(cat) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="m-chip-row">' +
          cs.costFilters.map(function (cf) {
            return '<button type="button" class="m-chip ' + (state.selectedCostFilter === cf.key ? 'is-active' : '') + '" data-cost="' + esc(cf.key) + '">' + esc(cf.label) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="m-gift-grid">' +
          (filtered.length ? filtered.map(renderCustomerGiftCard).join('') : '<div class="m-card" style="text-align:center;">暂无匹配礼品</div>') +
        '</div>';

      screen.querySelectorAll('[data-cat]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.selectedCategory = btn.getAttribute('data-cat');
          renderCustomerScreen();
        });
      });
      screen.querySelectorAll('[data-cost]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.selectedCostFilter = btn.getAttribute('data-cost');
          renderCustomerScreen();
        });
      });
      bindGiftCardActions(screen);
      return;
    }

    if (state.customerTab === 'wishlist') {
      var wishGifts = state.wishlistIds.map(findGift).filter(Boolean);
      var totalCost = wishGifts.reduce(function (sum, g) { return sum + Number(g.cost || 0); }, 0);
      screen.innerHTML =
        '<div class="m-card">' +
          '<p class="m-card__title">我的礼栈（' + wishGifts.length + ' 件）</p>' +
          '<p class="m-card__meta" style="margin:6px 0 0;">合计需 <strong style="color:var(--gold)">' + totalCost + ' ' + esc(u) + '</strong> · 可用 <strong style="color:var(--emerald)">' + cust.balance + ' ' + esc(u) + '</strong></p>' +
        '</div>' +
        '<div class="m-row-list">' +
          wishGifts.map(function (g) {
            return '<div class="m-list-item">' +
              '<div class="m-list-item__top">' +
                '<div><strong style="font-size:16px;">' + esc(g.name) + '</strong><div class="m-card__meta" style="color:var(--emerald);font-weight:700;">' + g.cost + ' ' + esc(u) + '</div></div>' +
                '<button type="button" class="m-btn m-btn--sm" data-remove-wish="' + esc(g.id) + '">移除</button>' +
              '</div>' +
              '<button type="button" class="m-btn m-btn--emerald m-btn--block" style="margin-top:8px;" data-redeem-gift="' + esc(g.id) + '">立即兑换</button>' +
            '</div>';
          }).join('') +
        '</div>';

      screen.querySelectorAll('[data-remove-wish]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-remove-wish');
          state.wishlistIds = state.wishlistIds.filter(function (x) { return x !== id; });
          renderPhone();
        });
      });
      screen.querySelectorAll('[data-redeem-gift]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.applyFormGiftId = btn.getAttribute('data-redeem-gift');
          state.customerTab = 'applies';
          renderPhone();
        });
      });
      return;
    }

    if (state.customerTab === 'applies') {
      var selectedGift = findGift(state.applyFormGiftId) || state.gifts[0];
      screen.innerHTML =
        '<div class="m-card">' +
          '<div class="m-card__head"><p class="m-card__title">提交兑换</p><span class="m-card__meta">余额 ' + cust.balance + ' ' + esc(u) + '</span></div>' +
          '<div class="m-form-row"><label class="m-form-label">礼品</label>' +
            '<select class="m-input" id="c-apply-gift">' +
              state.gifts.map(function (g) {
                var sel = selectedGift && g.id === selectedGift.id ? 'selected' : '';
                return '<option value="' + esc(g.id) + '" ' + sel + '>' + esc(g.name) + '（' + g.cost + ' ' + esc(u) + '）</option>';
              }).join('') +
            '</select>' +
          '</div>' +
          '<div class="m-form-row"><label class="m-form-label">收件人</label>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
              '<input class="m-input" id="c-apply-name" value="' + esc(state.applyFormReceiver) + '">' +
              '<input class="m-input" id="c-apply-phone" value="' + esc(state.applyFormPhone) + '">' +
            '</div>' +
          '</div>' +
          '<div class="m-form-row"><label class="m-form-label">地址</label>' +
            '<input class="m-input" id="c-apply-addr" value="' + esc(state.applyFormAddress) + '">' +
          '</div>' +
          '<button type="button" class="m-btn m-btn--emerald m-btn--block" id="c-submit-apply">确认提交兑换</button>' +
        '</div>' +
        '<div class="m-row-list">' +
          state.applies.map(function (a) {
            var shipped = a.status === 'shipped';
            return '<div class="m-list-item">' +
              '<div class="m-list-item__top">' +
                '<strong style="font-size:16px;">' + esc(a.giftName) + '</strong>' +
                '<span class="m-status-tag ' + (shipped ? 'm-status-tag--done' : 'm-status-tag--pending') + '">' + esc(a.statusLabel) + '</span>' +
              '</div>' +
              '<div class="m-card__meta" style="margin-top:4px;">' + esc(a.receiver + ' · ' + a.address) + '</div>' +
              (shipped ? '<div class="m-card__meta" style="color:var(--emerald);font-weight:700;margin-top:4px;">单号：' + esc(a.expressCompany + ' ' + a.trackingNo) + '</div>' : '') +
            '</div>';
          }).join('') +
        '</div>';

      var selEl = document.getElementById('c-apply-gift');
      if (selEl) selEl.addEventListener('change', function () { state.applyFormGiftId = selEl.value; });
      var subBtn = document.getElementById('c-submit-apply');
      if (subBtn) {
        subBtn.addEventListener('click', function () {
          var gift = findGift(document.getElementById('c-apply-gift').value);
          var receiver = document.getElementById('c-apply-name').value.trim();
          var phone = document.getElementById('c-apply-phone').value.trim();
          var address = document.getElementById('c-apply-addr').value.trim();
          if (!gift || !receiver || !phone || !address) {
            showToast('请填完整收货信息');
            return;
          }
          if (cust.balance < gift.cost) {
            showToast('余额不足，可切到店主后台加币');
            return;
          }
          cust.balance -= gift.cost;
          state.applies.unshift({
            id: 'ord-demo-' + (103 + state.applies.length),
            giftId: gift.id,
            giftName: gift.name,
            cost: gift.cost,
            status: 'pending',
            statusLabel: '待发货',
            receiver: receiver,
            phone: phone,
            address: address,
            expressCompany: '',
            trackingNo: '',
            createdAt: '刚刚',
          });
          state.logs.unshift({
            id: 'log-' + Date.now(),
            customerCode: cust.code,
            customerName: cust.nickname,
            delta: -gift.cost,
            balanceAfter: cust.balance,
            reason: '兑换' + gift.name,
            time: '刚刚',
          });
          renderPhone();
          showToast('已提交！切到「店主手机后台 → 待发货」可直接处理');
        });
      }
    }
  }

  function renderCustomerGiftCard(g) {
    var wished = state.wishlistIds.indexOf(g.id) >= 0;
    return '<div class="m-gift-card">' +
      '<div class="m-gift-card__top">' +
        '<div class="m-gift-illus" style="background:' + esc(g.tint || '#ECFDF5') + '">' + giftSvg(g.illustration, g.accent) + '</div>' +
        '<div style="flex:1;">' +
          '<div class="m-gift-card__name">' + esc(g.name) + '</div>' +
          '<div class="m-gift-card__sub">' + esc(g.getText || g.desc) + '</div>' +
          '<span class="m-gift-card__price">' + esc(formatTerms(g.payText || (g.cost + ' ' + unit()))) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="m-gift-card__actions">' +
        '<button type="button" class="m-btn m-btn--emerald" data-instant-redeem="' + esc(g.id) + '">立即兑换</button>' +
        '<button type="button" class="m-btn ' + (wished ? 'm-btn--dark' : '') + '" data-toggle-wish="' + esc(g.id) + '">' + (wished ? '已收藏' : '加礼栈') + '</button>' +
      '</div>' +
    '</div>';
  }

  function bindGiftCardActions(container) {
    container.querySelectorAll('[data-toggle-wish]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle-wish');
        var idx = state.wishlistIds.indexOf(id);
        if (idx >= 0) {
          state.wishlistIds.splice(idx, 1);
          showToast('已从礼栈移除');
        } else {
          state.wishlistIds.push(id);
          showToast('已加入礼栈');
        }
        renderPhone();
      });
    });

    container.querySelectorAll('[data-instant-redeem]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.applyFormGiftId = btn.getAttribute('data-instant-redeem');
        state.customerTab = 'applies';
        renderPhone();
      });
    });

    container.querySelectorAll('[data-open-detail]').forEach(function (el) {
      el.addEventListener('click', function () {
        openGiftDetailSheet(el.getAttribute('data-open-detail'));
      });
    });
  }

  function openGuideModal(key) {
    var list = bundle.previewData.customerScreens.guideEntries || [];
    var item = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) { item = list[i]; break; }
    }
    if (!item) return;
    openPhoneModal(
      '<div class="m-card__head"><p class="m-card__title">' + esc(formatTerms(item.title)) + '</p><button type="button" class="text-btn" data-close-modal>关闭</button></div>' +
      '<div class="m-list-item" style="margin-bottom:10px;">' +
        (item.lines || []).map(function (ln) { return '<div style="margin-bottom:6px;font-size:15px;font-weight:600;">' + esc(formatTerms(ln)) + '</div>'; }).join('') +
      '</div>' +
      '<p class="m-card__meta" style="margin:0;">店主可在手机后台随时改这里的文案，保存秒生效。</p>'
    );
  }

  /* ── 视角 B：店主手机后台 ── */
  function renderOwnerNavBar() {
    var bar = document.getElementById('owner-nav-bar');
    if (!bar) return;
    var tabs = bundle.previewData.ownerScreens.navTabs || [];
    bar.innerHTML = tabs.map(function (t) {
      var active = t.key === state.ownerTab ? 'is-active' : '';
      return '<button type="button" class="owner-nav__btn ' + active + '" data-otab="' + esc(t.key) + '">' +
        svgIcon(t.iconKey, 15) +
        '<span>' + esc(t.label) + '</span>' +
      '</button>';
    }).join('');
    bar.querySelectorAll('[data-otab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.ownerTab = btn.getAttribute('data-otab');
        renderPhone();
      });
    });
  }

  function ownerConsoleBanner() {
    var t = currentUiTheme();
    var titles = {
      obsidian: '黑金高管台 · ' + activeShopName(),
      crimson: '红金掌柜台 · ' + activeShopName(),
      tea: '东方账房册 · ' + activeShopName(),
      glacier: '蓝白数据看板 · ' + activeShopName(),
    };
    return '<div class="owner-console-head owner-console-head--' + esc(t.id) + '">' +
      '<strong style="font-size:15px;">' + esc(titles[t.id] || activeShopName()) + '</strong>' +
      '<span style="font-size:14px;opacity:0.88;">版本' + esc(t.code) + '</span>' +
    '</div>' +
    '<div class="boss-guide-bar">' +
      '<div class="boss-guide-bar__title">30 秒当老板爽感体验（点击即试）</div>' +
      '<div class="boss-guide-pills">' +
        '<button type="button" class="boss-guide-pill" data-boss-go="applies">1. 3秒复制打单地址</button>' +
        '<button type="button" class="boss-guide-pill" data-boss-go="shop">2. 改公告秒同步前台</button>' +
        '<button type="button" class="boss-guide-pill" data-boss-go="customers">3. 给客户充值积分</button>' +
      '</div>' +
    '</div>';
  }

  function bindBossGuide(screen) {
    screen.querySelectorAll('[data-boss-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.ownerTab = btn.getAttribute('data-boss-go');
        renderPhone();
      });
    });
  }

  function renderOwnerScreen() {
    var screen = document.getElementById('phone-screen');
    if (!screen) return;
    var u = unit();
    var consoleHead = ownerConsoleBanner();

    if (state.ownerTab === 'applies') {
      var pendingCount = state.applies.filter(function (a) { return a.status === 'pending'; }).length;
      var visible = state.applies.filter(function (a) {
        return state.ownerApplyFilter === 'all' || a.status === state.ownerApplyFilter;
      });
      screen.innerHTML =
        consoleHead +
        '<div class="m-chip-row">' +
          '<button type="button" class="m-chip ' + (state.ownerApplyFilter === 'all' ? 'is-active' : '') + '" data-af="all">全部 (' + state.applies.length + ')</button>' +
          '<button type="button" class="m-chip ' + (state.ownerApplyFilter === 'pending' ? 'is-active' : '') + '" data-af="pending">待发货 (' + pendingCount + ')</button>' +
          '<button type="button" class="m-chip ' + (state.ownerApplyFilter === 'shipped' ? 'is-active' : '') + '" data-af="shipped">已发货</button>' +
        '</div>' +
        '<div class="m-row-list">' +
          visible.map(function (a) {
            var shipped = a.status === 'shipped';
            var fullAddr = a.receiver + ' ' + a.phone + ' ' + a.address;
            return '<div class="m-list-item">' +
              '<div class="m-list-item__top">' +
                '<strong style="font-size:17px;">' + esc(a.giftName) + (a.isNew ? '<span class="new-order-badge">新订单</span>' : '') + '</strong>' +
                '<span class="m-status-tag ' + (shipped ? 'm-status-tag--done' : 'm-status-tag--pending') + '">' + esc(a.statusLabel) + '</span>' +
              '</div>' +
              '<div class="m-address-box">' +
                '<span>' + esc(fullAddr) + '</span>' +
                '<button type="button" class="m-btn m-btn--dark m-btn--block" data-copy-addr="' + esc(fullAddr) + '">' + svgIcon('copy', 15) + '一键复制地址去下单</button>' +
              '</div>' +
              (shipped
                ? '<div class="m-card__meta" style="color:var(--emerald);font-weight:700;">已发：' + esc(a.expressCompany + ' ' + a.trackingNo) + '</div>'
                : '<div class="m-inline-edit">' +
                    '<input class="m-input" id="track-' + esc(a.id) + '" value="DEMO8888">' +
                    '<button type="button" class="m-btn m-btn--emerald" data-ship-id="' + esc(a.id) + '">发货</button>' +
                  '</div>'
              ) +
            '</div>';
          }).join('') +
        '</div>';

      screen.querySelectorAll('[data-af]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.ownerApplyFilter = btn.getAttribute('data-af');
          renderOwnerScreen();
        });
      });
      screen.querySelectorAll('[data-copy-addr]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          copyText(btn.getAttribute('data-copy-addr'), '已复制收货地址');
        });
      });
      screen.querySelectorAll('[data-ship-id]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-ship-id');
          var input = document.getElementById('track-' + id);
          var trackingNo = (input && input.value.trim()) || 'DEMO8888';
          for (var i = 0; i < state.applies.length; i++) {
            if (state.applies[i].id === id) {
              state.applies[i].status = 'shipped';
              state.applies[i].statusLabel = '已发货';
              state.applies[i].expressCompany = '示例快递';
              state.applies[i].trackingNo = trackingNo;
              break;
            }
          }
          renderOwnerScreen();
          showToast('已标记发货，顾客端同步更新');
        });
      });
      bindBossGuide(screen);
      return;
    }

    if (state.ownerTab === 'shop') {
      screen.innerHTML =
        consoleHead +
        '<div class="m-card">' +
          '<div class="m-card__head"><p class="m-card__title">手机改文案（保存秒生效）</p><span class="m-status-tag m-status-tag--done">免提审</span></div>' +
          '<div class="m-form-row"><label class="m-form-label">客服微信号</label><input class="m-input" id="o-shop-wechat" value="' + esc(state.shopSettings.serviceWechat) + '"></div>' +
          '<div class="m-form-row"><label class="m-form-label">首页欢迎标题</label><input class="m-input" id="o-welcome-title" value="' + esc(state.shopSettings.welcomeTitle) + '"></div>' +
          '<div class="m-form-row"><label class="m-form-label">首页说明</label><textarea class="m-textarea" id="o-welcome-lines">' + esc(state.shopSettings.welcomeLinesText) + '</textarea></div>' +
          '<button type="button" class="m-btn m-btn--emerald m-btn--block" id="o-save-shop">保存设置（立即生效）</button>' +
          (state.shopSyncedNotice ? (
            '<div class="sync-cta-banner">' +
              '<span>已实时生效！顾客端已同步为「' + esc(state.shopSettings.welcomeTitle) + '」</span>' +
              '<button type="button" class="m-btn m-btn--dark m-btn--sm" id="o-jump-customer-front">点我切回顾客前台亲眼看看 →</button>' +
            '</div>'
          ) : '') +
        '</div>' +
        '<div class="m-card">' +
          '<div class="m-card__head"><p class="m-card__title">加店员一起管店</p></div>' +
          '<div class="m-inline-edit" style="margin-top:0;margin-bottom:8px;">' +
            '<input class="m-input" id="o-admin-code" placeholder="输入4位顾客号如 8801" maxlength="8">' +
            '<button type="button" class="m-btn m-btn--dark" id="o-add-admin">设为协管</button>' +
          '</div>' +
          state.shopSettings.admins.map(function (adm) {
            return '<div class="m-list-item__top" style="padding:8px 0;border-top:1px solid var(--line);">' +
              '<span style="font-size:15px;font-weight:700;">' + esc(adm.name) + '（#' + esc(adm.code) + '）</span>' +
              '<button type="button" class="m-btn m-btn--sm" data-rm-admin="' + esc(adm.code) + '">移除</button>' +
            '</div>';
          }).join('') +
        '</div>';

      var saveShopBtn = document.getElementById('o-save-shop');
      if (saveShopBtn) {
        saveShopBtn.addEventListener('click', function () {
          state.shopSettings.serviceWechat = document.getElementById('o-shop-wechat').value.trim() || 'demo_service';
          state.shopSettings.welcomeTitle = document.getElementById('o-welcome-title').value.trim() || '欢迎光临';
          state.shopSettings.welcomeLinesText = document.getElementById('o-welcome-lines').value.trim();
          state.shopSyncedNotice = true;
          renderOwnerScreen();
          showToast('保存成功！顾客端已实时生效');
        });
      }
      var jumpFrontBtn = document.getElementById('o-jump-customer-front');
      if (jumpFrontBtn) {
        jumpFrontBtn.addEventListener('click', function () {
          state.perspective = 'customer';
          state.customerTab = 'home';
          renderPhone();
          showToast('已切回顾客前台，顶部已实时更新为新公告');
        });
      }
      bindBossGuide(screen);
      var addAdmBtn = document.getElementById('o-add-admin');
      if (addAdmBtn) {
        addAdmBtn.addEventListener('click', function () {
          var code = document.getElementById('o-admin-code').value.trim();
          if (!/^\d{4}$/.test(code)) {
            showToast('请输入 4 位数字顾客号');
            return;
          }
          if (!state.shopSettings.admins.some(function (a) { return a.code === code; })) {
            state.shopSettings.admins.push({ code: code, name: '店员 #' + code });
          }
          renderOwnerScreen();
          showToast('已添加协管员 #' + code);
        });
      }
      screen.querySelectorAll('[data-rm-admin]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var code = btn.getAttribute('data-rm-admin');
          state.shopSettings.admins = state.shopSettings.admins.filter(function (a) { return a.code !== code; });
          renderOwnerScreen();
        });
      });
      bindBossGuide(screen);
      return;
    }

    if (state.ownerTab === 'gifts') {
      screen.innerHTML =
        consoleHead +
        '<div class="m-card">' +
          '<div class="m-card__head">' +
            '<p class="m-card__title">礼品管理（' + state.gifts.length + ' 件）</p>' +
            '<button type="button" class="m-btn m-btn--dark m-btn--sm" id="o-toggle-add">' + (state.ownerShowAddGift ? '收起' : '+ 新增礼品') + '</button>' +
          '</div>' +
        '</div>' +
        (state.ownerShowAddGift ? (
          '<div class="m-card" style="border-color:var(--ink);">' +
            '<div class="m-form-row"><label class="m-form-label">礼品名称</label><input class="m-input" id="o-new-name" placeholder="如：便携烧水壶"></div>' +
            '<div class="m-form-row"><label class="m-form-label">所需' + esc(u) + '</label><input class="m-input" id="o-new-cost" type="number" value="35"></div>' +
            '<button type="button" class="m-btn m-btn--emerald m-btn--block" id="o-save-new-gift">保存上架</button>' +
          '</div>'
        ) : '') +
        '<div class="m-row-list">' +
          state.gifts.map(function (g) {
            return '<div class="m-list-item">' +
              '<div class="m-list-item__top">' +
                '<strong style="font-size:16px;">' + esc(g.name) + '</strong>' +
                '<button type="button" class="m-btn m-btn--sm ' + (g.hot ? 'm-btn--dark' : '') + '" data-toggle-hot="' + esc(g.id) + '">' + (g.hot ? '已热门' : '设热门') + '</button>' +
              '</div>' +
              '<div class="m-inline-edit">' +
                '<button type="button" class="m-btn m-btn--sm" data-cost-step="-5" data-gid="' + esc(g.id) + '">-5</button>' +
                '<strong style="font-size:16px;min-width:74px;text-align:center;color:var(--emerald);">' + g.cost + ' ' + esc(u) + '</strong>' +
                '<button type="button" class="m-btn m-btn--sm" data-cost-step="5" data-gid="' + esc(g.id) + '">+5</button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>';

      var toggleAdd = document.getElementById('o-toggle-add');
      if (toggleAdd) {
        toggleAdd.addEventListener('click', function () {
          state.ownerShowAddGift = !state.ownerShowAddGift;
          renderOwnerScreen();
        });
      }
      var saveNewBtn = document.getElementById('o-save-new-gift');
      if (saveNewBtn) {
        saveNewBtn.addEventListener('click', function () {
          var name = document.getElementById('o-new-name').value.trim() || '示例·便携烧水壶';
          var cost = Math.max(1, parseInt(document.getElementById('o-new-cost').value, 10) || 35);
          state.gifts.unshift({
            id: 'g-demo-' + Date.now(),
            name: name,
            category: '茶具礼盒',
            cost: cost,
            hot: true,
            badge: '新品',
            illustration: 'thermos',
            tint: '#ECFDF5',
            accent: '#059669',
            getText: name,
            payText: '达标 ' + cost + ' ' + u + '即可',
            desc: '手机端新增演示礼品。',
          });
          state.ownerShowAddGift = false;
          renderOwnerScreen();
          showToast('已上架「' + name + '」');
        });
      }
      screen.querySelectorAll('[data-toggle-hot]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var g = findGift(btn.getAttribute('data-toggle-hot'));
          if (!g) return;
          g.hot = !g.hot;
          renderOwnerScreen();
        });
      });
      screen.querySelectorAll('[data-cost-step]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var g = findGift(btn.getAttribute('data-gid'));
          var delta = parseInt(btn.getAttribute('data-cost-step'), 10);
          if (!g) return;
          g.cost = Math.max(1, g.cost + delta);
          g.payText = '达标 ' + g.cost + ' ' + u + '即可';
          renderOwnerScreen();
        });
      });
      bindBossGuide(screen);
      return;
    }

    if (state.ownerTab === 'customers') {
      screen.innerHTML =
        consoleHead +
        '<div class="m-row-list">' +
          state.customers.map(function (c) {
            return '<div class="m-list-item">' +
              '<div class="m-list-item__top">' +
                '<strong style="font-size:16px;">' + esc(c.nickname) + ' (#' + esc(c.code) + ')</strong>' +
                '<strong style="font-size:17px;color:var(--emerald);">' + c.balance + ' ' + esc(u) + '</strong>' +
              '</div>' +
              '<div class="m-inline-edit">' +
                '<button type="button" class="m-btn m-btn--sm" style="flex:1;" data-adj="-10" data-ccode="' + esc(c.code) + '">-10</button>' +
                '<button type="button" class="m-btn m-btn--sm m-btn--emerald" style="flex:1;" data-adj="10" data-ccode="' + esc(c.code) + '">+10 发币</button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="m-card" style="margin-top:10px;">' +
          '<p class="m-card__title" style="margin-bottom:8px;">实时总流水</p>' +
          state.logs.slice(0, 5).map(function (lg) {
            var plus = lg.delta >= 0;
            return '<div class="m-list-item__top" style="padding:6px 0;border-top:1px solid var(--line);font-size:14px;">' +
              '<span>' + esc(lg.customerName) + ' · ' + esc(formatTerms(lg.reason)) + '</span>' +
              '<strong style="color:' + (plus ? 'var(--emerald)' : 'var(--gold)') + ';">' + (plus ? '+' : '') + lg.delta + '</strong>' +
            '</div>';
          }).join('') +
        '</div>';

      screen.querySelectorAll('[data-adj]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var code = btn.getAttribute('data-ccode');
          var delta = parseInt(btn.getAttribute('data-adj'), 10);
          for (var i = 0; i < state.customers.length; i++) {
            var c = state.customers[i];
            if (c.code === code) {
              if (c.balance + delta < 0) {
                showToast('余额不能为负');
                return;
              }
              c.balance += delta;
              state.logs.unshift({
                id: 'log-' + Date.now(),
                customerCode: c.code,
                customerName: c.nickname,
                delta: delta,
                balanceAfter: c.balance,
                reason: delta > 0 ? '店主发币' : '店主扣减',
                time: '刚刚',
              });
              renderOwnerScreen();
              showToast('已调整并写入流水');
              break;
            }
          }
        });
      });
      bindBossGuide(screen);
    }
  }

  /* ── 02 注册与过审（手风琴折叠 + 自动展开下一步） ── */
  function renderAuditTutorial() {
    var steps = (bundle.auditTutorial && bundle.auditTutorial.steps) || [];
    var total = steps.length;
    var doneCount = steps.filter(function (s) { return state.auditCompleted.indexOf(s.id) >= 0; }).length;
    var pct = total ? Math.round((doneCount / total) * 100) : 0;

    var progText = document.getElementById('audit-progress-text');
    var progFill = document.getElementById('audit-progress-fill');
    if (progText) progText.textContent = '已完成 ' + doneCount + ' / ' + total + ' 步 · 点击展开详情';
    if (progFill) progFill.style.width = pct + '%';

    var container = document.getElementById('audit-steps-list');
    if (!container) return;

    container.innerHTML = steps.map(function (st) {
      var done = state.auditCompleted.indexOf(st.id) >= 0;
      var expanded = state.auditOpenId === st.id;
      return '<article class="acc-card ' + (done ? 'is-completed' : '') + '">' +
        '<button type="button" class="acc-head" data-acc-toggle="' + esc(st.id) + '" aria-expanded="' + expanded + '">' +
          '<div class="acc-head__left">' +
            '<span class="acc-num">' + (done ? svgIcon('check', 16) : esc(st.stepNum || ('0' + st.stepNo))) + '</span>' +
            '<div>' +
              '<div class="acc-title">' + esc(st.title) + '</div>' +
              '<div class="acc-badge">' + esc(st.badge) + (done ? ' · 已完成' : '') + '</div>' +
            '</div>' +
          '</div>' +
          svgIcon('chevron', 18) +
        '</button>' +
        '<div class="acc-body" ' + (expanded ? '' : 'hidden') + '>' +
          '<div class="path-box">去哪里点：' + esc(st.wherePath) + '</div>' +
          '<ul class="step-bullets">' +
            (st.bigSteps || []).map(function (bs) { return '<li>' + esc(bs) + '</li>'; }).join('') +
          '</ul>' +
          (st.oneLineWarning ? '<div class="pitfall-box">' + esc(st.oneLineWarning) + '</div>' : '') +
          '<div class="acc-actions">' +
            '<button type="button" class="m-btn ' + (done ? 'm-btn--emerald' : 'm-btn--dark') + '" style="flex:1;" data-toggle-audit="' + esc(st.id) + '">' +
              (done ? '已完成（点此取消）' : '完成这一步') +
            '</button>' +
            '<button type="button" class="m-btn" data-copy-audit="' + esc(st.id) + '">' + svgIcon('copy', 15) + '复制</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');

    container.querySelectorAll('[data-acc-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-acc-toggle');
        state.auditOpenId = state.auditOpenId === id ? '' : id;
        renderAuditTutorial();
      });
    });

    container.querySelectorAll('[data-toggle-audit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle-audit');
        var idx = state.auditCompleted.indexOf(id);
        if (idx >= 0) {
          state.auditCompleted.splice(idx, 1);
        } else {
          state.auditCompleted.push(id);
          // 自动展开下一步
          for (var i = 0; i < steps.length - 1; i++) {
            if (steps[i].id === id) {
              state.auditOpenId = steps[i + 1].id;
              break;
            }
          }
        }
        saveCompletedSteps();
        renderAuditTutorial();
      });
    });

    container.querySelectorAll('[data-copy-audit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-copy-audit');
        for (var i = 0; i < steps.length; i++) {
          if (steps[i].id === id) {
            copyText(steps[i].copySummary || steps[i].title, '已复制第 ' + steps[i].stepNo + ' 步要点');
            break;
          }
        }
      });
    });
  }

  /* ── 03 后台怎么用（紧凑直连卡） ── */
  function renderBackendTutorial() {
    var steps = (bundle.backendTutorial && bundle.backendTutorial.steps) || [];
    var container = document.getElementById('backend-steps-list');
    if (!container) return;

    container.innerHTML = steps.map(function (st) {
      var target = st.previewTarget || { role: 'owner', tab: 'applies' };
      return '<article class="backend-card">' +
        '<div class="backend-card__top">' +
          '<div class="backend-card__title-wrap">' +
            '<span class="backend-card__ic">' + svgIcon(st.iconKey, 18) + '</span>' +
            '<div>' +
              '<h3 class="backend-card__title">' + esc(st.title) + '</h3>' +
              '<span class="backend-card__path">' + esc(st.entryPath) + '</span>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="backend-try-btn" data-jump-tab="' + esc(target.tab) + '">去实机试一下 →</button>' +
        '</div>' +
        '<ul class="step-bullets" style="margin:0;">' +
          (st.bigSteps || []).map(function (bs) { return '<li>' + esc(formatTerms(bs)) + '</li>'; }).join('') +
        '</ul>' +
      '</article>';
    }).join('');

    container.querySelectorAll('[data-jump-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.perspective = 'owner';
        state.ownerTab = btn.getAttribute('data-jump-tab') || 'applies';
        switchSection('preview');
        renderAll();
        var frame = document.getElementById('phone-frame');
        if (frame && frame.scrollIntoView) {
          frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        showToast('已切到对应手机后台，可直接试用');
      });
    });
  }

  /* ── 浮层 1：高定黑金微信分享名片 ── */
  function openPosterModal() {
    var mask = document.getElementById('poster-modal-mask');
    var body = document.getElementById('poster-card-body');
    var tip = document.getElementById('poster-modal-tip');
    var pc = (bundle.marketingData && bundle.marketingData.posterCard) || {};
    if (!mask || !body) return;
    if (tip) tip.textContent = '手机截屏上方名片，即可直接发进微信聊天';
    body.innerHTML =
      '<span class="poster-card__kicker">微信口碑定制 · 零风险试错</span>' +
      '<h2 class="poster-card__title">' + esc(pc.headline || '专属礼品册小程序定制') + '</h2>' +
      '<p class="poster-card__sub">' + esc(pc.subline || '想要功能随便提 · 随时改到满意 · 不满意不要钱') + '</p>' +
      '<div class="poster-trio">' +
        (pc.trio || []).map(function (item) {
          return '<div class="poster-trio-item">' +
            '<strong>' + esc((item.num || '') + ' · ' + item.title) + '</strong>' +
            '<span>' + esc(item.text) + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="poster-card__foot">' + esc(pc.footerNote || '长按或截屏转发微信朋友') + '</div>';
    mask.hidden = false;
  }

  /* ── 浮层 2：定制功能点播与对比 ── */
  function openCustomModal() {
    var mask = document.getElementById('poster-modal-mask');
    var body = document.getElementById('poster-card-body');
    var tip = document.getElementById('poster-modal-tip');
    var md = bundle.marketingData || {};
    if (!mask || !body) return;
    if (tip) tip.textContent = '想要什么功能都可以提，随时改到满意为止';
    body.style.background = '#FFFFFF';
    body.style.color = '#0F172A';
    body.style.borderColor = '#E2E8F0';
    body.innerHTML =
      '<h2 class="poster-card__title" style="margin-top:0;font-size:20px;">为什么选择 1 对 1 口碑定制</h2>' +
      '<div style="margin-bottom:12px;">' +
        (md.comparisonTable || []).map(function (r) {
          return '<div class="compare-row">' +
            '<strong style="font-size:15px;">' + esc(r.dimension) + '</strong>' +
            '<div class="compare-row__cols">' +
              '<div class="compare-col--market">普通模板：' + esc(r.market) + '</div>' +
              '<div class="compare-col--ours">我们：' + esc(r.ours) + '</div>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="font-size:15px;font-weight:800;margin-bottom:8px;">常见可加功能示例</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">' +
        (md.customFeatureExamples || []).map(function (f) {
          return '<div style="padding:8px;border-radius:10px;background:#F8FAFC;border:1px solid #E2E8F0;font-size:14px;">' +
            '<strong>' + esc(f.tag) + '</strong>' +
            '<div style="color:#64748B;margin-top:2px;">' + esc(f.desc) + '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    mask.hidden = false;
  }

  function closePosterModal() {
    var mask = document.getElementById('poster-modal-mask');
    var body = document.getElementById('poster-card-body');
    if (body) {
      body.style.background = '';
      body.style.color = '';
      body.style.borderColor = '';
    }
    if (mask) mask.hidden = true;
  }

  function renderAll() {
    renderHero();
    renderPainVsGain();
    renderThemePicker();
    renderCurrencyPills();
    renderPhone();
    renderConfigurator();
    renderAuditTutorial();
    renderBackendTutorial();
  }

  bindGlobalNav();
  renderAll();

  if (typeof setInterval === 'function') {
    setInterval(function () {
      var tickers = (bundle.previewData.customerScreens.liveTickers) || [];
      if (!tickers.length) return;
      state.tickerIndex = (state.tickerIndex + 1) % tickers.length;
      var bar = document.getElementById('live-ticker-bar');
      if (bar) {
        var spans = bar.querySelectorAll('span');
        if (spans[1]) spans[1].textContent = tickers[state.tickerIndex];
      }
    }, 3500);
  }
})();
