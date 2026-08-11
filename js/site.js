document.documentElement.classList.add("js");

/* ─────────────── 作品弹窗（支持 ←→ 切换 + 计数） ─────────────── */
const modalRegistry = [];
let modalIndex = 0;

function openModal(src, alt) {
  const match = modalRegistry.findIndex((m) => m.path === src);
  if (match >= 0) {
    openModalAt(match);
  } else {
    // 兜底：未注册的图片单独展示
    modalIndex = -1;
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const count = document.getElementById("modalCount");
    const caption = document.getElementById("modalCaption");
    if (!modal || !modalImg) return;
    modalImg.src = encodeURI(src);
    modalImg.alt = alt || "";
    if (count) count.textContent = "";
    if (caption) caption.textContent = alt || "";
    modal.classList.add("open");
  }
}

function openModalAt(idx) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;
  modalIndex = idx;
  const item = modalRegistry[modalIndex];
  if (!item) return;
  modalImg.src = encodeURI(item.path);
  modalImg.alt = item.title;
  const count = document.getElementById("modalCount");
  const caption = document.getElementById("modalCaption");
  if (count) count.textContent = `${String(modalIndex + 1).padStart(2, "0")} / ${String(modalRegistry.length).padStart(2, "0")}`;
  if (caption) caption.textContent = item.title;
  modal.classList.add("open");
  const close = document.getElementById("modalClose");
  close?.focus({ preventScroll: true });
}

function modalStep(dir) {
  if (modalRegistry.length < 2) return;
  modalIndex = (modalIndex + dir + modalRegistry.length) % modalRegistry.length;
  openModalAt(modalIndex);
}

function initModal() {
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");
  if (!modal) return;

  modalClose?.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
  modalPrev?.addEventListener("click", (e) => { e.stopPropagation(); modalStep(-1); });
  modalNext?.addEventListener("click", (e) => { e.stopPropagation(); modalStep(1); });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") modal.classList.remove("open");
    else if (e.key === "ArrowLeft") modalStep(-1);
    else if (e.key === "ArrowRight") modalStep(1);
  });
  // 焦点陷阱：打开时聚焦关闭按钮
  const focusTargets = [modalClose, modalPrev, modalNext].filter(Boolean);
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || focusTargets.length === 0) return;
    const first = focusTargets[0];
    const last = focusTargets[focusTargets.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

let panIndex = 0;

function createShowcaseCard(work, extraClass = "") {
  const card = document.createElement("article");
  card.className = `showcase-card ${extraClass}`.trim();
  card.dataset.pan = String(panIndex % 6);
  panIndex += 1;
  const index = modalRegistry.length;
  modalRegistry.push({ path: work.path, title: work.title });
  card.innerHTML = `
    <div class="showcase-media">
      <img src="${encodeURI(work.path)}" alt="${work.title}" loading="lazy" />
    </div>
    <div class="showcase-overlay">
      <strong>${work.title}</strong>
      <span>${work.category || work.tag || ""}${work.style ? " · " + work.style : ""}</span>
    </div>
    <span class="card-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
  `;
  card.addEventListener("click", () => openModalAt(index));
  return card;
}

function updateCardIndices(container) {
  if (!container) return;
  const cards = container.querySelectorAll(".showcase-card");
  const total = String(cards.length).padStart(2, "0");
  cards.forEach((card, i) => {
    const badge = card.querySelector(".card-index");
    if (badge) badge.textContent = `${String(i + 1).padStart(2, "0")} / ${total}`;
  });
}

function renderFeaturedGame(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;
  const featured = FEATURED_GAME.map((p) => GAME_WORKS.find((w) => w.path === p)).filter(Boolean);
  featured.forEach((work) => el.appendChild(createShowcaseCard(work)));
  updateCardIndices(el);
}

function renderVisualPreview(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;
  const featured = (typeof FEATURED_VISUAL !== "undefined" ? FEATURED_VISUAL : VISUAL_WORKS.map((w) => w.path))
    .map((p) => VISUAL_WORKS.find((w) => w.path === p))
    .filter(Boolean);
  featured.forEach((work) => el.appendChild(createShowcaseCard(work)));
  updateCardIndices(el);
}

function renderGameGallery(containerId, options = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;

  let activeFilter = "all";
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");

  function render() {
    const keyword = (searchInput?.value || "").trim().toLowerCase();
    el.innerHTML = "";
    const list = GAME_WORKS;
    const filtered = list.filter((w) => {
      const byFilter = activeFilter === "all" || w.category === activeFilter || w.style === activeFilter;
      const byKeyword =
        !keyword ||
        w.title.toLowerCase().includes(keyword) ||
        w.style.toLowerCase().includes(keyword) ||
        w.category.toLowerCase().includes(keyword);
      return byFilter && byKeyword;
    });
    filtered.forEach((work) => el.appendChild(createShowcaseCard(work)));
    updateCardIndices(el);
    if (resultCount) resultCount.textContent = `${String(filtered.length).padStart(2, "0")} WORKS`;
    if (filterBtns.length) {
      filterBtns.forEach((b) => {
        const data = b.dataset.filter;
        const count = data === "all"
          ? list.length
          : list.filter((w) => w.category === data || w.style === data).length;
        b.dataset.count = String(count).padStart(2, "0");
      });
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      render();
    });
  });
  searchInput?.addEventListener("input", render);
  render();
}

