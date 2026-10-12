let currentUser = JSON.parse(localStorage.getItem('farazdaq_user')||'null');
let subjects = JSON.parse(localStorage.getItem('farazdaq_subjects')||'["كيمياء","فيزياء","احياء"]');
let questionsDB = JSON.parse(localStorage.getItem('farazdaq_q')||'{"كيمياء":[{"q":"ما رمز الماء؟","type":"اختيارات","opts":["H2O","CO2","NaCl"],"ans":"H2O"},{"q":"عدد عناصر الجدول الدوري؟","type":"فراغ","ans":"118"}],"فيزياء":[{"q":"وحدة القوة؟","type":"اختيارات","opts":["نيوتن","جول","واط"],"ans":"نيوتن"}],"احياء":[{"q":"كم عدد حجرات القلب؟","type":"فراغ","ans":"4"}]}');

function login(){
  const n=document.getElementById('sName').value.trim();
  const p=document.getElementById('sPhone').value.trim();
  if(n.split(' ').length<3) return alert('اكتب الاسم الثلاثي كامل');
  if(!p) return alert('اكتب رقم الموبايل');
  currentUser={name:n, phone:p, points:0, done:0, miss:0, img:''};
  localStorage.setItem('farazdaq_user', JSON.stringify(currentUser));
  startApp();
}
function startApp(){
  if(!currentUser) return;
  document.getElementById('login').style.display='none';
  document.getElementById('app').style.display='block';
  document.getElementById('pName').innerText=currentUser.name;
  document.getElementById('pPoints').innerText=currentUser.points;
  document.getElementById('pTarget').innerText= 300 * subjects.length;
  document.getElementById('pDone').innerText=currentUser.done||0;
  document.getElementById('pMiss').innerText=currentUser.miss||0;
  if(currentUser.img) document.getElementById('pImg').src=currentUser.img;
  const t=localStorage.getItem('farazdaq_table'); if(t) document.getElementById('tableImg').src=t;
  renderSubjects(); renderTop();
}
function showPage(id){
  document.querySelectorAll('.page').forEach(e=>e.style.display='none');
  document.getElementById(id).style.display='block';
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
}
function renderSubjects(){
  const c=document.getElementById('subjectsList'); if(!c) return; c.innerHTML='';
  subjects.forEach(s=>{
    c.innerHTML+=`<div class="exam-option" onclick="startExam('${s}')">${s} <span style='float:left;color:#A99B7C'>امتحان اليوم - 10 نقاط</span></div><button onclick="openChat('${s}')" style="font-size:12px;margin:5px 0 12px 0">محادثة ادارة ${s} <span id="notif-${s}" style="display:none;color:red">●</span></button>`;
  });
}
let examQueue=[], examScore=0, attempts={};
function startExam(sub){
  const qs = questionsDB[sub] || [];
  if(qs.length==0) return alert('لا توجد اسئلة لهذه المادة بعد');
  examQueue = [...qs].sort(()=>0.5-Math.random()).slice(0,10);
  examScore=0; attempts={};
  document.getElementById('examBox').style.display='block';
  nextQ(sub);
}
function nextQ(sub){
  if(examScore>=10 || examQueue.length==0){
    alert('انتهى امتحانك - نقاطك: '+examScore);
    currentUser.points+=examScore; currentUser.done=(currentUser.done||0)+1;
    localStorage.setItem('farazdaq_user', JSON.stringify(currentUser));
    document.getElementById('pPoints').innerText=currentUser.points;
    document.getElementById('pDone').innerText=currentUser.done;
    document.getElementById('examBox').style.display='none';
    return;
  }
  const q=examQueue[0];
  document.getElementById('qText').innerText=q.q;
  const o=document.getElementById('qOptions'); o.innerHTML='';
  if(q.type==='اختيارات'){
    q.opts.forEach(opt=>{
      o.innerHTML+=`<div class="exam-option" onclick="answer('${opt}','${q.ans}','${sub}')">${opt}</div>`;
    });
  } else {
    o.innerHTML=`<input id="ansInput" placeholder="اكتب جوابك" style="width:100%;padding:10px;border-radius:8px;border:1px solid #ddd"><button class="btn" style="margin-top:8px" onclick="answer(document.getElementById('ansInput').value,'${q.ans}','${sub}')">ارسال</button>`;
  }
}
function answer(given, correct, sub){
  const q=examQueue.shift();
  if(given.trim()===correct.trim()){
    examScore++;
  } else {
    attempts[q.q]=(attempts[q.q]||0)+1;
    if(attempts[q.q]<2) examQueue.push(q);
  }
  nextQ(sub);
}
function openChat(sub){ alert('محادثة ادارة '+sub+' - سيتم حذف المحادثة بعد 48 ساعة'); }
function renderTop(){
  const el=document.getElementById('topList'); if(!el) return;
  el.innerHTML=`<p><b>فطحل 300 نقطة:</b> 10 اسماء حسب الاسبقية والدقة</p><p><b>ممتاز 290:</b> 3 اسماء</p><p><b>جيد 280:</b> 3 اسماء</p><p style="font-size:11px;color:#888">النتائج تبقى معروضة طول الشهر القادم</p>`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  if(currentUser) startApp();
  document.getElementById('imgUpload')?.addEventListener('change', e=>{
    const r=new FileReader(); r.onload=()=>{document.getElementById('pImg').src=r.result; currentUser.img=r.result; localStorage.setItem('farazdaq_user', JSON.stringify(currentUser))}; r.readAsDataURL(e.target.files[0]);
  });
});