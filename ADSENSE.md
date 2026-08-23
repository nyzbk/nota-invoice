# 124 — ADSENSE LIVE PLAYBOOK
## Auto ads · Ad units · AMP · CMP · Автооптимизация · Search Console
**Дата:** 22.08.2026  
**Аккаунт:** `ca-pub-7636435144500691`  
**Сайты сейчас:**  
- `heic-local.vercel.app` — ownership OK, **на проверке / Подготовка**  
- `folio-pdf-toolkit.vercel.app` — ownership OK, **на проверке / Подготовка**  
- `nota-invoice-mu.vercel.app` — Nota (invoice), 3 способа live, **Требует проверки** → Request review  
**Не использовать:** `nota-invoice.vercel.app` (чужой), `folio-invoice.vercel.app` (paused, неверное имя)  
**Код:** ADS-OS · канон после live-скринов AdSense UI

Этот файл — память проекта по монетизации. Связан с 95 Policy, 97 Placement, 98 Playbook, 119 Machine.

---

## 0. СНИМОК UI (что видно сейчас)

| Сайт | Автооптимизация | Автоматизированные объявления | Исключённые страницы |
|------|-----------------|------------------------------|----------------------|
| folio-pdf-toolkit.vercel.app | **ВКЛ** | **ВЫКЛ** | 0 |
| heic-local.vercel.app | **ВКЛ** | **ВЫКЛ** | 0 |

Рекламных блоков ещё нет (вкладка «По рекламному блоку» пустая).  
Сайты в Sites list. Review идёт. Live ads ещё нет — это нормально.

---

## 1. ЖЁСТКИЕ РЕШЕНИЯ (не обсуждаем каждый раз)

```
Auto ads (автоматизированные объявления)     = ВЫКЛ  на Free Apps
AMP auto ads                                 = НЕ ВКЛЮЧАТЬ (у нас нет AMP)
AdSense <head> script                        = ОСТАВИТЬ (уже стоит)
ads.txt + meta google-adsense-account        = ОСТАВИТЬ
Автооптимизация                              = ВКЛ (можно)
Применять победителя автоматически           = ВКЛ, если уже так стоит
Экспериментальный трафик 50%                 = ОК
Мобильная авто-ширина объявлений             = ВКЛ после первых ad units
Offerwall / «не блокируйте рекламу»          = НЕ СЕЙЧАС
CMP (GDPR / UK / CH + штаты США)             = ДА, после Ready или сразу
Рекламные блоки Display                      = создать ПОСЛЕ Site Ready
VITE_ADSENSE_LIVE                            = true только после Ready
```

Почему Auto ads **выкл**:
- Google сам втыкает рекламу «в лучших местах» — у Free Tool это часто **поверх Merge / Download**.
- Канон 97: ads только after-success / mid / footer, никогда рядом с primary CTA.
- Скрин «Автоматизированные объявления отключены» — **правильное** состояние. Не жать «Начало работы» / не включать форматы оверлеев.

Почему head-скрипт **оставить**:
- Это один и тот же код и для Auto ads, и для ручных блоков.
- Google: «если код уже добавлен — не заменять».
- Без него ownership и будущие `ins.adsbygoogle` не работают.

---

## 2. ЧТО ДЕЛАТЬ С КАЖДЫМ ЭКРАНОМ

### 2.1 Онбординг «Повысьте доход… / Начало работы»
Это мастер Auto ads. **Закрой крестиком.** Не включай.  
Наш placement ручной.

### 2.2 «Посмотрите, как выглядят объявления» + Auto ads formats
Оверлеи / in-page / исключённые области — **не трогать**, пока Auto ads выкл.  
Исключённые страницы: 0 — ок. Позже можно исключить `/privacy` `/terms` если Auto ads когда-либо включат (не планируем).

### 2.3 Код Auto ads (уже в `<head>`)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691"
     crossorigin="anonymous"></script>
