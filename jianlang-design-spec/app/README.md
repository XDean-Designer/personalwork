# 剑琅联盟 · WebView 产品工程

阶段 2：`Vite + Tailwind CSS v3 + Capacitor`

## 开发

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`，演示路由：

- `#/` — 首页导航
- `#/card-detail/stored` — 卡详情（储值卡）
- `#/cards` — 五类详卡对照

## 构建

```bash
npm run build
npm run preview
```

## Capacitor

```bash
npm run cap:sync
npm run cap:open:android
npm run cap:open:ios
```

Token 定义见 `tailwind.config.js`。组件样式见 `src/styles/components/`（`@apply` 封装）。
