# Google Search Console + sitemap — канон проекта

**Проект:** brand-marketing agency (Grok Projects)  
**Дата:** 23.08.2026  
**Зачем:** органический трафик из Google (это не AdSense). AdSense = реклама. Search Console = индекс и запросы.  
**Официально:** https://search.google.com/search-console/welcome · https://support.google.com/webmasters/answer/34592

---

## 1. Какой тип ресурса выбрать (скрины welcome)

На экране «Выберите тип ресурса»:

| Карточка | Когда | Наши Vercel-приложения |
|----------|--------|-------------------------|
| **Доменный ресурс** (`example.com`) | Свой домен, подтверждение **только DNS** | **НЕЛЬЗЯ.** `*.vercel.app` — DNS у Vercel, TXT мы не поставим |
| **Ресурс с префиксом в URL** (`https://…`) | Один точный origin, meta / HTML-файл / GA | **ДА. Только это.** |

Instagram / YouTube на welcome — **не трогать**. Это не наши Free Apps.

---

## 2. Три свойства — три раза «Добавить сайт»

Правая карточка. Вставить **с https, без слэша в конце**:

```
https://heic-local.vercel.app
https://folio-pdf-toolkit.vercel.app
https://nota-invoice-mu.vercel.app
```

Не добавлять: `nota-invoice.vercel.app` (чужой), `folio-invoice.vercel.app` (paused).

---

## 3. Подтверждение права (после «Продолжить»)

Предпочтение: **HTML-тег** `<meta name="google-site-verification" content="…">` в `<head>`.

Это **другой** тег, не AdSense `google-adsense-account`. Оба могут жить в head.

Когда пришлёшь `content="….` для Nota — вставлю в `__root.tsx` и запушу.  
HTML-файл в `public/` тоже ок, если Google даст `googleXXXX.html`.

---

## 4. Сразу после «Владелец подтверждён»

1. **Индексирование → Файлы Sitemap → Добавить:** `sitemap.xml`  
   (полный URL подставится сам; можно вставить `https://ДОМЕН/sitemap.xml`)
2. URL Inspection → «Запросить индексирование» на `/` один раз.
3. Не спамить запросами каждый час.

---

## 5. Живые sitemap сейчас (проверка 23.08.2026)

| Сайт | `/sitemap.xml` | `robots.txt` Sitemap: |
|------|----------------|------------------------|
| Nota | **200** | да, абсолютный |
| Folio | **200** | да |
| HEIC Local | **404** при `robots.txt` → sitemap | дыра: Google не получит карту |

Дыра HEIC — чинить в репо HEIC (добавить sitemap), не в Nota.

---

## 6. Порядок vs AdSense

1. Ownership AdSense + Request review (идёт).  
2. Search Console URL-prefix + verify + submit sitemap (трафик).  
3. Live ads — только статус сайта **Готово**.

Канон AdSense-статусов: `00_ADSENSE_SITE_AND_ADSTXT_STATUS_CANON_RU.md`.
