(function initHeroStage() {
  const deck = document.getElementById("careerDeck");
  if (!deck) return;

  const cards = [...deck.querySelectorAll(".career-card")];
  let clearTimer = 0;
  let activeName = null;

  function setActive(name) {
    if (clearTimer) {
      clearTimeout(clearTimer);
      clearTimer = 0;
    }
    activeName = name;
    deck.classList.add("has-active");
    cards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.card === name);
    });
  }

  function scheduleClear(delay) {
    if (clearTimer) clearTimeout(clearTimer);
    clearTimer = window.setTimeout(() => {
      clearTimer = 0;
      // 若焦点仍在某张卡内，保持激活
      const focusedCard = cards.find((c) => c.contains(document.activeElement));
      if (focusedCard) {
        setActive(focusedCard.dataset.card);
        return;
      }
      activeName = null;
      deck.classList.remove("has-active");
      cards.forEach((card) => card.classList.remove("is-active"));
    }, delay);
  }

  cards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      setActive(card.dataset.card);
    });

    card.addEventListener("pointerleave", () => {
      // 短延迟：快速划向另一张卡时，enter 会先取消 clear，避免中间态两张都未拉近
      scheduleClear(80);
    });

    card.addEventListener("focusin", () => {
      setActive(card.dataset.card);
    });

    card.addEventListener("focusout", () => {
      scheduleClear(80);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const idx = cards.indexOf(card);
      const next = cards[(idx + (e.key === "ArrowRight" ? 1 : -1) + cards.length) % cards.length];
      next.focus();
      setActive(next.dataset.card);
    });
  });

  // 整组离开时复位（同样带一点延迟，兼容快速出入）
  deck.addEventListener("pointerleave", () => {
    scheduleClear(100);
  });
})();