function renderVisualGallery(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;
  VISUAL_WORKS.forEach((work) => {
    const card = createShowcaseCard(work, "wide");
    el.appendChild(card);
  });
  updateCardIndices(el);
}

/* ─────────────── 滚动进度条 + 返回顶部 + nav 状态 ─────────────── */
function initScrollState() {
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  const nav = document.getElementById("siteNav");

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? doc.scrollTop / max : 0})`;
    if (toTop) toTop.classList.toggle("visible", doc.scrollTop > 480);
    if (nav) nav.classList.toggle("scrolled", doc.scrollTop > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─────────────── scrollspy：当前章节高亮 ─────────────── */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-links a[data-spy]");
  if (!links.length) return;
  const targets = [...links]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );
  targets.forEach((t) => io.observe(t));
}

/* ─────────────── 滚动入场动画 ─────────────── */
function initReveal() {
  const els = document.querySelectorAll(".reveal, .stagger");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ─────────────── 数字滚动 ─────────────── */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  nums.forEach((n) => io.observe(n));
}

function animateCount(node) {
  const target = parseInt(node.dataset.count, 10);
  if (Number.isNaN(target) || target <= 0) return;
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
    else {
      node.textContent = String(target);
      node.classList.add("stat-flash");
    }
  }
  requestAnimationFrame(tick);
}

/* ─────────────── 导航切换 + 遮罩 ─────────────── */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("navLinks") || document.querySelector(".nav-links");
  const backdrop = document.getElementById("navBackdrop");
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove("open");
    backdrop?.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "打开菜单");
  };

  const open = () => {
    links.classList.add("open");
    backdrop?.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "关闭菜单");
  };

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains("open");
    isOpen ? close() : open();
  });

  backdrop?.addEventListener("click", close);

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 900px)").matches) close();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) close();
  });
}

/* ─────────────── hero 数据流 canvas（离屏暂停） ─────────────── */
function initDataStream() {
  const canvas = document.querySelector(".hero-data-stream");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const wrap = canvas.parentElement;

  const CHARS = "01アイウエオ0110ABCDEFabcdef01100101";
  const FONT_SIZE = 13;
  const COL_W = 16;
  let cols = [];
  let raf = null;
  let running = false;

  function resize() {
    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    const count = Math.max(1, Math.floor(canvas.width / COL_W));
    cols = Array.from({ length: count }, (_, i) => ({
      x: i * COL_W + COL_W / 2,
      y: Math.random() * canvas.height,
      speed: 0.6 + Math.random() * 1.4,
      len: 6 + Math.floor(Math.random() * 10),
    }));
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
    ctx.textAlign = "center";

    for (const col of cols) {
      for (let j = 0; j < col.len; j++) {
        const y = col.y - j * FONT_SIZE;
        if (y < -FONT_SIZE || y > canvas.height + FONT_SIZE) continue;
        const t = 1 - j / col.len;
        if (j === 0) {
          ctx.fillStyle = `rgba(255, 200, 100, ${t * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(255, 138, 34, ${t * 0.55})`;
        }
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], col.x, y);
      }
      col.y += col.speed;
      if (col.y - col.len * FONT_SIZE > canvas.height) {
        col.y = -FONT_SIZE * 2;
        col.speed = 0.6 + Math.random() * 1.4;
        col.len = 6 + Math.floor(Math.random() * 10);
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    draw();
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  resize();
  window.addEventListener("resize", () => { stop(); resize(); start(); });

  // 仅当 hero 可见时运行
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0 }
    );
    io.observe(wrap);
  } else {
    start();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initScrollState();
  initScrollSpy();
  initReveal();
  initCounters();
  initNavToggle();
  initDataStream();
});
