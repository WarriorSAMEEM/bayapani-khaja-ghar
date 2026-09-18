import { getMenu } from "./data-source.js";

let menuCache = [];
let activeCategory = "All";

function escapeHtml(s = "") {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

function card(item) {
  const priceHtml = (item.price === null || item.price === undefined || item.price === "")
    ? `<span class="menu-price muted">Ask on WhatsApp</span>`
    : `<span class="menu-price">Rs ${escapeHtml(item.price)}</span>`;

  const badge = item.available
    ? ""
    : `<span class="menu-badge unavail">Unavailable</span>`;

  const media = item.image
    ? `<div class="menu-media"><img loading="lazy" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Photo coming soon'}))"></div>`
    : `<div class="menu-media">Photo coming soon</div>`;

  return `
    <article class="menu-card" data-avail="${item.available ? "true" : "false"}" data-category="${escapeHtml(item.category)}">
      ${media}
      <div class="menu-body">
        <div class="menu-top">
          <span class="menu-name">${escapeHtml(item.name)}
            ${item.nameNp ? `<span class="menu-nameNp" lang="ne"> · ${escapeHtml(item.nameNp)}</span>` : ""}
          </span>
        </div>
        <p class="menu-desc">${escapeHtml(item.desc || "")}</p>
        <div class="menu-foot">
          ${priceHtml}
          ${badge}
        </div>
      </div>
    </article>`;
}

function render() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;
  const items = activeCategory === "All"
    ? menuCache
    : menuCache.filter(i => i.category === activeCategory);

  grid.innerHTML = items.length
    ? items.map(card).join("")
    : `<p class="empty-state">No items in this category yet.</p>`;
}

function renderFilters() {
  const wrap = document.getElementById("menu-filters");
  if (!wrap) return;
  const cats = ["All", ...Array.from(new Set(menuCache.map(i => i.category)))];
  wrap.innerHTML = cats.map(c =>
    `<button class="chip" role="tab" aria-selected="${c === activeCategory}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
  ).join("");
  wrap.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      wrap.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-selected", b === btn ? "true" : "false"));
      render();
    });
  });
}

export async function initMenu() {
  menuCache = await getMenu();
  renderFilters();
  render();
}

export function getMenuItems() { return menuCache; }