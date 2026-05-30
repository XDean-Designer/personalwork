# 薛鼎 · 个人主页

游戏原画 / 互联网视觉设计师作品集站点。

## 本地预览

双击打开 `index.html`，或使用本地服务器：

```bash
npx serve .
```

## 页面结构

- `index.html` — 首页
- `game-art.html` — 原画作品集
- `visual-design.html` — 互联网视觉设计

## 部署到 GitHub Pages（公网访问）

### 第一次发布（3 步）

1. **登录 GitHub**（在项目文件夹打开 PowerShell）：
   ```powershell
   gh auth login
   ```
   选择 GitHub.com → HTTPS → Login with a web browser，按提示在浏览器完成授权。

2. **一键部署**：
   ```powershell
   cd "I:\个人主页工程"
   .\deploy-github.ps1
   ```
   按提示输入仓库名（例如 `xueding-portfolio`）。

3. **开启 Pages**（若脚本未自动开启）  
   打开仓库 → Settings → Pages → Source 选 **GitHub Actions**。

### 访问地址

部署成功后约 1–3 分钟可访问：

`https://你的GitHub用户名.github.io/仓库名/`

例如：`https://octocat.github.io/xueding-portfolio/`

### 后续更新

修改网站后执行：

```powershell
git add .
git -c user.name="薛鼎" -c user.email="xandd01@qq.com" commit -m "更新作品集"
git push
```
