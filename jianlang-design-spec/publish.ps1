# 本地改完 HTML 后运行: .\publish.ps1
# 公网地址: https://xdean-designer.github.io/jianlang-design-spec/

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$src = Join-Path $PSScriptRoot "剑琅联盟移动端设计规范.html"
$deployDir = Join-Path $PSScriptRoot "Cursor设计规范"

if (-not (Test-Path $src)) {
  Write-Host "找不到: $src" -ForegroundColor Red
  exit 1
}

Write-Host ">>> 同步 HTML 到 GitHub Pages 部署目录..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
Copy-Item -LiteralPath $src -Destination (Join-Path $deployDir "index.html") -Force
Copy-Item -LiteralPath $src -Destination (Join-Path $deployDir "剑琅联盟移动端设计规范.html") -Force

if (Test-Path (Join-Path $PSScriptRoot "LOGO2.png")) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot "LOGO2.png") -Destination (Join-Path $deployDir "LOGO2.png") -Force
}

$assetsSrc = Join-Path $PSScriptRoot "assets"
if (Test-Path $assetsSrc) {
  Copy-Item -LiteralPath $assetsSrc -Destination (Join-Path $deployDir "assets") -Recurse -Force
}

$iconsSrc = Join-Path $PSScriptRoot "icons"
$iconsDeploy = Join-Path $deployDir "icons"
if (Test-Path $iconsSrc) {
  if (Test-Path $iconsDeploy) { Remove-Item -LiteralPath $iconsDeploy -Recurse -Force }
  Copy-Item -LiteralPath $iconsSrc -Destination $iconsDeploy -Recurse -Force
}

Write-Host ">>> 提交并推送到 GitHub..." -ForegroundColor Cyan
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  $env:GIT_AUTHOR_NAME = "XDean-Designer"
  $env:GIT_AUTHOR_EMAIL = "XDean-Designer@users.noreply.github.com"
  git commit -m "Update design spec"
}

git pull origin main --rebase 2>$null
git push origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "推送失败，请检查网络或 GitHub 登录。" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "已推送。等待 1～2 分钟 Actions 部署完成后访问：" -ForegroundColor Green
Write-Host "  https://xdean-designer.github.io/jianlang-design-spec/"
Write-Host ""
Write-Host "部署进度: https://github.com/XDean-Designer/jianlang-design-spec/actions" -ForegroundColor DarkGray
