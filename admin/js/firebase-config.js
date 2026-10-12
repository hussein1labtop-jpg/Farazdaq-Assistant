// مساعد الفرزدق - تطوير حسين - HUSSEIN_FARAZDAQ_2025_V1
const firebaseConfig = {
  apiKey: "AIzaSyBhUKS2s5IMmye4Sn0I-O7aioBzyrQWpy0",
  authDomain: "farazdaq-assistant.firebaseapp.com",
  projectId: "farazdaq-assistant",
  storageBucket: "farazdaq-assistant.firebasestorage.app",
  messagingSenderId: "363708393229",
  appId: "1:363708393229:web:a003cac6aa581850f17244"
};

// تشغيل الفايربيس
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();