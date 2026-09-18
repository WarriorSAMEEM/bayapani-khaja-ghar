import { BUSINESS } from "./config.js";
import { initTheme } from "./theme.js";
import { initCountdown } from "./countdown.js";
import { initMenu } from "./menu.js";
import { initOrder } from "./order.js";
import { initOffers } from "./offers.js";
import { initAnnouncement } from "./announcement.js";
import { initGallery, initLightbox } from "./gallery.js";
import { initNav } from "./nav.js";
import { initShare } from "./share.js";

/* Wire business info into static text nodes so there is one source of truth */
function wireBusinessInfo() {
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Namaste! I'd like to place an order.")}`;
  const telUrl = `tel:${BUSINESS.phoneDial}`;
  const set = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  ["hero-wa","contact-wa"].forEach(id => set(id, "href", waUrl));
  ["hero-call","contact-call"].forEach(id => set(id, "href", telUrl));
  ["hero-dir","contact-dir","map-link","footer-map"].forEach(id => {
    const el = document.getElementById(id); if (el) { el.href = BUSINESS.googleMapsUrl; el.target = "_blank"; el.rel = "noopener"; }
  });
  set("contact-phone", "href", telUrl);
  set("footer-phone", "href", telUrl);
  setText("contact-phone", BUSINESS.phoneDisplay);
  setText("footer-phone", BUSINESS.phoneDisplay);
  setText("contact-biz", BUSINESS.name);
  setText("year", new Date().getFullYear());

  /* Social icons — only render ones with a URL */
  const social = document.getElementById("social-row");
  if (social) {
    const entries = Object.entries(BUSINESS.social).filter(([,v]) => v);
    social.innerHTML = entries.map(([k, url]) =>
      `<a href="${url}" target="_blank" rel="noopener" aria-label="${k}">${labelFor(k)}</a>`
    ).join("");
  }

  /* Reviews: only show button if URL supplied */
  const reviews = document.getElementById("reviews-action");
  if (reviews) {
    reviews.innerHTML = BUSINESS.googleReviewsUrl
      ? `<a class="btn btn-primary" href="${BUSINESS.googleReviewsUrl}" target="_blank" rel="noopener">Read Our Google Reviews</a>`
      : `<p class="empty-state">Google reviews will appear here once we're open. Meanwhile, you can find us on Google Maps above.</p>`;
  }
}

function labelFor(key) {
  const map = { facebook:"f", instagram:"◎", tiktok:"♪" };
  return map[key] || key[0].toUpperCase();
}

async function safe(fn) {
  try { await fn(); } catch (e) { console.warn("init failed:", fn.name, e); }
}

function boot() {
  wireBusinessInfo();
  initTheme();
  initCountdown();
  initNav();
  initLightbox();
  initShare();
  safe(initAnnouncement);
  safe(initMenu);
  safe(initOrder);
  safe(initOffers);
  safe(initGallery);
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", boot);
else boot();