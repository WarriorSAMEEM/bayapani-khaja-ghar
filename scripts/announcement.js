import { getAnnouncement } from "./data-source.js";

export async function initAnnouncement() {
  const el = document.getElementById("announcement");
  if (!el) return;
  const a = await getAnnouncement();
  if (!a || !a.active || !a.text) { el.hidden = true; return; }
  const btn = a.buttonText && a.buttonLink
    ? `<a href="${a.buttonLink}">${a.buttonText}</a>` : "";
  el.innerHTML = `<div class="wrap">${a.text}${btn}</div>`;
  el.hidden = false;
}