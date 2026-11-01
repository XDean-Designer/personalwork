export function renderHomeNavbar({ title = '剑琅联盟', logoSrc = '/favicon.svg' } = {}) {
  return `
    <header class="u-home-navbar">
      <img src="${logoSrc}" alt="" class="u-home-navbar__logo" width="28" height="28" />
      <h1 class="u-home-navbar__title">${title}</h1>
    </header>
  `;
}
