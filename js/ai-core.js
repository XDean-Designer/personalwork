/**
 * AI Mark — Hero 纯字标动效
 *
 * 每约 7s：星芒小幅弹起并旋转 → 落下后竖笔受力回弹（二者保持间距）。
 * 字标渐变 19s 流光插值。无指针交互。
 */
(function initAiMark() {
  const mark = document.getElementById("aiCore");
  if (!mark) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BEAT_INTERVAL = 7000;
  const BEAT_LENGTH = 1600; // 须覆盖 star 1.12s + stem delay 0.78s + stem 0.62s
  const FLOW_MS = 19000;

  let beatTimer = 0;
  let resetTimer = 0;
  let flowRaf = 0;
  let inView = true;

  function fireBeat() {
    mark.classList.remove("is-beat");
    void mark.offsetWidth;
    mark.classList.add("is-beat");
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      mark.classList.remove("is-beat");
    }, BEAT_LENGTH);
  }

  function scheduleBeat(delay) {
    window.clearTimeout(beatTimer);
    if (reduceMotion || !inView) return;
    beatTimer = window.setTimeout(() => {
      fireBeat();
      scheduleBeat(BEAT_INTERVAL);
    }, delay);
  }

  function stopBeat() {
    window.clearTimeout(beatTimer);
    beatTimer = 0;
  }

  // ── 字标渐变流光 ──
  const stops = [...mark.querySelectorAll(".ai-grad-stop")];
  const flowPalettes = [
    ["#9AF5FF", "#26D9F5", "#4485FF", "#8055F5", "#CB9AFF"],
    ["#26D9F5", "#4485FF", "#8055F5", "#CB9AFF", "#9AF5FF"],
    ["#8055F5", "#CB9AFF", "#9AF5FF", "#26D9F5", "#4485FF"],
  ];

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function mixHex(a, b, t) {
    const A = hexToRgb(a);
    const B = hexToRgb(b);
    return `rgb(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(lerp(A[2], B[2], t))})`;
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function applyPalette(from, to, t) {
    if (!stops.length) return;
    const e = easeInOut(t);
    stops.forEach((stop, i) => {
      stop.setAttribute("stop-color", mixHex(from[i], to[i], e));
    });
  }

  function startFlow() {
    if (reduceMotion || !stops.length) return;
    const t0 = performance.now();

    function tick(now) {
      if (!inView || document.hidden) {
        flowRaf = 0;
        return;
      }
      const cycle = ((now - t0) % FLOW_MS) / FLOW_MS;
      const seg = flowPalettes.length;
      const pos = cycle * seg;
      const i = Math.floor(pos) % seg;
      const j = (i + 1) % seg;
      applyPalette(flowPalettes[i], flowPalettes[j], pos - Math.floor(pos));

      const grad = mark.querySelector("#aiCoreGrad");
      if (grad) {
        const ang = cycle * Math.PI * 2;
        const cx = 49;
        const cy = 48.5;
        const len = 46;
        grad.setAttribute("x1", (cx - Math.cos(ang) * len).toFixed(2));
        grad.setAttribute("y1", (cy - Math.sin(ang) * len).toFixed(2));
        grad.setAttribute("x2", (cx + Math.cos(ang) * len).toFixed(2));
        grad.setAttribute("y2", (cy + Math.sin(ang) * len).toFixed(2));
      }

      flowRaf = requestAnimationFrame(tick);
    }

    flowRaf = requestAnimationFrame(tick);
  }

  function stopFlow() {
    if (flowRaf) {
      cancelAnimationFrame(flowRaf);
      flowRaf = 0;
    }
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        inView = entry.isIntersecting;
        if (inView) {
          scheduleBeat(1800);
          if (!flowRaf) startFlow();
        } else {
          stopBeat();
          stopFlow();
          mark.classList.remove("is-beat");
        }
      },
      { threshold: 0.15 }
    );
    io.observe(mark);
  } else {
    scheduleBeat(1800);
    startFlow();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopBeat();
      stopFlow();
      mark.classList.remove("is-beat");
    } else if (inView) {
      scheduleBeat(BEAT_INTERVAL);
      if (!flowRaf) startFlow();
    }
  });
})();
