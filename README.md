\# مساعد الفرزدق - Farazdaq Assistant



تطبيق تعليمي تفاعلي بأسلوب اللعبة لمساعدة الطالب على حفظ المواد وتثبيتها يومياً.



\*\*تطوير:\*\* حسين

\*\*رابط المطور:\*\* \[https://hussein1labtop-jpg.github.io/Profile-/](https://hussein1labtop-jpg.github.io/Profile-/)

\*\*المعرف المحمي:\*\* `HUSSEIN\_FARAZDAQ\_2025\_V1`



\### 🔗 روابط التطبيق المباشرة بعد الرفع على GitHub Pages

\- تطبيق الطالب: `https://hussein1labtop-jpg.github.io/Farazdaq-Assistant/student/`

\- تطبيق الادارة: `https://hussein1labtop-jpg.github.io/Farazdaq-Assistant/admin/`



كل تطبيق يتثبت كـ تطبيق مستقل (PWA) بدون تعارض لان كل واحد له `manifest` و `scope` مختلف.



\### 📁 هيكل المشروع



Farazdaq-Assistant/

├── README.md

├── LICENSE.md

├── student/ -> تطبيق الطالب PWA

│ ├── index.html

│ ├── manifest.json

│ ├── sw.js

│ ├── css/style.css

│ └── js/app.js + signature.js + firebase-config.js

└── admin/ -> تطبيق الادارة PWA

├── index.html

├── manifest.json

├── sw.js

├── css/style.css

└── js/app.js + signature.js + firebase-config.js







\### ✨ مميزات تطبيق الطالب

\- تسجيل دخول بالاسم الثلاثي

\- 4 واجهات: حسابي | المواد | طلاب الشهر | التبليغات

\- امتحان يومي يبدأ 12 صباحاً وينتهي بنهاية اليوم - 10 نقاط يومياً

\- نظام اعادة السؤال: السؤال الخطأ يرجع لنهاية القائمة ولك محاولتين فقط

\- عداد شهري ذكي: الهدف = 300 × عدد المواد الفعالة (يتكيف تلقائياً)

\- تصنيف طلاب الشهر: فطحل 300 (10 اسماء) | ممتاز 290 (3 اسماء) | جيد 280 (3 اسماء) - تتجدد كل شهر وتبقى معروضة للشهر القادم

\- محادثة مع ادارة كل مادة + تنبيه نقطة حمراء + حذف تلقائي بعد 48 ساعة

\- ثيم بألوان شعار المعهد: كحلي #1A2332 - ذهبي #A99B7C - اوف وايت #FFFBF6



\### 🛠️ مميزات تطبيق الادارة

\- دخول السوبر: `adminhussein` هو الوحيد الي يضيف مدرسين ويحدد اختصاصهم

\- دخول مدير المعهد: `institute\_admin` يشوف كل المواد وكل الطلاب ويطبع PDF ويعدل اي سؤال

\- كل مدرس يشوف فقط مادته (اسئلة - طلاب - رسائل)

\- 3 انواع اسئلة: اختيارات / فراغ / جواب

\- ستيكرات مثل تليكرام: زر + يضيف صورة كستكر صغير

\- تحميل صورة تكريم للانستا بلوكو المعهد واسماء التوب



\### 🚀 طريقة التشغيل و الرفع على GitHub Pages

1\. ارفع كل المجلدات الى ريبو `Farazdaq-Assistant`

2\. فعل GitHub Pages من Settings > Pages > Deploy from a branch > main / root

3\. اربط Firebase عبر ملف `js/firebase-config.js` في كل تطبيق



\### 🔒 الحماية والتوقيع

هذا المشروع محمي بتوقيع المطور. حذف زر `لمحة عن التطبيق` او تغيير رابط المطور سيؤدي لتوقف التطبيق تلقائياً. راجع ملف `LICENSE.md`



\---

© 2025 مساعد الفرزدق - جميع الحقوق محفوظة للمطور حسين - \[Profile](https://hussein1labtop-jpg.github.io/Profile-/)

<!-- HUSSEIN\_FARAZDAQ\_SIGN:ROOT\_A9F2C1 -->





