import { BUSINESS } from "./config.js";

export function initShare() {
  const btn = document.getElementById("share-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const data = {
      title: BUSINESS.name,
      text: `${BUSINESS.name} — ${BUSINESS.tagline}`,
      url: location.href
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        btn.textContent = "Link copied!";
        setTimeout(() => (btn.textContent = "Share"), 1800);
      }
    } catch { /* user cancelled */ }
  });
}