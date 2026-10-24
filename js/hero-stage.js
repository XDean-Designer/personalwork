(function initHeroStage() {
  const stage = document.getElementById("heroStage");
  const deck = document.getElementById("careerDeck");
  if (!deck) return;

  const cards = [...deck.querySelectorAll(".career-card")];
  let clearTimer = 0;
  let activeName = null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const allowTilt = !reduceMotion && finePointer;

  const TILT_MAX = 3.6; // deg

  function setTilt(card, xDeg, yDeg) {
    card.style.setProperty("--tilt-x", `${xDeg.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${yDeg.toFixed(2)}deg`);
  }

  function resetTilt(card) {
    setTilt(card, 0, 0);
  }

  function resetAllTilts() {
    cards.forEach(resetTilt);
  }

  function setStageActive(name) {
    if (!stage) return;
    if (name) stage.dataset.active = name;
    else delete stage.dataset.active;
  }

  function setActive(name) {
    if (clearTimer) {
      clearTimeout(clearTimer);
      clearTimer = 0;
    }
    activeName = name;
    deck.classList.add("has-active");
    setStageActive(name);
    cards.forEach((card) => {
      const on = card.dataset.card === name;
      card.classList.toggle("is-active", on);
      if (!on) resetTilt(card);
    });
  }

  function scheduleClear(delay) {
    if (clearTimer) clearTimeout(clearTimer);
    clearTimer = window.setTimeout(() => {
      clearTimer = 0;
      const focusedCard = cards.find((c) => c.contains(document.activeElement));
      if (focusedCard) {
        setActive(focusedCard.dataset.card);
        return;
      }
      activeName = null;
      deck.classList.remove("has-active");
      setStageActive(null);
      cards.forEach((card) => card.classList.remove("is-active"));
      resetAllTilts();
    }, delay);
  }

  cards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      setActive(card.dataset.card);
    });

    card.addEventListener("pointerleave", () => {
      resetTilt(card);
      scheduleClear(80);
    });

    if (allowTilt) {
      card.addEventListener("pointermove", (e) => {
        if (activeName !== card.dataset.card) return;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        // rotateX 跟随纵向（上负下正），rotateY 跟随横向
        const tiltX = Math.max(-1, Math.min(1, -ny)) * TILT_MAX;
        const tiltY = Math.max(-1, Math.min(1, nx)) * TILT_MAX;
        setTilt(card, tiltX, tiltY);
      });
    }

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

  deck.addEventListener("pointerleave", () => {
    scheduleClear(100);
  });
})();
