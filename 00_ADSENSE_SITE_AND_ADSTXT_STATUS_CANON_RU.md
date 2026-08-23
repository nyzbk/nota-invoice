# AdSense: статусы сайта и ads.txt — канон Grok-проекта

**Проект:** brand-marketing agency (Grok Projects). Слово «проект» всегда = этот проект.  
**Дата:** 23.08.2026  
**Publisher:** `ca-pub-7636435144500691`  
**Связь:** `ADSENSE.md` (playbook 124) · Machine 119 · 3 проверки `00_DEV_THREE_CHECKS.md`

Официальные источники (сохранять, не пересказывать вслепую):

| Тема | URL |
|------|-----|
| Статусы сайтов | https://support.google.com/adsense/answer/7584263?hl=ru |
| Запросить проверку | https://support.google.com/adsense/answer/12171038#request_review |
| Повторная проверка неактивного сайта | https://support.google.com/adsense/answer/12176698 |
| Статус одобрения | https://support.google.com/adsense/answer/12170222#approval_status |
| Устранение неполадок ads.txt | https://support.google.com/adsense/answer/12171244 |
| Файл ads.txt (как создать) | https://support.google.com/adsense/answer/7003627?hl=ru |

---

## 1. Статусы сайта AdSense

Источник: https://support.google.com/adsense/answer/7584263?hl=ru

| Статус (RU) | EN смысл | Что это | Что делать мы |
|-------------|---------|---------|----------------|
| **Подготовка** | Getting ready / In progress | Google проверяет сайт. Обычно несколько дней, иногда **2–4 недели**. Рекламы ещё нет. | Ждать. Не дёргать код каждый день. Auto ads не включать. |
| **Готово** | Ready | Можно показывать рекламу. Нужно соблюдать правила программы. Нарушения — в Центре правил. | Вставить Display units (after-success / mid / footer). `VITE_ADSENSE_LIVE=true`. CMP. Следить за политикой. |
| **Требует проверки** | Needs attention / Requires review | Сайт ещё не проверялся → нажать **Запросить проверку**. Или сайт неактивен → повторная проверка. | Ownership (script + ads.txt + meta) → Request review. Неактивный: https://support.google.com/adsense/answer/12176698 |
| **Требуется ваше вмешательство** | Requires your action | Показ не стартует, пока не исправим сайт. | Читать причину в кабинете. Чеклист подготовки: контент, политика, страницы Privacy/Terms, нет cloaking. |

Подробнее о статусах рассмотрения: https://support.google.com/adsense/answer/12170222#approval_status  
Запрос проверки: https://support.google.com/adsense/answer/12171038#request_review

**Не путать:** «Требует проверки» после добавления сайта — нормальный первый шаг. «Подготовка» — уже отправили, ждём. «Готово» — единственный момент для live ads.

---

## 2. Статусы файла ads.txt

Источник: https://support.google.com/adsense/answer/12171244

Каноническая строка (корень сайта, `https://DOMAIN/ads.txt`, `Content-Type: text/plain`):

```
google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0
```

`pub-` **без** `ca-`. Как создать файл: https://support.google.com/adsense/answer/7003627?hl=ru

| Статус (RU) | Что значит | Что делать |
|-------------|------------|------------|
| **Не найдено** | При последнем сканировании `ads.txt` не был обнаружен | Файл в корне, не `/public` URL-path отдельно от домена. HTTP 200. Без HTML-обёртки. Подождать crawl (часы–дни). |
| **Разрешено** | Publisher ID найден в ads.txt | Норма. Не трогать строку. |
| **Не разрешено** | Publisher ID **нет** в файле → AdSense не может показывать рекламу | Проверить опечатку, `ca-pub` вместо `pub`, лишние пробелы, редирект на HTML. |
| **Неприменимо** | ID в ads.txt не требуется (редкие случаи / ещё не применимо) | Не паниковать. Для наших Vercel-сайтов цель — **Разрешено**. |

---

## 3. Ownership (три способа сразу)

На каждом Free App ставим **все три**, не один:

1. Скрипт в `<head>`:  
   `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691`
2. `ads.txt` в корне — строка выше.
3. Meta: `<meta name="google-adsense-account" content="ca-pub-7636435144500691">`

Потом в UI: код размещён / файл опубликован / meta установлен → **Запросить проверку**.

---

## 4. Снимок сайтов проекта (23.08.2026)

| Продукт | Домен | Ownership | Review | ads.txt на live |
|---------|-------|-----------|--------|-----------------|
| HEIC Local | heic-local.vercel.app | 3 способа | на проверке / Подготовка | тот же pub |
| Folio (PDF Toolkit) | folio-pdf-toolkit.vercel.app | 3 способа | на проверке / Подготовка | тот же pub |
| **Nota** (invoice) | **nota-invoice-mu.vercel.app** | 3 способа live, проверено curl | **Требует проверки** → жать Request review | `Разрешено` ожидаем после crawl |

`nota-invoice.vercel.app` — **чужой** сайт. Не добавлять в AdSense.  
`folio-invoice.vercel.app` — старое неверное имя, проект на Vercel paused.

Имена не смешивать: Folio ≠ Nota ≠ HEIC Local.

---

## 5. Жёсткие решения (повтор 124)

```
Auto ads            = ВЫКЛ
AMP auto ads        = НЕТ (нет AMP)
Автооптимизация     = ВКЛ
Display units       = только после статуса Готово
Ads placement       = after-success / mid / footer, не у Download
```

Пока статус не **Готово** — «объявления в течение часа» не работают. Это не баг кода.

---

## 6. Куда кладём в проекте

| Место | Файл |
|-------|------|
| Корень репо / основы разработки | этот файл: `00_ADSENSE_SITE_AND_ADSTXT_STATUS_CANON_RU.md` |
| Playbook монетизации | `ADSENSE.md` |
| Grok Project persist | `artifacts/00_ADSENSE_SITE_AND_ADSTXT_STATUS_CANON_RU.md` |
| Гейт разработки | `00_DEV_THREE_CHECKS.md` (ссылка) |
