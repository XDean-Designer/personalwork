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
    "html.studio-embed .stage{margin-left:0!important;padding:0!important;width:100%!important;height:100%!important;min-height:100%!important;align-items:flex-start!important;justify-content:center!important;overflow:hidden!important;}" +
    "html.studio-embed,html.studio-embed body{height:100%!important;overflow:hidden!important;background:#000!important;}" +
    "html.studio-embed #frame.phone-shell{box-shadow:none!important;border-radius:0!important;}" +
    /* 工作室 iframe 非真机：恢复假状态栏（view-mobile 默认会藏掉） */
    "html.studio-embed.view-mobile .status-bar," +
    "html.studio-embed.is-mobile .status-bar{display:flex!important;}" +
    "html.studio-embed.view-mobile #phone-inner," +
    "html.studio-embed.view-mobile .phone-inner," +
    "html.studio-embed.is-mobile #phone-inner," +
    "html.studio-embed.is-mobile .phone-inner{--status-bar-h:53px!important;}" +
    "html.studio-embed.view-mobile .page-title-bar{padding-top:0!important;}" +
    "html.studio-embed .studio-dead-toast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:9999;" +
    "max-width:86%;padding:10px 14px;border-radius:10px;background:rgba(26,26,26,.92);color:#fff;" +
    "font-size:12px;line-height:1.45;text-align:center;pointer-events:none;opacity:0;transition:opacity .2s;}" +
    "html.studio-embed .studio-dead-toast.show{opacity:1;}";
  document.head.appendChild(style);

  function forceMobile() {
    var root = document.documentElement;
    root.classList.add("studio-embed");
    root.classList.add("is-mobile");
    root.classList.add("view-mobile");
    root.classList.remove("view-desktop");
    root.classList.remove("is-nav-open");
    root.classList.remove("nav-drawer-open");
    if (typeof window.closeSiteNav === "function") window.closeSiteNav();
    window.dispatchEvent(new Event("resize"));
  }

  if (studio) {
    forceMobile();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", forceMobile);
    }
    window.addEventListener("load", forceMobile);
    setTimeout(forceMobile, 50);
    setTimeout(forceMobile, 300);
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
    return "请点击页面上的可操作热区";
  }

  function isFirstScreen() {
    var p = decodeURIComponent(location.pathname || "");
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
    return false;
  }

  function isInteractive(t) {
    if (!t || typeof t.closest !== "function") return true;
    return !!t.closest(
      "button,a,input,select,textarea,label," +
        '[role="button"],[data-v2-home],[data-hub-go],[data-entry],' +
        "[data-wb],[data-wb-tab],[data-home-tab]," +
        ".hub-card,.vh-hot,.sp-ticket,.sp-ticket-more,.nav-item," +
        ".wb-tile,.home-icon-btn,.home-store-name"
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
