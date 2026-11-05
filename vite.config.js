import { resolve } from "node:path";
import { defineConfig } from "vite";

/*
 * Публичный адрес сайта. Меняется в одном месте (или через переменную
 * окружения SITE_URL в настройках хостинга) — и canonical-ссылки,
 * og:url, sitemap.xml и robots.txt подстроятся автоматически.
 */
const SITE_URL = (process.env.SITE_URL || "https://ikaateee-psy.pages.dev").replace(/\/+$/, "");

/* Коды подтверждения прав в вебмастерах. Вставьте сюда значения content="…". */
const VERIFY = {
  yandex: process.env.YANDEX_VERIFICATION || "",
  google: process.env.GOOGLE_VERIFICATION || "",
  bing: process.env.BING_VERIFICATION || "",
};
/* Номер счётчика Яндекс Метрики (только цифры). Пусто — счётчик не подключается. */
const METRIKA_ID = process.env.YANDEX_METRIKA_ID || "";

const PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/psychologists/", priority: "0.8" },
];

const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* Собирает FAQPage-разметку из <details><summary> на странице. */
function faqJsonLd(html) {
  const items = [...html.matchAll(/<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g)];
  if (!items.length) return "";
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([, q, a]) => ({
      "@type": "Question",
      name: stripTags(q),
      acceptedAnswer: { "@type": "Answer", text: stripTags(a) },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function verificationTags() {
  const tags = [];
  if (VERIFY.yandex) tags.push(`<meta name="yandex-verification" content="${VERIFY.yandex}" />`);
  if (VERIFY.google) tags.push(`<meta name="google-site-verification" content="${VERIFY.google}" />`);
  if (VERIFY.bing) tags.push(`<meta name="msvalidate.01" content="${VERIFY.bing}" />`);
  return tags.join("\n  ");
}

function metrika() {
  if (!/^\d+$/.test(METRIKA_ID)) return "";
  return `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});</script><noscript><div><img src="https://mc.yandex.ru/watch/${METRIKA_ID}" style="position:absolute;left:-9999px" alt="" /></div></noscript>`;
}

function seo() {
  return {
    name: "seo",
    transformIndexHtml(html) {
      return html
        .replaceAll("%SITE_URL%", SITE_URL)
        .replace("<!-- seo:verification -->", verificationTags())
        .replace("<!-- seo:faq -->", faqJsonLd(html))
        .replace("<!-- seo:metrika -->", metrika());
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = PAGES.map(
        (p) =>
          `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      ).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [seo()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        psychologists: resolve(import.meta.dirname, "psychologists/index.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
