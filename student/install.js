/* © 2026 HUSSEIN MHMOOD — معهد الفرزدق [FZ-HM-2026] — تثبيت التطبيق (أندرويد + آيفون) */
const UA = navigator.userAgent || '';
const IOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const ANDROID = /Android/i.test(UA);
const IOS_OTHER = IOS && /CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(UA);
const INAPP = /FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|TikTok|musical_ly|MicroMessenger|Telegram|WhatsApp|; wv\)|Twitter/i.test(UA);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* empty */ } },
  sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch { /* empty */ } },
};

let evt = window.__fzInstall || null;
addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); evt = e; window.__fzInstall = e; refresh(); });
addEventListener('fz-install-ready', () => { evt = window.__fzInstall; refresh(); });
addEventListener('appinstalled', () => { store.set('fz_installed', '1'); evt = null; closeSheet(); removePill(); document.querySelectorAll('[data-install-card]').forEach((c) => c.remove()); });

export function isInstalled() {
  return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches ||
    matchMedia('(display-mode: minimal-ui)').matches || navigator.standalone === true || store.get('fz_installed') === '1';
}
const isMobile = () => IOS || ANDROID || matchMedia('(pointer: coarse)').matches;
export const canPrompt = () => !!evt;

const SHARE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-5px"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
const DOTS = '<b style="font-size:20px">⋮</b>';
const step = (n, h) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:10px 0"><span style="flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent,#f5b82e);color:#1a1a1a;font-weight:700;display:grid;place-items:center">${n}</span><div style="line-height:1.7">${h}</div></div>`;

function guideHTML() {
  if (INAPP) {
    return `<p class="modal-text">أنت فاتح الرابط من داخل تطبيق (تلكرام / انستا / واتساب...) والتثبيت لا يشتغل من هنا.</p>
      ${step(1, 'اضغط على <b>⋮</b> أو زر المشاركة في الأعلى')}
      ${step(2, 'اختر <b>«فتح في المتصفح»</b> (Chrome أو Safari)')}
      ${step(3, 'ارجع واضغط تثبيت')}
      <div class="modal-actions" style="flex-wrap:wrap">${ANDROID ? '<button class="btn" id="fzChrome">فتح في Chrome</button>' : ''}<button class="btn ghost" id="fzCopy">نسخ الرابط</button></div>`;
  }
  if (IOS) {
    return `${IOS_OTHER ? '<p class="modal-text" style="color:var(--warn,#e0a030)">⚠️ الأفضل تفتح الرابط بمتصفح <b>Safari</b> حتى يتثبت بشكل صحيح.</p>' : ''}
      ${step(1, `اضغط زر المشاركة ${SHARE} ${IOS_OTHER ? 'في شريط المتصفح' : 'أسفل الشاشة'}`)}
      ${step(2, 'مرّر للأسفل واختر <b>«إضافة إلى الشاشة الرئيسية»</b> ➕')}
      ${step(3, 'اضغط <b>«إضافة»</b> — يظهر التطبيق بين تطبيقاتك 🎉')}
      <div class="modal-actions">${IOS_OTHER ? '<button class="btn ghost" id="fzCopy">نسخ الرابط لفتحه في Safari</button>' : ''}</div>`;
  }
  return `<p class="modal-text">اتبع هذه الخطوات:</p>
    ${step(1, `اضغط على قائمة المتصفح ${DOTS} (أعلى الشاشة)`)}
    ${step(2, 'اختر <b>«تثبيت التطبيق»</b> أو <b>«إضافة إلى الشاشة الرئيسية»</b>')}
    ${step(3, 'اضغط <b>«تثبيت»</b>')}
    <p class="muted" style="font-size:13px">إذا ما ظهر الخيار جرّب فتح الرابط بمتصفح Chrome.</p>`;
}

function closeSheet() { const el = document.getElementById('fzInstallSheet'); if (el) el.remove(); }

