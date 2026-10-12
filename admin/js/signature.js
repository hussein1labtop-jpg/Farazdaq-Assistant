// حقوق مساعد الفرزدق - تطوير حسين - HUSSEIN_FARAZDAQ_2025_V1
const DEVELOPER_URL = "https://hussein1labtop-jpg.github.io/Profile-/";
function verifySignature(){
  const el = document.getElementById('developer-sign');
  if(!el) return;
  if(el.href !== DEVELOPER_URL && !el.href.includes("hussein1labtop")){
    document.body.innerHTML = "<div style='text-align:center;padding:60px;font-family:Tajawal'><h1>التطبيق محمي بحقوق المطور</h1><p>تطوير حسين - مساعد الفرزدق</p><a href='"+DEVELOPER_URL+"' style='color:#1A2332;font-weight:bold'>التواصل مع المطور</a></div>";
    throw new Error("Signature failed");
  }
}
setInterval(verifySignature, 2000);
document.addEventListener("DOMContentLoaded", verifySignature);