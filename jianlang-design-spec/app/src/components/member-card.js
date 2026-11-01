const CARD_TYPES = {
  stored: { modifier: 'stored', typeLabel: '储值卡', compactName: '储值3000元' },
  times: { modifier: 'times', typeLabel: '计次卡', compactName: '剪发5次卡' },
  discount: { modifier: 'discount', typeLabel: '折扣卡', compactName: '烫染5折卡' },
  period: { modifier: 'period', typeLabel: '周期卡', compactName: '美发卡' },
  package: { modifier: 'package', typeLabel: '套餐卡', compactName: '套餐5次卡' },
};

const DEFAULT_METRICS = {
  discount: '所有项目8折',
  balance: '¥2000.99',
  expiry: '永久有效',
  gifts: '洗吹3次，烫染1次，洗吹3次，烫染1次…',
};

export function renderMemberCardDetail(type = 'stored', data = {}) {
  const card = CARD_TYPES[type] || CARD_TYPES.stored;
  const m = { ...DEFAULT_METRICS, ...data };

  return `
    <article class="u-member-card u-member-card--${card.modifier}" aria-label="${card.typeLabel}详卡">
      <div class="u-member-card__head">
        <div class="u-member-card__type">${card.typeLabel}</div>
        <div class="u-member-card__metrics">
          <div class="metric">
            <span class="metric__label">享受折扣</span>
            <span class="metric__value">${m.discount}</span>
          </div>
          <div class="metric metric--end">
            <span class="metric__label">卡内余额</span>
            <span class="metric__value metric__price">${m.balance}</span>
          </div>
        </div>
      </div>
      <div class="u-member-card__body">
        <p>有效期限：${m.expiry}</p>
        <p>赠送项目：${m.gifts}</p>
      </div>
      <div class="u-member-card__foot">
        <button type="button" class="u-member-card__del" aria-label="删除">
          <i data-lucide="trash-2" class="u-member-card__del-icon" aria-hidden="true"></i>
        </button>
        <nav class="u-member-card__links" aria-label="卡操作">
          <a href="#">退卡</a>
          <a href="#">升降级</a>
          <a href="#">充值</a>
        </nav>
        <button type="button" class="u-member-card__cta">开单</button>
      </div>
    </article>
  `;
}

export function renderMemberCardCompact(type = 'stored', name) {
  const card = CARD_TYPES[type] || CARD_TYPES.stored;
  const label = name || card.compactName;

  return `
    <div class="u-member-card u-member-card--compact u-member-card--${card.modifier}">
      <span class="u-member-card__name">${label}</span>
    </div>
  `;
}

export { CARD_TYPES };
