// utils.js - النواة الأساسية للنظام

const classes = [
  'الصف الأول ابتدائي', 'الصف الثاني ابتدائي', 'الصف الثالث ابتدائي',
  'الصف الأول متوسط', 'الصف الثاني متوسط', 'الصف الثالث متوسط',
  'الصف الأول ثانوي', 'الصف الثاني ثانوي', 'الصف الثالث ثانوي'
];

// === التخزين الآمن ===
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("فشل الحفظ:", e);
  }
}

function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn("فشل التحميل:", e);
    return null;
  }
}

// === نظام تتبع الصفحات (History Stack) ===
if (!window.pageHistory) {
  window.pageHistory = ['loginPage'];
}

// === إخفاء جميع الصفحات ===
function hideAllPages() {
  document.querySelectorAll('.box').forEach(box => {
    box.classList.remove('active');
    box.style.display = 'none';
  });
}





// === إظهار صفحة معينة ===
function showPage(pageId) {
  hideAllPages();
  
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    page.style.display = 'block';
    console.log("✅ عرض الصفحة:", pageId);
  } else {
    console.error("❌ الصفحة غير موجودة:", pageId);
  }
}

// === التنقل بين الصفحات ===
function navigateTo(fromPage, toPage) {
  // تجنب التكرار المتتالي لنفس الصفحة
  if (window.pageHistory[window.pageHistory.length - 1] !== toPage) {
    window.pageHistory.push(toPage);
  }
  
  // إخفاء الصفحة الحالية
  const fromElement = document.getElementById(fromPage);
  if (fromElement) {
    fromElement.classList.remove('active');
    fromElement.style.display = 'none';
  }
  
  // إظهار الصفحة الجديدة
  const toElement = document.getElementById(toPage);
  if (toElement) {
    toElement.classList.add('active');
    toElement.style.display = 'block';
    console.log("🔄 انتقل من", fromPage, "إلى", toPage, "| السجل:", [...window.pageHistory]);
  } else {
    console.error("❌ الصفحة غير موجودة:", toPage);
  }
}

// === دالة الرجوع خطوة واحدة فقط ===
function goBack() {
  try {
    // التحقق: إذا كنا في صفحة المعلم، سجل الخروج أولاً
    const currentPage = window.pageHistory[window.pageHistory.length - 1];
    if (currentPage === 'teacherDashboardPage' || currentPage === 'teacherStudentsPage') {
      // تسجيل الخروج
      localStorage.removeItem('currentUser');
      console.log("🚪 تم تسجيل الخروج تلقائياً");
    }
    
    // إذا كان هناك صفحة سابقة في السجل (أكثر من صفحة واحدة)
    if (window.pageHistory.length > 1) {
      // إزالة الصفحة الحالية من السجل
      window.pageHistory.pop();
      
      // الحصول على الصفحة السابقة
      const previousPageId = window.pageHistory[window.pageHistory.length - 1];
      
      // إخفاء جميع الصفحات
      hideAllPages();
      
      // إظهار الصفحة السابقة
      const previousPage = document.getElementById(previousPageId);
      if (previousPage) {
        previousPage.classList.add('active');
        previousPage.style.display = 'block';
        
        // تحديث البيانات إذا لزم الأمر
        if (previousPageId === 'teachersByClassPage') {
          if (typeof renderTeachersByClass === 'function') {
            renderTeachersByClass();
          }
        } else if (previousPageId === 'salariesPage') {
          if (typeof renderSalariesMonthsList === 'function') {
            renderSalariesMonthsList();
          }
          // إخفاء تفاصيل الشهر إذا كانت ظاهرة
          const monthDetails = document.getElementById('salariesMonthTableContainer');
          if (monthDetails) monthDetails.style.display = 'none';
        } else if (previousPageId === 'deletedTeachersPage') {
          if (typeof renderDeletedTeachersTable === 'function') {
            renderDeletedTeachersTable();
          }
        } else if (previousPageId === 'deletedStudentsPage') {
          if (typeof renderDeletedStudentsTable === 'function') {
            renderDeletedStudentsTable();
          }
        }
        
        console.log("✅ رجع إلى:", previousPageId, "| السجل المتبقي:", [...window.pageHistory]);
      } else {
        console.error("❌ الصفحة السابقة غير موجودة:", previousPageId);
        alert("خطأ: الصفحة غير موجودة!");
      }
    }
    // إذا لم تكن هناك صفحة سابقة، العودة لصفحة الدخول
    else {
      hideAllPages();
      document.getElementById('loginPage').classList.add('active');
      document.getElementById('loginPage').style.display = 'block';
      window.pageHistory.length = 0;
      window.pageHistory.push('loginPage');
    }
  } catch (error) {
    console.error("❌ خطأ في دالة الرجوع:", error);
    alert("حدث خطأ في الرجوع: " + error.message);
    
    // حل احتياطي: العودة لصفحة الدخول
    hideAllPages();
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('loginPage').style.display = 'block';
    window.pageHistory.length = 0;
    window.pageHistory.push('loginPage');
  }
}

// === السندات والطباعة ===
function closeReceiptStudent() {
  showPage(window.receiptReturnPage || 'feesClassSelectPage');
  delete window.receiptReturnPage;
  delete window.receiptStudentClass;
  delete window.receiptStudentName;
}

function printAndReturn() {
  window.print();
  setTimeout(() => closeReceiptStudent(), 500);
}

// === المودالات ===
function closeStudentModal() {
  const modal = document.getElementById('studentModal');
  if (modal) modal.style.display = 'none';
}

function closeTeacherModal() {
  const modal = document.getElementById('teacherModal');
  if (modal) modal.style.display = 'none';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) modal.style.display = 'none';
}

// === عرض الصور ===
function openImageModal(dataUrl, label) {
  const imgEl = document.getElementById('modalImageView');
  const labelEl = document.getElementById('modalImageLabel');
  const modalEl = document.getElementById('imageModal');
  
  if (!imgEl || !labelEl || !modalEl) {
    console.error("❌ عناصر المودال غير موجودة!");
    return;
  }
  
  imgEl.src = dataUrl;
  labelEl.innerText = label || 'الصورة';
  modalEl.style.display = 'flex';

  const img = document.getElementById('modalImageView');
  img.style.transform = 'scale(1)';
  img.style.transition = 'transform 0.3s ease';

  img.onmouseenter = () => img.style.transform = 'scale(1.05)';
  img.onmouseleave = () => img.style.transform = 'scale(1)';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
    closeStudentModal();
    closeTeacherModal();
  }
});

// === تشغيل أولي ===
document.addEventListener('DOMContentLoaded', () => {
  showPage('loginPage');
});

// === إتاحة الدوال عالميًا ===
window.navigateTo = navigateTo;
window.goBack = goBack;
window.showPage = showPage;
window.hideAllPages = hideAllPages;
window.closeStudentModal = closeStudentModal;
window.closeTeacherModal = closeTeacherModal;
window.closeImageModal = closeImageModal;
window.openImageModal = openImageModal;
window.saveToStorage = saveToStorage;
window.loadFromStorage = loadFromStorage;
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('❌ فشل حفظ البيانات:', e);
    }
}

// === نسخ احتياطي كامل ===
function backupSystem() {
  const backup = {
    teachers: teachers,
    students: students,
    salariesMonths: salariesMonths,
    deductionsAndBonuses: deductionsAndBonuses,
    deletedTeachers: deletedTeachers,
    deletedStudents: deletedStudents,
    backupDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(backup)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-school-${new Date().toLocaleDateString('ar-EG')}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
  
  alert('✅ تم حفظ النسخة الاحتياطية بنجاح!');
}