export function openInstallSheet() {
  if (isInstalled() && !document.getElementById('fzInstallSheet')) return;
  closeSheet();
  const back = document.createElement('div');
  back.className = 'modal-back'; back.id = 'fzInstallSheet'; back.style.zIndex = 140;
  const direct = !!evt && !INAPP;
  back.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
    <div style="text-align:center"><img src="logo.png" alt="" style="width:64px;height:64px;border-radius:16px;margin-bottom:6px">
    <h2 class="modal-title" style="margin:0 0 4px">ثبّت «مساعد الفرزدق» 📲</h2>
    <p class="muted" style="margin:0 0 10px">يفتح مثل أي تطبيق من شاشتك الرئيسية، أسرع وبدون شريط المتصفح.</p></div>
    ${direct ? '<div class="modal-actions"><button class="btn" id="fzGo" style="font-size:18px;padding:14px">تثبيت الآن ✅</button></div>' : guideHTML()}
    <div style="display:flex;justify-content:center;gap:18px;margin-top:14px">
      <button class="link-btn" id="fzLater">لاحقاً</button><button class="link-btn" id="fzDone">ثبّتّه من قبل</button></div></div>`;
  document.body.appendChild(back);
  const later = () => { store.sset('fz_inst_dismiss', '1'); closeSheet(); showPill(); };
  back.onclick = (e) => { if (e.target === back) later(); };
  back.querySelector('#fzLater').onclick = later;
  back.querySelector('#fzDone').onclick = () => { store.set('fz_installed', '1'); closeSheet(); removePill(); document.querySelectorAll('[data-install-card]').forEach((c) => c.remove()); };
  const go = back.querySelector('#fzGo'); if (go) go.onclick = promptInstall;
  const cp = back.querySelector('#fzCopy'); if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText(location.href); cp.textContent = 'تم النسخ ✓'; } catch { prompt('انسخ الرابط:', location.href); } };
  const ch = back.querySelector('#fzChrome'); if (ch) ch.onclick = () => { location.href = `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;end`; };
}

async function promptInstall() {
  if (!evt) return openInstallSheet();
  const e = evt; evt = null; window.__fzInstall = null;
  try {
    e.prompt();
    const r = await e.userChoice;
    if (r && r.outcome === 'accepted') { store.set('fz_installed', '1'); closeSheet(); removePill(); return; }
  } catch { /* empty */ }
  closeSheet(); showPill();
}

/** زر التثبيت (من البطاقة أو الشريط): تثبيت مباشر على أندرويد، وإلا يفتح الشرح */
export function installNow() { if (evt && !INAPP) promptInstall(); else openInstallSheet(); }

/* شريط صغير ثابت يبقى بعد «لاحقاً» حتى لا يضيع الزر */
function showPill() {
  if (isInstalled() || document.getElementById('fzPill')) return;
  const p = document.createElement('button');
  p.id = 'fzPill'; p.textContent = '📲 ثبّت التطبيق';
  p.style.cssText = 'position:fixed;z-index:90;left:50%;transform:translateX(-50%);bottom:calc(76px + env(safe-area-inset-bottom,0px));padding:10px 18px;border:0;border-radius:99px;background:var(--accent,#f5b82e);color:#1a1a1a;font:600 15px inherit;font-family:inherit;box-shadow:0 6px 20px rgba(0,0,0,.35);cursor:pointer';
  p.onclick = installNow;
  document.body.appendChild(p);
}
function removePill() { const p = document.getElementById('fzPill'); if (p) p.remove(); }
function refresh() { const g = document.getElementById('fzGo'); if (!g && document.getElementById('fzInstallSheet') && evt) openInstallSheet(); document.querySelectorAll('[data-install-card] .fz-dir').forEach((b) => { b.hidden = !evt; }); }

/** بطاقة داخل الصفحة الشخصية (تبقى دائماً ما دام غير مثبّت) */
export function installCardHTML() {
  if (isInstalled()) return '';
  return `<div class="card" data-install-card style="margin-top:18px;text-align:center"><b>ثبّت التطبيق على هاتفك 📲</b>
    <p class="muted" style="margin:6px 0 10px;font-size:14px">يفتح من شاشتك الرئيسية مثل أي تطبيق.</p>
    <button class="btn small" data-install-btn>تثبيت التطبيق</button></div>`;
}
export function bindInstallCard(root = document) { root.querySelectorAll('[data-install-btn]').forEach((b) => { b.onclick = installNow; }); }

/** يُستدعى عند فتح الرابط: نافذة تثبيت تلقائية (مرة بكل زيارة) على الموبايل */
export function startInstallPrompt() {
  if (isInstalled() || !isMobile()) return;
  let tries = 0;
  const tick = () => {
    if (isInstalled()) return;
    if (store.sget('fz_inst_dismiss') === '1') return showPill();
    if (document.querySelector('.modal-back') && tries++ < 15) return setTimeout(tick, 1500);
    store.sset('fz_inst_shown', '1');
    openInstallSheet();
  };
  setTimeout(tick, 1400);
}
