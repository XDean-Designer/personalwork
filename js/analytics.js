/*!
 * analytics.js — 站点统一埋点层（自建 Umami）
 *
 * 设计要点：
 * 1. 由本文件注入 Umami 脚本，而不是在页面写死 <script>。
 * 2. 渠道归因：解析 utm_* 并写入会话属性，跨页保持。
 * 3. 事件统一走 data-track 属性声明，页面里不再散落硬编码。
 * 4. 未配置 / 未加载时全部降级为空操作，绝不影响页面本身。
 *
 * 部署 Umami 后，只需填 CONFIG 并把 enabled 改为 true。
 */
(function () {
  "use strict";

  // ─────────────────────────── 配置区 ───────────────────────────
  var CONFIG = {
    enabled: true, // 填好 host 与 websiteId 后改为 true
    host: "https://stats.deanxhome.cn", // 自建 Umami 地址
    websiteId: "cd3af2ed-8dae-4fb4-ad1c-46aca6dd32d5", // Umami 站点 ID
    debug: false, // true 时在控制台打印事件，便于本地验证
    // 采集脚本文件名，Umami 默认 script.js
    script: "/script.js",
  };

  // 本地存储可能因隐私模式抛错，统一包一层
  var store = {
    get: function (k) {
      try {
        return window.localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set: function (k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch (e) {}
    },
    sget: function (k) {
      try {
        return window.sessionStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    sset: function (k, v) {
      try {
        window.sessionStorage.setItem(k, v);
      } catch (e) {}
    },
  };

  // ─────────────────────── 渠道归因（UTM） ───────────────────────
  var UTM_KEYS = ["source", "medium", "campaign", "content", "term"];

  function readUtm() {
    var out = {};
    var q;
    try {
      q = new URLSearchParams(window.location.search);
    } catch (e) {
      return out;
    }
    UTM_KEYS.forEach(function (k) {
      var v = q.get("utm_" + k);
      if (v) out[k] = String(v).slice(0, 64);
    });
    return out;
  }

  function referrerHost() {
    try {
      if (!document.referrer) return "direct";
      var h = new URL(document.referrer).hostname.replace(/^www\./, "");
      // 站内跳转不算来源
      if (h === window.location.hostname.replace(/^www\./, "")) return null;
      return h;
    } catch (e) {
      return "unknown";
    }
  }

  // 会话内：本次访问的渠道（utm 优先，其次 referrer）
  // 首次访问：localStorage 里保留首次触达，用于长期判断哪个渠道带来的人最多
  function resolveAttribution() {
    var utm = readUtm();
    var attr = null;
    var cached = store.sget("__an_attr");

    if (utm.source || utm.medium || utm.campaign) {
      attr = {
        channel: utm.source || utm.medium || "unknown",
        medium: utm.medium || "",
        campaign: utm.campaign || "",
        content: utm.content || "",
        term: utm.term || "",
        landing: window.location.pathname,
      };
      store.sset("__an_attr", JSON.stringify(attr));
    } else if (cached) {
      try {
        attr = JSON.parse(cached);
      } catch (e) {
        attr = null;
      }
    }

    if (!attr) {
      var ref = referrerHost();
      attr = {
        channel: ref ? "referral:" + ref : "direct",
        medium: ref ? "referral" : "none",
        campaign: "",
        content: "",
        term: "",
        landing: window.location.pathname,
      };
      store.sset("__an_attr", JSON.stringify(attr));
    }

    // 首次触达（仅首次写入，不覆盖）
    if (!store.get("__an_first")) {
      store.set("__an_first", JSON.stringify(attr));
    }
    return attr;
  }

  var attribution = resolveAttribution();

  // ─────────────────────── Umami 注入与队列 ───────────────────────
  var queue = [];
  var ready = false;

  function flush() {
    ready = true;
    while (queue.length) {
      var item = queue.shift();
      deliver(item[0], item[1]);
    }
  }

  function deliver(name, data) {
    if (!window.umami) return;
    try {
      if (name === "identify") {
        // 会话级属性，只在新版 Umami 存在
        if (typeof window.umami.identify === "function") {
          window.umami.identify(data);
        }
        return;
      }
      if (typeof window.umami.track === "function") {
        window.umami.track(name, data);
      }
    } catch (e) {
      if (CONFIG.debug) console.warn("[analytics] 事件失败", name, e);
    }
  }

  function send(name, data) {
    if (CONFIG.debug) console.log("[analytics]", name, data || {});
    if (!CONFIG.enabled) return;
    if (!ready) {
      queue.push([name, data]);
      return;
    }
    deliver(name, data);
  }

  function loadUmami() {
    if (!CONFIG.enabled || !CONFIG.host || !CONFIG.websiteId) return;
    var s = document.createElement("script");
    s.async = true;
    s.defer = true;
    s.src = CONFIG.host.replace(/\/$/, "") + CONFIG.script;
    s.setAttribute("data-website-id", CONFIG.websiteId);
    s.setAttribute("data-host-url", CONFIG.host);
    // 保留 query：Umami 把 url_path / url_query 分开存储，
    // 页面报表按 url_path 分组不受影响，同时可启用原生 UTM 报表。
    // 本地预览不采集
    s.setAttribute("data-domains", window.location.hostname);
    s.onload = flush;
    s.onerror = function () {
      if (CONFIG.debug) console.warn("[analytics] Umami 脚本加载失败");
    };
    document.head.appendChild(s);

    // 兜底：脚本 3 秒内未回执也放行队列，避免事件永久积压
    setTimeout(flush, 3000);

    // 会话属性：渠道、活动、落地页
    queue.push([
      "identify",
      {
        channel: attribution.channel,
        medium: attribution.medium,
        campaign: attribution.campaign,
        landing: attribution.landing,
      },
    ]);
  }

  // ─────────────────────── 自动事件 ───────────────────────

  // 1) 滚动深度：25 / 50 / 75 / 100，每档只报一次
  function initScrollDepth() {
    var marks = [25, 50, 75, 100];
    var hit = {};
    var ticking = false;

    function calc() {
      var doc = document.documentElement;
      var total = Math.max(
        document.body ? document.body.scrollHeight : 0,
        doc.scrollHeight,
      );
      var view = window.innerHeight || doc.clientHeight;
      var scrollable = total - view;
      if (scrollable <= 0) return 100;
      var pct = ((window.pageYOffset || doc.scrollTop) / scrollable) * 100;
      return Math.min(100, Math.round(pct));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        var pct = calc();
        marks.forEach(function (m) {
          if (pct >= m && !hit[m]) {
            hit[m] = true;
            send("scroll_depth", { depth: m, page: location.pathname });
          }
        });
        if (hit[100]) window.removeEventListener("scroll", onScroll);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 2) 有效停留：只累计页面可见的时间，后台标签页不计
  function initEngagedTime() {
    var marks = [30, 60, 180];
    var elapsed = 0;
    var last = Date.now();
    var visible = !document.hidden;

    function tick() {
      var now = Date.now();
      if (visible) elapsed += now - last;
      last = now;
      marks.forEach(function (m) {
        if (elapsed >= m * 1000 && !tick["_" + m]) {
          tick["_" + m] = true;
          send("engaged_time", { seconds: m, page: location.pathname });
        }
      });
      if (tick._180) clearInterval(timer);
    }

    document.addEventListener("visibilitychange", function () {
      var now = Date.now();
      if (visible) elapsed += now - last;
      last = now;
      visible = !document.hidden;
    });

    var timer = setInterval(tick, 5000);
    window.addEventListener("pagehide", function () {
      if (elapsed > 3000) {
        send("page_exit", {
          seconds: Math.round(elapsed / 1000),
          page: location.pathname,
        });
      }
    });
  }

  // 3) 区块曝光：给元素加 data-track-section="名称" 即可
  function initSections() {
    var els = document.querySelectorAll("[data-track-section]");
    if (!els.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var name = en.target.getAttribute("data-track-section");
          if (name && !en.target.__anSeen) {
            en.target.__anSeen = true;
            send("section_view", { section: name, page: location.pathname });
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  // 4) 点击事件：data-track 声明式 + tel/mailto/pdf 自动识别
  function trackFromEl(el, extra) {
    var name = el.getAttribute("data-track");
    var data = {};

    // data-track-* 其余属性一并上报
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (a.name.indexOf("data-track-") === 0 && a.name !== "data-track") {
        var key = a.name.slice("data-track-".length);
        data[key] = a.value;
      }
    }
    if (extra) {
      for (var k in extra) {
        if (Object.prototype.hasOwnProperty.call(extra, k)) data[k] = extra[k];
      }
    }
    data.page = location.pathname;
    send(name, data);
  }

  function initClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var el = e.target;
        if (!el || el.nodeType !== 1) return;
        el = el.closest("[data-track], a[href], button");
        if (!el) return;

        // 显式声明的埋点优先级最高
        if (el.hasAttribute("data-track")) {
          trackFromEl(el);
          return;
        }

        var href = el.getAttribute("href") || "";

        // 电话
        if (href.indexOf("tel:") === 0) {
          send("contact_phone_click", { page: location.pathname });
          return;
        }
        // 邮箱
        if (href.indexOf("mailto:") === 0) {
          send("contact_email_click", { page: location.pathname });
          return;
        }
        // PDF 下载：求职意向最强信号
        if (/\.pdf($|\?)/i.test(href) || (el.hasAttribute("download") && /\.pdf$/i.test(el.getAttribute("download") || ""))) {
          send("pdf_download", {
            file: href.split("/").pop(),
            page: location.pathname,
          });
          return;
        }
        // 外链
        if (/^https?:\/\//i.test(href)) {
          try {
            var host = new URL(href).hostname.replace(/^www\./, "");
            if (host && host !== location.hostname.replace(/^www\./, "")) {
              send("outbound_click", { host: host, page: location.pathname });
            }
          } catch (err) {}
        }
      },
      true,
    );
  }

  // ─────────────────────── 启动 ───────────────────────
  function boot() {
    if (CONFIG.debug) console.log("[analytics] 渠道归因", attribution);
    loadUmami();
    initScrollDepth();
    initEngagedTime();
    initSections();
    initClicks();

    // 供页面内联脚本调用
    window.trackEvent = function (name, data) {
      send(name, data);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
