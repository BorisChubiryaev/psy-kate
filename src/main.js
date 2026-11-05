const TELEGRAM = "https://t.me/ikaateee";
const root = document.documentElement;
root.classList.add("js");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-loaded")));

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

/* ---------- Reveal on scroll (with small stagger inside a group) ---------- */
const revealed = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.style.setProperty("--d", `${Math.min(i++ * 0.08, 0.4)}s`);
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Nav: background on scroll, hide on scroll down ---------- */
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const menu = document.getElementById("nav-menu");
const dot = document.querySelector(".gestalt-dot");
const closeCircle = document.querySelector("[data-close-circle]");
const contact = document.querySelector(dot ? dot.getAttribute("href") : "#contact");
let lastY = window.scrollY;

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
});

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const menuOpen = menu.classList.contains("is-open");

  nav.classList.toggle("is-scrolled", y > 24);
  nav.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY + 4);
  if (y < lastY - 4) nav.classList.remove("is-hidden");
  lastY = y;

  // Floating circle closes as the page is read
  const p = max > 0 ? Math.min(y / max, 1) : 0;
  if (dot) {
    dot.style.setProperty("--p", p.toFixed(4));
    const atContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.7;
    dot.classList.toggle("is-visible", y > window.innerHeight * 0.6 && !atContact);
  }

  // Gestalt section circle closes while the section passes through the viewport
  if (closeCircle) {
    const r = closeCircle.getBoundingClientRect();
    const c = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight + r.height * 0.6), 0), 1);
    closeCircle.style.setProperty("--c", reduceMotion ? "1" : c.toFixed(4));
  }
}
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  },
  { passive: true }
);
window.addEventListener("resize", onScroll);
onScroll();

/* ---------- First-message composers ---------- */
const builders = {
  client(data) {
    const name = String(data.get("name") || "").trim();
    const format = data.get("format");
    const topics = data.getAll("topic");
    const note = String(data.get("note") || "").trim();
    const lines = [name ? `Здравствуйте, Екатерина! Меня зовут ${name}.` : "Здравствуйте, Екатерина!"];
    lines.push("Хочу записаться на консультацию" + (format && format !== "пока не знаю" ? ` (${format}).` : "."));
    if (format === "пока не знаю") lines.push("Пока не решил(а), онлайн или очно.");
    if (topics.length) lines.push(`Что беспокоит: ${topics.join(", ")}.`);
    if (note) lines.push(note);
    return lines.join("\n");
  },
  pro(data) {
    const name = String(data.get("name") || "").trim();
    const stage = data.get("stage");
    const format = data.get("format");
    const note = String(data.get("note") || "").trim();
    const lines = [name ? `Привет, Катя! Меня зовут ${name}.` : "Привет, Катя!"];
    if (stage) lines.push(`Я ${stage}.`);
    if (format === "не знаю") lines.push("Хочу что-то, но не знаю что — хочу понять, какой формат мне подойдёт.");
    else if (format) lines.push(`Интересует сопровождение: ${format}.`);
    else lines.push("Интересует сопровождение для психологов.");
    if (note) lines.push(note);
    return lines.join("\n");
  },
};

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    ta.remove();
    return ok;
  }
}

document.querySelectorAll("[data-composer]").forEach((form) => {
  const build = builders[form.dataset.composer] || builders.client;
  const preview = form.querySelector("[data-preview]");
  const hint = form.querySelector("[data-hint]");
  const message = () => build(new FormData(form));
  const render = () => (preview.textContent = message());
  form.addEventListener("input", render);
  form.addEventListener("change", render);
  render();

  // Buttons elsewhere on the page can preselect a format: data-format="value"
  document.querySelectorAll("[data-format]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const input = form.querySelector(`input[name="format"][value="${btn.dataset.format}"]`);
      if (!input) return;
      input.checked = true;
      render();
      if (btn.hasAttribute("data-focus-note")) setTimeout(() => form.querySelector("textarea")?.focus({ preventScroll: true }), 700);
    })
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Start copying while the page still has focus, then open Telegram
    // synchronously inside the click so popup blockers allow it.
    const copied = copy(message());
    const win = window.open(TELEGRAM, "_blank");
    if (win) win.opener = null;
    const ok = await copied;
    hint.textContent = ok
      ? "Сообщение скопировано — вставьте его в чат Telegram."
      : "Не получилось скопировать автоматически — выделите текст выше и скопируйте вручную.";
    hint.classList.add("is-done");
    if (!win) window.location.href = TELEGRAM;
  });
});

/* ---------- Review filters ---------- */
document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const items = document.querySelectorAll(group.dataset.filterGroup);
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    group.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const f = btn.dataset.filter;
    items.forEach((el) => (el.hidden = f !== "all" && el.dataset.topic !== f));
  });
});
