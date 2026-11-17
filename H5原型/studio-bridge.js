/**
 * Studio embed bridge — hide demo site-nav inside iframe; accept parent nav commands.
 */
(function () {
  var params = new URLSearchParams(location.search);
  var studio = params.get("studio") === "1" || params.get("embed") === "1";
  if (!studio && window.parent === window) return;

  var style = document.createElement("style");
  style.textContent =
    "html.studio-embed .site-nav," +
    "html.studio-embed .site-nav-scrim," +
    "html.studio-embed .nav-drawer-mask," +
    "html.studio-embed .nav-edge-hit," +
    "html.studio-embed #siteNavScrim," +
    "html.studio-embed #navDrawerMask," +
    "html.studio-embed #navEdgeHit{display:none!important;visibility:hidden!important;pointer-events:none!important;}" +
    "html.studio-embed .stage," +
    "html.studio-embed .frame-slot{" +
    "display:block!important;margin:0!important;padding:0!important;" +
    "width:100%!important;height:100%!important;min-height:100%!important;" +
    "position:relative!important;left:0!important;top:0!important;" +
    "align-items:flex-start!important;justify-content:flex-start!important;" +
    "overflow:hidden!important;}" +
    /* 浅色底：避免缩放后露出黑边被当成「安全区黑块」 */
    "html.studio-embed,html.studio-embed body{height:100%!important;width:100%!important;overflow:hidden!important;background:#f7f7f7!important;}" +
    /* 画布锁 390×844；绝对贴顶左，避免 flex 居中导致 layout left 为负再缩放溢出 */
    "html.studio-embed #frame," +
    "html.studio-embed #frame.phone-shell{" +
    "position:absolute!important;left:0!important;top:0!important;right:auto!important;bottom:auto!important;" +
    "width:390px!important;height:844px!important;max-width:none!important;max-height:none!important;" +
    "box-shadow:none!important;border-radius:0!important;border:none!important;flex:none!important;" +
    "transform:translate(var(--studio-ox,0px),var(--studio-oy,0px)) scale(var(--studio-scale,1))!important;" +
    "transform-origin:top left!important;margin:0!important;}" +
    "html.studio-embed," +
    "html.studio-embed.view-mobile," +
    "html.studio-embed.is-mobile{" +
    "--statusbar-h:53px!important;--status-bar-h:53px!important;--safe-bottom:34px!important;}" +
    /* 默认显示状态栏；多屏原型仅当前屏显示，避免白底条叠在首页上 */
    "html.studio-embed .status-bar{display:flex!important;visibility:visible!important;}" +
    "html.studio-embed .screen:not(.active) .status-bar{display:none!important;}" +
    "html.studio-embed.view-mobile #phone-inner," +
    "html.studio-embed.view-mobile .phone-inner," +
    "html.studio-embed.is-mobile #phone-inner," +
    "html.studio-embed.is-mobile .phone-inner{--status-bar-h:53px!important;--statusbar-h:53px!important;--safe-bottom:34px!important;}" +
    "html.studio-embed.view-mobile .page-title-bar{padding-top:0!important;}" +
    "html.studio-embed .studio-status-bar{position:absolute;top:0;left:0;right:0;height:53px;z-index:9000;" +
    "display:flex;align-items:flex-end;justify-content:space-between;padding:0 24px 10px;box-sizing:border-box;" +
    "pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','PingFang SC',sans-serif;" +
    "background:transparent;color:#1a1a1a;}" +
    "html.studio-embed .studio-status-bar__time{font-size:15px;font-weight:600;letter-spacing:-0.3px;line-height:1;}" +
    "html.studio-embed .studio-status-bar__icons{display:flex;align-items:center;gap:6px;height:12px;}" +
    "html.studio-embed .studio-status-bar__icons i{display:block;background:currentColor;border-radius:1px;}" +
    "html.studio-embed .studio-status-bar__icons .sig{width:18px;height:10px;opacity:.92;" +
    "clip-path:polygon(0 70%,25% 55%,50% 40%,75% 22%,100% 0,100% 100%,0 100%);}" +
    "html.studio-embed .studio-status-bar__icons .wifi{width:14px;height:10px;opacity:.92;" +
    "mask:radial-gradient(circle at 50% 120%,transparent 42%,#000 43%) top/100% 100%;background:currentColor;}" +
    "html.studio-embed .studio-status-bar__icons .bat{width:25px;height:11px;border:1.5px solid currentColor;" +
    "border-radius:3px;position:relative;opacity:.92;box-sizing:border-box;}" +
    "html.studio-embed .studio-status-bar__icons .bat::before{content:'';position:absolute;inset:1.5px;background:currentColor;border-radius:1px;}" +
    "html.studio-embed .studio-status-bar__icons .bat::after{content:'';position:absolute;right:-3px;top:2px;width:2px;height:5px;" +
    "background:currentColor;border-radius:0 1px 1px 0;opacity:.7;}" +
    "html.studio-embed .studio-dead-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:9999;" +
    "max-width:86%;padding:10px 14px;border-radius:10px;background:rgba(26,26,26,.92);color:#fff;" +
    "font-size:12px;line-height:1.45;text-align:center;pointer-events:none;opacity:0;transition:opacity .2s;}" +
    "html.studio-embed .studio-dead-toast.show{opacity:1;}" +
    /* Agent 自带状态栏像素，隐藏注入条 */
    "html.studio-embed.agent-no-chrome .studio-status-bar{display:none!important;}";
  document.head.appendChild(style);

  function chromeHost() {
    return (
      document.getElementById("frame") ||
      document.querySelector(".phone-shell") ||
      document.querySelector(".phone-inner") ||
      document.body
    );
  }

  function isAgentProto() {
    var p = decodeURIComponent(location.pathname || "");
    return p.indexOf("/agent") >= 0 || p.indexOf("agent-chat") >= 0;
  }

  function ensureChrome() {
    /* AI Agent 首页图已含状态栏，禁止再注入黑色假图标 */
    if (isAgentProto()) {
      var junk = document.querySelectorAll(".studio-status-bar");
      for (var i = 0; i < junk.length; i++) junk[i].parentNode.removeChild(junk[i]);
      return;
    }
    var host = chromeHost();
    if (!host) return;
    var cs = window.getComputedStyle(host);
    if (cs.position === "static") host.style.position = "relative";

    if (!document.querySelector(".status-bar") && !document.querySelector(".studio-status-bar")) {
      var bar = document.createElement("div");
      bar.className = "studio-status-bar";
      bar.setAttribute("aria-hidden", "true");
      bar.innerHTML =
        '<span class="studio-status-bar__time">9:41</span>' +
        '<span class="studio-status-bar__icons" aria-hidden="true">' +
        '<i class="sig"></i><i class="bat"></i></span>';
      host.appendChild(bar);
    }
  }

  /* 整机落入 iframe：scale = min(w/390, h/844)；顶对齐（oy=0），避免顶部白缝 */
  function fitFrame() {
    var root = document.documentElement;
    var iw = window.innerWidth || root.clientWidth || 390;
    var ih = window.innerHeight || root.clientHeight || 844;
    var scale = Math.min(iw / 390, ih / 844);
    if (!isFinite(scale) || scale <= 0) scale = 1;
    var ox = Math.max(0, (iw - 390 * scale) / 2);
    var oy = 0;
    var scaleStr = String(Number(scale.toFixed(5)));
    var oxStr = ox.toFixed(2) + "px";
    var oyStr = "0px";

    root.style.setProperty("--studio-scale", scaleStr, "important");
    root.style.setProperty("--studio-ox", oxStr, "important");
    root.style.setProperty("--studio-oy", oyStr, "important");
    root.style.setProperty("--mobile-scale", scaleStr, "important");
    root.style.setProperty("--mobile-h", "844px", "important");
    root.style.setProperty("--statusbar-h", "53px", "important");
    root.style.setProperty("--status-bar-h", "53px", "important");
    root.style.setProperty("--safe-bottom", "34px", "important");

    var stage = document.querySelector(".stage");
    if (stage) {
      stage.style.setProperty("left", "0px", "important");
      stage.style.setProperty("top", "0px", "important");
      stage.style.setProperty("width", "100%", "important");
      stage.style.setProperty("height", "100%", "important");
      stage.style.setProperty("margin", "0", "important");
      stage.style.setProperty("padding", "0", "important");
    }

    var frame = document.getElementById("frame");
    if (frame) {
      frame.style.setProperty("position", "absolute", "important");
      frame.style.setProperty("left", "0px", "important");
      frame.style.setProperty("top", "0px", "important");
      frame.style.setProperty("width", "390px", "important");
      frame.style.setProperty("height", "844px", "important");
      frame.style.setProperty(
        "transform",
        "translate(" + oxStr + "," + oyStr + ") scale(" + scaleStr + ")",
        "important"
      );
      frame.style.setProperty("transform-origin", "top left", "important");
      frame.style.setProperty("margin", "0", "important");
    }
  }

  function forceMobile() {
    var root = document.documentElement;
    root.classList.add("studio-embed");
    root.classList.add("is-mobile");
    root.classList.add("view-mobile");
    if (isAgentProto()) root.classList.add("agent-no-chrome");
    root.classList.remove("view-desktop");
    root.classList.remove("is-nav-open");
    root.classList.remove("nav-drawer-open");
    fitFrame();
    if (typeof window.closeSiteNav === "function") window.closeSiteNav();
    ensureChrome();
  }

  if (studio) {
    forceMobile();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", forceMobile);
    }
    window.addEventListener("load", forceMobile);
    window.addEventListener("resize", function () {
      if (!document.documentElement.classList.contains("studio-embed")) return;
      fitFrame();
    });
    /* 压过各原型 mobile-preview 在 resize 后改写的 transform */
    setTimeout(forceMobile, 50);
    setTimeout(forceMobile, 200);
    setTimeout(forceMobile, 500);
    setTimeout(ensureChrome, 600);
    var guard = 0;
    var guardTimer = setInterval(function () {
      if (!document.documentElement.classList.contains("studio-embed")) return;
      fitFrame();
      guard += 1;
      if (guard >= 20) clearInterval(guardTimer);
    }, 250);
  }

  function callPath(path, args) {
    var parts = String(path || "").split(".");
    var ctx = window;
    for (var i = 0; i < parts.length - 1; i++) {
      ctx = ctx && ctx[parts[i]];
    }
    var fn = ctx && parts.length ? ctx[parts[parts.length - 1]] : null;
    if (typeof fn === "function") {
      fn.apply(ctx, args || []);
      return true;
    }
    return false;
  }

  function handle(msg) {
    if (!msg || msg.source !== "proto-studio") return;
    if (msg.kind === "go" && typeof window.go === "function") {
      window.go(msg.target);
      return;
    }
    if (msg.kind === "flow") {
      var btn = document.querySelector('.site-nav .nav-item[data-flow="' + msg.flow + '"]');
      if (btn) {
        btn.click();
        return;
      }
      if (typeof window.runPriceFlow === "function") {
        window.runPriceFlow(msg.flow);
        return;
      }
      if (window.PRICE_FLOW && typeof window.PRICE_FLOW[msg.flow] === "function") {
        window.PRICE_FLOW[msg.flow]();
        return;
      }
      return;
    }
    if (msg.kind === "click" && msg.selector) {
      var el = document.querySelector(msg.selector);
      if (el) el.click();
      return;
    }
    if (msg.kind === "fn" && msg.path) {
      callPath(msg.path, msg.args || []);
    }
  }

  window.addEventListener("message", function (ev) {
    handle(ev.data);
  });

  if (studio && window.parent && window.parent !== window) {
    window.parent.postMessage({ source: "proto-studio-child", kind: "ready" }, "*");
  }

  /* —— 首屏无效点击引导 —— */
  function guideText() {
    var p = decodeURIComponent(location.pathname || "");
    if (p.indexOf("/agent") >= 0 || p.indexOf("agent-chat") >= 0) {
      return "点 Tab 中央 AI 进入对话，或用外侧场景栏切换半屏/全屏";
    }
    if (p.indexOf("开单结账") >= 0) return "请点击「开单」或「挂单」进入主链路";
    if (p.indexOf("kaidan2") >= 0) {
      return "PC：在「待归档订单」上按住 Shift + 滚轮右滑进入自助订单列表";
    }
    if (p.indexOf("ticheng") >= 0) {
      return "请点击上方三张卡片：提成设置 / 员工管理 / 员工薪资";
    }
    if (p.indexOf("tiktok") >= 0) {
      return "请点击三张入口卡：账号管理 / 工作台 / 扫码核销";
    }
    if (p.indexOf("/menu") >= 0) {
      return "可点「添加」、项目/产品 Tab、分组齿轮；长按可排序，左滑可操作";
    }
    return "请点击页面上的可操作热区";
  }

  function isFirstScreen() {
    var p = decodeURIComponent(location.pathname || "");
    if (p.indexOf("/agent") >= 0 || p.indexOf("agent-chat") >= 0) {
      var frame = document.getElementById("frame");
      return !!(frame && frame.classList.contains("mode-home"));
    }
    if (p.indexOf("开单结账") >= 0 || p.indexOf("kaidan2") >= 0) {
      var s0 = document.getElementById("s0");
      return !!(s0 && s0.classList.contains("active"));
    }
    if (p.indexOf("ticheng") >= 0) {
      var hub = document.getElementById("screen-hub");
      return !!(hub && !hub.classList.contains("hidden"));
    }
    if (p.indexOf("tiktok") >= 0) {
      var home = document.getElementById("screen-home");
      return !!(home && home.classList.contains("active"));
    }
    if (p.indexOf("/menu") >= 0) {
      var list = document.getElementById("screen-p-list");
      return !!(list && !list.classList.contains("hidden"));
    }
    return false;
  }

  function isInteractive(t) {
    if (!t || typeof t.closest !== "function") return true;
    return !!t.closest(
      "button,a,input,select,textarea,label," +
        '[role="button"],[data-v2-home],[data-hub-go],[data-entry],' +
        "[data-wb],[data-wb-tab],[data-home-tab],[data-price-catalog-tab]," +
        "[data-col-sort],.hub-card,.vh-hot,.sp-ticket,.sp-ticket-more,.nav-item," +
        ".wb-tile,.home-icon-btn,.home-store-name,.page-tabs__item," +
        ".title-add-btn,.catalog-group-gear,.catalog-group-tab,.proj-row," +
        ".table-head__cell"
    );
  }

  var toastTimer = null;
  function showDeadToast(msg) {
    var tip = document.querySelector(".studio-dead-toast");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "studio-dead-toast";
      document.body.appendChild(tip);
    }
    tip.textContent = msg;
    tip.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      tip.classList.remove("show");
    }, 2200);
  }

  if (studio) {
    document.addEventListener(
      "click",
      function (e) {
        if (!isFirstScreen()) return;
        if (isInteractive(e.target)) return;
        showDeadToast(guideText());
      },
      true
    );
  }
})();
