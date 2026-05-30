/** 仅从色彩参考图提取 accent 色相，不覆盖背景与正文（保证可读对比） */
(function applyPaletteFromReference() {
  const img = new Image();
  img.decoding = "async";

  img.onload = function () {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 70;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, 100, 70);
      const { data } = ctx.getImageData(0, 0, 100, 70);

      const colors = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 128) continue;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 40 || lum > 250) continue;
        const sat = Math.max(r, g, b) - Math.min(r, g, b);
        if (sat < 25) continue;
        colors.push({ r, g, b, lum, sat });
      }
      if (!colors.length) return;

      colors.sort((a, b) => b.sat - a.sat || b.lum - a.lum);
      const accent = brighten(colors[0], 1.35);
      const accent2 = brighten(colors[Math.min(3, colors.length - 1)], 1.2);
      const violet = brighten(colors[Math.min(8, colors.length - 1)], 1.15);

      const root = document.documentElement;
      const hex = (c) =>
        `#${[c.r, c.g, c.b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;

      root.style.setProperty("--accent", hex(accent));
      root.style.setProperty("--accent-2", hex(accent2));
      root.style.setProperty("--violet", hex(violet));
      root.style.setProperty("--border", `rgba(${accent.r},${accent.g},${accent.b},0.55)`);
      root.style.setProperty("--glow", `0 0 36px rgba(${accent.r},${accent.g},${accent.b},0.45)`);
    } catch (_) {}
  };

  img.onerror = function () {};
  img.src = "色彩参考.webp";

  function brighten(c, factor) {
    return {
      r: Math.min(255, c.r * factor),
      g: Math.min(255, c.g * factor),
      b: Math.min(255, c.b * factor)
    };
  }
})();
