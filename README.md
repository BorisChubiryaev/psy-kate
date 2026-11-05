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