```
На Folio уже стоит. На HEIC — проверить, что тот же client. Не дублировать второй раз.

Показ объявлений «в течение часа» относится к **одобренному** сайту. Пока «на проверке» — объявлений не будет. Это не баг.

### 2.4 AMP
У Folio / HEIC / Invoice **нет AMP-версии**.  
Не вставлять `amp-auto-ads` и `amp-auto-ads-0.1.js`.  
Тумблер «Автоматизированные объявления для AMP» — **выкл**.

### 2.5 Создать рекламный блок (после Ready)

Порядок создания в UI **По рекламному блоку**:

| # | Тип Google | Наш слот | Когда |
|---|------------|----------|--------|
| 1 | **Медийные (Display)** | after-success | сразу после Ready |
| 2 | Медийные (Display) | mid | сразу после Ready |
| 3 | Медийные (Display) | footer | сразу после Ready |
| — | In-feed / In-article / Multiplex | не для MVP | позже, если статья-кластер |

Имена блоков: `folio-after-success`, `folio-mid`, `folio-footer` (и `heic-…`, `invoice-…`).

После создания: вписать `data-ad-slot="########"` в `AdUnit.tsx`, `VITE_ADSENSE_LIVE=true` на production.

### 2.6 Глобальные → размер объявления
«Разрешите Google оптимизировать размеры мобильных объявлений» — **включить после первых трёх Display units**. Код на сайте не меняется.

### 2.7 Автооптимизация (скрин folio)
- Автооптимизация: **оставить ВКЛ**
- Применять выигравший вариант автоматически: **да**
- Экспериментальный трафик: **50%** ок
- Заблокированные эксперименты: 0/9 — не блокировать, пока нет причин (не блокируем overlay-эксперименты отдельно, т.к. Auto ads выкл — Google не должен ставить оверлеи)

Автооптимизация ≠ Auto ads. Оптимизация крутит **уже существующие** форматы. Auto ads сам рисует новые места. Нам нужна первая, не вторая.

### 2.8 Конфиденциальность и сообщения (CMP)
Нужно для трафика из ЕЭЗ / UK / CH и части штатов США. Без CMP европейский трафик = сильно урезанные ads или 0.

Сделать в AdSense → Privacy & messages:
1. **Европейские регламенты (GDPR)** — создать сообщение, 2 активных ок если уже есть с HEIC-аккаунта (аккаунт общий).
2. **Законы штатов США** — создать базовое сообщение.
3. **Offerwall** — не для Free Tool (это paywall/альтернатива, ломает no-signup).
4. **Просьба не блокировать рекламу** — можно позже, не блокер.

Код CMP Google вставляет сам через тот же adsbygoogle / Funding Choices, отдельный тег обычно не нужен, если сообщения созданы в UI.

### 2.9 Search Console (трафик из Google)
Это **не** AdSense. Другой продукт: [search.google.com/search-console](https://search.google.com/search-console)

Пока сайты на проверке в AdSense — **уже можно** добавить property:

1. Добавить URL-prefix: `https://folio-pdf-toolkit.vercel.app`
2. Verify: HTML-tag **или** тот же ads.txt (часто проходит)
3. Sitemaps → `https://folio-pdf-toolkit.vercel.app/sitemap.xml`
4. Повторить для `https://heic-local.vercel.app`
5. URL Inspection на `/` `/split` `/compress`

Индексация и ads review идут **параллельно**. Не ждать Ready, чтобы завести Search Console.

---

## 3. КАНОНИЧЕСКИЕ ССЫЛКИ GOOGLE (хранить)

| Тема | URL |
|------|-----|
| Auto ads / код | https://support.google.com/adsense/answer/9261805?hl=ru |
| Автооптимизация | https://support.google.com/adsense/answer/9141298?hl=ru |
| Внедрение кода | https://support.google.com/adsense/answer/9274019?hl=ru |
| AMP auto ads | https://support.google.com/adsense/answer/9261309?hl=ru |
| Display units | https://support.google.com/adsense/answer/9183566?hl=ru |
| In-feed | https://support.google.com/adsense/answer/9185051?hl=ru |
| In-article | https://support.google.com/adsense/answer/9185052?hl=ru |
| Multiplex | https://support.google.com/adsense/answer/9185054?hl=ru |
| Мобильный размер | https://support.google.com/adsense/answer/9139818?hl=ru |
| Intent formats / overlays | https://support.google.com/adsense/answer/14099288?hl=ru |
| Privacy & messages | https://support.google.com/adsense/answer/10924669 |
| Реклама и политика сайта | https://support.google.com/adsense/answer/7584263?hl=ru |
| Запрещённый контент | https://support.google.com/adsense/answer/1709858?hl=ru |
| Размещение / поведение ads | https://support.google.com/adsense/answer/9130898?hl=ru |

---

## 4. КОД НА САЙТЕ (канон)

**Всегда в `<head>` каждой страницы:**
```html
<meta name="google-adsense-account" content="ca-pub-7636435144500691">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691"
     crossorigin="anonymous"></script>
```

**Всегда `/ads.txt` в корне:**
```
google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0
```

**После Ready — ручной Display (пример after-success):**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7636435144500691"
     data-ad-slot="AFTER_SUCCESS_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>
```

До Ready: визуальный placeholder «Advertisement», без `ins` (как сейчас). Не кормим Google пустыми кликами.

---

## 5. ЧЕКЛИСТ НА КАЖДЫЙ НОВЫЙ FREE APP

- [ ] Head script + meta + ads.txt с **этим** pub-id
- [ ] Privacy / Terms / About
- [ ] Ad slots after-success / mid / footer (placeholders)
- [ ] Auto ads **выкл** в UI после добавления сайта
- [ ] Автооптимизация **вкл**
- [ ] AMP **не** трогать
- [ ] Search Console property + sitemap в тот же день, что Vercel live
- [ ] Request review
- [ ] CMP GDPR (аккаунт-уровень, один раз на все сайты)
- [ ] После Ready: 3 Display units → slot IDs → LIVE=true

---

## 6. СЕЙЧАС (22.08.2026) — НЕ ДЕЛАТЬ / ДЕЛАТЬ

**Не делать**
- Включать Auto ads / оверлеи
- Вставлять AMP-код
- Offerwall
- Создавать 10 блоков «на всякий случай» до Ready
- Дублировать adsbygoogle.js

**Делать**
- Ждать Ready (Подготовка → Готово) по HEIC + Folio + Nota
- Nota: в кабинете **Запросить проверку** для `nota-invoice-mu.vercel.app`
- Статусы сайта и ads.txt — канон `00_ADSENSE_SITE_AND_ADSTXT_STATUS_CANON_RU.md`
- Search Console + sitemap после ownership (трафик из Google)
- CMP, если ещё не создан на аккаунте
