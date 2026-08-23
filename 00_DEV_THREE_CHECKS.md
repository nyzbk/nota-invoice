# 3 проверки перед «готово» — канон разработки Free App

**Дата фиксации:** 23.08.2026  
**Статус:** обязательный гейт. Нельзя пушить / деплоить / звать Request Review, пока три проверки не зелёные.  
**Продукт сейчас:** Nota (invoice). Folio = только PDF Toolkit. HEIC Local = конвертер.  
**AdSense статусы:** `00_ADSENSE_SITE_AND_ADSTXT_STATUS_CANON_RU.md` (сайт: Подготовка / Готово / Требует проверки / Требуется вмешательство; ads.txt: Не найдено / Разрешено / Не разрешено / Неприменимо). Publisher `ca-pub-7636435144500691`.

Это не «галочка в чате». Это рабочий контур: найти дыру → закрыть → доказать, что инструмент даёт результат (PDF на диске, не пустая страница).

---

## Правило (не повторять)

1. Каждый Free App — **своё имя и свой домен**. Не называть Invoice «Folio».
2. Перед релизом всегда три проверки ниже. Если пропустил — это ошибка, фиксировать, не повторять.
3. Решения брать из открытых GitHub-репозиториев, не выдумывать «магию».

---

## Проверка 1 — взлом до взлома (Security)

Цель: закрыть то, чем бьют клиентские утилиты: XSS, подмена файла, гигантский upload, утечка данных на сервер, гнилые npm CVE.

| Что | Репозиторий / инструмент | Как применяем |
|-----|--------------------------|---------------|
| UI / runtime атаки и падения | [microsoft/playwright](https://github.com/microsoft/playwright) | Все экраны, console/pageerror, клики, download |
| Зависимости CVE | `npm audit` + [aquasecurity/trivy](https://github.com/aquasecurity/trivy) | `npm audit --omit=dev`; critical/high чинить сразу |
| Статика | TypeScript + ESLint | `tsc --noEmit` |
| PDF / файлы | [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) | Magic-bytes, лимит размера, без upload |
| Чеклисты | [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries) | XSS, sensitive data, supply chain |
| AppSec агент (позже, не блокер Nota) | [usestrix/strix](https://github.com/usestrix/strix) | Когда появится backend |
| Хост VPS (не этот app) | [CISOfy/lynis](https://github.com/CISOfy/lynis) · [jtesta/ssh-audit](https://github.com/jtesta/ssh-audit) | Только если есть сервер |

**Hard constraints Nota (и следующих Free Apps):**
- Нет signup, нет отправки инвойса/файла на наш сервер.
- Logo: только PNG/JPEG, magic-bytes, лимит размера.
- Текст в PDF — через шрифт с латиницей+кириллицей, не через `innerHTML`.
- Секретов в клиенте нет. AdSense pub — публичный идентификатор, не ключ.
- Auto ads overlay не включать (канон 124).

---

## Проверка 2 — ошибки (Errors)

Цель: словить падение до пользователя. «Failed to fetch dynamically imported module» = уже был инцидент на PDF Toolkit → `autoCodeSplitting: false`, полный переход, error boundary.

| Что | Репозиторий | Как |
|-----|-------------|-----|
| E2E + pageerror | [microsoft/playwright](https://github.com/microsoft/playwright) | `/`, `/privacy`, `/terms`, `/about` без pageerror |
| Типы | microsoft/TypeScript | `tsc --noEmit` |
| Роутинг | [TanStack/router](https://github.com/TanStack/router) | Нет мёртвых ссылок Merge/Split на Invoice |
| PDF encode | pdf-lib issues | Кириллица, `−`, длинный номер, пустые поля |

Исправить сразу. Не оставлять «потом».

---

## Проверка 3 — работоспособность (Function)

Фантик = красивая форма без файла. Живой инструмент = пользователь заполнил → скачал PDF → открыл → видит свои данные, сумму, без watermark.

Минимум для Nota:
1. From + Bill to + 1 позиция с ценой → Download PDF.
2. Файл > 1 KB, `%PDF`, страница есть.
3. В PDF есть имена сторон, номер, totals (налог/скидка считаются верно: `qty * price`, скидка, затем %).
4. Кириллица в имени не роняет генерацию.
5. iOS-путь: blob download, не server stream.
6. Черновик в localStorage не уезжает на сервер.
7. Privacy / Terms / About открываются.
8. ads.txt + meta + script pub-7636435144500691 на месте.

Скрипт: `scripts/three-checks.mjs` (Playwright + pdf-lib).

---

## Порядок прогона (каждый релиз)

1. `npx tsc --noEmit`
2. `npm audit --omit=dev`
3. `node scripts/three-checks.mjs`
4. Правки → повтор 1–3
5. Push → Vercel → curl live title / ads.txt / sitemap
6. Только потом AdSense Request Review

---

## Имена продуктов (не смешивать)

| Продукт | Домен | Репо |
|---------|-------|------|
| HEIC Local | heic-local.vercel.app | отдельный |
| Folio PDF Toolkit | folio-pdf-toolkit.vercel.app | nyzbk/folio-pdf-toolkit |
| Nota (invoice) | nota-invoice-mu.vercel.app | nyzbk/nota-invoice |

`nota-invoice.vercel.app` занят чужим приложением — не использовать.
