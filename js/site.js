document.documentElement.classList.add("js");

/* ─────────────── 作品弹窗 ─────────────── */
const modalRegistry = [];
let modalIndex = 0;

function openModal(src, alt) {
  const match = modalRegistry.findIndex((m) => m.path === src);
  if (match >= 0) {
    openModalAt(match);
  } else {
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
  if (count) {
    count.textContent = `${String(modalIndex + 1).padStart(2, "0")} / ${String(modalRegistry.length).padStart(2, "0")}`;
  }
  if (caption) caption.textContent = item.title;
  modal.classList.add("open");
  document.getElementById("modalClose")?.focus({ preventScroll: true });
}

function modalStep(dir) {
  if (modalRegistry.length < 2) return;
  modalIndex = (modalIndex + dir + modalRegistry.length) % modalRegistry.length;
  openModalAt(modalIndex);
}

function initModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  document.getElementById("modalClose")?.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
  document.getElementById("modalPrev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    modalStep(-1);
  });
  document.getElementById("modalNext")?.addEventListener("click", (e) => {
    e.stopPropagation();
    modalStep(1);
  });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") modal.classList.remove("open");
    else if (e.key === "ArrowLeft") modalStep(-1);
    else if (e.key === "ArrowRight") modalStep(1);
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

function renderGameGallery(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof GAME_WORKS === "undefined") return;
  panIndex = 0;
  modalRegistry.length = 0;

  let activeFilter = "all";
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");

  function render() {
    const keyword = (searchInput?.value || "").trim().toLowerCase();
    el.innerHTML = "";
    modalRegistry.length = 0;
    const filtered = GAME_WORKS.filter((w) => {
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
    filterBtns.forEach((b) => {
      const data = b.dataset.filter;
      const count =
        data === "all"
          ? GAME_WORKS.length
          : GAME_WORKS.filter((w) => w.category === data || w.style === data).length;
      b.dataset.count = String(count).padStart(2, "0");
    });
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
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

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
    links.classList.contains("open") ? close() : open();
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

function highlightWorkCard(id) {
  if (!id) return;
  document.querySelectorAll(".entry-card.is-highlight").forEach((el) => {
    el.classList.remove("is-highlight");
  });
  const card = document.getElementById(id);
  if (!card) return;
  card.classList.add("is-highlight");
  window.setTimeout(() => card.classList.remove("is-highlight"), 2200);
}

function initWorksJump() {
  document.querySelectorAll(".js-works-jump").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = link.getAttribute("data-highlight");
      const works = document.getElementById("works");
      if (works) {
        works.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // 等滚动启动后再高亮，避免被忽略
      window.setTimeout(() => highlightWorkCard(targetId), 280);
    });
  });

  // 支持直接带 hash 进入，如 #work-game
  const hash = location.hash.replace(/^#/, "");
  if (hash === "work-game" || hash === "work-ai") {
    window.setTimeout(() => {
      document.getElementById("works")?.scrollIntoView({ behavior: "smooth", block: "start" });
      highlightWorkCard(hash);
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initScrollState();
  initScrollSpy();
  initReveal();
  initNavToggle();
  initWorksJump();
});
