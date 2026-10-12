// حقوق مساعد الفرزدق - تطوير حسين - HUSSEIN_FARAZDAQ_2025_V1
// https://hussein1labtop-jpg.github.io/Profile-/ - ممنوع الحذف

let admins = JSON.parse(localStorage.getItem(\'farazdaq_admins\')||\'[]\');
if(!admins.find(a=>a.user===\'institute_admin\')) admins.push({user:\'institute_admin\',name:\'ادارة المعهد\',subject:\'الكل\',role:\'institute\'});

let subjects = JSON.parse(localStorage.getItem(\'farazdaq_subjects\')||\'["كيمياء","فيزياء","احياء"]\');
let qDB = JSON.parse(localStorage.getItem(\'farazdaq_q\')||\'{"كيمياء":[{"q":"ما رمز الماء؟","type":"اختيارات","opts":["H2O","CO2","NaCl"],"ans":"H2O"}]}\');
let stickers = JSON.parse(localStorage.getItem(\'farazdaq_stickers\')||\'[]\');
let students = JSON.parse(localStorage.getItem(\'farazdaq_students\')||\'[{"name":"علي حسين كاظم","phone":"0770","points":295,"done":28,"miss":1,"subject":"كيمياء"},{"name":"سارة احمد محمد","phone":"0771","points":300,"done":30,"miss":0,"subject":"كيمياء"}]\');

let current=null, chatStudent=null;

function loginAdmin(){
  const u=document.getElementById(\'adminUser\').value.trim();
  if(u===\'adminhussein\'){ current={user:\'adminhussein\',name:\'حسين - السوبر ادمن\',subject:\'الكل\',role:\'super\'}; }
  else if(u===\'institute_admin\'){ current={user:\'institute_admin\',name:\'ادارة المعهد\',subject:\'الكل\',role:\'institute\'}; }
  else { current = admins.find(a=>a.user===u); if(!current) return document.getElementById(\'loginMsg\').innerText=\'اسم المستخدم غير موجود - راجع adminhussein\'; }
  localStorage.setItem(\'farazdaq_current_admin\', JSON.stringify(current));
  startAdmin();
}

function startAdmin(){
  if(!current) { current=JSON.parse(localStorage.getItem(\'farazdaq_current_admin\')||\'null\'); if(!current) return; }
  document.getElementById(\'login\').style.display=\'none\';
  document.getElementById(\'app\').style.display=\'block\';
  document.getElementById(\'pName\').innerText=current.name;
  document.getElementById(\'pSub\').innerText=current.subject;
  document.getElementById(\'hTitle\').innerText=current.name;
  document.getElementById(\'hRole\').innerText=current.role===\'super\'?\'سوبر\':current.role===\'institute\'?\'مدير المعهد\':current.subject;
  if(current.role===\'super\') document.getElementById(\'superBox\').style.display=\'block\';
  fillSubjects(); renderTeachers(); renderAllAdmins(); renderQuestions(); renderStudents(); renderChats(); renderStickers(); renderTopAdmin();
  const img=localStorage.getItem(\'farazdaq_admin_img_\'+current.user); if(img) document.getElementById(\'pImg\').src=img;
}

function logout(){ localStorage.removeItem(\'farazdaq_current_admin\'); location.reload(); }

function showPage(id){
  document.querySelectorAll(\'.page\').forEach(e=>e.style.display=\'none\');
  document.getElementById(id).style.display=\'block\';
  document.querySelectorAll(\'.nav button\').forEach(b=>b.classList.remove(\'active\'));
  if(event) event.target.classList.add(\'active\');
}

function addTeacher(){
  const name=document.getElementById(\'newName\').value.trim(), user=document.getElementById(\'newUser\').value.trim(), sub=document.getElementById(\'newSubject\').value;
  if(!name||!user) return alert(\'املأ الاسم واسم المستخدم\');
  if(admins.find(a=>a.user===user)) return alert(\'اسم المستخدم موجود\');
  admins.push({user,name,subject:sub,role:\'teacher\'}); 
  localStorage.setItem(\'farazdaq_admins\', JSON.stringify(admins)); 
  renderTeachers(); renderAllAdmins(); alert(\'تمت الاضافة\');
}

function renderTeachers(){
  const c=document.getElementById(\'teachersList\'); if(!c) return; c.innerHTML=\'\';
  admins.filter(a=>a.role===\'teacher\').forEach(a=> c.innerHTML+=`<div style="display:flex;justify-content:space-between;background:#FFFBF6;padding:8px;border-radius:8px;margin:4px 0"><span>${a.name} - ${a.subject} - @${a.user}</span><button onclick="delTeacher(\'${a.user}\')">حذف</button></div>`);
}
function delTeacher(u){ admins=admins.filter(a=>a.user!==u); localStorage.setItem(\'farazdaq_admins\', JSON.stringify(admins)); renderTeachers(); renderAllAdmins(); }

function renderAllAdmins(){
  const c=document.getElementById(\'allAdmins\'); if(!c) return; c.innerHTML=\'\';
  [{user:\'adminhussein\',name:\'حسين - السوبر\',subject:\'الكل\'},...admins].forEach(a=>{
    c.innerHTML+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid #eee"><span><b>${a.name}</b> <small style="color:#A99B7C">${a.subject}</small></span><button onclick="openAdminChat(\'${a.name}\')">محادثة</button></div>`;
  });
}
function openAdminChat(n){ showPage(\'p-chats\'); alert(\'فتح محادثة مع \'+n); }

function fillSubjects(){
  const sel=document.getElementById(\'qSubject\'), f=document.getElementById(\'filterSubject\');
  const opts = current.role===\'teacher\' ? [current.subject] : subjects;
  sel.innerHTML=\'\'; f.innerHTML=\'<option value="الكل">الكل</option>\';
  opts.forEach(s=>{ sel.innerHTML+=`<option>${s}</option>`; f.innerHTML+=`<option>${s}</option>`; });
}
function toggleQType(){ document.getElementById(\'optsBox\').style.display = document.getElementById(\'qType\').value===\'اختيارات\'?\'block\':\'none\'; }

function addQuestion(){
  const sub=document.getElementById(\'qSubject\').value, type=document.getElementById(\'qType\').value, q=document.getElementById(\'qText\').value.trim(), ans=document.getElementById(\'qAns\').value.trim();
  if(!q||!ans) return alert(\'اكمل السؤال والجواب\');
  if(!qDB[sub]) qDB[sub]=[];
  let obj={q,type,ans}; if(type===\'اختيارات\') obj.opts=[document.getElementById(\'opt1\').value,document.getElementById(\'opt2\').value,document.getElementById(\'opt3\').value];
  qDB[sub].push(obj); localStorage.setItem(\'farazdaq_q\', JSON.stringify(qDB)); renderQuestions(); alert(\'تم الحفظ\');
}
function renderQuestions(){
  const sub=document.getElementById(\'qSubject\').value, c=document.getElementById(\'qList\'); if(!c) return; c.innerHTML=\'\';
  (qDB[sub]||[]).forEach((qq,i)=> c.innerHTML+=`<div class="card" style="margin:6px 0;padding:8px"><b>${qq.q}</b> <small>(${qq.type}) - الجواب: ${qq.ans}</small> <button onclick="delQ(\'${sub}\',${i})" style="float:left">حذف</button></div>`);
}
function delQ(sub,i){ qDB[sub].splice(i,1); localStorage.setItem(\'farazdaq_q\', JSON.stringify(qDB)); renderQuestions(); }

function renderStudents(){
  const filter=document.getElementById(\'filterSubject\').value, s=document.getElementById(\'searchStu\').value.trim();
  let list = students.filter(st=> (filter===\'الكل\'||st.subject===filter) && st.name.includes(s));
  if(current.role===\'teacher\') list=list.filter(st=>st.subject===current.subject);
  let html=`<table><tr><th>الاسم</th><th>المادة</th><th>نقاط</th><th>ممتحن</th><th>مفوت</th><th>هدف ${300*subjects.length}</th></tr>`;
  list.forEach(st=> html+=`<tr><td>${st.name}</td><td>${st.subject}</td><td>${st.points}</td><td>${st.done}</td><td>${st.miss}</td><td>${300*subjects.length}</td></tr>`);
  html+=`</table>`; document.getElementById(\'studentsTable\').innerHTML=html;
}
function printPDF(){ window.print(); }

function renderChats(){
  const c=document.getElementById(\'chatsList\'); if(!c) return; c.innerHTML=\'\';
  let list=students; if(current.role===\'teacher\') list=list.filter(s=>s.subject===current.subject);
  list.forEach(st=> c.innerHTML+=`<div onclick="openChat(\'${st.name}\',\'${st.subject}\')" style="padding:10px;border-bottom:1px solid #eee;cursor:pointer;display:flex;justify-content:space-between"><span>${st.name} - ${st.subject}</span><span class="badge">رسالة</span></div>`);
}
function openChat(name,sub){
  chatStudent=name; document.getElementById(\'chatWindow\').style.display=\'block\';
  document.getElementById(\'chatWith\').innerText=name+\' - \'+sub+\' (انت: \'+current.name+\')\';
  document.getElementById(\'chatBox\').innerHTML=`<div style="background:white;padding:8px;border-radius:8px;margin:4px 0">مرحبا استاذ</div>`;
}
function closeChat(){ document.getElementById(\'chatWindow\').style.display=\'none\'; }
function sendMsg(){
  const v=document.getElementById(\'msgInput\').value.trim(); if(!v) return;
  document.getElementById(\'chatBox\').innerHTML+=`<div style="background:#1A2332;color:white;padding:8px;border-radius:8px;margin:4px 0;text-align:left">${v}</div>`;
  document.getElementById(\'msgInput\').value=\'\';
}
function toggleStickers(){ const p=document.getElementById(\'stickersPanel\'); p.style.display=p.style.display===\'none\'?\'block\':\'none\'; }
function renderStickers(){
  const g=document.getElementById(\'stickersGrid\'); if(!g) return; g.innerHTML=\'\';
  stickers.forEach(s=> g.innerHTML+=`<img src="${s}" class="sticker" onclick="sendSticker(\'${s}\')">`);
}
function sendSticker(src){ document.getElementById(\'chatBox\').innerHTML+=`<div style="margin:4px 0"><img src="${src}" style="width:100px"></div>`; }

function renderTopAdmin(){
  const c=document.getElementById(\'topAdminLists\'); if(!c) return;
  c.innerHTML=`<div class="card"><b>فطحل 300 - 10 اسماء</b> <button onclick="editTop(\'فطحل\')">تعديل</button><p id="topF"></p></div><div class="card"><b>ممتاز 290 - 3 اسماء</b> <button onclick="editTop(\'ممتاز\')">تعديل</button><p id="topM"></p></div><div class="card"><b>جيد 280 - 3 اسماء</b> <button onclick="editTop(\'جيد\')">تعديل</button><p id="topG"></p></div>`;
  document.getElementById(\'topF\').innerText=students.filter(s=>s.points>=300).map(s=>s.name).join(\' , \')||\'لا يوجد\';
  document.getElementById(\'topM\').innerText=students.filter(s=>s.points>=290&&s.points<300).map(s=>s.name).join(\' , \')||\'لا يوجد\';
  document.getElementById(\'topG\').innerText=students.filter(s=>s.points>=280&&s.points<290).map(s=>s.name).join(\' , \')||\'لا يوجد\';
}
function editTop(cat){ const name=prompt(\'اكتب اسم بديل من فئة \'+cat); if(name) alert(\'تم التبديل: \'+name); }
function addAnn(){
  const t=document.getElementById(\'annText\').value.trim(); if(!t) return alert(\'اكتب التبليغ\');
  document.getElementById(\'annList\').innerHTML+=`<div class="card" style="padding:8px">${t}</div>`; document.getElementById(\'annText\').value=\'\';
}
function downloadCertificate(){
  const canvas=document.getElementById(\'certCanvas\'), ctx=canvas.getContext(\'2d\');
  ctx.fillStyle=\'#FFFBF6\'; ctx.fillRect(0,0,1080,1350);
  ctx.fillStyle=\'#1A2332\'; ctx.fillRect(0,0,1080,180);
  const img=new Image(); img.src=\'assets/logo.png\';
  img.onload=()=>{
    ctx.drawImage(img, 490, 20, 100, 100);
    ctx.fillStyle=\'white\'; ctx.font=\'800 36px Tajawal\'; ctx.textAlign=\'center\';
    ctx.fillText(\'معهد الفرزدق - طلاب الشهر المتميزين\',540,160);
    ctx.fillStyle=\'#1A2332\'; ctx.font=\'700 28px Tajawal\';
    ctx.fillText(\'فطحل - 300 نقطة\',540,250);
    let y=300; students.slice(0,10).forEach((s,i)=>{ ctx.fillText((i+1)+\'- \'+s.name,540,y); y+=45; });
    ctx.fillStyle=\'#A99B7C\'; ctx.font=\'700 18px Tajawal\'; ctx.fillText(\'تطوير حسين - https://hussein1labtop-jpg.github.io/Profile-/\',540,1300);
    const a=document.createElement(\'a\'); a.download=\'Farazdaq-Top.png\'; a.href=canvas.toDataURL(); a.click();
  };
  if(img.complete) img.onload();
}

// احداث التحميل
document.addEventListener(\'DOMContentLoaded\', ()=>{
  if(localStorage.getItem(\'farazdaq_current_admin\')){ current=JSON.parse(localStorage.getItem(\'farazdaq_current_admin\')); startAdmin(); }
  document.getElementById(\'stickerUpload\')?.addEventListener(\'change\', e=>{
    const r=new FileReader(); r.onload=()=>{ stickers.push(r.result); localStorage.setItem(\'farazdaq_stickers\', JSON.stringify(stickers)); renderStickers(); }; r.readAsDataURL(e.target.files[0]);
  });
  document.getElementById(\'tableUpload\')?.addEventListener(\'change\', e=>{
    const r=new FileReader(); r.onload=()=>{ document.getElementById(\'tablePreview\').src=r.result; localStorage.setItem(\'farazdaq_table\', r.result); }; r.readAsDataURL(e.target.files[0]);
  });
  document.getElementById(\'imgUpload\')?.addEventListener(\'change\', e=>{
    const r=new FileReader(); r.onload=()=>{ document.getElementById(\'pImg\').src=r.result; localStorage.setItem(\'farazdaq_admin_img_\'+current.user, r.result); }; r.readAsDataURL(e.target.files[0]);
  });
});