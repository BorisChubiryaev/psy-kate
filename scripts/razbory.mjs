/*
 * Генератор раздела «Разборы».
 *
 * Берёт статьи из content/razbory/*.md и собирает:
 *   razbory/index.html          — лента всех разборов
 *   razbory/<slug>/index.html   — страница каждого разбора
 * Картинки статьи лежат в public/razbory/<slug>/ и указываются в markdown по имени файла.
 *
 * Сгенерированные HTML-файлы не хранятся в git: они пересоздаются при `npm run dev` и `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { Marked } from "marked";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "content/razbory");
const OUT = join(ROOT, "razbory");

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ruDate = (iso) => {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

function parse(file) {
  const raw = readFileSync(join(SRC, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Нет блока --- с описанием в ${file}`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  const slug = basename(file, ".md");
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return { ...meta, slug, body: m[2], minutes: Math.max(1, Math.round(words / 180)) };
}

function render(post) {
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      image({ href, title, text }) {
        const src = /^(https?:)?\//.test(href) ? href : `/razbory/${post.slug}/${href}`;
        const cap = title ? `<figcaption>${esc(title)}</figcaption>` : "";
        return `<figure class="post__figure"><img src="${src}" alt="${esc(text)}" loading="lazy" decoding="async" />${cap}</figure>`;
      },
    },
  });
  // Картинка, стоящая отдельным абзацем, не должна оборачиваться в <p>
  return md.parse(post.body).replace(/<p>(<figure[\s\S]*?<\/figure>)<\/p>/g, "$1");
}

export function loadPosts() {
  if (!existsSync(SRC)) return [];
  return readdirSync(SRC)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const coverUrl = (p) => (p.cover ? `/razbory/${p.slug}/${p.cover}` : "");

export function card(p, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const img = p.cover
    ? `<img src="${coverUrl(p)}" alt="${esc(p.cover_alt || p.title)}" loading="lazy" decoding="async" />`
    : `<span class="pcard__plain" aria-hidden="true">${esc(p.title.replace(/[«»"]/g, ""))}</span>`;
  return `<article class="pcard reveal" data-topic="${esc(p.category)}">
  <a class="pcard__link" href="/razbory/${p.slug}/">
    <div class="pcard__media">${img}</div>
    <div class="pcard__body">
      <p class="pcard__meta"><span>${esc(p.category)}</span><time datetime="${p.date}">${ruDate(p.date)}</time></p>
      <${h} class="pcard__title">${esc(p.title)}</${h}>
      <p class="pcard__desc">${esc(p.description)}</p>
    </div>
  </a>
</article>`;
}

const header = (current) => `<header class="nav" data-nav>
    <div class="nav__inner wrap">
      <a class="nav__logo" href="/" aria-label="На главную">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M26.6 10.5A12 12 0 1 0 28 16" /></svg>
        <span>Екатерина Чубиряева</span>
      </a>
      <nav class="aud" aria-label="Для кого сайт">
        <a href="/">Клиентам</a>
        <a href="/psychologists/">Психологам</a>
      </nav>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>
        <span class="sr">Меню</span><i></i><i></i>
      </button>
      <nav class="nav__menu" id="nav-menu" aria-label="Разделы">
        <a href="/#requests">С чем приходят</a>
        <a href="/#about">Обо мне</a>
        <a href="/razbory/"${current ? ' aria-current="page"' : ""}>Разборы</a>
        <a href="/#format">Формат и стоимость</a>
        <a href="/#faq">Вопросы</a>
        <a class="nav__cta" href="/#contact">Записаться</a>
      </nav>
    </div>
  </header>`;

const footer = `<footer class="footer">
    <div class="wrap footer__grid">
      <p class="footer__name">Екатерина Чубиряева<br /><span>гештальт-терапевт · онлайн и в Москве</span></p>
      <p class="footer__care">
        Разборы — личный взгляд психолога и не заменяют консультацию. Если вам сейчас очень плохо,
        позвоните 112 или на бесплатную линию экстренной психологической помощи <a href="tel:051">051</a>
        (с мобильного <a href="tel:+7495051">+7&nbsp;495&nbsp;051</a>, Москва, круглосуточно).
      </p>
      <p class="footer__copy">© <span data-year>2026</span></p>
      <p class="footer__meta">* Instagram и Threads принадлежат компании Meta, деятельность которой признана экстремистской и запрещена на территории России.</p>
    </div>
  </footer>`;

const head = ({ title, description, path, image, type = "website", extra = "" }) => `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="%SITE_URL%${path}" />
  <meta name="theme-color" content="#f3eee6" />
  <meta name="author" content="Екатерина Чубиряева" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <!-- seo:verification -->
  <meta property="og:type" content="${type}" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:site_name" content="Екатерина Чубиряева — гештальт-терапевт" />
  <meta property="og:url" content="%SITE_URL%${path}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="%SITE_URL%${image || "/og.jpg"}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/src/style.css" />
${extra}  <!-- seo:metrika -->
</head>`;

const ld = (obj) => `  <script type="application/ld+json">${JSON.stringify(obj)}</script>\n`;

function articlePage(p, all) {
  const more = all.filter((x) => x.slug !== p.slug).slice(0, 3);
  const path = `/razbory/${p.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        inLanguage: "ru",
        mainEntityOfPage: `%SITE_URL%${path}`,
        ...(p.cover ? { image: `%SITE_URL%${coverUrl(p)}` } : {}),
        author: { "@type": "Person", "@id": "%SITE_URL%/#kate", name: "Екатерина Чубиряева", url: "%SITE_URL%/" },
        articleSection: p.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: "%SITE_URL%/" },
          { "@type": "ListItem", position: 2, name: "Разборы", item: "%SITE_URL%/razbory/" },
          { "@type": "ListItem", position: 3, name: p.title, item: `%SITE_URL%${path}` },
        ],
      },
    ],
  };
  return `${head({ title: `${p.title} — разбор психолога`, description: p.description, path, image: coverUrl(p), type: "article", extra: ld(schema) })}
<body>
  <a class="skip" href="#main">К содержанию</a>
  ${header(false)}
  <main id="main" class="post">
    <article>
      <header class="post__head wrap">
        <nav class="crumbs" aria-label="Навигация"><a href="/">Главная</a><span>/</span><a href="/razbory/">Разборы</a></nav>
        <p class="post__meta"><span>${esc(p.category)}</span><time datetime="${p.date}">${ruDate(p.date)}</time><span>${p.minutes} мин чтения</span></p>
        <h1 class="post__title">${esc(p.title)}</h1>
      </header>
      ${
        p.cover
          ? `<figure class="post__cover wrap"><img src="${coverUrl(p)}" alt="${esc(p.cover_alt || p.title)}" fetchpriority="high" /></figure>`
          : ""
      }
      <div class="post__body wrap">
        <div class="prose">
${render(p)}
        </div>
        <aside class="post__aside">
          <div class="post__author">
            <img src="/images/kate-hero-640.webp" alt="" width="56" height="56" loading="lazy" />
            <p><b>Екатерина Чубиряева</b><span>гештальт-терапевт, 3000+ часов практики</span></p>
          </div>
          ${p.credit ? `<p class="post__credit">${esc(p.credit)}</p>` : ""}
          ${p.source ? `<p class="post__credit">Впервые опубликовано в <a href="${esc(p.source)}" target="_blank" rel="noopener">Threads</a>*</p>` : ""}
        </aside>
      </div>
    </article>

    <section class="post__cta wrap" aria-label="Запись">
      <div>
        <p class="eyebrow eyebrow--light">Узнали себя?</p>
        <h2 class="h2">Свою историю можно <em>разобрать вместе</em></h2>
        <p>Онлайн или очно в Москве. Напишите пару слов — и подберём время.</p>
      </div>
      <a class="btn btn--paper-solid" href="/#contact">Записаться на встречу</a>
    </section>

    ${
      more.length
        ? `<section class="section post__more" aria-labelledby="more-title">
      <div class="wrap">
        <h2 class="h2" id="more-title">Ещё <em>разборы</em></h2>
        <div class="pgrid">
${more.map((x) => card(x)).join("\n")}
        </div>
        <a class="btn btn--ghost post__all" href="/razbory/">Все разборы</a>
      </div>
    </section>`
        : ""
    }
  </main>
  ${footer}
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}

function indexPage(all) {
  const cats = [...new Set(all.map((p) => p.category))];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Разборы — кино, спорт и люди через призму психики",
    url: "%SITE_URL%/razbory/",
    inLanguage: "ru",
    author: { "@type": "Person", "@id": "%SITE_URL%/#kate", name: "Екатерина Чубиряева" },
    blogPost: all.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `%SITE_URL%/razbory/${p.slug}/`, datePublished: p.date })),
  };
  return `${head({
    title: "Разборы фильмов, сериалов и спорта глазами психолога — Екатерина Чубиряева",
    description: "Психологические разборы сериалов, фильмов, интервью и спорта от гештальт-терапевта Екатерины Чубиряевой: травмы, защиты, сценарии — бережно и с юмором.",
    path: "/razbory/",
    extra: ld(schema),
  })}
<body>
  <a class="skip" href="#main">К содержанию</a>
  ${header(true)}
  <main id="main">
    <section class="bhero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Навигация"><a href="/">Главная</a><span>/</span><span>Разборы</span></nav>
        <h1 class="bhero__title reveal">Разборы — <em>кино, спорт и&nbsp;люди</em> через призму психики</h1>
        <p class="bhero__lead reveal">
          Смотрю сериалы, интервью и большой спорт — и пишу о том, что за ними стоит:
          травмы, защиты, сценарии. Бережно и с юмором.
        </p>
      </div>
    </section>
    <section class="section blist">
      <div class="wrap">
        <div class="filters reveal" data-filter-group=".pgrid .pcard" role="group" aria-label="Темы">
          <button type="button" data-filter="all" aria-pressed="true">Все</button>
${cats.map((c) => `          <button type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("\n")}
        </div>
        <div class="pgrid">
${all.map((p) => card(p, { headingLevel: 2 })).join("\n")}
        </div>
      </div>
    </section>
  </main>
  ${footer}
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}

/** Пересобирает HTML раздела. Возвращает список статей. */
export function buildRazbory() {
  const posts = loadPosts();
  rmSync(OUT, { recursive: true, force: true });
  if (!posts.length) return posts;
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, "index.html"), indexPage(posts));
  for (const p of posts) {
    mkdirSync(join(OUT, p.slug), { recursive: true });
    writeFileSync(join(OUT, p.slug, "index.html"), articlePage(p, posts));
  }
  return posts;
}

/** Блок «Свежие разборы» для главной. */
export function latestBlock(posts, n = 3) {
  if (!posts.length) return "";
  return `<section class="section latest" id="razbory" aria-labelledby="latest-title">
      <div class="wrap">
        <div class="latest__head">
          <div>
            <p class="eyebrow reveal">Разборы</p>
            <h2 class="h2 reveal" id="latest-title">Кино, спорт и люди — <em>через призму психики</em></h2>
          </div>
          <a class="btn btn--ghost reveal" href="/razbory/">Все разборы</a>
        </div>
        <div class="pgrid">
${posts.slice(0, n).map((p) => card(p)).join("\n")}
        </div>
      </div>
    </section>`;
}
