# 一键部署到 GitHub Pages
# 用法：在 PowerShell 中运行 .\deploy-github.ps1

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Set-Location $PSScriptRoot

Write-Host "检查 GitHub 登录状态..." -ForegroundColor Cyan
$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "尚未登录 GitHub，将打开浏览器完成授权..." -ForegroundColor Yellow
  gh auth login -h github.com -p https -w
}

$repoName = Read-Host "请输入 GitHub 仓库名（例如 xueding-portfolio，直接回车使用 xueding-portfolio）"
if ([string]::IsNullOrWhiteSpace($repoName)) { $repoName = "xueding-portfolio" }

$exists = gh repo view $repoName 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "创建公开仓库: $repoName ..." -ForegroundColor Cyan
  gh repo create $repoName --public --source=. --remote=origin --description "薛鼎 · 个人主页作品集"
} else {
  Write-Host "仓库已存在，仅推送更新..." -ForegroundColor Cyan
  git remote remove origin 2>$null
  $user = (gh api user -q .login)
  git remote add origin "https://github.com/$user/$repoName.git"
}

git push -u origin main

Write-Host "开启 GitHub Pages..." -ForegroundColor Cyan
gh api repos/{owner}/{repo}/pages -X POST -f build_type=legacy -f source[branch]=main -f source[path]=/ 2>$null
if ($LASTEXITCODE -ne 0) {
  gh api -X PUT "repos/{owner}/$repoName/pages" -f build_type=legacy -f source[branch]=main -f source[path]=/
}

$user = (gh api user -q .login)
Write-Host ""
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "仓库: https://github.com/$user/$repoName"
Write-Host "网站（约 1–3 分钟后生效）: https://$user.github.io/$repoName/"
