// === متغيرات النظام ===
let systemSettings = loadFromStorage('systemSettings') || {
  schoolName: 'مدرسة الفاخر النموذجية',
  username: 'admin',
  password: '123456'
};

// === فتح صفحة الإعدادات ===
function openSettingsPage() {
  navigateTo("menuPage", "settingsPage");
  
  // عرض القيم الحالية
  document.getElementById('currentSchoolNameDisplay').textContent = systemSettings.schoolName;
  document.getElementById('currentUsernameDisplay').textContent = systemSettings.username;
  
  // مسح الحقول
  document.getElementById('schoolNameInput').value = '';
  document.getElementById('newUsernameInput').value = '';
  document.getElementById('currentPasswordInput').value = '';
  document.getElementById('newPasswordInput').value = '';
  document.getElementById('confirmPasswordInput').value = '';
}

// === تحديث اسم المدرسة ===
function updateSchoolName() {
  const newSchoolName = document.getElementById('schoolNameInput').value.trim();
  
  if (!newSchoolName) {
    showAlert('⚠️ تنبيه', 'يرجى إدخال اسم المدرسة الجديد!', 'warning');
    return;
  }
  
  if (newSchoolName === systemSettings.schoolName) {
    showAlert('ℹ️ معلومة', 'اسم المدرسة الحالي هو نفسه!', 'info');
    return;
  }
  
  if (!confirm(`هل أنت متأكد من تغيير اسم المدرسة من:\n"${systemSettings.schoolName}"\n\nإلى:\n"${newSchoolName}"؟`)) return;
  
  // تحديث اسم المدرسة في الإعدادات
  const oldName = systemSettings.schoolName;
  systemSettings.schoolName = newSchoolName;
  saveToStorage('systemSettings', systemSettings);
  
  // تحديث العرض
  document.getElementById('currentSchoolNameDisplay').textContent = newSchoolName;
  document.getElementById('schoolNameInput').value = '';
  
  // تحديث اسم المدرسة في جميع الصفحات
  updateSchoolNameInAllPages(newSchoolName);
  
  showAlert('✅ نجاح', `تم تغيير اسم المدرسة من "${oldName}" إلى "${newSchoolName}" بنجاح!`, 'success');
}

// === تحديث اسم المدرسة في جميع الصفحات ===
function updateSchoolNameInAllPages(newName) {
  // تحديث في سند الرسوم
  const receiptElements = document.querySelectorAll('#receiptStudentPage p, #receiptStudentPage h2');
  receiptElements.forEach(el => {
    if (el.textContent.includes('مدرسة')) {
      el.innerHTML = el.innerHTML.replace(/مدرسة\s+[^\n<]+/g, `مدرسة ${newName}`);
    }
  });
  
  // تحديث في سند الرواتب
  const salaryReceiptElements = document.querySelectorAll('#salaryReceiptPage p, #salaryReceiptPage h2');
  salaryReceiptElements.forEach(el => {
    if (el.textContent.includes('مدرسة')) {
      el.innerHTML = el.innerHTML.replace(/مدرسة\s+[^\n<]+/g, `مدرسة ${newName}`);
    }
  });
}

