function openModal(src, alt) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;
  modalImg.src = encodeURI(src);
  modalImg.alt = alt || "";
  modal.classList.add("open");
}

function initModal() {
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  if (!modal) return;

  modalClose?.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("open");
  });
}

let panIndex = 0;

function createShowcaseCard(work, extraClass = "") {
  const card = document.createElement("article");
  card.className = `showcase-card ${extraClass}`.trim();
  card.dataset.pan = String(panIndex % 6);
  panIndex += 1;
  card.innerHTML = `
    <div class="showcase-media">
      <img src="${encodeURI(work.path)}" alt="${work.title}" loading="lazy" />
    </div>
    <div class="showcase-overlay">
      <strong>${work.title}</strong>
      <span>${work.category || work.tag || ""}${work.style ? " · " + work.style : ""}</span>
    </div>
  `;
  card.addEventListener("click", () => openModal(work.path, work.title));
  return card;
}

function renderFeaturedGame(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;
  const featured = FEATURED_GAME.map((p) => GAME_WORKS.find((w) => w.path === p)).filter(Boolean);
  featured.forEach((work) => el.appendChild(createShowcaseCard(work)));
}

function renderVisualPreview(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;
  const featured = (typeof FEATURED_VISUAL !== "undefined" ? FEATURED_VISUAL : VISUAL_WORKS.map((w) => w.path))
    .map((p) => VISUAL_WORKS.find((w) => w.path === p))
    .filter(Boolean);
  featured.forEach((work) => {
    const card = document.createElement("article");
    card.className = "showcase-card";
    card.dataset.pan = String(panIndex % 6);
    panIndex += 1;
    card.innerHTML = `
      <div class="showcase-media">
        <img src="${encodeURI(work.path)}" alt="${work.title}" loading="lazy" />
      </div>
      <div class="showcase-overlay">
        <strong>${work.title}</strong>
        <span>${work.tag}</span>
      </div>
    `;
    card.addEventListener("click", () => openModal(work.path, work.title));
    el.appendChild(card);
  });
}

function renderGameGallery(containerId, options = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  panIndex = 0;

  let activeFilter = "all";
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");

  function render() {
    const keyword = (searchInput?.value || "").trim().toLowerCase();
    el.innerHTML = "";
    const list = options.all ? GAME_WORKS : GAME_WORKS;
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
    const card = document.createElement("article");
    card.className = "showcase-card wide";
    card.dataset.pan = String(panIndex % 6);
    panIndex += 1;
    card.innerHTML = `
      <div class="showcase-media">
        <img src="${encodeURI(work.path)}" alt="${work.title}" loading="lazy" />
      </div>
      <div class="showcase-overlay">
        <strong>${work.title}</strong>
        <span>${work.tag}</span>
      </div>
    `;
    card.addEventListener("click", () => openModal(work.path, work.title));
    el.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initModal();
});
