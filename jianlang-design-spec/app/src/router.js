import { createIcons, icons } from 'lucide';
import { renderHome, renderCardDetail, renderCardsGallery } from './pages/views.js';

const appEl = document.getElementById('app');

function detectPlatform() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const isWindows = /Win/i.test(ua) || /Win/i.test(platform);
  document.documentElement.classList.add(isWindows ? 'platform-windows' : 'platform-apple');
}

function parseRoute() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) {
    return { name: 'home' };
  }

  if (parts[0] === 'card-detail') {
    return { name: 'card-detail', type: parts[1] || 'stored' };
  }

  if (parts[0] === 'cards') {
    return { name: 'cards' };
  }

  return { name: 'home' };
}

function renderRoute(route) {
  switch (route.name) {
    case 'card-detail':
      return renderCardDetail(route.type);
    case 'cards':
      return renderCardsGallery();
    default:
      return renderHome();
  }
}

function mountIcons() {
  createIcons({ icons, attrs: { 'stroke-width': 2 } });
}

function render() {
  const route = parseRoute();
  appEl.innerHTML = `<div class="app-root">${renderRoute(route)}</div>`;
  mountIcons();
  document.title =
    route.name === 'card-detail'
      ? '卡详情 · 剑琅联盟'
      : route.name === 'cards'
        ? '详卡对照 · 剑琅联盟'
        : '剑琅联盟';
}

export function startRouter() {
  detectPlatform();
  window.addEventListener('hashchange', render);
  render();
}
