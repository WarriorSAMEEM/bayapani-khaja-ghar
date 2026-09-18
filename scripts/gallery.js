import { getGallery } from "./data-source.js";

const PLACEHOLDER_COUNT = 6;

function itemCard(img) {
  return `
    <button class="gallery-item" type="button"
      data-src="${img.src}" data-caption="${img.caption || ""}"
      aria-label="View: ${img.caption || "Gallery image"}">
      <img loading="lazy" src="${img.src}" alt="${img.caption || ""}"
        onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'Photo coming soon'}))">
    </button>`;
}

function placeholder() {
  return `<div class="gallery-item gallery-placeholder" aria-hidden="true">Photo coming soon</div>`;
}

export async function initGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  const all = (await getGallery()).filter(g => g.active !== false);
  grid.innerHTML = all.length
    ? all.sort((a,b) => (a.order||0)-(b.order||0)).map(itemCard).join("")
    : Array.from({length: PLACEHOLDER_COUNT}).map(placeholder).join("");

  grid.addEventListener("click", e => {
    const btn = e.target.closest(".gallery-item[data-src]");
    if (!btn) return;
    openLightbox(btn.dataset.src, btn.dataset.caption);
  });
}

function openLightbox(src, caption) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-cap");
  if (!lb || !img) return;
  img.src = src; img.alt = caption || "";
  cap.textContent = caption || "";
  lb.hidden = false;
  document.getElementById("lightbox-close")?.focus();
}

export function initLightbox() {
  const lb = document.getElementById("lightbox");
  const close = document.getElementById("lightbox-close");
  if (!lb || !close) return;
  const hide = () => { lb.hidden = true; };
  close.addEventListener("click", hide);
  lb.addEventListener("click", e => { if (e.target === lb) hide(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) hide(); });
}