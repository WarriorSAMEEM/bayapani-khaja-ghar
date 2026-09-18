import { BUSINESS } from "./config.js";

const TARGET = new Date(BUSINESS.openingIso);

function pad(n) { return String(n).padStart(2, "0"); }

function render(el, value) {
  if (!el) return;
  if (el.textContent !== value) {
    el.textContent = value;
    el.classList.add("tick");
    setTimeout(() => el.classList.remove("tick"), 180);
  }
}

function showOpen() {
  const soon = document.getElementById("opening-soon");
  const open = document.getElementById("opening-open");
  if (soon) soon.hidden = true;
  if (open) open.hidden = false;
}

export function initCountdown() {
  const soon = document.getElementById("opening-soon");
  const open = document.getElementById("opening-open");
  if (!soon || !open) return;

  const daysEl = document.getElementById("cd-days");
  const hrsEl  = document.getElementById("cd-hours");
  const minEl  = document.getElementById("cd-mins");
  const secEl  = document.getElementById("cd-secs");

  let timerId = null;

  function tick() {
    const diff = TARGET.getTime() - Date.now();
    if (diff <= 0) {
      showOpen();
      if (timerId) { clearInterval(timerId); timerId = null; }
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    render(daysEl, pad(d));
    render(hrsEl, pad(h));
    render(minEl, pad(m));
    render(secEl, pad(s));
  }

  if (Date.now() >= TARGET.getTime()) { showOpen(); return; }

  tick();
  timerId = setInterval(tick, 1000);
}