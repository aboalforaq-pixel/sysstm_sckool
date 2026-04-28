// ============= تهيئة Firebase =============
const firebaseConfig = {
  apiKey: "AIzaSyBc4i8zLNwMyAlshXC-Om-cxd-ko04fHYg",
  authDomain: "school590-8a19b.firebaseapp.com",
  projectId: "school590-8a19b",
  storageBucket: "school590-8a19b.firebasestorage.app",
  messagingSenderId: "128290165412",
  appId: "1:128290165412:web:87d0405c87de7c885bcc31",
  measurementId: "G-909KGVXXPZ"
};

// تهيئة التطبيق
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics();

// تفعيل Offline Persistence
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log("⚠️ التطبيق مفتوح في عدة تبويبات");
    } else if (err.code === 'unimplemented') {
      console.log("⚠️ المتصفح لا يدعم Offline Persistence");
    }
  });

console.log("✅ Firebase متصل بنجاح!");


// في ملف منفصل أو عند التثبيت الأول
async function initializeDatabase() {
  try {
    // إنشاء مدرسة افتراضية
    await db.collection('schools').doc('SCHOOL_001').set({
      name: 'مدرسة الفاخر النموذجية',
      admin_username: 'admin',
      admin_password_hash: simpleHash('123456'), // كلمة المرور الافتراضية
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ تم إنشاء قاعدة البيانات');
    alert('✅ تم إعداد النظام بنجاح!\nاسم المستخدم: admin\nكلمة المرور: 123456');
    
  } catch (error) {
    console.error('خطأ في إعداد قاعدة البيانات:', error);
  }
}

// تشغيل التهيئة عند الضغط على زر "تهيئة النظام" في الإعدادات
window.initializeDatabase = initializeDatabase;

// في الاعدادات.js
async function updatePassword() {
  const currentPassword = document.getElementById('currentPasswordInput').value;
  const newPassword = document.getElementById('newPasswordInput').value;
  const confirmPassword = document.getElementById('confirmPasswordInput').value;
  
  // التحقق من الحقول...
  // [كود التحقق الموجود لديك]
  
  // تحديث كلمة المرور في Firebase
  if (currentUser.type === 'admin') {
    await db.collection('schools').doc(currentSchoolId).update({
      admin_password_hash: simpleHash(newPassword)
    });
  } else if (currentUser.type === 'teacher') {
    await db.collection('teachers').doc(currentUser.id).update({
      password_hash: simpleHash(newPassword)
    });
  }
  
  // تحديث كلمة المرور المحلية
  systemSettings.password = newPassword;
  saveToStorage('systemSettings', systemSettings);
  
  alert('✅ تم تغيير كلمة المرور بنجاح');
}
// ============= متغيرات الجلسة =============
let currentUser = null;
let currentSchoolId = "SCHOOL_001"; // يمكنك تغيير هذا حسب الحاجة

