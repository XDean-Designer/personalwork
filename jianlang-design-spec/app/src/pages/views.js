import { renderMemberCardDetail, renderMemberCardCompact, CARD_TYPES } from '../components/member-card.js';
import { renderPageTitleBar } from '../components/page-title-bar.js';
import { renderHomeNavbar } from '../components/home-navbar.js';

export function renderHome() {
  const cardLinks = Object.entries(CARD_TYPES)
    .map(
      ([key, card]) =>
        `<a href="#/card-detail/${key}">${card.typeLabel} · 卡详情</a>`,
    )
    .join('');

  return `
    <div class="home-page">
      <div class="phone-status-bar" aria-hidden="true"></div>
      ${renderHomeNavbar()}
      <div class="home-page__body">
        <p class="text-xs text-figma-secondary">Vite + Tailwind v3 + Capacitor · 阶段 2</p>
        <nav class="home-page__nav" aria-label="演示页面">
          ${cardLinks}
          <a href="#/cards">五类详卡对照</a>
        </nav>
        <section class="demo-section">
          <h3 class="demo-section__title">按钮组件</h3>
          <div class="flex flex-col gap-2">
            <button type="button" class="btn btn-primary btn-block">主按钮</button>
            <button type="button" class="btn btn-outline btn-block">描边按钮</button>
          </div>
        </section>
      </div>
      <div class="phone-bottom-safe" aria-hidden="true"></div>
    </div>
  `;
}

export function renderCardDetail(type = 'stored') {
  const card = CARD_TYPES[type] || CARD_TYPES.stored;

  return `
    <div class="card-detail-page">
      <div class="phone-status-bar" aria-hidden="true"></div>
      ${renderPageTitleBar({ title: '卡详情', action: '下架' })}
      <div class="card-detail-page__body">
        ${renderMemberCardCompact(type, card.compactName)}
        <section class="member-card-stat-block" aria-label="卡统计">
          <h2 class="member-card-stat-block__title">卡统计</h2>
          <div class="member-card-stat-grid">
            <div class="member-card-stat-item">
              <div class="member-card-stat-item__label">
                <i data-lucide="user" class="member-card-stat-item__label-icon" style="color:#1A70FE" aria-hidden="true"></i>
                持卡人数
              </div>
              <div class="member-card-stat-item__value">0<span class="unit">人</span></div>
            </div>
            <div class="member-card-stat-item">
              <div class="member-card-stat-item__label">
                <i data-lucide="wallet" class="member-card-stat-item__label-icon" style="color:#FF8C00" aria-hidden="true"></i>
                总计余额
              </div>
              <div class="member-card-stat-item__value">2000<span class="unit">元</span></div>
            </div>
          </div>
        </section>
        <div class="mt-4">
          ${renderMemberCardDetail(type)}
        </div>
      </div>
      <div class="phone-bottom-safe" aria-hidden="true"></div>
    </div>
  `;
}

export function renderCardsGallery() {
  const cards = Object.keys(CARD_TYPES)
    .map((type) => renderMemberCardDetail(type))
    .join('<div class="mt-3"></div>');

  return `
    <div class="card-detail-page">
      <div class="phone-status-bar" aria-hidden="true"></div>
      ${renderPageTitleBar({ title: '详卡对照', action: '', backHref: '#/' })}
      <div class="card-detail-page__body">
        ${cards}
      </div>
      <div class="phone-bottom-safe" aria-hidden="true"></div>
    </div>
  `;
}