// === تحديث اسم المستخدم ===
function updateUsername() {
  const newUsername = document.getElementById('newUsernameInput').value.trim();
  
  if (!newUsername) {
    showAlert('⚠️ تنبيه', 'يرجى إدخال اسم المستخدم الجديد!', 'warning');
    return;
  }
  
  if (newUsername === systemSettings.username) {
    showAlert('ℹ️ معلومة', 'اسم المستخدم الحالي هو نفسه!', 'info');
    return;
  }
  
  if (newUsername.length < 3) {
    showAlert('⚠️ تنبيه', 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل!', 'warning');
    return;
  }
  
  if (!confirm(`هل أنت متأكد من تغيير اسم المستخدم من:\n"${systemSettings.username}"\n\nإلى:\n"${newUsername}"؟`)) return;
  
  const oldUsername = systemSettings.username;
  systemSettings.username = newUsername;
  saveToStorage('systemSettings', systemSettings);
  
  // تحديث العرض
  document.getElementById('currentUsernameDisplay').textContent = newUsername;
  document.getElementById('newUsernameInput').value = '';
  
  showAlert('✅ نجاح', `تم تغيير اسم المستخدم من "${oldUsername}" إلى "${newUsername}" بنجاح!`, 'success');
}

// === تحديث كلمة المرور ===
function updatePassword() {
  const currentPassword = document.getElementById('currentPasswordInput').value;
  const newPassword = document.getElementById('newPasswordInput').value;
  const confirmPassword = document.getElementById('confirmPasswordInput').value;
  
  // التحقق من الحقول
  if (!currentPassword || !newPassword || !confirmPassword) {
    showAlert('⚠️ تنبيه', 'يرجى تعبئة جميع حقول كلمة المرور!', 'warning');
    return;
  }
  
  // التحقق من كلمة المرور الحالية
  if (currentPassword !== systemSettings.password) {
    showAlert('❌ خطأ', 'كلمة المرور الحالية غير صحيحة!', 'error');
    return;
  }
  
  // التحقق من تطابق كلمتي المرور الجديدتين
  if (newPassword !== confirmPassword) {
    showAlert('❌ خطأ', 'كلمتا المرور الجديدتان غير متطابقتين!', 'error');
    return;
  }
  
  // التحقق من طول كلمة المرور
  if (newPassword.length < 6) {
    showAlert('⚠️ تنبيه', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل!', 'warning');
    return;
  }
  
  if (!confirm("هل أنت متأكد من تغيير كلمة المرور؟\n⚠️ تأكد من حفظ كلمة المرور الجديدة!")) return;
  
  const oldPassword = systemSettings.password;
  systemSettings.password = newPassword;
  saveToStorage('systemSettings', systemSettings);
  
  // مسح الحقول
  document.getElementById('currentPasswordInput').value = '';
  document.getElementById('newPasswordInput').value = '';
  document.getElementById('confirmPasswordInput').value = '';
  
  showAlert('✅ نجاح', 'تم تغيير كلمة المرور بنجاح!\nيرجى تسجيل الدخول مرة أخرى بكلمة المرور الجديدة.', 'success');
}

// === دالة تسجيل الدخول المحدثة (تدعم المدير والمعلمين) ===
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('⚠️ تنبيه', 'يرجى إدخال اسم المستخدم وكلمة المرور!', 'warning');
        return;
    }
    
    // تحميل الإعدادات والمعلمين
    systemSettings = loadFromStorage('systemSettings') || {
        schoolName: 'مدرسة الفاخر النموذجية',
        username: 'admin',
        password: '123456'
    };
    
    const teachers = loadFromStorage('teachers') || [];
    
    // ============= التحقق من المدير =============
    if (username === systemSettings.username && password === systemSettings.password) {
        // حفظ المستخدم الحالي
        const currentUser = {
            type: 'admin',
            username: username
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        navigateTo("loginPage", "menuPage");
        showAlert('✅ نجاح', 'مرحباً يا مدير المدرسة!', 'success');
        return;
    }
    
    // ============= التحقق من المعلمين =============
    const teacher = teachers.find(t => t.username === username && t.password === password);
    
    if (teacher) {
        // حفظ المستخدم الحالي
        const currentUser = {
            type: 'teacher',
            id: teacher.id,
            username: teacher.username,
            fullName: teacher.fullName,
            classesSubjects: teacher.classesSubjects || []
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // التأكد من وجود صفحة المعلم
        if (!document.getElementById('teacherDashboardPage')) {
            alert('❌ خطأ: صفحة المعلم غير موجودة في النظام!\nيرجى إضافة صفحات المعلم أولاً.');
            return;
        }
        
        // إخفاء صفحة الدخول وإظهار صفحة المعلم
        navigateTo("loginPage", "teacherDashboardPage");
        
        // عرض اسم المعلم
        const nameDisplay = document.getElementById('teacherFullNameDisplay');
        if (nameDisplay) {
            nameDisplay.textContent = teacher.fullName;
        }
        
        // تحميل صفوف المعلم
        renderTeacherClasses();
        
        showAlert('✅ نجاح', `مرحباً ${teacher.fullName}!`, 'success');
        return;
    }
    
    // ============= إذا فشل التحقق =============
    showAlert('❌ خطأ', 'اسم المستخدم أو كلمة المرور غير صحيحة!', 'error');
}

// === فتح صفحة إعدادات المدرسة ===
function openSchoolSettings() {
    navigateTo("settingsPage", "schoolSettingsPage");
    
    // تحميل القيم الحالية
    const settings = systemSettings || {
        schoolName: 'مدرسة الفاخر النموذجية',
        username: 'admin',
        password: '123456'
    };
    
    document.getElementById('currentSchoolNameDisplay').textContent = settings.schoolName;
    document.getElementById('currentUsernameDisplay').textContent = settings.username;
    
    // مسح الحقول
    document.getElementById('schoolNameInput').value = '';
    document.getElementById('newUsernameInput').value = '';
    document.getElementById('currentPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('confirmPasswordInput').value = '';
}

// === فتح صفحة الصور والخلفيات ===
function openImagesSettings() {
    navigateTo("settingsPage", "imagesSettingsPage");
    loadSavedImages();
}

// === فتح صفحة إعدادات ولي الأمر ===
function openParentSettings() {
    navigateTo("settingsPage", "parentSettingsPage");
    
    // تحميل بيانات ولي الأمر إذا كانت موجودة
    const parentData = loadFromStorage('parentCredentials') || {};
    document.getElementById('parentUsername').value = parentData.username || '';
    document.getElementById('parentPassword').value = parentData.password || '';
}

// === معاينة الصورة ===
function previewImage(input) {
    const previewContainer = document.getElementById('imagePreviewContainer');
    const preview = document.getElementById('imagePreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            previewContainer.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    } else {
        previewContainer.style.display = 'none';
    }
}

// === حفظ الصورة ===
function saveImage() {
    const fileInput = document.getElementById('imageUploadInput');
    const description = document.getElementById('imageDescription').value.trim();
    
    if (!fileInput.files || fileInput.files.length === 0) {
        showAlert('⚠️ تنبيه', 'يرجى اختيار صورة!', 'warning');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = {
            url: e.target.result,
            description: description,
            date: new Date().toISOString()
        };
        
        // تحميل الصور المحفوظة
        let savedImages = loadFromStorage('savedImages') || [];
        savedImages.push(imageData);
        saveToStorage('savedImages', savedImages);
        
        showAlert('✅ نجاح', 'تم حفظ الصورة بنجاح!', 'success');
        
        // إعادة تحميل الصور
        loadSavedImages();
        
        // مسح الحقول
        fileInput.value = '';
        document.getElementById('imageDescription').value = '';
        document.getElementById('imagePreviewContainer').style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

// === تحميل الصور المحفوظة ===
function loadSavedImages() {
    const container = document.getElementById('savedImagesContainer');
    const savedImages = loadFromStorage('savedImages') || [];
    
    if (savedImages.length === 0) {
        container.innerHTML = '<p style="color: #aaa; text-align: center; padding: 20px;">لا توجد صور محفوظة</p>';
        return;
    }
    
    container.innerHTML = savedImages.map((img, index) => `
        <div style="position: relative; border-radius: 10px; overflow: hidden; border: 2px solid #00eaff; box-shadow: 0 4px 15px rgba(0, 234, 255, 0.3);">
            <img src="${img.url}" alt="صورة ${index + 1}" 
                style="width: 100%; height: 150px; object-fit: cover; cursor: pointer;"
                onclick="viewFullImage('${img.url}', '${img.description || ''}')"
            />
            ${img.description ? `<div style="padding: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 12px; text-align: center;">${img.description}</div>` : ''}
            <button onclick="deleteImage(${index})" 
                style="position: absolute; top: 5px; left: 5px; background: #ff3366; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
                ×
            </button>
        </div>
    `).join('');
}

// === عرض الصورة كاملة ===
function viewFullImage(url, description) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;
    
    modal.innerHTML = `
        <button onclick="this.parentElement.remove()" 
            style="position: absolute; top: 20px; left: 20px; background: #ff3366; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 30px; cursor: pointer; font-weight: bold;">
            ×
        </button>
        <img src="${url}" style="max-width: 90%; max-height: 80%; border-radius: 15px; box-shadow: 0 0 30px rgba(0, 234, 255, 0.5);" />
        ${description ? `<p style="color: #fff; margin-top: 20px; font-size: 18px; text-align: center;">${description}</p>` : ''}
    `;
    
    document.body.appendChild(modal);
}

// === حذف صورة ===
function deleteImage(index) {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    
    let savedImages = loadFromStorage('savedImages') || [];
    savedImages.splice(index, 1);
    saveToStorage('savedImages', savedImages);
    
    loadSavedImages();
    showAlert('✅ نجاح', 'تم حذف الصورة بنجاح!', 'success');
}

// === حفظ بيانات ولي الأمر ===
function saveParentCredentials() {
    const username = document.getElementById('parentUsername').value.trim();
    const password = document.getElementById('parentPassword').value;
    
    if (!username || !password) {
        showAlert('⚠️ تنبيه', 'يرجى إدخال اسم المستخدم وكلمة المرور!', 'warning');
        return;
    }
    
    if (password.length < 6) {
        showAlert('⚠️ تنبيه', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل!', 'warning');
        return;
    }
    
    const parentData = {
        username: username,
        password: password,
        lastUpdated: new Date().toISOString()
    };
    
    saveToStorage('parentCredentials', parentData);
    showAlert('✅ نجاح', 'تم حفظ بيانات ولي الأمر بنجاح!', 'success');
}

// === دالة التنقل بين الصفحات (مصححة) ===
function navigateTo(fromPage, toPage) {
    // تسجيل الصفحة في السجل إذا كان موجوداً
    if (window.pageHistory && window.pageHistory[window.pageHistory.length - 1] !== toPage) {
        window.pageHistory.push(toPage);
    }
    
    if (document.getElementById(fromPage)) {
        document.getElementById(fromPage).classList.remove('active');
        document.getElementById(fromPage).style.display = 'none';
    }
    if (document.getElementById(toPage)) {
        document.getElementById(toPage).style.display = 'block';
        document.getElementById(toPage).classList.add('active');
    }
}

// === تسجيل الخروج (مصحح) ===
function logout() {
    localStorage.removeItem('currentUser');
    
    // الحصول على الصفحة النشطة حالياً والعودة للدخول
    const activePage = document.querySelector('.box.active');
    const currentPageId = activePage ? activePage.id : 'menuPage';
    
    // إخفاء الكل وعرض الدخول
    document.querySelectorAll('.box').forEach(box => {
        box.style.display = 'none';
        box.classList.remove('active');
    });
    
    const loginPage = document.getElementById('loginPage');
    if (loginPage) {
        loginPage.style.display = 'block';
        loginPage.classList.add('active');
    }
    
    // إعادة تعيين السجل
    if (window.pageHistory) {
        window.pageHistory = ['loginPage'];
    }
    
    showAlert('✅ نجاح', 'تم تسجيل الخروج بنجاح!', 'success');
}

// === دالة عرض تنبيهات مخصصة ===
function showAlert(title, message, type) {
    const colors = {
        success: { bg: '#28a745', border: '#218838', icon: '✅' },
        error: { bg: '#dc3545', border: '#c82333', icon: '❌' },
        warning: { bg: '#ffc107', border: '#e0a800', icon: '⚠️' },
        info: { bg: '#17a2b8', border: '#138496', icon: 'ℹ️' }
    };
    const color = colors[type] || colors.info;
    alert(`${color.icon} ${title}\n\n${message}`);
}

// === إتاحة الدوال عالمياً ===
window.openSettingsPage = openSettingsPage;
window.openSchoolSettings = openSchoolSettings;
window.openImagesSettings = openImagesSettings;
window.openParentSettings = openParentSettings;
window.previewImage = previewImage;
window.saveImage = saveImage;
window.loadSavedImages = loadSavedImages;
window.viewFullImage = viewFullImage;
window.deleteImage = deleteImage;
window.saveParentCredentials = saveParentCredentials;
window.navigateTo = navigateTo;
window.updateSchoolName = updateSchoolName;
window.updateSchoolNameInAllPages = updateSchoolNameInAllPages;
window.updateUsername = updateUsername;
window.updatePassword = updatePassword;
window.login = login;
window.logout = logout;
window.showAlert = showAlert;
