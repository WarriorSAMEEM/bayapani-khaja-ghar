import { getOffers } from "./data-source.js";

function isLive(o) {
  if (!o.active) return false;
  if (!o.validUntil) return true;
  const end = new Date(o.validUntil + "T23:59:59+05:45");
  return Date.now() <= end.getTime();
}

function card(o) {
  const media = o.image
    ? `<div class="offer-media"><img loading="lazy" src="${o.image}" alt="${o.title}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Photo coming soon'}))"></div>`
    : `<div class="offer-media">Photo coming soon</div>`;
  const price = o.price == null ? "" : `<span class="offer-price">Rs ${o.price}</span>`;
  const valid = o.validUntil ? `<span class="offer-valid">Valid until ${o.validUntil}</span>` : "";
  return `
    <article class="offer-card">
      ${media}
      <div class="offer-body">
        <p class="offer-title">${o.title}</p>
        <p class="offer-desc">${o.desc || ""}</p>
        <div class="offer-meta">${price}${valid}</div>
      </div>
    </article>`;
}

export async function initOffers() {
  const grid = document.getElementById("offers-grid");
  if (!grid) return;
  const all = await getOffers();
  const live = all.filter(isLive);
  if (live.length === 0) {
    grid.innerHTML = `<div class="empty-state">Special Offers Coming Soon · <span lang="ne">विशेष अफर चाँडै आउँदैछ</span></div>`;
    return;
  }
  grid.innerHTML = live.map(card).join("");
}