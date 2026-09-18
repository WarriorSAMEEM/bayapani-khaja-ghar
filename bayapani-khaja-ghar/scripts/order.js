import { BUSINESS } from "./config.js";
import { getMenu } from "./data-source.js";

const cart = new Map(); // id -> qty

function money(item, qty) {
  if (item.price == null || item.price === "") return "price TBC";
  return `Rs ${item.price * qty}`;
}

function renderPicker(menu, activeCat) {
  const list = document.getElementById("order-items");
  if (!list) return;
  const items = menu.filter(i => i.category === activeCat);
  list.innerHTML = items.map(i => `
    <li class="order-item ${i.available ? "" : "unavail"}">
      <div>
        <div class="oi-name">${i.name}${i.nameNp ? ` <span class="oi-np" lang="ne">${i.nameNp}</span>` : ""}</div>
        <div class="oi-np">${i.price == null ? "price TBC" : `Rs ${i.price}`}</div>
      </div>
      <button type="button" data-add="${i.id}" ${i.available ? "" : "disabled"}>Add</button>
    </li>`).join("");
}

function renderSummary(menu) {
  const list = document.getElementById("summary-list");
  if (!list) return;
  if (cart.size === 0) {
    list.innerHTML = `<li class="summary-empty">No items selected yet.</li>`;
    return;
  }
  list.innerHTML = [...cart.entries()].map(([id, qty]) => {
    const item = menu.find(m => m.id === id);
    if (!item) return "";
    return `<li>
      <span>${item.name} <span class="oi-np" lang="ne">${item.nameNp || ""}</span></span>
      <span class="qty-controls">
        <button type="button" data-dec="${id}" aria-label="Decrease quantity">−</button>
        <span aria-label="Quantity">${qty}</span>
        <button type="button" data-inc="${id}" aria-label="Increase quantity">+</button>
        <span>${money(item, qty)}</span>
      </span>
    </li>`;
  }).join("");
}

function buildMessage(menu) {
  const lines = [];
  lines.push(`Namaste ${BUSINESS.name} 🙏`);
  lines.push(`I'd like to place an order:`);
  lines.push("");
  const type = document.querySelector('input[name="ordertype"]:checked')?.value || "Takeaway";
  for (const [id, qty] of cart.entries()) {
    const item = menu.find(m => m.id === id);
    if (!item) continue;
    const price = item.price == null ? "(price TBC)" : `— Rs ${item.price * qty}`;
    lines.push(`• ${item.name}${item.nameNp ? ` (${item.nameNp})` : ""} × ${qty} ${price}`);
  }
  lines.push("");
  lines.push(`Order type: ${type}`);
  if (type === "Delivery") lines.push("Note: Delivery area/charge to be confirmed on WhatsApp.");
  const name = document.getElementById("cust-name")?.value.trim();
  const phone = document.getElementById("cust-phone")?.value.trim();
  const note = document.getElementById("cust-note")?.value.trim();
  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (note) lines.push(`Note: ${note}`);
  lines.push("");
  lines.push("Thank you!");
  return lines.join("\n");
}

export async function initOrder() {
  const menu = await getMenu();
  const catSelect = document.getElementById("order-category");
  const itemsList = document.getElementById("order-items");
  if (!catSelect || !itemsList) return;

  const cats = Array.from(new Set(menu.map(i => i.category)));
  catSelect.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");
  renderPicker(menu, cats[0] || "");

  catSelect.addEventListener("change", () => renderPicker(menu, catSelect.value));

  itemsList.addEventListener("click", e => {
    const id = e.target.dataset?.add;
    if (!id) return;
    cart.set(id, (cart.get(id) || 0) + 1);
    renderSummary(menu);
  });

  const summaryList = document.getElementById("summary-list");
  summaryList?.addEventListener("click", e => {
    const incId = e.target.dataset?.inc;
    const decId = e.target.dataset?.dec;
    if (incId) cart.set(incId, (cart.get(incId) || 0) + 1);
    if (decId) {
      const q = (cart.get(decId) || 0) - 1;
      if (q <= 0) cart.delete(decId); else cart.set(decId, q);
    }
    if (incId || decId) renderSummary(menu);
  });

  document.querySelectorAll('input[name="ordertype"]').forEach(r => {
    r.addEventListener("change", () => {
      const hint = document.getElementById("delivery-hint");
      if (hint) hint.hidden = r.value !== "Delivery" || !r.checked;
    });
  });

  document.getElementById("send-order")?.addEventListener("click", () => {
    if (cart.size === 0) {
      alert("Please add at least one item.");
      return;
    }
    const msg = buildMessage(menu);
    const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  });

  renderSummary(menu);
}