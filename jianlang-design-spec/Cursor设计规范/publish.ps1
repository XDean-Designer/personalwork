# 发布到 GitHub Pages，生成公网地址
# 在 PowerShell 中运行: .\publish.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ">>> 同步并推送到 GitHub（XDean-Designer/jianlang-design-spec）..." -ForegroundColor Cyan

git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  $env:GIT_AUTHOR_NAME = "XDean-Designer"
  $env:GIT_AUTHOR_EMAIL = "XDean-Designer@users.noreply.github.com"
  git commit -m "Publish design spec site for GitHub Pages"
}

# 远程若仅有 zip 等无关文件，用 --force-with-lease 覆盖为完整站点
git fetch origin main 2>$null
git push origin main --force-with-lease
if ($LASTEXITCODE -ne 0) {
  Write-Host "重试强制推送（远程内容与本地站点不一致时）..." -ForegroundColor Yellow
  git push origin main --force
}

Write-Host ""
Write-Host "推送完成。请在浏览器打开仓库确认：" -ForegroundColor Green
Write-Host "  https://github.com/XDean-Designer/jianlang-design-spec"
Write-Host ""
Write-Host "首次发布请开启 Pages：" -ForegroundColor Yellow
Write-Host "  仓库 Settings -> Pages -> Build and deployment -> Source 选 GitHub Actions"
Write-Host "  等待 Actions 绿勾后访问公网地址："
Write-Host ""
Write-Host "  https://xdean-designer.github.io/jianlang-design-spec/" -ForegroundColor Green
Write-Host ""
