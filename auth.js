// ============= نظام المصادقة المتكامل =============

// متغيرات الجلسة
let currentUser = null;
let currentSchoolId = "SCHOOL_001"; // معرف المدرسة الافتراضي


// ============= دالة تشفير بسيطة (نسخة واحدة) =============
function simpleHash(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString();
}

// ============= عرض لوحة تحكم المعلم (مصححة ومتكاملة) =============
function showTeacherDashboard() {
    // إخفاء صفحة الدخول
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('loginPage').style.display = 'none';
    
    // إخفاء القائمة الرئيسية
    if (document.getElementById('menuPage')) {
        document.getElementById('menuPage').classList.remove('active');
        document.getElementById('menuPage').style.display = 'none';
    }
    
    // إظهار لوحة تحكم المعلم
    const dashboardPage = document.getElementById('teacherDashboardPage');
    if (dashboardPage) {
        dashboardPage.classList.add('active');
        dashboardPage.style.display = 'block';
        
        // التهيئة الفورية للوحة التحكم (الأهم!)
        initializeTeacherDashboard();
    } else {
        console.error('❌ صفحة لوحة تحكم المعلم غير موجودة في HTML!');
        alert('خطأ: لم يتم العثور على صفحة لوحة تحكم المعلم');
    }
}

// ============= تهيئة لوحة تحكم المعلم (الجديدة) =============
function initializeTeacherDashboard() {
    // 1. عرض اسم المعلم في العنوان
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.fullName) {
        const nameElement = document.getElementById('attendanceTeacherName');
        if (nameElement) {
            nameElement.textContent = currentUser.fullName;
        }
        
        const fullNameDisplay = document.getElementById('teacherFullNameDisplay');
        if (fullNameDisplay) {
            fullNameDisplay.textContent = currentUser.fullName;
        }
    }

    // 2. تعيين التاريخ الحالي
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) {
        dateInput.value = dateStr;
    }

    // 3. تحميل المقررات والشعب (هذا هو الحل الرئيسي!)
    loadTeacherClassesForAttendance();

    // 4. تحميل صفوف المعلم في القسم السفلي
    renderTeacherClasses();
}

// ============= تحميل المقررات والشعب للمعلم (مهم جداً) =============
function loadTeacherClassesForAttendance() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'teacher') {
        console.warn('⚠️ لم يتم تسجيل الدخول كمعلم');
        return;
    }

    const teachers = loadFromStorage('teachers') || [];
    const teacher = teachers.find(t => t.id === currentUser.id);

    if (!teacher || !teacher.classesSubjects || teacher.classesSubjects.length === 0) {
        console.warn('⚠️ ليس للمعلم صفوف مخصصة');
        const select = document.getElementById('attendanceClassSelect');
        if (select) {
            select.innerHTML = '<option value="">⚠️ لا توجد صفوف مخصصة لك</option>';
        }
        return;
    }

    const select = document.getElementById('attendanceClassSelect');
    if (!select) {
        console.error('❌ عنصر attendanceClassSelect غير موجود في HTML');
        return;
    }

    // مسح الخيارات القديمة
    select.innerHTML = '<option value="">اختر الصف والشعبة والمقرر...</option>';

    // إضافة الصفوف والشعب والمقررات
    teacher.classesSubjects.forEach(cs => {
        const option = document.createElement('option');
        option.value = `${cs.class}|${cs.section}|${cs.subject}`;
        option.textContent = `${cs.class} - ${cs.section} (${cs.subject})`;
        select.appendChild(option);
    });
    
    console.log('✅ تم تحميل المقررات بنجاح:', teacher.classesSubjects.length, 'مقرر');
}

// ============= عرض صفوف المعلم =============
function renderTeacherClasses() {
    if (!currentUser || currentUser.type !== 'teacher') return;
    
    const container = document.getElementById('teacherClassesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    currentUser.classesSubjects.forEach((cs, index) => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.innerHTML = `
            <h3>📚 ${cs.class} - ${cs.section}</h3>
            <p style="color: #00ff9d; font-weight: bold;">${cs.subject}</p>
            <button class="btn" onclick="showClassStudents('${cs.class}', '${cs.section}', '${cs.subject}')">
                👥 عرض الطلاب
            </button>
        `;
        container.appendChild(div);
    });
    
    // إذا لم يكن للمعلم صفوف
    if (currentUser.classesSubjects.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: #ffcc00; padding: 20px; font-size: 18px;">
                ⚠️ لا توجد صفوف مخصصة لك حالياً
            </p>
        `;
    }
}

