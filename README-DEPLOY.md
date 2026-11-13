# ملفات جاهزة للاستبدال

## 1) Mesori-Brief → `mesori.app` (Cloudflare Pages)
انسخ `site/` و`site-src/` فوق نفس المجلدين في المستودع.
- **لا تلمس** `site/privacy-policy.html` و`site/terms.html` و`site/robots.txt` و`site/app-ads.txt`.
- متغيّر: `site/index.html`, `site/_redirects`, `site/sitemap.xml`, `site/assets/site.css`, `site/_headers`, `site/icon.png`, `site/og-image.png`.
- جديد: `site/img/*`, `site/developer-portfolio/*`.
- إعدادات المشروع تفضل كما هي: Output directory = `site`، بدون Build command.

## 2) نسخة iPhone → `ios.mesori.app` (مشروع Pages منفصل)
الكود في `mesori-app-ios-web.zip` وبيتركّب على مستودع `mesori-last-realise-22`. الإعدادات ومتغيرات البيئة في `IOS-WEB-PARITY.md`.

## 3) My-Portfolio → GitHub Pages (المستودع القديم)
استبدل `index.html` بالملف الموجود في `old-portfolio-repo/`. يحوّل الزوار تلقائيًا إلى `mesori.app/developer-portfolio/`.

## 4) Vercel
مش مرتبط بأي رابط إنتاجي. أي نسخة Testing تتنشر هناك بشكل منفصل.
