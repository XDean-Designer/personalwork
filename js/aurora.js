/**
 * Hero 极光光帘 —— 逐射线绘制
 *
 * 设计约束：
 *  - 只用 canvas 重绘 + transform/opacity，禁止 filter: blur（大面积重栅格化）
 *  - 900×470 低分辨率放大，天然柔化；30fps 封顶
 *  - 离开视口 / 页面隐藏 自动暂停
 *  - prefers-reduced-motion 渲染一帧静态极光
 *
 * 光帘 = 垂直射线 × 低频折叠 × 斜向坡度，下缘保留锐利亮边
 * 色相逐帧在 HSL 上漂移，制造流光变色
 * 网纹用 source-atop 合成，只出现在帘体亮处
 */

(function () {
  "use strict";

  var canvas = document.getElementById("heroAurora");
  if (!canvas) return;

  /* ── 噪声 ── */
  function fract(x) {
    return x - Math.floor(x);
  }
  function hash(x) {
    return fract(Math.sin(x * 127.1) * 43758.5453123);
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function noise1(x) {
    var i = Math.floor(x);
    var f = x - i;
    var u = f * f * (3 - 2 * f);
    return lerp(hash(i), hash(i + 1), u);
  }
  function fbm(x, oct) {
    var s = 0;
    var a = 0.5;
    var fx = x;
    for (var i = 0; i < oct; i++) {
      s += a * noise1(fx);
      fx *= 2.03;
      a *= 0.5;
    }
    return s;
  }

  /* ══════════════════════════════════════════════
     参数
     hue / hueSwing / hueSpeed —— 色域与流速
     stops: [位置, 亮度%, 透明度, 相对色相偏移]
  ══════════════════════════════════════════════ */
  var PRESET = {
    master: 0.55,
    mesh: { spacing: 7, angle: 62, alpha: 0.20, drift: 5 },
    ribbons: [
      {
        /* 主帘：偏下、较亮 */
        baseY: 0.56, amp: 0.095, slope: -0.20, waveFreq: 0.75, waveSpeed: 0.045,
        height: 0.52, rayFreq: 136, raySpeed: 0.30,
        folds: 1.9, alpha: 0.92, edge: 0.85,
        hue: 202, hueSwing: 78, hueSpeed: 0.26, huePhase: 0,
        sat: 92,
        stops: [
          [0.00, 86, 0.82, 34],
          [0.06, 72, 0.62, 22],
          [0.24, 62, 0.34, 6],
          [0.54, 58, 0.15, -10],
          [1.00, 55, 0.00, -22]
        ]
      },
      {
        /* 副帘：偏上、更暗更细 */
        baseY: 0.36, amp: 0.105, slope: -0.26, waveFreq: 1.35, waveSpeed: 0.032,
        height: 0.36, rayFreq: 178, raySpeed: 0.24,
        folds: 2.6, alpha: 0.46, edge: 0.34,
        hue: 246, hueSwing: 84, hueSpeed: 0.19, huePhase: 1.9,
        sat: 88,
        stops: [
          [0.00, 78, 0.58, 30],
          [0.08, 66, 0.40, 16],
          [0.36, 58, 0.18, -4],
          [1.00, 55, 0.00, -18]
        ]
      }
    ]
  };

  var CW = 900;
  var CH = 470;
  var STEP = 1;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  canvas.width = CW;
  canvas.height = CH;
  var ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  canvas.style.opacity = String(PRESET.master);

  /* 每帧重建垂直渐变：色相整体漂移 = 宽色域流光 */
  function ribbonGradient(r, t, baseY, hMax) {
    var g = ctx.createLinearGradient(0, baseY + hMax * 0.04, 0, baseY - hMax * 1.05);
    var hue = r.hue + r.hueSwing * Math.sin(t * r.hueSpeed + r.huePhase);
    for (var i = 0; i < r.stops.length; i++) {
      var s = r.stops[i];
      var h = ((hue + s[3]) % 360 + 360) % 360;
      g.addColorStop(s[0], "hsla(" + h.toFixed(1) + "," + r.sat + "%," + s[1] + "%," + s[2] + ")");
    }
    return g;
  }

  function drawMesh(t) {
    var mesh = PRESET.mesh;
    var H = CH;
    var W = CW;
    var sp = mesh.spacing;
    var tan = Math.tan((mesh.angle * Math.PI) / 180);
    var off = (t * mesh.drift) % sp;
    var span = (H * tan + sp) * 2;
    var x;

    ctx.lineWidth = 0.62;
    ctx.strokeStyle = "rgba(198,252,255," + mesh.alpha + ")";

    ctx.beginPath();
    for (x = -span; x < W + span; x += sp) {
      var a = x + off;
      ctx.moveTo(a, 0);
      ctx.lineTo(a - H * tan, H);
    }
    ctx.stroke();

    ctx.beginPath();
    for (x = -span; x < W + span; x += sp) {
      var b = x - off;
      ctx.moveTo(b, 0);
      ctx.lineTo(b + H * tan, H);
    }
    ctx.stroke();

    /* 稀疏节点 */
    var nodeSp = sp * 3;
    var nOff = (t * mesh.drift * 1.6) % nodeSp;
    ctx.globalAlpha = mesh.alpha * 2;
    ctx.fillStyle = "rgba(220,255,255,1)";
    for (var y = 0; y < H; y += nodeSp) {
      for (x = -nodeSp; x < W + nodeSp; x += nodeSp) {
        ctx.fillRect(x + nOff - 0.5, y + ((nOff * 0.5) % nodeSp) - 0.5, 1.1, 1.1);
      }
    }
    ctx.globalAlpha = 1;
  }

  function draw(t) {
    var H = CH;
    var W = CW;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    PRESET.ribbons.forEach(function (r) {
      var baseY = r.baseY * H;
      var hMax = r.height * H;
      var ampPx = r.amp * H;
      var slopePx = r.slope * H;

      ctx.fillStyle = ribbonGradient(r, t, baseY, hMax);

      /* 帘体骨架：斜向坡度 + 双频起伏 + 噪声 */
      function spine(u) {
        return (
          baseY +
          (u - 0.5) * slopePx +
          Math.sin(u * Math.PI * 2 * r.waveFreq + t * r.waveSpeed) * ampPx +
          Math.sin(u * Math.PI * 2 * r.waveFreq * 0.47 - t * r.waveSpeed * 0.7) * ampPx * 0.85 +
          (fbm(u * 3.4 + t * 0.06, 3) - 0.5) * ampPx * 1.9
        );
      }

      var x;
      var u;
      for (x = 0; x < W; x += STEP) {
        u = x / W;
        var wave = spine(u);
        var len = hMax * (0.30 + 1.10 * fbm(u * 13 + t * 0.11, 3));

        var fine = noise1(u * r.rayFreq + t * r.raySpeed);
        var micro = noise1(u * r.rayFreq * 2.7 + t * r.raySpeed * 1.6);
        var coarse = fbm(u * r.rayFreq * 0.22 + t * r.raySpeed * 0.55, 2);
        var fold = 0.38 + 0.62 * Math.pow(
          0.5 + 0.5 * Math.sin(u * Math.PI * 2 * r.folds + t * 0.16), 1.5
        );

        var bright = Math.pow(fine * 0.5 + micro * 0.22 + coarse * 0.28, 1.15) * fold;
        ctx.globalAlpha = Math.min(1, bright * r.alpha);
        ctx.fillRect(x, wave - len, STEP + 0.6, len);
      }

      /* 下缘锐边 */
      for (x = 0; x < W; x += STEP) {
        u = x / W;
        var f2 = noise1(u * r.rayFreq + t * r.raySpeed);
        if (f2 < 0.56) continue;
        ctx.globalAlpha = Math.min(1, Math.pow((f2 - 0.56) * 2.2, 1.1) * r.edge);
        ctx.fillRect(x, spine(u) - 1.6, STEP + 0.6, 1.8);
      }
    });

    /* 网纹：只在帘体已有像素处绘制 */
    ctx.globalCompositeOperation = "source-atop";
    drawMesh(t);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  /* ── 帧循环 ── */
  var raf = 0;
  var last = 0;
  var t = 0;
  var running = false;
  var visible = !document.hidden;

  function loop(now) {
    if (!running) return;
    raf = window.requestAnimationFrame(loop);
    if (now - last < 33) return; /* ~30fps */
    var dt = Math.min(120, now - last);
    last = now;
    t += dt / 1000;
    draw(t);
  }

  function start() {
    if (running || reduce || !visible) return;
    running = true;
    last = window.performance.now();
    raf = window.requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(raf);
  }

  if (reduce) {
    draw(12); /* 静态一帧，保留形态 */
    return;
  }

  draw(0);

  /* 离屏暂停 */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) start();
      else stop();
    }, { threshold: 0.05 }).observe(canvas);
  } else {
    start();
  }

  /* 切到后台时省电 */
  document.addEventListener("visibilitychange", function () {
    visible = !document.hidden;
    if (visible) start();
    else stop();
  });
})();
