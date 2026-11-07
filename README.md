# Екатерина Чубиряева — гештальт-терапевт

Одностраничный сайт: Vite + обычные HTML/CSS/JS, без фреймворков.

```bash
npm install
npm run dev      # локально
npm run build    # сборка в dist/ (Vercel делает это сам)
```

## Где что править

- **Тексты, цены, FAQ для клиентов** — `index.html` (всё обычным текстом, по секциям с комментариями).
- **Страница для психологов** — `psychologists/index.html` (открывается по адресу `/psychologists/`).
- **Цвета и шрифты** — переменные в начале `src/style.css`.
- **Ссылка на Telegram** — константа `TELEGRAM` в `src/main.js` и ссылки в `index.html`.
- **Фото** — `public/images/`. Новые фото удобно готовить так (тёплый ч/б-тон как у текущих):

```bash
convert photo.jpg -colorspace gray -colorspace sRGB +level-colors '#221d19','#f3eee6' -resize 1000x -quality 80 public/images/name-1000.webp
```

## SEO и публикация

- Адрес сайта задаётся в `vite.config.js` (`SITE_URL`) или переменной окружения `SITE_URL` на хостинге.
  От него строятся canonical, og:url, `sitemap.xml` и `robots.txt`.
- Коды вебмастеров и Метрики — переменные окружения `YANDEX_VERIFICATION`, `GOOGLE_VERIFICATION`,
  `BING_VERIFICATION`, `YANDEX_METRIKA_ID` (или прямо в `vite.config.js`).
- Разметка FAQ для поисковиков собирается автоматически из блока вопросов на главной.
- Сборка: команда `npm run build`, папка с результатом — `dist`.

## Раздел «Разборы»

- Статьи лежат в `content/razbory/*.md`. Имя файла = адрес страницы (`holod.md` → `/razbory/holod/`).
- В начале файла — блок между `---`: `title`, `description`, `date` (ГГГГ-ММ-ДД), `category`,
  `cover` (имя картинки или пусто), `cover_alt`, `credit` (источник кадров), `source` (ссылка на оригинал).
- Картинки статьи — в `public/razbory/<имя-статьи>/`; в тексте: `![описание](02.webp "подпись")`.
- Лента `/razbory/`, страницы статей, блок «Разборы» на главной и sitemap собираются автоматически.
