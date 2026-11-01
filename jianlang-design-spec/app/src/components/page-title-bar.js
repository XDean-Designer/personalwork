export function renderPageTitleBar({ title, action = '', actionMuted = false, backHref = '#/' } = {}) {
  const actionClass = actionMuted ? 'action action--muted' : 'action';
  const actionHtml = action ? `<span class="${actionClass}">${action}</span>` : '<span class="action"></span>';

  return `
    <header class="u-page-title-bar">
      <a href="${backHref}" class="back" aria-label="返回">
        <i data-lucide="chevron-left" class="back-icon" aria-hidden="true"></i>
      </a>
      <h1 class="title">${title}</h1>
      ${actionHtml}
    </header>
  `;
}