// ============= عرض طلاب الصف =============
function showClassStudents(className, section, subject) {
    navigateTo('teacherDashboardPage', 'teacherStudentsPage');
    
    // تحميل الطلاب من التخزين المحلي
    loadStudentsForTeacher(className, section, subject);
}

// ============= تحميل الطلاب للمعلم =============
function loadStudentsForTeacher(className, section, subject) {
    try {
        const students = loadFromStorage('students') || {};
        const classStudents = students[className] || [];
        const filteredStudents = classStudents.filter(s => 
            !section || s["الشعبة"] === section
        );
        
        const container = document.getElementById('teacherStudentsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (filteredStudents.length === 0) {
            container.innerHTML = `
                <p style="text-align: center; color: #aaa; padding: 30px; font-size: 18px;">
                    📭 لا توجد طلاب في هذا الصف
                </p>
            `;
            return;
        }
        
        filteredStudents.forEach((student, index) => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <h3>👤 ${student["الاسم الكامل"] || 'طالب'}</h3>
                <p>الهاتف: ${student["هاتف ولي الأمر"] || '—'}</p>
                <button class="btn" onclick="openGradeForm('${index}', '${student["الاسم الكامل"]}', '${subject}')">
                    ➕ إضافة درجة
                </button>
            `;
            container.appendChild(div);
        });
        
    } catch (error) {
        console.error('خطأ في تحميل الطلاب:', error);
        alert('حدث خطأ أثناء تحميل الطلاب');
    }
}

// ============= فتح نموذج إضافة الدرجة =============
function openGradeForm(studentId, studentName, subject) {
    const grade = prompt(`أدخل درجة الطالب ${studentName} في مادة ${subject}:`);
    
    if (grade !== null && !isNaN(parseFloat(grade))) {
        alert(`✅ تم حفظ درجة ${grade} للطالب ${studentName}`);
        // يمكنك إضافة حفظ الدرجة فعلياً لاحقاً
    }
}

// ============= عرض لوحة تحكم المدير =============
function showAdminDashboard() {
    // إخفاء صفحة الدخول
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('loginPage').style.display = 'none';
    
    // إظهار القائمة الرئيسية
    document.getElementById('menuPage').classList.add('active');
    document.getElementById('menuPage').style.display = 'block';
    
    // إظهار جميع عناصر القائمة
    document.querySelectorAll('.admin-menu-item').forEach(el => {
        if (el.style) el.style.display = 'block';
    });
    
    // إخفاء عناصر المعلم فقط
    document.querySelectorAll('.teacher-menu-item').forEach(el => {
        if (el.style) el.style.display = 'none';
    });
}

// ============= التحقق من تسجيل الدخول عند تحميل الصفحة =============
function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        
        if (currentUser.type === 'admin') {
            showAdminDashboard();
        } else if (currentUser.type === 'teacher') {
            showTeacherDashboard();
        }
    } else {
        // إظهار صفحة الدخول
        showPage('loginPage');
    }
}

// ============= جعل الدوال متاحة عالمياً =============
window.login = login;
window.showTeacherDashboard = showTeacherDashboard;
window.showAdminDashboard = showAdminDashboard;
window.renderTeacherClasses = renderTeacherClasses;
window.loadTeacherClassesForAttendance = loadTeacherClassesForAttendance;
window.initializeTeacherDashboard = initializeTeacherDashboard;

// ============= تهيئة النظام عند تحميل الصفحة =============
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ تم تحميل صفحة المصادقة');
    checkAuth();
    
    // تأكد من وجود العناصر المطلوبة
    if (document.getElementById('teacherDashboardPage')) {
        console.log('✅ صفحة لوحة تحكم المعلم موجودة');
    }
    
    // ربط حدث التغيير على حقل التاريخ
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput && !dateInput.onchange) {
        dateInput.onchange = function() {
            if (typeof loadAttendance === 'function') {
                loadAttendance();
            }
        };
    }
    
    // ربط حدث التغيير على حقل المقرر
    const classSelect = document.getElementById('attendanceClassSelect');
    if (classSelect && !classSelect.onchange) {
        classSelect.onchange = function() {
            if (typeof loadAttendance === 'function') {
                loadAttendance();
            }
        };
    }
});

