# ملفات جاهزة للاستبدال

## 1) Mesori-Brief → `mesori.app` (Cloudflare Pages)
انسخ `site/` و`site-src/` فوق نفس المجلدين في المستودع.
- **لا تلمس** `site/privacy-policy.html` و`site/terms.html` و`site/robots.txt` و`site/app-ads.txt`.
- متغيّر: `site/index.html`, `site/_redirects`, `site/sitemap.xml`, `site/assets/site.css`, `site/_headers`, `site/icon.png`, `site/og-image.png`.
- جديد: `site/img/*`, `site/developer-portfolio/*`.
- إعدادات المشروع تفضل كما هي: Output directory = `site`، بدون Build command.

## 2) نسخة iPhone → `mesori.app/ios/`
الملف ده **مش** فيه ناتج البناء، لأن البناء محتاج متغيرات Supabase الحقيقية وأنا ما أقدرش أوصلها. ابنِه بنفسك من مستودع التطبيق:
```bash
cd mesori-last-realise-22
npx vite build --base=/ios/ --outDir dist-ios --emptyOutDir
rm -f dist-ios/dashboard.html
```
وبعدين انسخ `dist-ios/` داخل `Mesori-Brief/site/ios/`. التفاصيل كاملة في `IOS-WEB-PARITY.md` داخل `mesori-app-ios-web.zip`.

## 3) My-Portfolio → GitHub Pages (المستودع القديم)
استبدل `index.html` بالملف الموجود في `old-portfolio-repo/`. يحوّل الزوار تلقائيًا إلى `mesori.app/developer-portfolio/`.

## 4) Vercel
مش مرتبط بأي رابط إنتاجي. أي نسخة Testing تتنشر هناك بشكل منفصل.
