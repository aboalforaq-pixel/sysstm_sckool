// teachers.js - وظائف المعلمين فقط (مصحح بالكامل)
let teachers = loadFromStorage('teachers') || [];
let deletedTeachers = loadFromStorage('deletedTeachers') || [];
let salariesMonths = loadFromStorage('salariesMonths') || [];
// حفظ البيانات في localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("❌ خطأ في الحفظ:", e);
        alert("فشل في حفظ البيانات. تأكد من مساحة التخزين.");
    }
}

// حفظ البيانات في localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("❌ خطأ في الحفظ:", e);
        alert("فشل في حفظ البيانات. تأكد من مساحة التخزين.");
    }
}

// تحميل البيانات من localStorage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("❌ خطأ في التحميل:", e);
        return null;
    }
}

// حفظ البيانات في localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("❌ خطأ في الحفظ:", e);
        alert("فشل في حفظ البيانات. تأكد من مساحة التخزين.");
    }
}

// تحميل البيانات من localStorage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("❌ خطأ في التحميل:", e);
        return null;
    }
}
// تحميل البيانات من localStorage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("❌ خطأ في التحميل:", e);
        return null;
    }
}

// === التنقل ===
function openTeachersPage() {
    navigateTo("menuPage", "teachersPage");
}

// === الخصومات والإكراميات ===
let deductionsAndBonuses = loadFromStorage('deductionsAndBonuses') || [];

// تهيئة الخصومات والإكراميات
function initDeductionsBonuses() {
    if (!deductionsAndBonuses) {
        deductionsAndBonuses = [];
        saveToStorage('deductionsAndBonuses', deductionsAndBonuses);
    }
}

// عرض صفحة الخصومات والإكراميات
function showDeductionsBonusesPage() {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.box').forEach(box => {
        box.style.display = 'none';
    });
    // إظهار الصفحة
    document.getElementById('deductionsBonusesPage').style.display = 'block';
    // تحميل المعلمين والشهور
    loadTeachersForDeductions();
    loadMonthsForDeductions();
}

// تحميل قائمة المعلمين
function loadTeachersForDeductions() {
    const deductionSelect = document.getElementById('deductionTeacherSelect');
    const bonusSelect = document.getElementById('bonusTeacherSelect');
    
    if (deductionSelect) {
        deductionSelect.innerHTML = '<option value="">اختر المعلم</option>';
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id;
            option.textContent = teacher.fullName;
            deductionSelect.appendChild(option);
        });
    }
    
    if (bonusSelect) {
        bonusSelect.innerHTML = '<option value="">اختر المعلم</option>';
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id;
            option.textContent = teacher.fullName;
            bonusSelect.appendChild(option);
        });
    }
}

// تحميل قائمة الشهور
function loadMonthsForDeductions() {
    const deductionMonthSelect = document.getElementById('deductionMonthSelect');
    const bonusMonthSelect = document.getElementById('bonusMonthSelect');
    
    if (deductionMonthSelect) {
        deductionMonthSelect.innerHTML = '<option value="">اختر الشهر</option>';
        salariesMonths.forEach(month => {
            const option = document.createElement('option');
            option.value = month.id;
            option.textContent = `${month.name} ${month.year}`;
            deductionMonthSelect.appendChild(option);
        });
    }
    
    if (bonusMonthSelect) {
        bonusMonthSelect.innerHTML = '<option value="">اختر الشهر</option>';
        salariesMonths.forEach(month => {
            const option = document.createElement('option');
            option.value = month.id;
            option.textContent = `${month.name} ${month.year}`;
            bonusMonthSelect.appendChild(option);
        });
    }
}

// إظهار نموذج الخصم
function showDeductionForm() {
    document.getElementById('deductionForm').style.display = 'block';
    document.getElementById('bonusForm').style.display = 'none';
}

// إخفاء نموذج الخصم
function hideDeductionForm() {
    document.getElementById('deductionForm').style.display = 'none';
    document.getElementById('deductionCustomFields').innerHTML = '';
    document.getElementById('deductionTeacherSelect').value = '';
    document.getElementById('deductionAmount').value = '';
    document.getElementById('deductionMonthSelect').value = '';
    document.getElementById('deductionReason').value = '';
}

// إظهار نموذج الإكرامية
function showBonusForm() {
    document.getElementById('bonusForm').style.display = 'block';
    document.getElementById('deductionForm').style.display = 'none';
}

// إخفاء نموذج الإكرامية
function hideBonusForm() {
    document.getElementById('bonusForm').style.display = 'none';
    document.getElementById('bonusCustomFields').innerHTML = '';
    document.getElementById('bonusTeacherSelect').value = '';
    document.getElementById('bonusAmount').value = '';
    document.getElementById('bonusMonthSelect').value = '';
    document.getElementById('bonusReason').value = '';
}

// إضافة حقل مخصص للخصم
function addDeductionCustomField() {
    const container = document.getElementById('deductionCustomFields');
    const label = prompt("أدخل اسم الحقل (مثل: رقم القرار):");
    if (!label) return;
    
    const div = document.createElement('div');
    div.className = 'extra-field';
    div.style.cssText = 'display: flex; gap: 10px; margin: 10px 0; align-items: center;';
    div.innerHTML = `
        <div style="flex: 1;">
            <label style="display: block; color: #ff3366; font-weight: bold; margin-bottom: 5px;">${label}</label>
            <input type="text" data-label="${label}" placeholder="أدخل القيمة"
                style="width: 100%; padding: 8px; background: #0a0a0a; color: #ff3366; border: 1px solid #ff3366; border-radius: 6px; font-size: 14px;" />
        </div>
        <button type="button" onclick="this.parentElement.remove()"
            style="background: #ff3366; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-weight: bold; cursor: pointer;">
            ×
        </button>
    `;
    container.appendChild(div);
}

// إضافة حقل مخصص للإكرامية
function addBonusCustomField() {
    const container = document.getElementById('bonusCustomFields');
    const label = prompt("أدخل اسم الحقل (مثل: رقم القرار):");
    if (!label) return;
    
    const div = document.createElement('div');
    div.className = 'extra-field';
    div.style.cssText = 'display: flex; gap: 10px; margin: 10px 0; align-items: center;';
    div.innerHTML = `
        <div style="flex: 1;">
            <label style="display: block; color: #00ff9d; font-weight: bold; margin-bottom: 5px;">${label}</label>
            <input type="text" data-label="${label}" placeholder="أدخل القيمة"
                style="width: 100%; padding: 8px; background: #0a0a0a; color: #00ff9d; border: 1px solid #00ff9d; border-radius: 6px; font-size: 14px;" />
        </div>
        <button type="button" onclick="this.parentElement.remove()"
            style="background: #00ff9d; color: #000; border: none; width: 30px; height: 30px; border-radius: 50%; font-weight: bold; cursor: pointer;">
            ×
        </button>
    `;
    container.appendChild(div);
}

// حفظ الخصم
function saveDeduction() {
    const teacherId = document.getElementById('deductionTeacherSelect').value;
    const amount = document.getElementById('deductionAmount').value;
    const monthId = document.getElementById('deductionMonthSelect').value;
    const reason = document.getElementById('deductionReason').value;
    
    if (!teacherId || !amount || !monthId) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة');
        return;
    }
    
    // جمع الحقول المخصصة
    const customFields = {};
    document.querySelectorAll('#deductionCustomFields .extra-field input').forEach(input => {
        const label = input.getAttribute('data-label');
        customFields[label] = input.value.trim();
    });
    
    const newDeduction = {
        id: Date.now(),
        type: 'deduction',
        teacherId: parseInt(teacherId),
        amount: parseFloat(amount),
        monthId,
        reason,
        date: new Date().toLocaleDateString('ar-EG'),
        customFields
    };
    
    deductionsAndBonuses.push(newDeduction);
    saveToStorage('deductionsAndBonuses', deductionsAndBonuses);
    alert('تم حفظ الخصم بنجاح!');
    hideDeductionForm();
}

// حفظ الإكرامية
function saveBonus() {
    const teacherId = document.getElementById('bonusTeacherSelect').value;
    const amount = document.getElementById('bonusAmount').value;
    const monthId = document.getElementById('bonusMonthSelect').value;
    const reason = document.getElementById('bonusReason').value;
    
    if (!teacherId || !amount || !monthId) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة');
        return;
    }
    
    // جمع الحقول المخصصة
    const customFields = {};
    document.querySelectorAll('#bonusCustomFields .extra-field input').forEach(input => {
        const label = input.getAttribute('data-label');
        customFields[label] = input.value.trim();
    });
    
    const newBonus = {
        id: Date.now(),
        type: 'bonus',
        teacherId: parseInt(teacherId),
        amount: parseFloat(amount),
        monthId,
        reason,
        date: new Date().toLocaleDateString('ar-EG'),
        customFields
    };
    
    deductionsAndBonuses.push(newBonus);
    saveToStorage('deductionsAndBonuses', deductionsAndBonuses);
    alert('تم حفظ الإكرامية بنجاح!');
    hideBonusForm();
}

// === التنقل في صفحات المعلمين ===
function showAddTeacher() {
    const fromPage = document.querySelector('.box.active')?.id || 'teachersPage';
    delete window.editingTeacherId;
    document.getElementById('teacherClassesContainer').innerHTML = '';
    document.getElementById('customTeacherFields').innerHTML = '';
    addTeacherClassSubjectRow();
    navigateTo(fromPage, 'addTeacherPage');
}

function showTeachersByClass() {
    navigateTo("teachersPage", "teachersByClassPage");
    renderTeachersByClass();
}

function showDeletedTeachers() {
    renderDeletedTeachersTable();
    navigateTo("teachersPage", "deletedTeachersPage");
}

function showSalariesPage() {
    navigateTo("teachersPage", "salariesPage");
    renderSalariesMonthsList();
}

function showAttendancePage() {
    navigateTo("teachersPage", "attendancePage");
}
// === الصفوف والمقررات ===
function addTeacherClassSubjectRow() {
  const container = document.getElementById('teacherClassesContainer');
  if (!container) return;
  
  const row = document.createElement('div');
  row.className = 'teacher-class-row';
  
  // تحميل الشعب الذكية من التخزين
  const smartSections = loadFromStorage('smartSections') || {};
  
  // إذا كانت هناك شعب ذكية، نعرضها، وإلا نعرض الشعب العادية
  let sectionsHTML = '';
  
  if (Object.keys(smartSections).length > 0) {
    // عرض الشعب الذكية
    Object.keys(smartSections).forEach(sectionName => {
      sectionsHTML += `<option value="${sectionName}">${sectionName} (${smartSections[sectionName].from} - ${smartSections[sectionName].to})</option>`;
    });
  } else {
    // عرض الشعب العادية كاحتياط
    sectionsHTML = `
      <option value="أ">أ</option>
      <option value="ب">ب</option>
      <option value="ج">ج</option>
      <option value="د">د</option>
      <option value="هـ">هـ</option>
      <option value="و">و</option>
      <option value="ز">ز</option>
    `;
  }
  
  row.innerHTML = `
    <div class="class-field">
      <label>الصف</label>
      <select class="teacher-class-select" style="border-color: #00eaff; background: #0a0a0a;">
        ${classes.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    </div>
    <div class="section-field">
      <label>الشعبة</label>
      <select class="teacher-section-select" style="border-color: #ffcc00; background: #0a0a0a;">
        ${sectionsHTML}
      </select>
    </div>
    <div class="subject-field">
      <label>المقرر</label>
      <input type="text" class="teacher-subject-input" placeholder="مثل: الرياضيات" style="border-color: #00ff9d; background: #0a0a0a;" />
    </div>
    <button type="button" class="delete-btn" onclick="this.closest('.teacher-class-row').remove()"
    style="background: #ff3366; color: white; border: none; cursor: pointer; width: 36px; height: 36px; border-radius: 8px; font-weight: bold; display: flex; align-items: center; justify-content: center;"
    onmouseover="this.style.background='#fff'; this.style.color='#ff3366'; this.style.transform='scale(1.1)';"
    onmouseout="this.style.background='#ff3366'; this.style.color='white'; this.style.transform='scale(1)';">
      ×
    </button>
  `;
  
  container.appendChild(row);
}

// === الصفوف والمقررات (محدث لدعم الشعب الذكية) ===
function addTeacherClassSubjectRow() {
  const container = document.getElementById('teacherClassesContainer');
  if (!container) return;
  
  const row = document.createElement('div');
  row.className = 'teacher-class-row';
  
  // تحميل الشعب الذكية من التخزين
  let smartSections = {};
  try {
    smartSections = loadFromStorage('smartSections') || {};
  } catch (e) {
    console.warn('لم يتم تحميل الشعب الذكية:', e);
  }
  
  // بناء خيارات الشعبة
  let sectionOptions = '<option value="">اختر الشعبة</option>';
  
  // إضافة الشعب الذكية أولاً
  if (Object.keys(smartSections).length > 0) {
    Object.keys(smartSections).forEach(sectionName => {
      const sectionInfo = smartSections[sectionName];
      sectionOptions += `<option value="${sectionName}">${sectionName} (${sectionInfo.from} - ${sectionInfo.to})</option>`;
    });
    sectionOptions += '<option disabled>────────────</option>';
  }
  
  row.innerHTML = `
    <div class="class-field">
      <label>الصف</label>
      <select class="teacher-class-select" style="border-color: #00eaff; background: #0a0a0a;">
        ${classes.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    </div>
    <div class="section-field">
      <label>الشعبة</label>
      <select class="teacher-section-select" style="border-color: #ffcc00; background: #0a0a0a;">
        ${sectionOptions}
      </select>
    </div>
    <div class="subject-field">
      <label>المقرر</label>
      <input type="text" class="teacher-subject-input" placeholder="مثل: الرياضيات" style="border-color: #00ff9d; background: #0a0a0a;" />
    </div>
    <button type="button" class="delete-btn" onclick="this.closest('.teacher-class-row').remove()"
    style="background: #ff3366; color: white; border: none; cursor: pointer; width: 36px; height: 36px; border-radius: 8px; font-weight: bold; display: flex; align-items: center; justify-content: center;"
    onmouseover="this.style.background='#fff'; this.style.color='#ff3366'; this.style.transform='scale(1.1)';"
    onmouseout="this.style.background='#ff3366'; this.style.color='white'; this.style.transform='scale(1)';">
      ×
    </button>
  `;
  
  container.appendChild(row);
}



// === الحقول المخصصة للمعلم ===
function addTeacherField() {
    const label = prompt("أدخل اسم الحقل المخصص (مثل: رقم الهوية):");
    if (!label) return;
    
    const container = document.getElementById('customTeacherFields');
    const div = document.createElement('div');
    div.className = 'extra-field';
    div.innerHTML = `
        <div class="form-group" style="flex:1; margin:0;">
            <label>${label}</label>
            <input type="text" data-label="${label}" placeholder="أدخل القيمة" />
        </div>
        <button type="button" class="delete-btn" onclick="this.closest('.extra-field').remove()">🗑️</button>
    `;
    container.appendChild(div);
}

// === حفظ أو تحديث المعلم ===
function saveTeacherAdvanced() {
    const username = document.getElementById('teacherUsername')?.value.trim();
    const password = document.getElementById('teacherPassword')?.value.trim();
    const fullName = document.getElementById('teacherFullName')?.value.trim();
    const phone = document.getElementById('teacherPhone')?.value.trim();
    const salaryType = document.getElementById('teacherSalaryType')?.value;
    const agreedAmount = document.getElementById('teacherAgreedAmount')?.value || '0';
    const notes = document.getElementById('teacherNotes')?.value.trim();
    
    if (!username || !password || !fullName) {
        alert('الرجاء تعبئة اسم المستخدم وكلمة المرور والاسم الكامل.');
        return;
    }
    
    if (window.editingTeacherId) {
        const index = teachers.findIndex(t => t.id === window.editingTeacherId);
        if (index !== -1) {
            const classesSubjects = [];
            document.querySelectorAll('#teacherClassesContainer .teacher-class-row').forEach(row => {
                const cls = row.querySelector('.teacher-class-select')?.value;
                const section = row.querySelector('.teacher-section-select')?.value;
                const subject = row.querySelector('.teacher-subject-input')?.value.trim();
                if (cls && section && subject) {
                    classesSubjects.push({ class: cls, section: section, subject: subject });
                }
            });
            
            const customFields = {};
            document.querySelectorAll('#customTeacherFields .extra-field input').forEach(input => {
                const label = input.getAttribute('data-label');
                customFields[label] = input.value.trim();
            });
            
            teachers[index] = {
                id: window.editingTeacherId,
                username,
                password,
                fullName,
                phone,
                classesSubjects,
                salaryType,
                agreedAmount,
                notes,
                customFields,
                createdAt: teachers[index].createdAt,
                lastModified: new Date().toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit' })
            };
            
            saveToStorage('teachers', teachers);
            delete window.editingTeacherId;
            
            // مسح الحقول
            document.getElementById('teacherUsername').value = '';
            document.getElementById('teacherPassword').value = '';
            document.getElementById('teacherFullName').value = '';
            document.getElementById('teacherPhone').value = '';
            document.getElementById('teacherSalaryType').value = '';
            document.getElementById('teacherAgreedAmount').value = '';
            document.getElementById('teacherNotes').value = '';
            document.getElementById('teacherClassesContainer').innerHTML = '';
            document.getElementById('customTeacherFields').innerHTML = '';
            addTeacherClassSubjectRow();
            
            alert('تم تحديث بيانات المعلم بنجاح!');
            goBack();
            return;
        }
    }
    
    const classesSubjects = [];
    document.querySelectorAll('#teacherClassesContainer .teacher-class-row').forEach(row => {
        const cls = row.querySelector('.teacher-class-select')?.value;
        const section = row.querySelector('.teacher-section-select')?.value;
        const subject = row.querySelector('.teacher-subject-input')?.value.trim();
        if (cls && section && subject) {
            classesSubjects.push({ class: cls, section: section, subject: subject });
        }
    });
    
    const customFields = {};
    document.querySelectorAll('#customTeacherFields .extra-field input').forEach(input => {
        const label = input.getAttribute('data-label');
        customFields[label] = input.value.trim();
    });
    
    const newTeacher = {
        id: Date.now(),
        username,
        password,
        fullName,
        phone,
        classesSubjects,
        salaryType,
        agreedAmount,
        notes,
        customFields,
        createdAt: new Date().toLocaleDateString('ar-EG')
    };
    
    teachers.push(newTeacher);
    saveToStorage('teachers', teachers);
    
    // مسح الحقول بعد الحفظ
    document.getElementById('teacherUsername').value = '';
    document.getElementById('teacherPassword').value = '';
    document.getElementById('teacherFullName').value = '';
    document.getElementById('teacherPhone').value = '';
    document.getElementById('teacherSalaryType').value = '';
    document.getElementById('teacherAgreedAmount').value = '';
    document.getElementById('teacherNotes').value = '';
    document.getElementById('teacherClassesContainer').innerHTML = '';
    document.getElementById('customTeacherFields').innerHTML = '';
    addTeacherClassSubjectRow();
    
    alert(`تم حفظ المعلم بنجاح!
اسم المستخدم: ${username}
كلمة المرور: ${password}`);
    goBack();
}

// === عرض صفوف المعلم ===
function renderTeacherClasses() {
    const container = document.getElementById('teacherClassesContainer');
    if (!container) {
        console.error("❌ العنصر 'teacherClassesContainer' غير موجود!");
        return;
    }
    
    // تحميل المستخدم الحالي
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'teacher') {
        container.innerHTML = '<p style="text-align: center; color: #ff3366; padding: 30px; font-size: 18px; background: #1a1a1a; border-radius: 10px; border: 2px solid #ff3366;">❌ خطأ: لم يتم تسجيل الدخول كمعلم!</p>';
        return;
    }
    
    // تحميل المعلمين
    const teachers = loadFromStorage('teachers') || [];
    const teacher = teachers.find(t => t.id === currentUser.id);
    
    if (!teacher || !teacher.classesSubjects || teacher.classesSubjects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #ffcc00; padding: 30px; font-size: 18px; background: #1a1a1a; border-radius: 10px; border: 2px solid #ffcc00;">⚠️ لا توجد صفوف مخصصة لك حالياً<br><small style="display:block; margin-top:10px; color:#aaa;">(يجب إضافة صفوف وشعب ومقررات عند إضافة المعلم)</small></p>';
        return;
    }
    
    container.innerHTML = '';
    
    teacher.classesSubjects.forEach((cs, index) => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.style.background = index % 2 === 0 ? '#151515' : '#131313';
        div.style.border = '2px solid #00ff9d';
        div.style.cursor = 'pointer';
        div.onclick = function() {
            showClassStudents(cs.class, cs.section, cs.subject);
        };
        
        div.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 40px; margin-bottom: 10px;">📚</div>
                <h3 style="color: #00eaff; margin-bottom: 10px; font-size: 20px;">${cs.class}</h3>
                <p style="color: #ffcc00; font-size: 16px; margin-bottom: 10px;">
                    <strong>الشعبة:</strong> ${cs.section || '—'}
                </p>
                <p style="color: #00ff9d; font-size: 16px; margin-bottom: 15px;">
                    <strong>المقرر:</strong> ${cs.subject || '—'}
                </p>
                <button class="btn"
                    onclick="event.stopPropagation(); showClassStudents('${cs.class}', '${cs.section}', '${cs.subject}')"
                    style="background: #00eaff; color: #000; border: 2px solid #00eaff; padding: 10px; width: 100%; font-weight: bold; margin-top: 10px;">
                    👥 عرض الطلاب
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// === عرض طلاب الصف ===
function showClassStudents(className, section, subject) {
    navigateTo("teacherDashboardPage", "teacherStudentsPage");
    
    // تحديث عناوين الصفحة
    document.getElementById('teacherStudentClassName').textContent = className;
    document.getElementById('teacherStudentSectionName').textContent = section || '—';
    
    // تحميل الطلاب
    loadStudentsForTeacher(className, section, subject);
}
// === تحميل الطلاب من النظام (مصحح تماماً) ===
function loadStudentsForTeacher(className, section, subject) {
    const container = document.getElementById('teacherStudentsList');
    if (!container) {
        console.error("❌ العنصر 'teacherStudentsList' غير موجود!");
        return;
    }

    // تحديث المتغيرات العامة
    currentGradeClass = className;
    currentGradeSection = section;
    currentGradeSubject = subject;

    // تحميل الطلاب
    const students = loadFromStorage('students') || {};
    const classStudents = students[className] || [];

    if (classStudents.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" style="padding: 40px; text-align: center; color: #aaa; background: #1a1a1a; border-radius: 10px; border: 2px solid #333;">
                    <div style="font-size: 24px; margin-bottom: 15px;">📭</div>
                    <p style="font-size: 18px; margin: 0;">لا توجد طلاب في هذا الصف</p>
                </td>
            </tr>
        `;
        return;
    }

    // ✅ فلترة صحيحة بدون مسافة زائدة
    const filteredStudents = classStudents.filter(s => {
        if (!section) return true;
        return s['الشعبة'] === section; // ✅ بدون مسافة
    });

    if (filteredStudents.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" style="padding: 40px; text-align: center; color: #ffcc00; background: #1a1a1a; border-radius: 10px; border: 2px solid #ffcc00;">
                    <div style="font-size: 24px; margin-bottom: 15px;">⚠️</div>
                    <p style="font-size: 18px; margin: 0;">لا توجد طلاب في هذه الشعبة (${section})</p>
                    <small style="color:#aaa">تأكد من أن الطلاب مسجلين بنفس اسم الشعبة</small>
                </td>
            </tr>
        `;
        return;
    }

    container.innerHTML = '';

    filteredStudents.forEach((student, index) => {
        let studentPhoto = '';
        for (const key in student) {
            if (typeof student[key] === 'string' && student[key].startsWith('data:image')) {
                studentPhoto = student[key];
                break;
            }
        }
        
        const photoCell = studentPhoto 
            ? `<img src="${studentPhoto}" style="width: 50px; height: 50px; border-radius: 8px; border: 2px solid #00eaff; object-fit: cover;">`
            : `<div style="width: 50px; height: 50px; border-radius: 8px; background: #333; display: flex; align-items: center; justify-content: center; color: #00eaff; font-size: 20px;">👤</div>`;
        
        const row = document.createElement('tr');
        row.style.background = index % 2 === 0 ? '#151515' : '#131313';
        
        row.innerHTML = `
            <td style="padding: 10px; text-align: center; color: #fff; border-bottom: 1px solid #333;">${index + 1}</td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">${photoCell}</td>
            <td style="padding: 10px; text-align: center; color: #00ff9d; font-weight: bold; border-bottom: 1px solid #333;">
                ${student["الاسم الكامل"] || 'غير معروف'}
            </td>
            <td style="padding: 10px; text-align: center; color: #ffcc00; border-bottom: 1px solid #333;">
                ${student["رقم ولي الأمر"] || '—'}
            </td>
            <td style="padding: 10px; text-align: center; color: #7b68ee; border-bottom: 1px solid #333;">
                ${student["الجنس"] || '—'}
            </td>
            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                <button class="btn btn-sm" 
                    onclick="openGradeEntryPage('${className}', '${section}', '${subject}', '${index}', '${student["الاسم الكامل"] || "غير معروف"}')" 
                    style="background: #00ff9d; color: #000; border: 2px solid #00ff9d; padding: 8px 16px; margin: 2px; border-radius: 6px; font-weight: bold;">
                    ➕ إضافة درجات
                </button>
            </td>
        `;
        container.appendChild(row);
    });
}

// === تسجيل الخروج ===
function logout() {
    localStorage.removeItem('currentUser');
    navigateTo("teacherDashboardPage", "loginPage");
    alert('✅ تم تسجيل الخروج بنجاح!');
}



addTeacherClassSubjectRow


// === دالة فتح نموذج تعديل المعلم (مُعدّلة) ===
function editTeacher(id) {
  const teacher = teachers.find(t => t.id === id);
  if (!teacher) {
    alert("❌ لم يتم العثور على المعلم!");
    return;
  }
  
  const usernameEl = document.getElementById('teacherUsername');
  const passwordEl = document.getElementById('teacherPassword');
  const fullNameEl = document.getElementById('teacherFullName');
  const phoneEl = document.getElementById('teacherPhone');
  const salaryTypeEl = document.getElementById('teacherSalaryType');
  const agreedAmountEl = document.getElementById('teacherAgreedAmount');
  const notesEl = document.getElementById('teacherNotes');
  
  if (!usernameEl || !passwordEl || !fullNameEl) {
    alert("❌ عناصر النموذج غير مكتملة!");
    return;
  }
  
  usernameEl.value = teacher.username || '';
  passwordEl.value = teacher.password || '';
  fullNameEl.value = teacher.fullName || '';
  phoneEl.value = teacher.phone || '';
  salaryTypeEl.value = teacher.salaryType || '';
  agreedAmountEl.value = teacher.agreedAmount || '';
  notesEl.value = teacher.notes || '';
  
  const container = document.getElementById('teacherClassesContainer');
  if (container) {
    container.innerHTML = '';
    
    // تحميل الشعب الذكية
    let smartSections = {};
    try {
      smartSections = loadFromStorage('smartSections') || {};
    } catch (e) {
      console.warn('لم يتم تحميل الشعب الذكية:', e);
    }
    
    if (teacher.classesSubjects && teacher.classesSubjects.length > 0) {
      teacher.classesSubjects.forEach(cs => {
        const row = document.createElement('div');
        row.className = 'teacher-class-row';
        
        // بناء خيارات الشعبة
        let sectionOptions = '<option value="">اختر الشعبة</option>';
        
        // إضافة الشعب الذكية
        if (Object.keys(smartSections).length > 0) {
          Object.keys(smartSections).forEach(sectionName => {
            const sectionInfo = smartSections[sectionName];
            const isSelected = cs.section === sectionName ? 'selected' : '';
            sectionOptions += `<option value="${sectionName}" ${isSelected}>${sectionName} (${sectionInfo.from} - ${sectionInfo.to})</option>`;
          });
          sectionOptions += '<option disabled>────────────</option>';
        }
        
        // إضافة الشعب العادية
        const regularSections = ['أ', 'ب', 'ج', 'د', 'هـ', 'و', 'ز'];
        regularSections.forEach(section => {
          const isSelected = cs.section === section ? 'selected' : '';
          sectionOptions += `<option value="${section}" ${isSelected}>${section} (عادية)</option>`;
        });
        
        // التأكد من وجود القيمة المحفوظة
        if (cs.section && !regularSections.includes(cs.section) && !smartSections[cs.section]) {
          sectionOptions = `<option value="${cs.section}" selected>${cs.section} (محفوظ)</option>` + sectionOptions;
        }
        
        row.innerHTML = `
          <div class="class-field">
            <label>الصف</label>
            <select class="teacher-class-select">
              ${classes.map(c => `<option value="${c}" ${c === cs.class ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="section-field">
            <label>الشعبة</label>
            <select class="teacher-section-select">
              ${sectionOptions}
            </select>
          </div>
          <div class="subject-field">
            <label>المقرر</label>
            <input type="text" class="teacher-subject-input" value="${cs.subject || ''}" />
          </div>
          <button type="button" class="delete-btn" onclick="this.closest('.teacher-class-row').remove()"
          style="background: #ff3366; color: white; border: none; cursor: pointer; width: 36px; height: 36px; border-radius: 8px; font-weight: bold; display: flex; align-items: center; justify-content: center;"
          onmouseover="this.style.background='#fff'; this.style.color='#ff3366'; this.style.transform='scale(1.1)';"
          onmouseout="this.style.background='#ff3366'; this.style.color='white'; this.style.transform='scale(1)';">
            ×
          </button>
        `;
        container.appendChild(row);
      });
    } else {
      addTeacherClassSubjectRow();
    }
  }
  
  const customContainer = document.getElementById('customTeacherFields');
  if (customContainer) {
    customContainer.innerHTML = '';
    if (teacher.customFields) {
      for (const [label, value] of Object.entries(teacher.customFields)) {
        const div = document.createElement('div');
        div.className = 'extra-field';
        div.innerHTML = `
          <div class="form-group" style="flex:1; margin:0;">
            <label>${label}</label>
            <input type="text" data-label="${label}" value="${value || ''}" />
          </div>
          <button type="button" class="delete-btn" onclick="this.closest('.extra-field').remove()">🗑️</button>
        `;
        customContainer.appendChild(div);
      }
    }
  }
  
  window.editingTeacherId = id;
  navigateTo("teachersByClassPage", "addTeacherPage");
}

// === عرض جميع المعلمين بشكل منظم ===
function renderTeachersByClass() {
    const container = document.getElementById('teachersTablesContainer');
    if (!container) {
        console.error("❌ العنصر 'teachersTablesContainer' غير موجود!");
        return;
    }
    
    const searchQuery = document.getElementById('globalTeacherSearch')?.value.toLowerCase() || '';
    
    const filteredTeachers = teachers.filter(t => 
        !searchQuery || t.fullName.toLowerCase().includes(searchQuery)
    );
    
    const classesMap = {};
    const teachersWithoutClasses = [];
    
    filteredTeachers.forEach(teacher => {
        if (teacher.classesSubjects && teacher.classesSubjects.length > 0) {
            teacher.classesSubjects.forEach(cs => {
                if (!classesMap[cs.class]) classesMap[cs.class] = [];
                classesMap[cs.class].push({ ...teacher, subject: cs.subject, section: cs.section });
            });
        } else {
            teachersWithoutClasses.push(teacher);
        }
    });
    
    let html = '';
    
    // 👉 عرض المعلمين حسب الصفوف
    for (const [className, list] of Object.entries(classesMap)) {
        if (list.length === 0) continue;
        
        html += `
            <h3 style="margin:30px 0 15px; color:#00eaff; border-bottom:3px solid #00eaff; padding-bottom:10px; font-size:22px; text-align:center; background:#1a1a1a; border-radius:10px;">
                📚 ${className}
            </h3>
            <div class="table-container">
                <table class="teacher-table" style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                    <thead style="background:#0a0a0a; border-bottom:3px solid #00eaff;">
                        <tr>
                            <th style="padding:12px; text-align:center; color:#00ff9d; font-weight:bold; border-right:2px solid #00eaff;">#</th>
                            <th style="padding:12px; text-align:center; color:#00ff9d; font-weight:bold; border-right:2px solid #00eaff;">الاسم الكامل</th>
                            <th style="padding:12px; text-align:center; color:#ffcc00; font-weight:bold; border-right:2px solid #00eaff;">الهاتف</th>
                            <th style="padding:12px; text-align:center; color:#7b68ee; font-weight:bold; border-right:2px solid #00eaff;">المقررات</th>
                            <th style="padding:12px; text-align:center; color:#ff6b6b; font-weight:bold; border-right:2px solid #00eaff;">الراتب</th>
                            <th style="padding:12px; text-align:center; color:#4ecdc4; font-weight:bold;">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // جمع المعلمين مع مقرراتهم (بدون تكرار)
        const teachersMap = {};
        list.forEach(t => {
            if (!teachersMap[t.id]) {
                teachersMap[t.id] = {
                    ...t,
                    subjects: []
                };
            }
            const sectionText = t.section ? `(${t.section})` : '';
            teachersMap[t.id].subjects.push(`${t.subject} ${sectionText}`);
        });
        
        let counter = 1;
        for (const teacher of Object.values(teachersMap)) {
            const subjectsList = teacher.subjects.join(' + ');
            const salaryText = teacher.agreedAmount ? `${teacher.agreedAmount} ريال` : '—';
            
            html += `
                <tr style="background:#1a1a1a; border-bottom:1px solid #333; transition:all 0.3s ease;">
                    <td style="padding:10px; text-align:center; color:#fff; border-right:1px solid #333;">${counter++}</td>
                    <td style="padding:10px; text-align:center; color:#00ff9d; border-right:1px solid #333;">${teacher.fullName}</td>
                    <td style="padding:10px; text-align:center; color:#ffcc00; border-right:1px solid #333;">${teacher.phone || '—'}</td>
                    <td style="padding:10px; text-align:center; color:#7b68ee; border-right:1px solid #333;">${subjectsList}</td>
                    <td style="padding:10px; text-align:center; color:#ff6b6b; border-right:1px solid #333;">${salaryText}</td>
                    <td style="padding:10px; text-align:center;">
                        <button class="btn btn-sm" onclick="viewTeacherDetails(${teacher.id})"
                            style="background:#00eaff; color:#000; border:2px solid #00eaff; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#00ccff'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#00eaff'; this.style.transform='scale(1)';">
                            👁️ عرض
                        </button>
                        <button class="btn btn-sm" onclick="editTeacher(${teacher.id})"
                            style="background:#00ff9d; color:#000; border:2px solid #00ff9d; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#00cc7a'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#00ff9d'; this.style.transform='scale(1)';">
                            ✏️ تعديل
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTeacher(${teacher.id})"
                            style="background:#ff3366; color:#fff; border:2px solid #ff3366; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#ff0033'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#ff3366'; this.style.transform='scale(1)';">
                            🗑️ حذف
                        </button>
                    </td>
                </tr>
            `;
        }
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // 👉 عرض المعلمين بدون صفوف
    if (teachersWithoutClasses.length > 0) {
        html += `
            <h3 style="margin:30px 0 15px; color:#ffcc00; border-bottom:3px solid #ffcc00; padding-bottom:10px; font-size:22px; text-align:center; background:#1a1a1a; border-radius:10px;">
                ⚠️ المعلمون بدون صفوف
            </h3>
            <div class="table-container">
                <table class="teacher-table" style="width:100%; border-collapse:collapse; margin-bottom:20px;">
                    <thead style="background:#0a0a0a; border-bottom:3px solid #ffcc00;">
                        <tr>
                            <th style="padding:12px; text-align:center; color:#ffcc00; font-weight:bold; border-right:2px solid #ffcc00;">#</th>
                            <th style="padding:12px; text-align:center; color:#00ff9d; font-weight:bold; border-right:2px solid #ffcc00;">الاسم الكامل</th>
                            <th style="padding:12px; text-align:center; color:#ffcc00; font-weight:bold; border-right:2px solid #ffcc00;">الهاتف</th>
                            <th style="padding:12px; text-align:center; color:#7b68ee; font-weight:bold; border-right:2px solid #ffcc00;">المقررات</th>
                            <th style="padding:12px; text-align:center; color:#ff6b6b; font-weight:bold; border-right:2px solid #ffcc00;">الراتب</th>
                            <th style="padding:12px; text-align:center; color:#4ecdc4; font-weight:bold;">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // جمع المعلمين بدون صفوف مع مقرراتهم
        const teachersMap = {};
        teachersWithoutClasses.forEach(t => {
            if (!teachersMap[t.id]) {
                teachersMap[t.id] = {
                    ...t,
                    subjects: []
                };
            }
            if (t.classesSubjects && t.classesSubjects.length > 0) {
                t.classesSubjects.forEach(cs => {
                    const sectionText = cs.section ? `(${cs.section})` : '';
                    teachersMap[t.id].subjects.push(`${cs.subject} ${sectionText}`);
                });
            }
        });
        
        let counter = 1;
        for (const teacher of Object.values(teachersMap)) {
            const subjectsList = teacher.subjects.length > 0 ? teacher.subjects.join(' + ') : '—';
            const salaryText = teacher.agreedAmount ? `${teacher.agreedAmount} ريال` : '—';
            
            html += `
                <tr style="background:#1a1a1a; border-bottom:1px solid #333; transition:all 0.3s ease;">
                    <td style="padding:10px; text-align:center; color:#fff; border-right:1px solid #333;">${counter++}</td>
                    <td style="padding:10px; text-align:center; color:#00ff9d; border-right:1px solid #333;">${teacher.fullName}</td>
                    <td style="padding:10px; text-align:center; color:#ffcc00; border-right:1px solid #333;">${teacher.phone || '—'}</td>
                    <td style="padding:10px; text-align:center; color:#7b68ee; border-right:1px solid #333;">${subjectsList}</td>
                    <td style="padding:10px; text-align:center; color:#ff6b6b; border-right:1px solid #333;">${salaryText}</td>
                    <td style="padding:10px; text-align:center;">
                        <button class="btn btn-sm" onclick="viewTeacherDetails(${teacher.id})"
                            style="background:#00eaff; color:#000; border:2px solid #00eaff; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#00ccff'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#00eaff'; this.style.transform='scale(1)';">
                            👁️ عرض
                        </button>
                        <button class="btn btn-sm" onclick="editTeacher(${teacher.id})"
                            style="background:#00ff9d; color:#000; border:2px solid #00ff9d; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#00cc7a'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#00ff9d'; this.style.transform='scale(1)';">
                            ✏️ تعديل
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTeacher(${teacher.id})"
                            style="background:#ff3366; color:#fff; border:2px solid #ff3366; padding:6px 12px; margin:2px; border-radius:6px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                            onmouseover="this.style.background='#ff0033'; this.style.transform='scale(1.05)';"
                            onmouseout="this.style.background='#ff3366'; this.style.transform='scale(1)';">
                            🗑️ حذف
                        </button>
                    </td>
                </tr>
            `;
        }
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    container.innerHTML = html || '<p style="text-align:center; color:#ffcc00; margin:30px 0; font-size:18px; background:#1a1a1a; padding:20px; border-radius:10px; border:2px solid #ffcc00;">لا يوجد معلمون.</p>';
}

// === عرض تفاصيل المعلم في مودال ===
function viewTeacherDetails(id) {
    const teacher = teachers.find(t => t.id === id);
    if (!teacher) {
        alert("❌ لم يتم العثور على المعلم!");
        return;
    }
    
    // تحويل نظام الراتب للعربية
    function getSalaryTypeArabic(type) {
        const types = {
            'monthly': 'شهري',
            'weekly': 'أسبوعي',
            'daily': 'يومي',
            'probation': 'تحت التجربة'
        };
        return types[type] || type || '—';
    }
    
    let html = `
        <div style="background: #0a0a0a; padding: 30px; border-radius: 15px; border: 3px solid #ff3366; max-width: 900px; margin: 0 auto; box-shadow: 0 10px 30px rgba(255, 51, 102, 0.3);">
            <h2 style="text-align: center; color: #ffaa00; margin-bottom: 25px; font-size: 28px; border-bottom: 3px solid #00eaff; padding-bottom: 15px; font-weight: bold;">
                👤 ${teacher.fullName}
            </h2>
            
            <!-- قسم معلومات الدخول -->
            <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">🔐 معلومات الدخول</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #aaa; width: 40%;">👤 اسم المستخدم</td>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #ffaa00; font-weight: bold;">${teacher.username}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; color: #aaa; width: 40%;">🔑 كلمة المرور</td>
                        <td style="padding: 12px; color: #ffaa00; font-weight: bold;">${teacher.password}</td>
                    </tr>
                </table>
            </div>
            
            <!-- قسم المعلومات الشخصية -->
            <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">📝 المعلومات الشخصية</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #aaa; width: 40%;">👤 الاسم الكامل</td>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #ffaa00;">${teacher.fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; color: #aaa; width: 40%;">📱 رقم الهاتف</td>
                        <td style="padding: 12px; color: #ffaa00;">${teacher.phone || '—'}</td>
                    </tr>
                </table>
            </div>
            
            <!-- قسم الراتب -->
            <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">💰 معلومات الراتب</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #aaa; width: 40%;">💵 نظام الراتب</td>
                        <td style="padding: 12px; border-bottom: 1px solid #333; color: #ffaa00;">${getSalaryTypeArabic(teacher.salaryType)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; color: #aaa; width: 40%;">💵 المبلغ المتفق عليه</td>
                        <td style="padding: 12px; color: #ffaa00;">${teacher.agreedAmount || '—'} ريال</td>
                    </tr>
                </table>
            </div>
            
            <!-- قسم المقررات -->
            ${teacher.classesSubjects?.length > 0 ? `
                <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                    <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">📚 المقررات الدراسية</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #1a1a1a;">
                                <th style="padding: 12px; text-align: center; color: #ffaa00; border-bottom: 2px solid #00eaff;">الصف</th>
                                <th style="padding: 12px; text-align: center; color: #ffaa00; border-bottom: 2px solid #00eaff;">الشعبة</th>
                                <th style="padding: 12px; text-align: center; color: #ffaa00; border-bottom: 2px solid #00eaff;">المقرر</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${teacher.classesSubjects.map((cs, index) => `
                                <tr style="background: ${index % 2 === 0 ? '#151515' : '#131313'};">
                                    <td style="padding: 10px; text-align: center; color: #ffaa00; border-bottom: 1px solid #333;">${cs.class}</td>
                                    <td style="padding: 10px; text-align: center; color: #00eaff; border-bottom: 1px solid #333;">${cs.section || '—'}</td>
                                    <td style="padding: 10px; text-align: center; color: #ffaa00; border-bottom: 1px solid #333;">${cs.subject}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            
            <!-- قسم الملاحظات -->
            ${teacher.notes ? `
                <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                    <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">📝 ملاحظات</h3>
                    <div style="color: #ffaa00; line-height: 1.6; padding: 10px;">
                        ${teacher.notes}
                    </div>
                </div>
            ` : ''}
            
            <!-- قسم الحقول المخصصة -->
            ${teacher.customFields && Object.keys(teacher.customFields).length > 0 ? `
                <div style="margin-bottom: 20px; background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                    <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">✨ معلومات إضافية</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${Object.entries(teacher.customFields).map(([key, value], index) => `
                            <tr style="background: ${index % 2 === 0 ? '#151515' : '#131313'};">
                                <td style="padding: 12px; border-bottom: 1px solid #333; color: #aaa; width: 40%;">${key}</td>
                                <td style="padding: 12px; border-bottom: 1px solid #333; color: #ffaa00;">${value || '—'}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            ` : ''}
            
            <!-- قسم معلومات النظام -->
            <div style="background: #111; padding: 20px; border-radius: 10px; border: 2px solid #ff3366;">
                <h3 style="color: #ffaa00; margin-bottom: 15px; font-size: 16px; text-align: center; border-bottom: 2px solid #00eaff; padding-bottom: 10px; font-weight: bold;">📅 معلومات النظام</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    ${teacher.createdAt ? `
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #333; color: #aaa; width: 40%;">📅 تاريخ الإنشاء</td>
                            <td style="padding: 12px; border-bottom: 1px solid #333; color: #ffaa00;">${teacher.createdAt}</td>
                        </tr>
                    ` : ''}
                    ${teacher.lastModified ? `
                        <tr>
                            <td style="padding: 12px; color: #aaa; width: 40%;">🕒 آخر تعديل</td>
                            <td style="padding: 12px; color: #ffaa00;">${teacher.lastModified}</td>
                        </tr>
                    ` : ''}
                </table>
            </div>
        </div>
    `;
    
    const modalData = document.getElementById('modalTeacherData');
    const modal = document.getElementById('teacherModal');
    
    if (modalData && modal) {
        modalData.innerHTML = html;
        modal.style.display = 'flex';
    } else {
        console.error("❌ عناصر المودال غير موجودة في الصفحة!");
        alert("خطأ: عناصر عرض البيانات غير موجودة. تأكد من وجود العناصر المطلوبة في HTML.");
    }
}

// === الحذف ===
function deleteTeacher(id) {
    if (!confirm('هل أنت متأكد من حذف هذا المعلم؟ سيتم نقله إلى سلة المحذوفين.')) return;
    
    const index = teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        const teacher = teachers.splice(index, 1)[0];
        
        // إضافة تاريخ الحذف
        teacher.deletedAt = new Date().toLocaleDateString('ar-EG');
        
        deletedTeachers.push(teacher);
        saveToStorage('teachers', teachers);
        saveToStorage('deletedTeachers', deletedTeachers);
        
        renderTeachersByClass();
        alert('✅ تم نقل المعلم إلى سلة المحذوفين.');
    }
}

// === دالة عرض المعلمين المحذوفين ===
function renderDeletedTeachersTable() {
    const table = document.getElementById('deletedTeachersTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    // التحقق من وجود معلمين محذوفين
    if (!deletedTeachers || deletedTeachers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="padding:40px; text-align:center; color:#aaa; background:#111; border-radius:10px; border:2px solid #ff3366;">
                    <div style="font-size:24px; margin-bottom:15px;">📭</div>
                    <p style="font-size:18px; margin:0;">لا توجد معلمون محذوفون</p>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    
    deletedTeachers.forEach((teacher, index) => {
        const rowBg = index % 2 === 0 ? '#151515' : '#131313';
        const salaryText = teacher.agreedAmount ? `${teacher.agreedAmount} ريال` : '—';
        const dateText = teacher.deletedAt || teacher.createdAt || '—';
        
        html += `
            <tr style="background:${rowBg}; border-bottom:1px solid #333; transition:all 0.3s ease;">
                <td style="padding:10px; text-align:center; color:#fff; border-right:1px solid #333;">${index + 1}</td>
                <td style="padding:10px; text-align:center; color:#ff3366; font-weight:bold; border-right:1px solid #333;">${teacher.fullName}</td>
                <td style="padding:10px; text-align:center; color:#ffcc00; border-right:1px solid #333;">${teacher.phone || '—'}</td>
                <td style="padding:10px; text-align:center; color:#00ff9d; border-right:1px solid #333;">${salaryText}</td>
                <td style="padding:10px; text-align:center; color:#7b68ee; border-right:1px solid #333;">${dateText}</td>
                <td style="padding:10px; text-align:center;">
                    <button class="btn btn-sm" onclick="restoreTeacher(${teacher.id})"
                        style="background:#00eaff; color:#000; border:2px solid #00eaff; padding:8px 16px; margin:2px; border-radius:8px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                        onmouseover="this.style.background='#00ccff'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='#00eaff'; this.style.transform='scale(1)';">
                        🔄 استرجاع
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="permanentlyDeleteTeacher(${teacher.id})"
                        style="background:#ff3366; color:#fff; border:2px solid #ff3366; padding:8px 16px; margin:2px; border-radius:8px; font-weight:bold; cursor:pointer; transition:all 0.3s ease;"
                        onmouseover="this.style.background='#ff0033'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='#ff3366'; this.style.transform='scale(1)';">
                        🗑️ حذف نهائي
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// === دالة الحذف النهائي من سلة المحذوفين ===
function permanentlyDeleteTeacher(id) {
    if (!confirm('⚠️ هل أنت متأكد من الحذف النهائي؟ لن تتمكن من استرجاع هذا المعلم!')) return;
    
    const index = deletedTeachers.findIndex(t => t.id === id);
    if (index !== -1) {
        const teacherName = deletedTeachers[index].fullName;
        deletedTeachers.splice(index, 1);
        saveToStorage('deletedTeachers', deletedTeachers);
        renderDeletedTeachersTable();
        alert(`✅ تم حذف المعلم "${teacherName}" نهائياً`);
    }
}

// === دالة استرجاع المعلم ===
function restoreTeacher(id) {
    const index = deletedTeachers.findIndex(t => t.id === id);
    if (index !== -1) {
        const teacher = deletedTeachers.splice(index, 1)[0];
        teachers.push(teacher);
        saveToStorage('teachers', teachers);
        saveToStorage('deletedTeachers', deletedTeachers);
        renderDeletedTeachersTable();
        renderTeachersByClass();
        alert(`✅ تم استرجاع المعلم "${teacher.fullName}" بنجاح!`);
    }
}

// === الرواتب ===
function toggleAddSalariesMonthForm() {
    const form = document.getElementById('addSalariesMonthForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveSalariesMonth() {
    const monthName = document.getElementById('salariesMonthName').value.trim();
    const year = document.getElementById('salariesYear').value.trim();
    
    if (!monthName || !year) {
        alert('الرجاء إدخال اسم الشهر والسنة.');
        return;
    }
    
    const monthId = `${monthName}-${year}`;
    
    if (salariesMonths.some(m => m.id === monthId)) {
        alert('هذا الشهر مضاف مسبقًا!');
        return;
    }
    
    const currentTeachersSnapshot = teachers.map(t => {
        let previousBalance = 0;
        
        // البحث عن آخر رصيد للمعلم
        for (let i = salariesMonths.length - 1; i >= 0; i--) {
            const record = salariesMonths[i].records.find(r => r.teacherId === t.id);
            if (record) {
                const agreed = parseFloat(record.agreedAmount) || 0;
                const paid = parseFloat(record.amountPaid) || 0;
                previousBalance = agreed - paid + (parseFloat(record.balance) || 0);
                break;
            }
        }
        
        return {
            teacherId: t.id,
            fullName: t.fullName,
            agreedAmount: t.agreedAmount || '0',
            previousBalance: previousBalance
        };
    });
    
    salariesMonths.push({
        id: monthId,
        name: monthName,
        year: year,
        customFields: [],
        records: currentTeachersSnapshot.map(t => ({
            teacherId: t.teacherId,
            fullName: t.fullName,
            agreedAmount: t.agreedAmount,
            paid: false,
            amountPaid: 0,
            date: '',
            balance: t.previousBalance,
            customFields: {}
        }))
    });
    
    saveToStorage('salariesMonths', salariesMonths);
    renderSalariesMonthsList();
    document.getElementById('addSalariesMonthForm').style.display = 'none';
    alert('تم إضافة شهر الرواتب بنجاح مع تحميل الرصيد السابق.');
}

function renderSalariesMonthsList() {
    const container = document.getElementById('salariesMonthsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!Array.isArray(salariesMonths) || salariesMonths.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#aaa; width:100%; padding:40px; font-size:18px; background:#111; border-radius:10px; border:1px solid #333;">لا توجد شهور مضافة.</p>';
        return;
    }
    
    // فرز الشهور حسب السنة ثم الشهر
    const sortedMonths = [...salariesMonths].sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return a.name.localeCompare(b.name);
    });
    
    sortedMonths.forEach(month => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
            display: inline-block;
            text-align: center;
            margin: 10px;
            width: 180px;
            background: #111;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 234, 255, 0.2);
            transition: all 0.3s ease;
            border: 2px solid #00eaff;
        `;
        
        itemDiv.onmouseover = function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 234, 255, 0.4)';
        };
        
        itemDiv.onmouseout = function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 234, 255, 0.2)';
        };
        
        // حساب عدد المعلمين الذين تم دفع رواتبهم
        const paidCount = month.records.filter(r => parseFloat(r.amountPaid) > 0).length;
        const totalCount = month.records.length;
        const progress = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
        
        const btn = document.createElement('button');
        btn.className = 'grid-item';
        btn.style.cssText = `
            width: 100%;
            padding: 20px 10px;
            background: linear-gradient(135deg, #0a0a1a, #0a0a2a);
            color: #00eaff;
            border: none;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        
        btn.innerHTML = `
            <span style="font-size: 20px; color: #00eaff;">📅</span>
            <span>${month.name}</span>
            <span style="font-size: 14px; color: #aaa;">${month.year}</span>
            <div style="width: 100%; height: 4px; background: #333; border-radius: 2px; margin-top: 8px; overflow: hidden;">
                <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, #00eaff, #00ccff);"></div>
            </div>
            <span style="font-size: 12px; color: #00eaff;">${paidCount}/${totalCount} مدفوع</span>
        `;
        
        btn.onclick = () => openSalariesMonth(month.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.style.cssText = `
            width: 100%;
            padding: 8px;
            background: #ff3366;
            color: white;
            border: none;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        deleteBtn.innerHTML = '🗑️ حذف الشهر';
        
        deleteBtn.onmouseover = function() { this.style.background = '#ff0033'; };
        deleteBtn.onmouseout = function() { this.style.background = '#ff3366'; };
        
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm(`هل تريد حذف شهر ${month.name} ${month.year}؟`)) {
                salariesMonths = salariesMonths.filter(m => m.id !== month.id);
                saveToStorage('salariesMonths', salariesMonths);
                renderSalariesMonthsList();
            }
        };
        
        itemDiv.appendChild(btn);
        itemDiv.appendChild(deleteBtn);
        container.appendChild(itemDiv);
    });
}

function openSalariesMonth(monthId) {
    const month = salariesMonths.find(m => m.id === monthId);
    if (!month) return;
    
    document.getElementById('salariesMonthTitle').textContent = `${month.name} ${month.year}`;
    
    const table = document.getElementById('salariesMonthTable');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    
    let headerHtml = `
        <th style="padding: 12px; background: #1a1a1a; color: #00eaff; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">#</th>
        <th style="padding: 12px; background: #1a1a1a; color: #00eaff; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">اسم المعلم</th>
        <th style="padding: 12px; background: #1a1a1a; color: #00ff9d; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">المتفق عليه</th>
        <th style="padding: 12px; background: #1a1a1a; color: #ffcc00; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">المدفوع</th>
        <th style="padding: 12px; background: #1a1a1a; color: #ff6b6b; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">الرصيد</th>
        <th style="padding: 12px; background: #1a1a1a; color: #7b68ee; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">التاريخ</th>
    `;
    
    if (month.customFields && month.customFields.length > 0) {
        month.customFields.forEach((field, index) => {
            const rowColor = index % 2 === 0 ? '#ff3366' : '#ffcc00';
            headerHtml += `
                <th style="padding: 12px; background: #1a1a1a; color: ${rowColor}; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center; position: relative;">
                    ${field.name}
                    <button type="button" class="btn btn-sm btn-danger"
                        onclick="removeCustomField('${monthId}', '${field.name}')"
                        style="position: absolute; top: -8px; left: -8px; padding: 2px 6px; font-size: 12px; border-radius: 50%; background: #ff3366; color: white; border: none; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"
                        onmouseover="this.style.background='#ff0033';"
                        onmouseout="this.style.background='#ff3366';">
                        ×
                    </button>
                </th>
            `;
        });
    }
    
    headerHtml += `<th style="padding: 12px; background: #1a1a1a; color: #4ecdc4; font-weight: bold; border-bottom: 2px solid #00eaff; text-align: center;">الإجراءات</th>`;
    
    thead.innerHTML = headerHtml;
    tbody.innerHTML = '';
    
    month.records.forEach((record, index) => {
        const isPaid = parseFloat(record.amountPaid) > 0;
        const rowBg = index % 2 === 0 ? '#151515' : '#131313';
        
        let rowHtml = `
            <tr style="background: ${rowBg};">
                <td style="padding: 10px; text-align: center; color: #aaa; border-bottom: 1px solid #333;">${index + 1}</td>
                <td style="padding: 10px; text-align: center; color: #00eaff; font-weight: bold; border-bottom: 1px solid #333;">${record.fullName}</td>
                <td style="padding: 10px; text-align: center; color: #00ff9d; font-weight: bold; border-bottom: 1px solid #333;">${record.agreedAmount || '—'} ريال</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                    <input type="number" value="${record.amountPaid}"
                        onchange="updateSalaryRecord('${monthId}', ${record.teacherId}, 'amountPaid', this.value)"
                        min="0" step="0.01"
                        style="width: 100%; max-width: 120px; padding: 8px; background: ${isPaid ? '#0a2a0a' : '#0a0a0a'}; color: ${isPaid ? '#00ff9d' : '#ffcc00'}; border: 2px solid ${isPaid ? '#00ff9d' : '#ffcc00'}; border-radius: 6px; font-weight: bold; text-align: center;"
                        onfocus="this.style.borderColor='${isPaid ? '#00cc7a' : '#ff9900'}'; this.style.boxShadow='0 0 10px ${isPaid ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 204, 0, 0.3)'}';"
                        onblur="this.style.borderColor='${isPaid ? '#00ff9d' : '#ffcc00'}'; this.style.boxShadow='none';" />
                </td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                    <input type="number" value="${record.balance}"
                        onchange="updateSalaryRecord('${monthId}', ${record.teacherId}, 'balance', this.value)"
                        min="0" step="0.01"
                        style="width: 100%; max-width: 120px; padding: 8px; background: #0a0a0a; color: #ff6b6b; border: 2px solid #ff6b6b; border-radius: 6px; font-weight: bold; text-align: center;"
                        onfocus="this.style.borderColor='#ff0000'; this.style.boxShadow='0 0 10px rgba(255, 107, 107, 0.3)';"
                        onblur="this.style.borderColor='#ff6b6b'; this.style.boxShadow='none';" />
                </td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                    <input type="date" value="${record.date}"
                        onchange="updateSalaryRecord('${monthId}', ${record.teacherId}, 'date', this.value)"
                        style="width: 100%; max-width: 140px; padding: 8px; background: #0a0a0a; color: #7b68ee; border: 2px solid #7b68ee; border-radius: 6px; text-align: center;"
                        onfocus="this.style.borderColor='#4b0082'; this.style.boxShadow='0 0 10px rgba(123, 104, 238, 0.3)';"
                        onblur="this.style.borderColor='#7b68ee'; this.style.boxShadow='none';" />
                </td>
        `;
        
        if (month.customFields && month.customFields.length > 0) {
            month.customFields.forEach((field, fieldIndex) => {
                const rowColor = fieldIndex % 2 === 0 ? '#ff3366' : '#ffcc00';
                const fieldValue = record.customFields?.[field.name] || '';
                
                rowHtml += `
                    <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                        <input type="text" value="${fieldValue}"
                            onchange="updateCustomFieldValue('${monthId}', ${record.teacherId}, '${field.name}', this.value)"
                            placeholder="${field.name}"
                            style="width: 100%; padding: 8px; background: #0a0a0a; color: ${rowColor}; border: 2px solid ${rowColor}; border-radius: 6px; text-align: center;"
                            onfocus="this.style.borderColor='${rowColor === '#ff3366' ? '#ff0033' : '#ff9900'}'; this.style.boxShadow='0 0 10px ${rowColor === '#ff3366' ? 'rgba(255, 51, 102, 0.3)' : 'rgba(255, 204, 0, 0.3)'}';"
                            onblur="this.style.borderColor='${rowColor}'; this.style.boxShadow='none';" />
                    </td>
                `;
            });
        }
        
        rowHtml += `
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #333;">
                    <button class="btn btn-sm" onclick="viewSalaryReceipt('${monthId}', ${record.teacherId})"
                        style="background: #00eaff; color: #000; border: 2px solid #00eaff; padding: 6px 12px; margin: 2px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#00ccff'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='#00eaff'; this.style.transform='scale(1)';">
                        👁️ عرض
                    </button>
                    <button class="btn btn-sm" onclick="printSalaryReceipt('${monthId}', ${record.teacherId})"
                        style="background: #00ff9d; color: #000; border: 2px solid #00ff9d; padding: 6px 12px; margin: 2px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#00cc7a'; this.style.transform='scale(1.05)';"
                        onmouseout="this.style.background='#00ff9d'; this.style.transform='scale(1)';">
                        🖨️ سند
                    </button>
                </td>
            </tr>
        `;
        
        tbody.innerHTML += rowHtml;
    });
    
    const container = document.getElementById('salariesMonthTableContainer');
    const existingBtn = container.querySelector('.add-custom-field-btn');
    if (existingBtn) existingBtn.remove();
    
    const addFieldBtn = document.createElement('button');
    addFieldBtn.className = 'btn add-custom-field-btn';
    addFieldBtn.style.cssText = `
        margin-top: 15px;
        padding: 12px 25px;
        background: #7b68ee;
        color: white;
        border: 2px solid #7b68ee;
        border-radius: 10px;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;
    addFieldBtn.innerHTML = '➕ إضافة حقل مخصص';
    
    addFieldBtn.onmouseover = function() {
        this.style.background = '#4b0082';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(123, 104, 238, 0.4)';
    };
    
    addFieldBtn.onmouseout = function() {
        this.style.background = '#7b68ee';
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    };
    
    addFieldBtn.onclick = () => addCustomFieldToMonth(monthId);
    
    container.insertBefore(addFieldBtn, table.parentElement);
    container.style.display = 'block';
}

// === تحديث سجل الراتب (المبلغ، التاريخ، الرصيد) ===
function updateSalaryRecord(monthId, teacherId, field, value) {
    const month = salariesMonths.find(m => m.id === monthId);
    if (month) {
        const record = month.records.find(r => r.teacherId === teacherId);
        if (record) {
            record[field] = field === 'amountPaid' || field === 'balance' ? parseFloat(value) || 0 : value;
            saveToStorage('salariesMonths', salariesMonths);
        }
    }
}

// === 🌟 إضافة حقل مخصص للشهر ===
function addCustomFieldToMonth(monthId) {
    const fieldName = prompt("أدخل اسم الحقل (مثل: بدل سكن):");
    if (!fieldName) return;
    
    const month = salariesMonths.find(m => m.id === monthId);
    if (!month) return;
    
    if (!month.customFields) month.customFields = [];
    
    if (month.customFields.some(f => f.name === fieldName)) {
        alert('هذا الحقل موجود مسبقًا!');
        return;
    }
    
    month.customFields.push({ name: fieldName });
    
    month.records.forEach(record => {
        if (!record.customFields) record.customFields = {};
        record.customFields[fieldName] = '';
    });
    
    saveToStorage('salariesMonths', salariesMonths);
    openSalariesMonth(monthId);
}


// === 💾 تحديث قيمة حقل مخصص لسجل معين ===
function updateCustomFieldValue(monthId, teacherId, fieldName, value) {
    const month = salariesMonths.find(m => m.id === monthId);
    if (month) {
        const record = month.records.find(r => r.teacherId === teacherId);
        if (record) {
            if (!record.customFields) record.customFields = {};
            record.customFields[fieldName] = value;
            saveToStorage('salariesMonths', salariesMonths);
        }
    }
}
// === عرض سند الراتب في مودال (بدون طباعة) ===
function viewSalaryReceipt(monthId, teacherId) {
    const month = salariesMonths.find(m => m.id === monthId);
    const record = month?.records.find(r => r.teacherId === teacherId);
    
    if (!record) {
        alert("❌ لم يتم العثور على بيانات السند!");
        return;
    }
    
    const agreed = parseFloat(record.agreedAmount) || 0;
    const paid = parseFloat(record.amountPaid) || 0;
    const status = paid > 0 ? '✅ مدفوع' : '❌ غير مدفوع';
    const statusColor = paid > 0 ? '#28a745' : '#dc3545';
    const statusBg = paid > 0 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)';
    
    // حساب الخصومات والإكراميات
    const teacherDeductions = (deductionsAndBonuses || []).filter(d =>
        d.teacherId === teacherId && d.monthId === monthId && d.type === 'deduction'
    );
    
    const teacherBonuses = (deductionsAndBonuses || []).filter(d =>
        d.teacherId === teacherId && d.monthId === monthId && d.type === 'bonus'
    );
    
    const totalDeductions = teacherDeductions.reduce((sum, d) => sum + d.amount, 0);
    const totalBonuses = teacherBonuses.reduce((sum, b) => sum + b.amount, 0);
    
    // حساب الصافي والمتبقي
    const netAmount = agreed - totalDeductions + totalBonuses;
    const remaining = Math.max(0, netAmount - paid);
    
    // إنشاء سند احترافي للمعاينة
    let receiptHTML = `
    <div style="background: white; padding: 30px; border-radius: 15px; max-width: 850px; margin: 0 auto; box-shadow: 0 0 40px rgba(0,0,0,0.3); position: relative; color: #000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #ddd;">
        <!-- خلفية مائية -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; font-weight: bold; color: rgba(200, 200, 200, 0.1); pointer-events: none; z-index: -1;">
            ${status.toUpperCase()}
        </div>
        
        <!-- رأس السند -->
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px double #333; padding-bottom: 15px;">
            <div style="background: linear-gradient(135deg, #1a3a6c, #0d2a5c); color: white; padding: 10px 25px; border-radius: 25px; display: inline-block; margin-bottom: 12px; font-weight: bold; letter-spacing: 1.5px; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
                🏫 وزارة التربية والتعليم
            </div>
            <h1 style="color: #1a1a1a; font-size: 28px; margin: 10px 0; font-weight: bold; letter-spacing: 1px; text-shadow: 1px 1px 3px rgba(0,0,0,0.1);">
                مدرسة الفاخر النموذجية
            </h1>
            <div style="color: #555; font-size: 15px; margin-top: 8px;">
                📍 شارع التعليم، الرياض، المملكة العربية السعودية
            </div>
            <div style="color: #555; font-size: 15px; margin-top: 5px;">
                📞 011-1234567 | 📧 info@alschool.edu.sa
            </div>
        </div>
        
        <!-- عنوان السند -->
        <div style="text-align: center; margin-bottom: 25px; background: #f8f9fa; padding: 18px; border: 2px solid #333; border-radius: 10px; position: relative;">
            <div style="position: absolute; top: -12px; left: 20px; background: white; padding: 0 12px; font-size: 15px; color: #333; font-weight: bold; border: 1px solid #333; border-radius: 15px;">سند صرف راتب</div>
            <div style="position: absolute; top: -12px; right: 20px; background: white; padding: 0 12px; font-size: 15px; color: #333; font-weight: bold; border: 1px solid #333; border-radius: 15px;">التاريخ: ${new Date().toLocaleDateString('ar-EG')}</div>
            <h2 style="color: #1a1a1a; font-size: 26px; margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                📄 سند صرف راتب رسمي
            </h2>
        </div>
        
        <!-- معلومات المعلم -->
        <div style="background: #f9f9f9; padding: 22px; border: 2px solid #333; border-radius: 10px; margin-bottom: 22px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px; width: 30%; background: #e9ecef; border: 1px solid #333; font-weight: bold; text-align: center; border-radius: 6px 0 0 6px;">اسم المعلم</td>
                    <td style="padding: 12px; width: 70%; border: 1px solid #333; text-align: center; font-size: 18px; font-weight: bold; color: #1a1a1a; background: white; border-radius: 0 6px 6px 0;">${record.fullName}</td>
                </tr>
                <tr style="margin-top: 10px;">
                    <td style="padding: 12px; background: #e9ecef; border: 1px solid #333; font-weight: bold; text-align: center; border-radius: 6px 0 0 6px;">الشهر والسنة</td>
                    <td style="padding: 12px; border: 1px solid #333; text-align: center; font-size: 17px; color: #495057; background: white; border-radius: 0 6px 6px 0;">${month.name} ${month.year}</td>
                </tr>
                <tr style="margin-top: 10px;">
                    <td style="padding: 12px; background: #e9ecef; border: 1px solid #333; font-weight: bold; text-align: center; border-radius: 6px 0 0 6px;">تاريخ الصرف</td>
                    <td style="padding: 12px; border: 1px solid #333; text-align: center; font-size: 17px; color: #495057; background: white; border-radius: 0 6px 6px 0;">${record.date || '—'}</td>
                </tr>
            </table>
        </div>
        
        <!-- تفاصيل الراتب -->
        <div style="background: #f9f9f9; padding: 22px; border: 2px solid #333; border-radius: 10px; margin-bottom: 22px;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #343a40; color: white;">
                        <th style="padding: 14px; border: 1px solid white; text-align: center; font-weight: bold; font-size: 16px;">البيان</th>
                        <th style="padding: 14px; border: 1px solid white; text-align: center; font-weight: bold; font-size: 16px;">المبلغ (ريال)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; background: white;">المبلغ المتفق عليه</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: #1a1a1a; background: white;">${agreed.toLocaleString()}</td>
                    </tr>
                    ${totalDeductions > 0 ? `
                    <tr style="background: #fff5f5;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; color: #dc3545;">إجمالي الخصومات</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: #dc3545;">${totalDeductions.toLocaleString()}</td>
                    </tr>
                    ` : ''}
                    ${totalBonuses > 0 ? `
                    <tr style="background: #f0fff4;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; color: #28a745;">إجمالي الإكراميات</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: #28a745;">${totalBonuses.toLocaleString()}</td>
                    </tr>
                    ` : ''}
                    <tr style="background: #e7f3ff;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; color: #0066cc;">صافي الراتب</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 21px; font-weight: bold; color: #0066cc;">${netAmount.toLocaleString()}</td>
                    </tr>
                    <tr style="background: white;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold;">المبلغ المدفوع</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: ${paid > 0 ? '#28a745' : '#dc3545'};">${paid.toLocaleString()}</td>
                    </tr>
                    ${remaining > 0 ? `
                    <tr style="background: #fff8e1;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; color: #ffc107;">المتبقي</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: #ffc107;">${remaining.toLocaleString()}</td>
                    </tr>
                    ` : `
                    <tr style="background: #f0fff4;">
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-weight: bold; color: #28a745;">المتبقي</td>
                        <td style="padding: 13px; border: 1px solid #333; text-align: center; font-size: 19px; font-weight: bold; color: #28a745;">لم يبقَ شيء</td>
                    </tr>
                    `}
                </tbody>
            </table>
        </div>
        
        <!-- جدول الخصومات (إذا وجدت) -->
        ${teacherDeductions.length > 0 ? `
        <div style="background: #fff5f5; padding: 22px; border: 2px solid #dc3545; border-radius: 10px; margin-bottom: 22px;">
            <h3 style="color: #dc3545; text-align: center; margin-bottom: 18px; font-size: 20px; border-bottom: 2px solid #dc3545; padding-bottom: 12px; font-weight: bold;">قائمة الخصومات</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #dc3545; color: white;">
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">التاريخ</th>
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">المبلغ (ريال)</th>
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">السبب</th>
                        ${teacherDeductions[0].customFields && Object.keys(teacherDeductions[0].customFields).length > 0 ?
                    Object.keys(teacherDeductions[0].customFields).map(field => `<th style="padding: 12px; border: 1px solid white; text-align: center;">${field}</th>`).join('') : ''}
                    </tr>
                </thead>
                <tbody>
                    ${teacherDeductions.map(deduction => `
                    <tr style="background: white;">
                        <td style="padding: 10px; border: 1px solid #dc3545; text-align: center; color: #dc3545; font-weight: 500;">${deduction.date}</td>
                        <td style="padding: 10px; border: 1px solid #dc3545; text-align: center; font-weight: bold; color: #dc3545;">${deduction.amount.toLocaleString()}</td>
                        <td style="padding: 10px; border: 1px solid #dc3545; text-align: center; color: #495057;">${deduction.reason || '—'}</td>
                        ${deduction.customFields ?
                    Object.values(deduction.customFields).map(value => `<td style="padding: 10px; border: 1px solid #dc3545; text-align: center; color: #495057;">${value || '—'}</td>`).join('') : ''}
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : ''}
        
        <!-- جدول الإكراميات (إذا وجدت) -->
        ${teacherBonuses.length > 0 ? `
        <div style="background: #f0fff4; padding: 22px; border: 2px solid #28a745; border-radius: 10px; margin-bottom: 22px;">
            <h3 style="color: #28a745; text-align: center; margin-bottom: 18px; font-size: 20px; border-bottom: 2px solid #28a745; padding-bottom: 12px; font-weight: bold;">قائمة الإكراميات</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #28a745; color: white;">
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">التاريخ</th>
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">المبلغ (ريال)</th>
                        <th style="padding: 12px; border: 1px solid white; text-align: center;">السبب</th>
                        ${teacherBonuses[0].customFields && Object.keys(teacherBonuses[0].customFields).length > 0 ?
                    Object.keys(teacherBonuses[0].customFields).map(field => `<th style="padding: 12px; border: 1px solid white; text-align: center;">${field}</th>`).join('') : ''}
                    </tr>
                </thead>
                <tbody>
                    ${teacherBonuses.map(bonus => `
                    <tr style="background: white;">
                        <td style="padding: 10px; border: 1px solid #28a745; text-align: center; color: #28a745; font-weight: 500;">${bonus.date}</td>
                        <td style="padding: 10px; border: 1px solid #28a745; text-align: center; font-weight: bold; color: #28a745;">${bonus.amount.toLocaleString()}</td>
                        <td style="padding: 10px; border: 1px solid #28a745; text-align: center; color: #495057;">${bonus.reason || '—'}</td>
                        ${bonus.customFields ?
                    Object.values(bonus.customFields).map(value => `<td style="padding: 10px; border: 1px solid #28a745; text-align: center; color: #495057;">${value || '—'}</td>`).join('') : ''}
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : ''}
        
        <!-- حالة الدفع -->
        <div style="background: ${statusBg}; padding: 20px; border: 2px solid ${statusColor}; border-radius: 10px; margin-bottom: 25px; text-align: center;">
            <span style="color: ${statusColor}; font-size: 26px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; display: inline-block; padding: 12px 35px; background: white; border-radius: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                ${status}
            </span>
        </div>
        
        <!-- التوقيعات -->
        <div style="display: flex; justify-content: space-between; margin-top: 45px; padding-top: 25px; border-top: 2px solid #333;">
            <div style="flex: 1; text-align: center; padding: 10px;">
                <div style="height: 90px; border-bottom: 3px solid #333; margin-bottom: 12px;"></div>
                <div style="font-weight: bold; color: #1a1a1a; font-size: 17px;">ختم المدرسة</div>
            </div>
            <div style="flex: 1; text-align: center; padding: 10px;">
                <div style="height: 90px; border-bottom: 3px solid #333; margin-bottom: 12px;"></div>
                <div style="font-weight: bold; color: #1a1a1a; font-size: 17px;">المحاسب</div>
            </div>
            <div style="flex: 1; text-align: center; padding: 10px;">
                <div style="height: 90px; border-bottom: 3px solid #333; margin-bottom: 12px;"></div>
                <div style="font-weight: bold; color: #1a1a1a; font-size: 17px;">المدير</div>
            </div>
        </div>
        
        <!-- تذييل السند -->
        <div style="margin-top: 35px; padding-top: 22px; border-top: 3px double #333; text-align: center; color: #555; font-size: 15px;">
            <div style="margin-bottom: 8px; font-weight: bold; color: #1a1a1a;">هذا السند صالح للصرف من البنك المحدد</div>
            <div style="font-size: 16px; color: #1a1a1a; font-weight: bold;">شكراً لخدمتكم 🙏 | مدرسة الفاخر النموذجية</div>
        </div>
    </div>
    `;
    
    // عرض السند في المودال
    const modalData = document.getElementById('modalTeacherData');
    const modal = document.getElementById('teacherModal');
    
    if (modalData && modal) {
        modalData.innerHTML = receiptHTML;
        modal.style.display = 'flex';
    } else {
        console.error("❌ عناصر المودال غير موجودة في الصفحة!");
        alert("خطأ: عناصر عرض البيانات غير موجودة. تأكد من وجود العناصر المطلوبة في HTML.");
    }
}
// === طباعة سند الراتب (صفحة واحدة فقط) ===
function printSalaryReceipt(monthId, teacherId) {
    const month = salariesMonths.find(m => m.id === monthId);
    const record = month?.records.find(r => r.teacherId === teacherId);
    
    if (!record) {
        alert("❌ لم يتم العثور على بيانات السند!");
        return;
    }
    
    const agreed = parseFloat(record.agreedAmount) || 0;
    const paid = parseFloat(record.amountPaid) || 0;
    const status = paid > 0 ? '✅ مدفوع' : '❌ غير مدفوع';
    
    // حساب الخصومات والإكراميات
    const teacherDeductions = (deductionsAndBonuses || []).filter(d =>
        d.teacherId === teacherId && d.monthId === monthId && d.type === 'deduction'
    );
    
    const teacherBonuses = (deductionsAndBonuses || []).filter(d =>
        d.teacherId === teacherId && d.monthId === monthId && d.type === 'bonus'
    );
    
    const totalDeductions = teacherDeductions.reduce((sum, d) => sum + d.amount, 0);
    const totalBonuses = teacherBonuses.reduce((sum, b) => sum + b.amount, 0);
    
    // حساب الصافي والمتبقي
    const netAmount = agreed - totalDeductions + totalBonuses;
    const remaining = Math.max(0, netAmount - paid);
    
    // إنشاء سند احترافي للطباعة (صفحة واحدة)
    const printHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>سند صرف راتب - ${record.fullName}</title>
        <style>
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                    background: white !important;
                }
                .no-print {
                    display: none !important;
                }
                @page {
                    size: A4;
                    margin: 1cm; /* تقليل الهوامش للطباعة */
                }
                /* ضمان أن كل شيء في صفحة واحدة */
                body, html {
                    overflow: hidden !important;
                }
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                background: #f5f5f5;
                padding: 10px;
                color: #000;
            }
            
            .receipt-container {
                max-width: 794px; /* عرض صفحة A4 بالبكسل */
                margin: 0 auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
                position: relative;
                color: #000;
            }
            
            .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 100px;
                font-weight: bold;
                color: rgba(220, 53, 69, 0.05);
                pointer-events: none;
                z-index: -1;
            }
            
            .header {
                text-align: center;
                margin-bottom: 15px;
                border-bottom: 2px double #333;
                padding-bottom: 10px;
            }
            
            .school-name {
                font-size: 22px;
                font-weight: bold;
                color: #1a1a1a;
                margin: 5px 0;
                letter-spacing: 0.5px;
            }
            
            .school-subtitle {
                font-size: 15px;
                color: #555;
                margin: 3px 0;
            }
            
            .school-info {
                font-size: 12px;
                color: #666;
                margin: 2px 0;
            }
            
            .receipt-title {
                text-align: center;
                margin: 15px 0 12px;
                background: #f0f0f0;
                padding: 12px;
                border: 1px solid #333;
                border-radius: 5px;
                position: relative;
            }
            
            .receipt-title h1 {
                color: #1a1a1a;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 1px;
                margin: 0;
            }
            
            .date-badge, .receipt-number {
                position: absolute;
                top: -10px;
                padding: 0 8px;
                font-size: 11px;
                font-weight: bold;
                color: #333;
                background: white;
                border: 1px solid #333;
                border-radius: 10px;
            }
            
            .date-badge { left: 10px; }
            .receipt-number { right: 10px; }
            
            .teacher-info, .salary-details, .deductions-section, .bonuses-section {
                background: #f9f9f9;
                padding: 15px;
                border: 1px solid #333;
                border-radius: 5px;
                margin-bottom: 12px;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
            }
            
            .info-item {
                padding: 8px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .info-label {
                font-size: 12px;
                color: #666;
                font-weight: bold;
                margin-bottom: 3px;
            }
            
            .info-value {
                font-size: 14px;
                color: #1a1a1a;
                font-weight: bold;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 8px;
            }
            
            th {
                background: #333;
                color: white;
                padding: 8px;
                text-align: center;
                font-weight: bold;
                border: 1px solid white;
                font-size: 13px;
            }
            
            td {
                padding: 6px;
                text-align: center;
                border: 1px solid #333;
                font-size: 13px;
            }
            
            tr:nth-child(even) {
                background: #f5f5f5;
            }
            
            .highlight-row {
                background: #e7f3ff !important;
                font-weight: bold;
                font-size: 14px;
            }
            
            .deduction-row {
                background: #ffecec !important;
                color: #dc3545;
                font-weight: bold;
            }
            
            .bonus-row {
                background: #e6fff0 !important;
                color: #28a745;
                font-weight: bold;
            }
            
            .paid-row {
                background: #e8f4ff !important;
                color: #0066cc;
                font-weight: bold;
            }
            
            .remaining-row {
                background: #fff5e6 !important;
                color: #ff6600;
                font-weight: bold;
                font-size: 14px;
            }
            
            .section-title {
                text-align: center;
                color: #1a1a1a;
                margin-bottom: 12px;
                font-size: 16px;
                font-weight: bold;
                border-bottom: 1px solid #333;
                padding-bottom: 6px;
            }
            
            .deductions-section .section-title { color: #dc3545; }
            .bonuses-section .section-title { color: #28a745; }
            
            .payment-status {
                background: ${paid > 0 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
                padding: 15px;
                border: 1px solid ${paid > 0 ? '#28a745' : '#dc3545'};
                border-radius: 5px;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .status-badge {
                display: inline-block;
                padding: 8px 20px;
                background: ${paid > 0 ? '#28a745' : '#dc3545'};
                color: white;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
                border-radius: 5px;
                text-transform: uppercase;
                margin: 5px 0;
            }
            
            .signatures {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-top: 25px;
                padding-top: 15px;
                border-top: 1px solid #333;
            }
            
            .signature-box {
                text-align: center;
            }
            
            .signature-line {
                height: 2px;
                background: #333;
                margin-bottom: 6px;
            }
            
            .signature-label {
                font-weight: bold;
                color: #1a1a1a;
                font-size: 13px;
            }
            
            .footer {
                margin-top: 20px;
                padding-top: 12px;
                border-top: 2px double #333;
                text-align: center;
                color: #666;
                font-size: 12px;
            }
            
            .footer-note {
                font-weight: bold;
                color: #1a1a1a;
                margin-bottom: 3px;
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="watermark">${status.toUpperCase()}</div>
            
            <!-- رأس السند -->
            <div class="header">
                <div class="school-name">مدرسة الفاخر النموذجية</div>
                <div class="school-subtitle">إدارة التعليم - وزارة التربية والتعليم</div>
                <div class="school-info">📍 شارع التعليم، الرياض، المملكة العربية السعودية</div>
                <div class="school-info">📞 011-1234567 | 📧 info@alschool.edu.sa</div>
            </div>
            
            <!-- عنوان السند -->
            <div class="receipt-title">
                <div class="date-badge">التاريخ: ${new Date().toLocaleDateString('ar-EG')}</div>
                <div class="receipt-number">الشهر: ${month.name} ${month.year}</div>
                <h1>📄 سند صرف راتب رسمي</h1>
            </div>
            
            <!-- معلومات المعلم -->
            <div class="teacher-info">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">اسم المعلم</div>
                        <div class="info-value">${record.fullName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">الشهر والسنة</div>
                        <div class="info-value">${month.name} ${month.year}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">تاريخ الصرف</div>
                        <div class="info-value">${record.date || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">الرقم الوظيفي</div>
                        <div class="info-value">${teacherId}</div>
                    </div>
                </div>
            </div>
            
            <!-- تفاصيل الراتب -->
            <div class="salary-details">
                <h3 class="section-title">📊 تفاصيل الراتب</h3>
                <table>
                    <thead>
                        <tr>
                            <th>البيان</th>
                            <th>المبلغ (ريال)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>المبلغ المتفق عليه</td>
                            <td>${agreed.toLocaleString()}</td>
                        </tr>
                        ${totalDeductions > 0 ? `
                        <tr class="deduction-row">
                            <td>إجمالي الخصومات</td>
                            <td>${totalDeductions.toLocaleString()}</td>
                        </tr>
                        ` : ''}
                        ${totalBonuses > 0 ? `
                        <tr class="bonus-row">
                            <td>إجمالي الإكراميات</td>
                            <td>${totalBonuses.toLocaleString()}</td>
                        </tr>
                        ` : ''}
                        <tr class="highlight-row">
                            <td>صافي الراتب</td>
                            <td>${netAmount.toLocaleString()}</td>
                        </tr>
                        <tr class="paid-row">
                            <td>المبلغ المدفوع</td>
                            <td>${paid.toLocaleString()}</td>
                        </tr>
                        ${remaining > 0 ? `
                        <tr class="remaining-row">
                            <td>المتبقي</td>
                            <td>${remaining.toLocaleString()}</td>
                        </tr>
                        ` : `
                        <tr class="remaining-row">
                            <td>المتبقي</td>
                            <td>لم يبقَ شيء</td>
                        </tr>
                        `}
                    </tbody>
                </table>
            </div>
            
            <!-- جدول الخصومات (إذا وجدت) -->
            ${teacherDeductions.length > 0 ? `
            <div class="deductions-section">
                <h3 class="section-title">قائمة الخصومات</h3>
                <table>
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>المبلغ (ريال)</th>
                            <th>السبب</th>
                            ${teacherDeductions[0].customFields && Object.keys(teacherDeductions[0].customFields).length > 0 ?
                    Object.keys(teacherDeductions[0].customFields).map(field => `<th>${field}</th>`).join('') : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${teacherDeductions.map(deduction => `
                        <tr>
                            <td>${deduction.date}</td>
                            <td>${deduction.amount.toLocaleString()}</td>
                            <td>${deduction.reason || '—'}</td>
                            ${deduction.customFields ?
                    Object.values(deduction.customFields).map(value => `<td>${value || '—'}</td>`).join('') : ''}
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : ''}
            
            <!-- جدول الإكراميات (إذا وجدت) -->
            ${teacherBonuses.length > 0 ? `
            <div class="bonuses-section">
                <h3 class="section-title">قائمة الإكراميات</h3>
                <table>
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>المبلغ (ريال)</th>
                            <th>السبب</th>
                            ${teacherBonuses[0].customFields && Object.keys(teacherBonuses[0].customFields).length > 0 ?
                    Object.keys(teacherBonuses[0].customFields).map(field => `<th>${field}</th>`).join('') : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${teacherBonuses.map(bonus => `
                        <tr>
                            <td>${bonus.date}</td>
                            <td>${bonus.amount.toLocaleString()}</td>
                            <td>${bonus.reason || '—'}</td>
                            ${bonus.customFields ?
                    Object.values(bonus.customFields).map(value => `<td>${value || '—'}</td>`).join('') : ''}
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ` : ''}
            
            <!-- حالة الدفع -->
            <div class="payment-status">
                <div class="status-badge">${status}</div>
                <p style="margin: 5px 0; font-size: 13px;">
                    ${paid > 0 ? '✓ تم صرف الراتب بنجاح' : '⚠️ لم يتم صرف الراتب بعد'}
                </p>
            </div>
            
            <!-- التوقيعات -->
            <div class="signatures">
                <div class="signature-box">
                    <div style="height: 50px;"></div>
                    <div class="signature-line"></div>
                    <div class="signature-label">ختم المدرسة</div>
                </div>
                <div class="signature-box">
                    <div style="height: 50px;"></div>
                    <div class="signature-line"></div>
                    <div class="signature-label">المحاسب</div>
                </div>
                <div class="signature-box">
                    <div style="height: 50px;"></div>
                    <div class="signature-line"></div>
                    <div class="signature-label">المدير</div>
                </div>
            </div>
            
            <!-- تذييل السند -->
            <div class="footer">
                <div class="footer-note">شكراً لخدمتكم 🙏</div>
                <div>هذا السند صالح للصرف من البنك المحدد</div>
                <div style="margin-top: 5px; font-size: 10px; color: #999;">
                    نظام إدارة الموارد البشرية - مدرسة الفاخر النموذجية
                </div>
            </div>
        </div>
        
        <script>
            window.onload = function() {
                window.print();
                setTimeout(function() {
                    window.close();
                }, 1000);
            };
        </script>
    </body>
    </html>
    `;
    
    // فتح نافذة جديدة للطباعة
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    printWindow.document.write(printHTML);
    printWindow.document.close();
}

// ========================================
// === نظام إضافة الدرجات والملاحظات ===
// ========================================
// ✅ هذا هو الصحيح:
let customAttendanceFields = [];
let attendanceData = loadFromStorage('attendanceData') || {};
let weeklyAttendanceData = loadFromStorage('weeklyAttendanceData') || {};
let monthlyAttendanceData = loadFromStorage('monthlyAttendanceData') || {};
// ========================================
// === نظام إضافة الدرجات والملاحظات المتكامل ===
// ========================================
// === متغيرات النظام ===
let currentGradeClass = '';
let currentGradeSection = '';
let currentGradeSubject = '';
let currentStudentId = '';
let currentStudentName = '';
let customGradeFields = [];

// ========================================
// === 🆕 دالة العودة للوحة التحكم الرئيسية ===
// ========================================
function returnToDashboard() {
    // إظهار لوحة التحكم
    const dashboard = document.getElementById('teacherDashboardPage');
    if (dashboard) dashboard.style.display = 'block';
    
    // إخفاء جميع صفحات النظام
    const pages = ['gradeClassSelectPage', 'gradeStudentsListPage', 'gradeTypeSelectPage', 
                   'dailyGradeFormPage', 'weeklyGradeFormPage', 'monthlyGradeFormPage'];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // تمرير للأعلى
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === 🆕 دالة عرض جدول الملاحظات اليومية (في نفس الصفحة - متجاوب) ===
function openDailyGradeForm() {
if (!window.customGradeFields) window.customGradeFields = [];
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
document.getElementById('dailyGradeFormContent').innerHTML = `
<div style="background:#1a1a1a;padding:20px;border-radius:12px;border:2px solid #00ff9d;margin-bottom:20px">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
<h3 style="color:#00ff9d;margin:0;font-size:clamp(16px, 4vw, 20px)">📅 الملاحظات اليومية</h3>
<button onclick="addCustomGradeField()"
style="background:#7b68ee;color:white;border:none;width:35px;height:35px;border-radius:50%;font-weight:bold;cursor:pointer;font-size:18px">+</button>
</div>
<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
<table id="dailyGradeTable" style="width:100%;border-collapse:collapse;min-width:600px">
<thead>

<tr style="background:#111;border-bottom:2px solid #00eaff">
<th style="padding:12px;text-align:center;color:#fff;font-size:14px">#</th>
<th style="padding:12px;text-align:center;color:#00eaff;font-size:14px">اسم الطالب</th>
<th style="padding:12px;text-align:center;color:#00ff9d;font-size:14px">الحضور</th>
<th id="customFieldsHeader"></th>
</tr>
</thead>
// في دالة openDailyGradeForm، تأكد من وجود هذا السطر:
<select id="quickClassSelect" onchange="changeCurrentClass(this.value)" ...>

<tbody id="dailyGradeTableBody"></tbody>
</table>
</div>
<div style="margin-top:20px;text-align:center">
<button onclick="saveDailyGradesAndGoWeekly()"
style="background:#00ff9d;color:#000;border:2px solid #00ff9d;padding:12px 30px;border-radius:10px;font-weight:bold;width:100%;max-width:300px;font-size:16px">
💾 حفظ والانتقال للأسبوعي
</button>
</div>
</div>`;


// إظهار المحتوى في نفس الصفحة
document.getElementById('gradeClassSelectPage').style.display = 'none';
document.getElementById('gradeStudentsListPage').style.display = 'none';
document.getElementById('gradeTypeSelectPage').style.display = 'none';
document.getElementById('dailyGradeFormPage').style.display = 'block';
document.getElementById('weeklyGradeFormPage').style.display = 'none';
document.getElementById('monthlyGradeFormPage').style.display = 'none';
}

// === 1️⃣ فتح صفحة إضافة الدرجات (معدل - مباشر للأيام) ===
function openGradeClassSelectPage() {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.type !== 'teacher') {
showAlert('⚠️ تنبيه', 'يجب تسجيل الدخول كمعلم أولاً!', 'warning');
return;
}
const teachers = loadFromStorage('teachers') || [];
const teacher = teachers.find(t => t.id === currentUser.id);
if (!teacher || !teacher.classesSubjects || teacher.classesSubjects.length === 0) {
showAlert('⚠️ تنبيه', 'ليس لديك صفوف مخصصة! تواصل مع الإدارة.', 'warning');
return;
}

// ✅ إخفاء لوحة التحكم الرئيسية
document.getElementById('teacherDashboardPage').style.display = 'none';

// 🎯 اختيار أول مقرر افتراضياً
const firstClass = teacher.classesSubjects[0];
currentGradeClass = firstClass.class;
currentGradeSection = firstClass.section;
currentGradeSubject = firstClass.subject;

// 🎯 الانتقال المباشر لصفحة الأيام
openDailyGradeForm();
}

// === 2️⃣ تحميل الطلاب وعرض جدول الملاحظات اليومية مباشرة ===
function loadStudentsForGrades() {
const select = document.getElementById('gradeClassSelect');
if (!select || !select.value) return;
const [className, section, subject] = select.value.split('|');
currentGradeClass = className;
currentGradeSection = section;
currentGradeSubject = subject;
// 🎯 الانتقال المباشر لصفحة الملاحظات اليومية
openDailyGradeForm();
}

// === 🆕 متغيرات الجداول المخصصة ===
let customTables = loadFromStorage('customTables') || {};
let currentCustomTableName = '';

// === 🆕 فتح منشئ الجداول المخصصة ===
function openCustomTableCreator() {
const tableName = prompt('✏️ أدخل اسم الجدول الجديد (مثال: درجات الاختبار القصير، ملاحظات السلوك):');
if (!tableName || tableName.trim() === '') return;
currentCustomTableName = tableName.trim();
// حفظ هيكل الجدول
if (!customTables[currentCustomTableName]) {
customTables[currentCustomTableName] = {
name: currentCustomTableName,
columns: [],
rows: [],
createdAt: new Date().toISOString()
};
}
openCustomTableBuilder();
}

// === 🆕 بناء أعمدة الجدول المخصص ===
function openCustomTableBuilder() {
const colCount = prompt('🔢 كم عدد الأعمدة التي تريد في الجدول؟ (أدخل رقم)', '3');
if (!colCount || isNaN(colCount)) return;
const columns = [];
for (let i = 0; i < colCount; i++) {
const colName = prompt(`✏️ اسم العمود ${i+1}:`, `عمود ${i+1}`);
if (colName) columns.push(colName.trim());
}
if (columns.length === 0) {
showAlert('⚠️ تنبيه', 'يجب إضافة عمود واحد على الأقل!', 'warning');
return;
}
// حفظ الأعمدة
customTables[currentCustomTableName].columns = columns;
saveToStorage('customTables', customTables);
// عرض الجدول للإدخال
renderCustomTableInput();
}

// === 🆕 عرض جدول الإدخال المخصص ===
function renderCustomTableInput() {
const table = customTables[currentCustomTableName];
if (!table || !table.columns) return;
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
let html = `
<div style="background:#1a1a1a;padding:25px;border-radius:12px;border:2px solid #ff8e53">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
<h3 style="color:#ff8e53;margin:0">🗂️ جدول: ${currentCustomTableName}</h3>
<button onclick="addCustomTableRow()"
style="background:#00ff9d;color:#000;border:none;width:35px;height:35px;border-radius:50%;font-weight:bold;cursor:pointer">+</button>
</div>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse">
<thead>
<tr style="background:#111;border-bottom:2px solid #ff8e53">
<th style="padding:12px;text-align:center;color:#fff">#</th>
<th style="padding:12px;text-align:center;color:#00eaff">الطالب</th>
${table.columns.map(col =>
`<th style="padding:12px;text-align:center;color:#ff8e53">${col}</th>`
).join('')}
<th style="padding:12px"></th>
</tr>
</thead>
<tbody id="customTableBody">
${filtered.map((s, i) => `
<tr style="background:${i%2===0?'#151515':'#131513'};border-bottom:1px solid #333">
<td style="padding:12px;text-align:center;color:#fff">${i+1}</td>
<td style="padding:12px;text-align:center;color:#00eaff;font-weight:bold">${s['الاسم الكامل']}</td>
${table.columns.map((col, ci) => `
<td style="padding:12px">
<input type="text" id="custom_${i}_${ci}" placeholder="${col}"
style="width:100%;padding:8px;background:#0a0a0a;color:#ff8e53;border:1px solid #ff8e53;border-radius:6px">
</td>
`).join('')}
<td style="padding:12px"></td>
</tr>
`).join('')}
</tbody>
</table>
</div>
<div style="margin-top:20px;text-align:center;display:flex;gap:10px;justify-content:center">
<button onclick="saveCustomTableData()"
style="background:#00ff9d;color:#000;border:2px solid #00ff9d;padding:12px 30px;border-radius:10px;font-weight:bold">
💾 حفظ البيانات
</button>
<button onclick="goBack()"
style="background:#555;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:bold">
🔙 رجوع
</button>
</div>
</div>`;
document.getElementById('dailyGradeFormContent').innerHTML = html;
navigateTo('gradeTypeSelectPage', 'dailyGradeFormPage');
}

// === 🆕 فتح جدول درجات يوم معين (في نفس الصفحة) ===
let currentDayDate = '';
let currentDayMode = 'add';
// === 🆕 فتح جدول درجات يوم معين (مع الحفظ التلقائي + عدم الاختفاء) ===
function openDayGrades(dateStr, mode) {
    currentDayDate = dateStr;
    currentDayMode = mode;
    
    const students = loadFromStorage('students') || {};
    const classStudents = students[currentGradeClass] || [];
    const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
    
    const saved = loadFromStorage('weeklyGrades') || {};
    const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
    const existingData = saved[dataKey]?.students || {};
    const customFields = saved[dataKey]?.customFields || [];
    
    const title = mode === 'edit' ? '✏️ تعديل درجات اليوم' : '📝 إضافة درجات اليوم';
    const borderColor = mode === 'edit' ? '#00eaff' : '#00ff9d';
    
    let html = `
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0a0a1a 100%); padding: 20px; border-radius: 15px; border: 2px solid ${borderColor}; margin-bottom: 20px;">
        <!-- العنوان -->
        <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid ${borderColor};">
            <h3 style="color: ${borderColor}; margin: 0; font-size: clamp(16px, 4vw, 20px); font-weight: bold; text-align: center;">
                ${title} - ${dateStr}
            </h3>
        </div>
        
        <!-- رسالة الحفظ التلقائي -->
        <div id="autoSaveMessage" style="display:none;background:linear-gradient(135deg,#00ff9d,#00cc7d);color:#000;padding:10px 20px;border-radius:8px;text-align:center;font-weight:bold;margin-bottom:15px;animation:slideIn 0.3s ease;">
            ✅ تم الحفظ التلقائي
        </div>
        
        <!-- الجدول مع تمرير أفقي -->
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; border: 2px solid #333; border-radius: 10px;">
            <table id="dayGradesTable" style="width: 100%; border-collapse: collapse; min-width: 850px;">
                <thead>
                    <tr style="background: #111; border-bottom: 2px solid ${borderColor};">
                        <th style="padding: 12px; text-align: center; color: #fff; font-size: 14px; border-right: 1px solid #333; min-width: 40px;">#</th>
                        <th style="padding: 12px; text-align: center; color: #00eaff; font-size: 14px; border-right: 1px solid #333; min-width: 150px;">اسم الطالب</th>
                        <th style="padding: 12px; text-align: center; color: #00ff9d; font-size: 14px; border-right: 1px solid #333; min-width: 120px;">الحضور</th>
                        ${customFields.map(f => `
                            <th style="padding: 12px; text-align: center; color: #ffcc00; font-size: 14px; border-right: 1px solid #333; min-width: 180px;">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                                    <span style="word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">${f.name}</span>
                                    <button onclick="removeCustomFieldFromDay(${f.id}, '${dateStr}')"
                                        style="background: #ff3366; color: white; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-size: 20px; font-weight: bold; transition: all 0.3s; box-shadow: 0 3px 10px rgba(255, 51, 102, 0.5); min-width: 50px;"
                                        onmouseover="this.style.transform='scale(1.15)'; this.style.background='#ff1a4d'; this.style.boxShadow='0 5px 15px rgba(255, 51, 102, 0.7)';"
                                        onmouseout="this.style.transform='scale(1)'; this.style.background='#ff3366'; this.style.boxShadow='0 3px 10px rgba(255, 51, 102, 0.5)';"
                                        title="حذف الحقل">
                                        ×
                                    </button>
                                </div>
                            </th>
                        `).join('')}
                        <!-- عمود إضافة حقل -->
                        <th style="padding: 12px; text-align: center; color: #7b68ee; font-size: 14px; border-right: 1px solid #333; min-width: 100px;">
                            <button onclick="addNewFieldToAllDays('${dateStr}')"
                                style="background: #7b68ee; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(123, 104, 238, 0.4); transition: all 0.3s; white-space: nowrap;"
                                onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 15px rgba(123, 104, 238, 0.6)';"
                                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 10px rgba(123, 104, 238, 0.4)';"
                                title="إضافة حقل لكل الأيام">
                                إضافة حقل للجميع
                            </button>
                        </th>
                        <!-- عمود الإجراءات -->
                        <th style="padding: 12px; text-align: center; color: #ff6b6b; font-size: 14px; border-right: 1px solid #333; min-width: 100px;">
                            الإجراءات
                        </th>
                    </tr>
                </thead>
                <tbody id="dayGradesTableBody">
                    ${filtered.map((s, i) => {
                        const studentKey = `student_${i}`;
                        const existing = existingData[studentKey] || {};
                        const status = existing.status || 'present';
                        return `
                            <tr style="background: #1a1a2e; border-bottom: 1px solid #333;">
                                <td style="padding: 12px; text-align: center; color: #fff; font-weight: bold; border-right: 1px solid #333;">${i + 1}</td>
                                <td style="padding: 12px; text-align: center; color: #00eaff; font-weight: bold; border-right: 1px solid #333; word-wrap: break-word; overflow-wrap: break-word;">${s['الاسم الكامل']}</td>
                                <td style="padding: 12px; text-align: center; border-right: 1px solid #333;">
                                    <select id="day_status_${i}" onchange="autoSaveDayData('${dateStr}')"
                                        style="width: 100%; padding: 8px; background: ${status === 'present' ? '#0a2a0a' : '#2a0a0a'}; color: ${status === 'present' ? '#00ff9d' : '#ff3366'}; border: 2px solid ${status === 'present' ? '#00ff9d' : '#ff3366'}; border-radius: 6px; font-weight: bold; cursor: pointer;">
                                        <option value="present" ${status === 'present' ? 'selected' : ''}>حاضر ✅</option>
                                        <option value="absent" ${status === 'absent' ? 'selected' : ''}>غائب ❌</option>
                                    </select>
                                </td>
                                ${customFields.map(f => {
                                    const value = existing.fields?.[f.name] || '';
                                    return `
                                        <td style="padding: 12px; border-right: 1px solid #333;">
                                            <textarea id="day_field_${i}_${f.id}" 
                                                placeholder="أدخل ${f.name}"
                                                rows="2"
                                                onchange="autoSaveDayData('${dateStr}')"
                                                style="width: 100%; padding: 8px; background: #0a0a1a; color: #ffcc00; border: 2px solid #ffcc00; border-radius: 6px; resize: vertical; word-wrap: break-word; overflow-wrap: break-word; font-family: inherit; font-size: 13px; box-sizing: border-box;">${value}</textarea>
                                        </td>
                                    `;
                                }).join('')}
                                <!-- عمود إضافة حقل - فارغ -->
                                <td style="padding: 12px; text-align: center; border-right: 1px solid #333; background: #0a0a1a;">
                                    <span style="color: #333; font-size: 20px;">-</span>
                                </td>
                                <!-- عمود الإجراءات -->
                                <td style="padding: 12px; text-align: center; border-right: 1px solid #333;">
                                    <div style="display: flex; flex-direction: row; gap: 8px; align-items: center; justify-content: center;">
                                        <button onclick="viewStudentDayDetails(${i}, '${dateStr}')"
                                            style="background: #00ff9d; color: #000; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.3s;"
                                            onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 4px 12px rgba(0, 255, 157, 0.4)';"
                                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"
                                            title="عرض">
                                            👁️
                                        </button>
                                        <button onclick="sendStudentDayData(${i}, '${dateStr}')"
                                            style="background: #ff6b6b; color: #fff; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.3s;"
                                            onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 4px 12px rgba(255, 107, 107, 0.4)';"
                                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"
                                            title="إرسال">
                                            📤
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <!-- أزرار التحكم -->
        <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button id="saveOrEditBtn" onclick="saveOrEditDayGrades('${dateStr}')"
                style="background: ${borderColor}; color: #000; border: 2px solid ${borderColor}; padding: 12px 25px; border-radius: 10px; font-weight: bold; flex: 1; min-width: 120px; max-width: 200px; cursor: pointer; transition: all 0.3s;"
                onmouseover="this.style.background='#00ccff'; this.style.transform='scale(1.05)';"
                onmouseout="this.style.background='${borderColor}'; this.style.transform='scale(1)';">
                💾 حفظ الكل
            </button>
            <button onclick="closeDayGrades()"
                style="background: #555; color: white; border: none; padding: 12px 25px; border-radius: 10px; font-weight: bold; flex: 1; min-width: 120px; max-width: 200px; cursor: pointer; transition: all 0.3s;"
                onmouseover="this.style.background='#666'; this.style.transform='scale(1.05)';"
                onmouseout="this.style.background='#555'; this.style.transform='scale(1)';">
                ❌ إغلاق
            </button>
        </div>
    </div>
    `;
    
    document.getElementById('dayGradesContent').innerHTML = html;
    document.getElementById('dayGradesArea').style.display = 'block';
    document.getElementById('dayGradesArea').scrollIntoView({behavior: 'smooth', block: 'nearest'});
}



// === 🆕 دالة البحث عن الطلاب بالاسم ===
function filterStudentsByName() {
    const searchInput = document.getElementById('studentSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const table = document.getElementById('dayGradesTable');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        // العمود الثاني يحتوي على اسم الطالب (index 1)
        const nameCell = row.children[1];
        if (nameCell) {
            const studentName = nameCell.textContent.toLowerCase();
            if (studentName.includes(searchTerm)) {
                row.style.display = ''; // إظهار الصف
            } else {
                row.style.display = searchTerm === '' ? '' : 'none'; // إخفاء الصف إذا ما طابق
            }
        }
    });
}



// === دوال الأزرار الجديدة (فارغة حالياً) ===
function viewStudentDayDetails(studentIndex, dateStr) {
    // TODO: سيتم تنفيذ وظيفة زر العرض لاحقاً
    console.log('عرض تفاصيل الطالب', studentIndex, 'في تاريخ', dateStr);
}

function sendStudentDayData(studentIndex, dateStr) {
    // TODO: سيتم تنفيذ وظيفة زر الإرسال لاحقاً
    console.log('إرسال بيانات الطالب', studentIndex, 'في تاريخ', dateStr);
}

// === حذف حقل مخصص ===
function removeCustomFieldFromDay(fieldId, dateStr) {
    if (!confirm('هل أنت متأكد من حذف هذا الحقل؟')) return;
    
    const saved = loadFromStorage('weeklyGrades') || {};
    const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
    
    if (saved[dataKey]) {
        // حذف الحقل من customFields
        saved[dataKey].customFields = saved[dataKey].customFields.filter(f => f.id !== fieldId);
        
        // حذف قيمة الحقل من جميع الطلاب
        if (saved[dataKey].students) {
            Object.keys(saved[dataKey].students).forEach(studentKey => {
                if (saved[dataKey].students[studentKey].fields) {
                    delete saved[dataKey].students[studentKey].fields[fieldId];
                }
            });
        }
        
        saveToStorage('weeklyGrades', saved);
        openDayGrades(dateStr, currentDayMode);
    }
}


function renderDayCustomFieldsHeader(customFields) {
    const header = document.getElementById('dayCustomFieldsHeader');
    if (header) {
        header.innerHTML = customFields.map(f =>
            `<th style="padding:12px;text-align:center;color:#00eaff;font-weight:bold;font-size:14px;border-bottom:2px solid #00eaff;min-width:120px;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
                    <span style="font-size:14px;">${f.name}</span>
                    <button onclick="removeCustomField(${f.id})"
                        style="background:#ff3366;color:white;border:none;width:20px;height:20px;border-radius:50%;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
                        ×
                    </button>
                </div>
            </th>`
        ).join('') + '<th style="padding:12px;background:#111;"></th>';
    }
}

// === عرض جدول الطلاب لليوم (معدل - الأسماء في الـ Header فقط) ===
function renderDayGradesTable(filtered, existingData, customFields) {
const tbody = document.getElementById('dayGradesTableBody');
if (!tbody) return;
tbody.innerHTML = filtered.map((s, i) => {
const studentKey = `student_${i}`;
const existing = existingData[studentKey] || {};
const status = existing.status || 'present';
return `
<tr style="background:${i%2===0?'#151515':'#131313'};border-bottom:1px solid #333;transition:all 0.2s;" onmouseover="this.style.background='#1a1a2a';this.style.transform='scale(1.01)';" onmouseout="this.style.background='${i%2===0?'#151515':'#131313'}';this.style.transform='scale(1)';">
<td style="padding:12px;text-align:center;color:#fff;font-weight:bold;font-size:16px;">${i+1}</td>
<td style="padding:12px;text-align:center;color:#00eaff;font-weight:bold;font-size:15px;">${s['الاسم الكامل']}</td>
<td style="padding:12px;text-align:center;">
<select id="day_status_${i}" style="padding:10px 15px;background:#0a0a0a;color:#00ff9d;border:2px solid #00ff9d;border-radius:8px;font-weight:bold;cursor:pointer;min-width:110px;font-size:14px;">
<option value="present" ${status==='present'?'selected':''}>حاضر ✅</option>
<option value="absent" ${status==='absent'?'selected':''}>غائب ❌</option>
</select>
</td>
${customFields.map(f => {
const value = existing.fields?.[f.name] || '';
return `
<td style="padding:12px;vertical-align:top;">
<textarea id="day_field_${i}_${f.id}" placeholder="أدخل ${f.name}..."
style="width:100%;padding:12px;background:#0a0a0a;color:#7b68ee;border:2px solid #7b68ee;border-radius:8px;min-height:70px;font-size:14px;resize:vertical;transition:all 0.3s;"
onfocus="this.style.borderColor='#00eaff';this.style.boxShadow='0 0 15px rgba(0,234,255,0.4)';this.style.background='#111';"
onblur="this.style.borderColor='#7b68ee';this.style.boxShadow='none';this.style.background='#0a0a0a';">${value}</textarea>
</td>`;
}).join('')}
<td style="padding:12px;"></td>
</tr>`;
}).join('');
}


// === 🆕 إغلاق منطقة grades والعودة للأسبوعي ===
function closeDayGrades() {
document.getElementById('dayGradesArea').style.display = 'none';
openWeeklyGradeForm();
}

// === 🆕 حفظ درجات اليوم ===
function saveDayGrades(dateStr) {
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
const data = {};
filtered.forEach((_, i) => {
const key = `student_${i}`;
const statusEl = document.getElementById(`day_status_${i}`);
if (!statusEl) return;
data[key] = {
status: statusEl.value || 'present',
fields: {}
};
customGradeFields.forEach(f => {
const fieldEl = document.getElementById(`day_field_${i}_${f.id}`);
if (fieldEl) {
data[key].fields[f.name] = fieldEl.value || '';
}
});
});
const saved = loadFromStorage('weeklyGrades') || {};
const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
saved[dataKey] = {
students: data,
customFields: [...customGradeFields],
updatedAt: new Date().toISOString()
};
saveToStorage('weeklyGrades', saved);
showAlert('✅ نجاح', `تم حفظ درجات يوم ${dateStr}!`, 'success');
closeDayGrades();
}

// === 🆕 إضافة صف جديد ديناميكيًا ===
function addCustomTableRow() {
const table = customTables[currentCustomTableName];
const tbody = document.getElementById('customTableBody');
if (!tbody || !table) return;
const rowCount = tbody.children.length + 1;
const newRow = document.createElement('tr');
newRow.style.cssText = 'background:#1a1a1a;border-bottom:1px solid #333';
newRow.innerHTML = `
<td style="padding:12px;text-align:center;color:#fff">${rowCount}</td>
<td style="padding:12px;text-align:center;color:#aaa;font-style:italic">صف مخصص</td>
${table.columns.map((col, ci) => `
<td style="padding:12px">
<input type="text" id="custom_new_${ci}" placeholder="${col}"
style="width:100%;padding:8px;background:#0a0a0a;color:#ff8e53;border:1px solid #ff8e53;border-radius:6px">
</td>
`).join('')}
<td style="padding:12px">
<button onclick="this.closest('tr').remove()"
style="background:#ff3366;color:white;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer">×</button>
</td>
`;
tbody.appendChild(newRow);
}

// === 🆕 حفظ بيانات الجدول المخصص ===
function saveCustomTableData() {
const table = customTables[currentCustomTableName];
const tbody = document.getElementById('customTableBody');
if (!tbody || !table) return;
const rows = [];
const inputs = tbody.querySelectorAll('input[id^="custom_"]');
Array.from(tbody.children).forEach((row, rowIndex) => {
const rowData = {};
table.columns.forEach((col, colIndex) => {
const inputId = row.querySelector(`input[id^="custom_${rowIndex}_"]`);
if (inputId) {
rowData[col] = inputId.value || '';
}
});
if (Object.values(rowData).some(v => v !== '')) {
rows.push(rowData);
}
});
const saveKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${currentCustomTableName}`;
const saved = loadFromStorage('customTableData') || {};
saved[saveKey] = {
tableName: currentCustomTableName,
columns: table.columns,
rows: rows,
updatedAt: new Date().toISOString()
};
saveToStorage('customTableData', saved);
showAlert('✅ نجاح', `تم حفظ بيانات جدول "${currentCustomTableName}"!`, 'success');
}

// === 🆕 عرض الجداول المخصصة المحفوظة (اختياري) ===
function viewSavedCustomTables() {
const saved = loadFromStorage('customTableData') || {};
const keys = Object.keys(saved).filter(k =>
k.startsWith(`${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_`)
);
if (keys.length === 0) {
showAlert('📭 معلومات', 'لا توجد جداول مخصصة محفوظة لهذا المقرر', 'info');
return;
}
let msg = '🗂️ الجداول المحفوظة:\n';
keys.forEach(k => {
const data = saved[k];
msg += `• ${data.tableName} - آخر تحديث: ${new Date(data.updatedAt).toLocaleDateString('ar-EG')}\n`;
});
alert(msg);
}

// === 3️⃣ فتح صفحة اختيار نوع الملاحظة ===
function openGradeTypeSelect(studentId, studentName) {
currentStudentId = studentId;
currentStudentName = studentName;
document.getElementById('gradeStudentInfo').textContent =
`الطالب: ${studentName} | ${currentGradeClass} - ${currentGradeSection} | ${currentGradeSubject}`;
navigateTo('gradeStudentsListPage', 'gradeTypeSelectPage');
}


// === 🆕 دالة عرض الملاحظات اليومية (مع تحسين اسم المادة + أزرار التنقل) ===
function openDailyGradeForm() {
    if (!window.customGradeFields) window.customGradeFields = [];
    const students = loadFromStorage('students') || {};
    const classStudents = students[currentGradeClass] || [];
    const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
    const weekDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
    const today = new Date();
    
    // 🎯 حساب بداية الأسبوع من يوم السبت
    const weekStart = new Date(today);
    const day = weekStart.getDay();
    const diff = (day + 1) % 7;
    weekStart.setDate(weekStart.getDate() - diff);
    
    // تحميل البيانات المحفوظة
    const saved = loadFromStorage('weeklyGrades') || {};
    
    // تحميل المقررات المتاحة للمعلم
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const teachers = loadFromStorage('teachers') || [];
    const teacher = teachers.find(t => t.id === currentUser?.id);
    const classesSubjects = teacher?.classesSubjects || [];
    
    // ✅ إنشاء الشريط العلوي (عادي - غير ثابت)
    const miniHeader = `
    <div style="position:relative;z-index:1000;background:linear-gradient(135deg,#1a1a2a,#0a0a1a);padding:20px 30px;border-bottom:3px solid #00eaff;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:30px;border-radius:0 0 20px 20px;box-shadow:0 5px 30px rgba(0,234,255,0.3);">
        <div style="display:flex;gap:15px;flex-wrap:wrap">
            <button onclick="openDailyGradeForm()" style="background:linear-gradient(135deg,#00eaff,#0099ff);color:#000;border:none;padding:15px 30px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,234,255,0.4);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(0,234,255,0.6)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(0,234,255,0.4)';">
                📚 درجات
            </button>
            <button onclick="showAlert('قريباً','رسائل الإدارة تحت التطوير')" style="background:linear-gradient(135deg,#4ecdc4,#44a3aa);color:#000;border:none;padding:15px 30px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(78,205,196,0.4);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(78,205,196,0.6)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(78,205,196,0.4)';">
                📨 إدارة
            </button>
            <button onclick="showAlert('قريباً','رسائل أولياء الأمور تحت التطوير')" style="background:linear-gradient(135deg,#a8e6cf,#88d8b0);color:#000;border:none;padding:15px 30px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(168,230,207,0.4);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(168,230,207,0.6)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(168,230,207,0.4)';">
                👨‍👩‍👧 أولياء
            </button>
        </div>
        <button onclick="returnToDashboard()" style="background:linear-gradient(135deg,#ff3366,#ff6b6b);color:white;border:none;padding:15px 35px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(255,51,102,0.4);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(255,51,102,0.6)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(255,51,102,0.4)';">
            🏠 الرئيسية
        </button>
    </div>`;





    // ✅ تعديل قسم المقرر لإظهار اسم المادة بشكل كبير وواضح
    document.getElementById('dailyGradeFormContent').innerHTML = `
    ${miniHeader}
    
    <!-- 📚 شريط المقرر في الأعلى (معدل) -->
    <div style="background:linear-gradient(135deg,#1a1a2a,#0a0a1a);padding:25px;border-radius:15px;border:2px solid #00eaff;margin-bottom:25px;box-shadow:0 0 20px rgba(0,234,255,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px">
            <div style="flex:1;min-width:250px;display:flex;align-items:center;gap:15px;flex-wrap:wrap;">
                <h2 style="color:#00eaff;margin:0;font-size:clamp(20px,5vw,28px);font-weight:bold;text-shadow:0 0 10px rgba(0,234,255,0.5);">
                    📚 ${currentGradeClass} - ${currentGradeSection}
                </h2>
                <!-- ✅ اسم المادة (كبير، عريض، وواضح) -->
                <div style="background:linear-gradient(135deg,#ffcc00,#ff9900);color:#000;padding:10px 25px;border-radius:10px;font-size:clamp(18px,4vw,24px);font-weight:900;text-shadow:0 2px 4px rgba(0,0,0,0.2);box-shadow:0 4px 15px rgba(255,204,0,0.4);white-space:nowrap;">
                    📖 ${currentGradeSubject}
                </div>
            </div>
            
            <div style="min-width:250px">
                <label style="color:#aaa;font-size:14px;display:block;margin-bottom:8px;font-weight:bold;">تغيير المقرر:</label>
                <select id="quickClassSelect" onchange="changeCurrentClass(this.value)"
                    style="width:100%;padding:12px 15px;background:#0a0a0a;color:#ff8e53;border:2px solid #ff8e53;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;">
                    <option value="">-- اختر مقرراً --</option>
                    ${classesSubjects.map(cs => `
                        <option value="${cs.class}|${cs.section}|${cs.subject}"
                        ${currentGradeClass === cs.class && currentGradeSection === cs.section && currentGradeSubject === cs.subject ? 'selected' : ''}>
                        ${cs.class} - ${cs.section} (${cs.subject})
                        </option>
                    `).join('')}
                </select>
            </div>
        </div>
    </div>

    <!-- ✅ أزرار التنقل الثلاثة (الأيام، الأسبوع، الشهر) -->
    <div style="display:flex;gap:15px;justify-content:center;margin-bottom:30px;flex-wrap:wrap;">
        <button onclick="switchView('days', this)" class="nav-view-btn" 
            style="flex:1;min-width:150px;max-width:250px;padding:15px;background:linear-gradient(135deg,#00eaff,#0099ff);color:#000;border:none;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(0,234,255,0.4);transition:all 0.3s ease;">
            📅 الأيام
        </button>
        <button onclick="switchView('week', this)" class="nav-view-btn"
            style="flex:1;min-width:150px;max-width:250px;padding:15px;background:linear-gradient(135deg,#4ecdc4,#44a3aa);color:#000;border:none;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(78,205,196,0.4);transition:all 0.3s ease;">
            📆 الأسبوع
        </button>
        <button onclick="switchView('month', this)" class="nav-view-btn"
            style="flex:1;min-width:150px;max-width:250px;padding:15px;background:linear-gradient(135deg,#ff3366,#ff6b6b);color:#fff;border:none;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(255,51,102,0.4);transition:all 0.3s ease;">
            📊 الشهر
        </button>
    </div>
    
    <!-- الأيام الأسبوعية مع الأزرار -->
    <div style="background:#1a1a1a;padding:30px;border-radius:15px;border:2px solid #ffcc00;margin-bottom:25px;box-shadow:0 0 20px rgba(255,204,0,0.15);">
        <h3 style="color:#ffcc00;text-align:center;margin-bottom:25px;font-size:24px;font-weight:bold;">📆 الأيام</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:20px">
            ${weekDays.map((dayName, i) => {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + i);
                const dateStr = dayDate.toISOString().split('T')[0];
                const isToday = dateStr === today.toISOString().split('T')[0];
                const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
                const hasData = saved[dataKey] && saved[dataKey].students && Object.keys(saved[dataKey].students).length > 0;
                return `
                <div style="background:${isToday ? '#0a3a2a' : '#0a0a0a'};padding:25px 20px;border-radius:15px;border:3px solid ${isToday ? '#00ff9d' : '#555'};text-align:center;position:relative;transition:all 0.3s ease;box-shadow:${isToday ? '0 0 25px rgba(0,255,157,0.4)' : '0 4px 15px rgba(0,0,0,0.3)'};" onmouseover="this.style.transform='translateY(-5px)';${isToday ? 'this.style.boxShadow=\'0 0 35px rgba(0,255,157,0.6)\';' : ''}" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='${isToday ? '0 0 25px rgba(0,255,157,0.4)' : '0 4px 15px rgba(0,0,0,0.3)'}';">
                    ${isToday ? '<div style="position:absolute;top:10px;right:10px;background:#00ff9d;color:#000;font-size:12px;padding:5px 12px;border-radius:8px;font-weight:bold;box-shadow:0 2px 10px rgba(0,255,157,0.4);">اليوم</div>' : ''}
                    <div style="color:#aaa;font-weight:bold;font-size:16px;margin-bottom:10px">${dayName}</div>
                    <div style="color:${isToday ? '#00ff9d' : '#ffcc00'};font-size:15px;margin-bottom:20px;font-weight:bold;">${dateStr}</div>
                    <div style="display:flex;flex-direction:column;gap:10px">
                        ${hasData ? `
                            <button onclick="openDayGrades('${dateStr}', 'edit')"
                            style="background:#00eaff;color:#000;border:none;padding:12px 20px;border-radius:10px;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:0 3px 10px rgba(0,234,255,0.3);transition:all 0.2s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                            ✏️ تعديل
                            </button>
                            <button onclick="openDayGrades('${dateStr}', 'add')"
                            style="background:#00ff9d;color:#000;border:none;padding:12px 20px;border-radius:10px;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:0 3px 10px rgba(0,255,157,0.3);transition:all 0.2s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                            ➕ إضافة
                            </button>
                        ` : `
                            <button onclick="openDayGrades('${dateStr}', 'add')"
                            style="background:#ffcc00;color:#000;border:none;padding:15px 20px;border-radius:10px;font-weight:bold;font-size:15px;cursor:pointer;box-shadow:0 3px 10px rgba(255,204,0,0.3);transition:all 0.2s;width:100%;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                            📝 إضافة درجات
                            </button>
                        `}
                    </div>
                </div>`;
            }).join('')}
        </div>
    </div>
    
    <!-- منطقة جدول الطلاب (تظهر عند الضغط على يوم) -->
    <div id="dayGradesArea" style="display:none;background:#1a1a1a;padding:30px;border-radius:15px;border:3px solid #00ff9d;margin-bottom:25px;box-shadow:0 0 30px rgba(0,255,157,0.2);">
        <div id="dayGradesContent"></div>
    </div>
    
    <!-- رسالة النجاح (مخفية) -->
    <div id="successMessage" style="display:none;background:linear-gradient(135deg,#00ff9d,#00cc7d);color:#000;padding:20px 40px;border-radius:12px;text-align:center;font-weight:bold;font-size:18px;margin-bottom:25px;animation:slideIn 0.3s ease;box-shadow:0 5px 20px rgba(0,255,157,0.4);">
        ✅ تم الحفظ بنجاح!
    </div>`;

    // إضافة CSS للـ animation
    if (!document.getElementById('successAnimationStyle')) {
        const style = document.createElement('style');
        style.id = 'successAnimationStyle';
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إظهار الصفحة
    document.getElementById('gradeClassSelectPage').style.display = 'none';
    document.getElementById('gradeStudentsListPage').style.display = 'none';
    document.getElementById('gradeTypeSelectPage').style.display = 'none';
    document.getElementById('dailyGradeFormPage').style.display = 'block';
    document.getElementById('weeklyGradeFormPage').style.display = 'none';
    document.getElementById('monthlyGradeFormPage').style.display = 'none';
    
    // ✅ ضمان التمرير العمودي
    const pageContainer = document.getElementById('dailyGradeFormPage');
    if(pageContainer) {
        pageContainer.style.overflowY = 'auto';
        pageContainer.style.maxHeight = '100vh';
    }
    
    // 🎯 تمرير تلقائي لليوم الحالي
    setTimeout(() => {
        const todayEl = document.querySelector('[style*="#0a3a2a"]');
        if (todayEl) {
            todayEl.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, 300);
}

// // === 🆕 دالة التبديل بين الأزرار (أيام، أسبوع، شهر) ===
function switchView(viewType, btnElement) {
    // إعادة تعيين ألوان الأزرار
    document.querySelectorAll('.nav-view-btn').forEach(btn => {
        if(btn.innerText.includes('الأيام')) {
            btn.style.background = 'linear-gradient(135deg,#00eaff,#0099ff)';
            btn.style.color = '#000';
        } else if(btn.innerText.includes('الأسبوع')) {
            btn.style.background = 'linear-gradient(135deg,#4ecdc4,#44a3aa)';
            btn.style.color = '#000';
        } else if(btn.innerText.includes('الشهر')) {
            btn.style.background = 'linear-gradient(135deg,#ff3366,#ff6b6b)';
            btn.style.color = '#fff';
        }
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // تمييز الزر المضغوط
    if(btnElement) {
        btnElement.style.transform = 'scale(1.1)';
        btnElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)';
    }
    
    // عرض المحتوى المناسب
    if(viewType === 'days') {
        openDailyGradeForm();
    } else if(viewType === 'week') {
        showWeeksView();
    } else if(viewType === 'month') {
        showAlert('قريباً', 'عرض التقارير الشهرية تحت التطوير', 'info');
    }
}

// === إضافة حقل مخصص (معدل - مع التحديث الفوري) ===
function addCustomGradeField() {
const name = prompt('✏️ أدخل اسم الحقل الجديد (مثل: درجة النشاط، سبب الغياب):');
if (!name || name.trim() === '') return;
const fieldName = name.trim();
customGradeFields.push({ id: Date.now(), name: fieldName });
// 🎯 تحديث الحقول في أي مكان تظهر فيه
updateCustomFieldsDisplay();
}

// === 🆕 دالة تحديث عرض الحقول المخصصة (الإضافة الجديدة فقط) ===
function updateCustomFieldsDisplay() {
// تحديث جدول الملاحظات اليومية الرئيسي
const dailyHeader = document.getElementById('customFieldsHeader');
const dailyBody = document.getElementById('dailyGradeTableBody');
if (dailyHeader && dailyBody) {
renderDailyGradeTable();
}
// تحديث جدول اليوم المفتوح (من الأسبوعي)
const dayHeader = document.getElementById('dayCustomFieldsHeader');
const dayBody = document.getElementById('dayGradesTableBody');
if (dayHeader && dayBody && currentDayDate) {
const saved = loadFromStorage('weeklyGrades') || {};
const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${currentDayDate}`;
const existingData = saved[dataKey]?.students || {};
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
renderDayCustomFieldsHeader(customGradeFields);
renderDayGradesTable(filtered, existingData, customGradeFields);
}
}

// === عرض جدول الملاحظات اليومية ===
function renderDailyGradeTable() {
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
const header = document.getElementById('customFieldsHeader');
if (header) {
header.innerHTML = customGradeFields.map(f =>
`<th style="padding:12px;text-align:center;color:#7b68ee">${f.name}
<button onclick="removeCustomField(${f.id})"
style="background:#ff3366;color:white;border:none;width:20px;height:20px;border-radius:50%;font-size:12px;margin-right:5px">×</button>
</th>`
).join('') + '<th style="padding:12px"></th>';
}
const tbody = document.getElementById('dailyGradeTableBody');
if (tbody && filtered.length > 0) {
tbody.innerHTML = filtered.map((s, i) => `
<tr style="background:${i%2===0?'#151515':'#131313'};border-bottom:1px solid #333">
<td style="padding:12px;text-align:center;color:#fff">${i+1}</td>
<td style="padding:12px;text-align:center;color:#00eaff;font-weight:bold">${s['الاسم الكامل']}</td>
<td style="padding:12px;text-align:center">
<select id="status_${i}" style="padding:8px;background:#0a0a0a;color:#00ff9d;border:2px solid #00ff9d;border-radius:6px">
<option value="present">حاضر ✅</option>
<option value="absent">غائب ❌</option>
</select>
</td>
${customGradeFields.map(f => `
<td style="padding:12px">
<textarea id="field_${i}_${f.id}" placeholder="${f.name}"
style="width:100%;padding:8px;background:#0a0a0a;color:#7b68ee;border:2px solid #7b68ee;border-radius:6px;min-height:50px"></textarea>
</td>
`).join('')}
<td style="padding:12px"></td>
</tr>
`).join('');
}
}

// === حذف حقل مخصص ===
function removeCustomField(fieldId) {
customGradeFields = customGradeFields.filter(f => f.id !== fieldId);
renderDailyGradeTable();
}

// === إضافة حقل جديد ===
function addNewFieldToDay(dateStr) {
    const fieldName = prompt('✏️ أدخل اسم الحقل الجديد:');
    if (!fieldName || fieldName.trim() === '') return;
    const cleanName = fieldName.trim();
    const saved = loadFromStorage('weeklyGrades') || {};
    const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
    if (!saved[dataKey]) saved[dataKey] = { students: {}, customFields: [] };
    if (!saved[dataKey].customFields) saved[dataKey].customFields = [];
    if (saved[dataKey].customFields.some(f => f.name === cleanName)) {
        alert('⚠️ هذا الحقل موجود مسبقاً!');
        return;
    }
    saved[dataKey].customFields.push({ id: Date.now(), name: cleanName });
    saveToStorage('weeklyGrades', saved);
    openDayGrades(dateStr, currentDayMode);
}

// === حذف حقل ===
function removeCustomFieldFromDay(fieldId, dateStr) {
    if (!confirm('⚠️ حذف هذا الحقل؟')) return;
    const saved = loadFromStorage('weeklyGrades') || {};
    const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
    if (saved[dataKey]?.customFields) {
        const field = saved[dataKey].customFields.find(f => f.id === fieldId);
        saved[dataKey].customFields = saved[dataKey].customFields.filter(f => f.id !== fieldId);
        if (field?.name && saved[dataKey].students) {
            Object.values(saved[dataKey].students).forEach(s => {
                if (s.fields) delete s.fields[field.name];
            });
        }
        saveToStorage('weeklyGrades', saved);
        openDayGrades(dateStr, currentDayMode);
    }
}


// === حفظ اليومي مع رسالة نجاح ===
function saveDailyGradesAndShowMessage() {
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
const data = {};
filtered.forEach((_, i) => {
const key = `student_${i}`;
const statusEl = document.getElementById(`status_${i}`);
if (!statusEl) return;
data[key] = {
status: statusEl.value || 'present',
fields: {}
};
customGradeFields.forEach(f => {
const fieldEl = document.getElementById(`field_${i}_${f.id}`);
if (fieldEl) {
data[key].fields[f.name] = fieldEl.value || '';
}
});
});
// حفظ في localStorage
const saved = loadFromStorage('weeklyGrades') || {};
const dateKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${new Date().toISOString().split('T')[0]}`;
saved[dateKey] = { students: data, customFields: [...customGradeFields] };
saveToStorage('weeklyGrades', saved);
// إظهار رسالة النجاح
const msgEl = document.getElementById('successMessage');
if (msgEl) {
msgEl.style.display = 'block';
msgEl.scrollIntoView({behavior: 'smooth', block: 'center'});
setTimeout(() => {
msgEl.style.animation = 'fadeOut 0.5s ease';
setTimeout(() => {
msgEl.style.display = 'none';
msgEl.style.animation = '';
}, 500);
}, 3000);
}
}

// === عرض تفاصيل يوم معين (شهادة الطالب) ===
function showDayGradeDetails(date) {
const students = loadFromStorage('students') || {};
const classStudents = students[currentGradeClass] || [];
const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
const saved = loadFromStorage('dailyGrades') || {};
const dateKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${date}`;
const dayData = saved[dateKey]?.students || {};
const customFields = saved[dateKey]?.customFields || [];
let html = `
<div style="background:white;color:#000;padding:30px;border-radius:15px;max-width:700px;margin:0 auto">
<h2 style="text-align:center;color:#000;border-bottom:3px double #000;padding-bottom:15px;margin-bottom:20px">
🏫 مدرسة الفاخر النموذجية
</h2>
<p style="text-align:center;font-weight:bold;margin-bottom:25px">
شهادة حضور وملاحظات يومية<br>
الطالب: ${currentStudentName} | الصف: ${currentGradeClass} - ${currentGradeSection}<br>
التاريخ: ${date} | المقرر: ${currentGradeSubject}
</p>
<table style="width:100%;border-collapse:collapse;border:2px solid #000">
<thead>
<tr style="background:#f0f0f0">
<th style="padding:10px;border:1px solid #000;text-align:center">#</th>
<th style="padding:10px;border:1px solid #000;text-align:center">الحقل</th>
<th style="padding:10px;border:1px solid #000;text-align:center">القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:10px;border:1px solid #000;text-align:center;font-weight:bold">1</td>
<td style="padding:10px;border:1px solid #000;text-align:center;font-weight:bold">الحضور/الغياب</td>
<td style="padding:10px;border:1px solid #000;text-align:center;font-weight:bold;color:${dayData['student_0']?.status==='absent'?'#dc3545':'#28a745'}">
${dayData['student_0']?.status==='absent'?'غائب ❌':'حاضر ✅'}
</td>
</tr>
${customFields.map((f, i) => `
<tr style="background:${i%2===0?'#fafafa':'#fff'}">
<td style="padding:10px;border:1px solid #000;text-align:center;font-weight:bold">${i+2}</td>
<td style="padding:10px;border:1px solid #000;text-align:center;font-weight:bold">${f.name}</td>
<td style="padding:10px;border:1px solid #000;text-align:center">${dayData['student_0']?.fields?.[f.name] || '—'}</td>
</tr>`).join('')}
</tbody>
</table>
<div style="margin-top:30px;text-align:center;display:flex;gap:15px;justify-content:center">
<button onclick="window.print()"
style="background:#007bff;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:bold">
🖨️ طباعة
</button>
<button onclick="enableEditMode()" id="editBtn"
style="background:#28a745;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:bold">
✏️ تعديل
</button>
<button onclick="saveEditedDetails('${date}')" id="saveBtn" style="display:none;background:#00ff9d;color:#000;border:none;padding:12px 30px;border-radius:10px;font-weight:bold">
💾 حفظ
</button>
</div>
</div>`;
const modal = document.createElement('div');
modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center';
modal.innerHTML = `<div style="max-height:90vh;overflow-y:auto">${html}</div>`;
modal.onclick = (e) => { if(e.target===modal) modal.remove(); };
document.body.appendChild(modal);
}

// === تفعيل وضع التعديل ===
function enableEditMode() {
document.getElementById('editBtn').style.display = 'none';
document.getElementById('saveBtn').style.display = 'inline-block';
}

// === حفظ التعديلات ===
function saveEditedDetails(date) {
showAlert('✅ نجاح', 'تم حفظ التعديلات!', 'success');
document.getElementById('editBtn').style.display = 'inline-block';
document.getElementById('saveBtn').style.display = 'none';
}

// === رفع الأسبوع للشهر ===
function uploadWeekToMonth() {
const saved = loadFromStorage('weeklyGrades') || {};
const weekKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${new Date().toISOString().split('T')[0].slice(0,7)}`;
saved[weekKey] = {
class: currentGradeClass,
section: currentGradeSection,
subject: currentGradeSubject,
uploadedAt: new Date().toISOString(),
customFields: [...customGradeFields]
};
saveToStorage('weeklyGrades', saved);
showAlert('✅ نجاح', 'تم رفع الأسبوع للشهر!', 'success');
checkAutoUploadMonth();
}

// === التحقق التلقائي لرفع الشهر بعد 30 يوم ===
function checkAutoUploadMonth() {
const saved = loadFromStorage('weeklyGrades') || {};
const monthKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${new Date().toISOString().split('T')[0].slice(0,7)}`;
const weeks = Object.keys(saved).filter(k => k.startsWith(monthKey));
if (weeks.length >= 4) {
autoUploadMonth();
}
}

// === رفع الشهر تلقائياً ===
function autoUploadMonth() {
const saved = loadFromStorage('monthlyGrades') || {};
const monthKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${new Date().toISOString().split('T')[0].slice(0,7)}`;
saved[monthKey] = {
class: currentGradeClass,
section: currentGradeSection,
subject: currentGradeSubject,
month: new Date().toLocaleDateString('ar-EG', {month:'long', year:'numeric'}),
uploadedAt: new Date().toISOString(),
summary: 'تم تجميع 4 أسابيع تلقائياً'
};
saveToStorage('monthlyGrades', saved);
showAlert('🎉 اكتمل الشهر', 'تم رفع الشهر تلقائياً بعد اكتمال 4 أسابيع!', 'success');
}

// === 6️⃣ الملاحظات الشهرية ===
function openMonthlyGradeForm() {
const saved = loadFromStorage('monthlyGrades') || {};
const months = Object.values(saved).filter(m =>
m.class === currentGradeClass && m.section === currentGradeSection
);
document.getElementById('monthlyGradeFormContent').innerHTML = `
<div style="background:#1a1a1a;padding:25px;border-radius:12px;border:2px solid #ff3366">
<h3 style="color:#ff3366;text-align:center;margin-bottom:20px">📊 الملاحظات الشهرية</h3>
${months.length > 0 ? `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px">
${months.map(m => `
<div style="background:#0a0a0a;padding:20px;border-radius:10px;border:2px solid #ff3366;text-align:center">
<div style="color:#ff3366;font-weight:bold;font-size:18px;margin-bottom:10px">${m.month}</div>
<div style="color:#aaa;font-size:14px;margin-bottom:15px">${m.summary}</div>
<button onclick="viewMonthDetails('${m.month}')"
style="background:#ff3366;color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:bold">
👁️ عرض التفاصيل
</button>
</div>`).join('')}
</div>
` : '<p style="text-align:center;color:#aaa">📭 لا توجد أشهر مرفوعة بعد</p>'}
</div>`;
navigateTo('gradeTypeSelectPage', 'monthlyGradeFormPage');
}



// === 📅 عرض الأسابيع المحفوظة ===
function showWeeksView() {
    const saved = loadFromStorage('weeklyGrades') || {};
    
    // تجميع الأيام في أسابيع
    const weeksMap = {};
    
    Object.keys(saved).forEach(key => {
        const data = saved[key];
        if (data.students && Object.keys(data.students).length > 0) {
            // استخراج التاريخ من المفتاح
            const parts = key.split('_');
            const dateStr = parts[parts.length - 1]; // آخر جزء هو التاريخ
            
            // حساب بداية الأسبوع (السبت)
            const date = new Date(dateStr);
            const day = date.getDay();
            const diff = (day + 1) % 7; // الفرق حتى السبت
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - diff);
            
            // حساب نهاية الأسبوع (الجمعة)
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            
            const weekKey = `${weekStart.toISOString().split('T')[0]}_${weekEnd.toISOString().split('T')[0]}`;
            
            if (!weeksMap[weekKey]) {
                weeksMap[weekKey] = {
                    startDate: weekStart,
                    endDate: weekEnd,
                    days: [],
                    subjects: new Set()
                };
            }
            
            // إضافة البيانات
            const classInfo = `${parts[0]}_${parts[1]}`;
            const subject = parts[2];
            weeksMap[weekKey].days.push({
                date: dateStr,
                class: parts[0],
                section: parts[1],
                subject: subject,
                hasData: true
            });
            weeksMap[weekKey].subjects.add(`${classInfo}_${subject}`);
        }
    });
    
    // تحويل الخريطة إلى مصفوفة وفرزها
    const weeks = Object.entries(weeksMap).map(([key, value]) => ({
        key,
        ...value,
        subjects: Array.from(value.subjects)
    })).sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    
    // عرض الأسابيع
    let html = `
    <div style="background:#1a1a1a;padding:30px;border-radius:15px;border:2px solid #4ecdc4;margin-bottom:25px;box-shadow:0 0 20px rgba(78,205,196,0.2);">
        <h3 style="color:#4ecdc4;text-align:center;margin-bottom:25px;font-size:24px;font-weight:bold;">📅 الأسابيع المحفوظة</h3>
        
        ${weeks.length === 0 ? `
            <div style="text-align:center;padding:40px;background:#0a0a0a;border-radius:10px;border:2px solid #333;">
                <div style="font-size:60px;margin-bottom:15px;">📭</div>
                <p style="color:#aaa;font-size:18px;">لا توجد أسابيع محفوظة بعد</p>
            </div>
        ` : `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">
                ${weeks.map((week, index) => {
                    const startDate = week.startDate.toLocaleDateString('ar-SA', {year:'numeric', month:'long', day:'numeric'});
                    const endDate = week.endDate.toLocaleDateString('ar-SA', {year:'numeric', month:'long', day:'numeric'});
                    const uniqueDays = [...new Set(week.days.map(d => d.date))];
                    
                    return `
                    <div style="background:linear-gradient(135deg,#1a1a2a,#0a0a1a);padding:25px;border-radius:15px;border:2px solid #4ecdc4;box-shadow:0 4px 15px rgba(78,205,196,0.2);transition:all 0.3s ease;" 
                         onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 8px 25px rgba(78,205,196,0.4)';" 
                         onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(78,205,196,0.2)';">
                        
                        <div style="text-align:center;margin-bottom:20px;padding-bottom:15px;border-bottom:2px solid #4ecdc4;">
                            <div style="font-size:40px;margin-bottom:10px;">📆</div>
                            <h4 style="color:#4ecdc4;margin:0;font-size:18px;font-weight:bold;">الأسبوع ${index + 1}</h4>
                        </div>
                        
                        <div style="background:#0a0a0a;padding:15px;border-radius:10px;margin-bottom:15px;">
                            <div style="color:#ffcc00;font-size:14px;margin-bottom:8px;">📅 الفترة:</div>
                            <div style="color:#fff;font-weight:bold;font-size:16px;">
                                من: ${startDate}
                            </div>
                            <div style="color:#fff;font-weight:bold;font-size:16px;margin-top:5px;">
                                إلى: ${endDate}
                            </div>
                        </div>
                        
                        <div style="background:#0a0a0a;padding:15px;border-radius:10px;margin-bottom:15px;">
                            <div style="color:#00ff9d;font-size:14px;margin-bottom:8px;">📊 الإحصائيات:</div>
                            <div style="color:#fff;font-size:15px;">
                                <span style="color:#aaa;">عدد الأيام:</span> 
                                <span style="color:#00eaff;font-weight:bold;">${uniqueDays.length} أيام</span>
                            </div>
                            <div style="color:#fff;font-size:15px;margin-top:5px;">
                                <span style="color:#aaa;">المقررات:</span> 
                                <span style="color:#00eaff;font-weight:bold;">${week.subjects.length}</span>
                            </div>
                        </div>
                        
                        <button onclick="viewWeekDetails('${week.key}')"
                                style="width:100%;background:linear-gradient(135deg,#4ecdc4,#1a936f);color:#fff;border:none;padding:12px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 10px rgba(78,205,196,0.3);"
                                onmouseover="this.style.transform='scale(1.05)';this.style.boxShadow='0 6px 15px rgba(78,205,196,0.5)';"
                                onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 10px rgba(78,205,196,0.3)';">
                            👁️ عرض تفاصيل الأسبوع
                        </button>
                    </div>
                    `;
                }).join('')}
            </div>
        `}
        
        <div style="margin-top:30px;text-align:center">
            <button onclick="switchView('days')"
                    style="background:#555;color:#fff;border:none;padding:12px 30px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;transition:all 0.3s;margin:0 10px;"
                    onmouseover="this.style.background='#666';this.style.transform='scale(1.05)';"
                    onmouseout="this.style.background='#555';this.style.transform='scale(1)';">
                🔙 رجوع للأيام
            </button>
        </div>
    </div>
    `;
    
    document.getElementById('dailyGradeFormContent').innerHTML = html;
}

// === 👁️ عرض تفاصيل أسبوع معين ===
function viewWeekDetails(weekKey) {
    const [startDate, endDate] = weekKey.split('_');
    const saved = loadFromStorage('weeklyGrades') || {};
    
    // جمع كل البيانات في هذا الأسبوع
    const weekData = [];
    
    Object.keys(saved).forEach(key => {
        const data = saved[key];
        if (data.students && Object.keys(data.students).length > 0) {
            const parts = key.split('_');
            const dateStr = parts[parts.length - 1];
            
            if (dateStr >= startDate && dateStr <= endDate) {
                weekData.push({
                    key,
                    date: dateStr,
                    class: parts[0],
                    section: parts[1],
                    subject: parts[2],
                    students: data.students,
                    customFields: data.customFields || []
                });
            }
        }
    });
    
    // ترتيب البيانات حسب التاريخ
    weekData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let html = `
    <div style="background:white;color:#000;padding:30px;border-radius:15px;max-width:1000px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:30px;padding-bottom:20px;border-bottom:3px double #000;">
            <h2 style="color:#1a1a1a;margin:0 0 10px 0;font-size:28px;">🏫 مدرسة الفاخر النموذجية</h2>
            <h3 style="color:#4ecdc4;margin:0;font-size:22px;">تقرير الأسبوع</h3>
            <p style="color:#666;margin:10px 0 0 0;font-size:16px;">
                من ${new Date(startDate).toLocaleDateString('ar-SA')} 
                إلى ${new Date(endDate).toLocaleDateString('ar-SA')}
            </p>
        </div>
        
        ${weekData.map((day, dayIndex) => `
        <div style="margin-bottom:30px;padding:20px;background:#f9f9f9;border-radius:10px;border:2px solid #ddd;">
            <h4 style="background:#4ecdc4;color:#fff;padding:10px 15px;border-radius:8px;margin:0 0 15px 0;font-size:18px;">
                📅 ${new Date(day.date).toLocaleDateString('ar-SA', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}
                <span style="float:left;background:rgba(255,255,255,0.3);padding:3px 10px;border-radius:5px;font-size:14px;">
                    ${day.class} - ${day.section} (${day.subject})
                </span>
            </h4>
            
            <table style="width:100%;border-collapse:collapse;background:#fff;">
                <thead>
                    <tr style="background:#333;color:#fff;">
                        <th style="padding:10px;border:1px solid #ddd;text-align:center">#</th>
                        <th style="padding:10px;border:1px solid #ddd;text-align:center">الطالب</th>
                        <th style="padding:10px;border:1px solid #ddd;text-align:center">الحضور</th>
                        ${day.customFields.map(f => `
                            <th style="padding:10px;border:1px solid #ddd;text-align:center">${f.name}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(day.students).map(([studentKey, studentData], index) => {
                        const studentIndex = studentKey.replace('student_', '');
                        const students = loadFromStorage('students') || {};
                        const classStudents = students[day.class] || [];
                        const student = classStudents.find(s => s['الشعبة'] === day.section) || classStudents[parseInt(studentIndex)];
                        
                        return `
                        <tr style="background:${index % 2 === 0 ? '#fff' : '#f5f5f5'};">
                            <td style="padding:8px;border:1px solid #ddd;text-align:center">${index + 1}</td>
                            <td style="padding:8px;border:1px solid #ddd;text-align:center;font-weight:bold;">${student?.['الاسم الكامل'] || 'غير معروف'}</td>
                            <td style="padding:8px;border:1px solid #ddd;text-align:center;">
                                ${studentData.status === 'present' ? '✅ حاضر' : '❌ غائب'}
                            </td>
                            ${day.customFields.map(f => `
                                <td style="padding:8px;border:1px solid #ddd;text-align:center;">
                                    ${studentData.fields?.[f.name] || '—'}
                                </td>
                            `).join('')}
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        `).join('')}
        
        <div style="margin-top:30px;text-align:center;display:flex;gap:15px;justify-content:center;">
            <button onclick="window.print()"
                    style="background:#007bff;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">
                🖨️ طباعة التقرير
            </button>
            <button onclick="showWeeksView()"
                    style="background:#555;color:white;border:none;padding:12px 30px;border-radius:10px;font-weight:bold;font-size:16px;cursor:pointer;">
                🔙 رجوع للأسابيع
            </button>
        </div>
    </div>
    `;
    
    // إنشاء modal للعرض
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:20px;';
    modal.innerHTML = `<div style="width:100%;max-width:1200px;">${html}</div>`;
    modal.onclick = (e) => { if(e.target===modal) modal.remove(); };
    document.body.appendChild(modal);
}


// === 🆕 حفظ أو تعديل (يغير الزر بين حفظ وتعديل) ===
function saveOrEditDayGrades(dateStr) {
    const btn = document.getElementById('saveOrEditBtn');
    const isEditMode = btn.textContent.includes('تعديل');
    
    if (isEditMode) {
        // إذا كان في وضع التعديل، احفظ وعد لوضع العرض
        saveDayGrades(dateStr);
        btn.innerHTML = '💾 حفظ الكل';
        btn.style.background = '#00ff9d';
        showAlert('✅ تم الحفظ', 'تم حفظ التعديلات بنجاح!', 'success');
    } else {
        // إذا كان في وضع الحفظ، احفظ وغير الزر لتعديل
        saveDayGrades(dateStr);
        btn.innerHTML = '✏️ تعديل';
        btn.style.background = '#ffcc00';
        showAlert('✅ تم الحفظ', 'البيانات محفوظة - يمكنك التعديل الآن', 'success');
    }
}

// === 🆕 الحفظ التلقائي عند التغيير ===
let autoSaveTimeout;
function autoSaveDayData(dateStr) {
    // تأخير الحفظ لمدة 1 ثانية بعد آخر تغيير
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveDayGrades(dateStr, true); // true = حفظ تلقائي (صامت)
        
        // إظهار رسالة الحفظ التلقائي
        const msgEl = document.getElementById('autoSaveMessage');
        if (msgEl) {
            msgEl.style.display = 'block';
            setTimeout(() => {
                msgEl.style.display = 'none';
            }, 2000);
        }
    }, 1000);
}

// === 🆕 إضافة حقل لكل الأيام (مو يوم واحد) ===
function addNewFieldToAllDays(currentDateStr) {
    const fieldName = prompt('✏️ أدخل اسم الحقل الجديد (سيُضاف لجميع الأيام):');
    if (!fieldName || fieldName.trim() === '') return;
    
    const cleanName = fieldName.trim();
    const saved = loadFromStorage('weeklyGrades') || {};
    const weekKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}`;
    
    // الحصول على جميع الأيام في هذا الأسبوع
    const weekDays = [];
    const today = new Date();
    const day = today.getDay();
    const diff = (day + 1) % 7;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - diff);
    
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + i);
        const dateStr = dayDate.toISOString().split('T')[0];
        weekDays.push(dateStr);
    }
    
    // إضافة الحقل لكل يوم
    let addedCount = 0;
    weekDays.forEach(dateStr => {
        const dataKey = `${weekKey}_${dateStr}`;
        if (!saved[dataKey]) {
            saved[dataKey] = { students: {}, customFields: [] };
        }
        if (!saved[dataKey].customFields) {
            saved[dataKey].customFields = [];
        }
        
        // التحقق إذا الحقل موجود مسبقاً
        if (!saved[dataKey].customFields.some(f => f.name === cleanName)) {
            saved[dataKey].customFields.push({ id: Date.now() + Math.random(), name: cleanName });
            addedCount++;
        }
    });
    
    saveToStorage('weeklyGrades', saved);
    showAlert('✅ تم الإضافة', `تم إضافة الحقل "${cleanName}" لـ ${addedCount} يوم في الأسبوع!`, 'success');
    
    // إعادة تحميل الجدول الحالي
    openDayGrades(currentDateStr, currentDayMode);
}

// === 🆕 حفظ درجات اليوم (معدل) ===
function saveDayGrades(dateStr, isAutoSave = false) {
    const students = loadFromStorage('students') || {};
    const classStudents = students[currentGradeClass] || [];
    const filtered = classStudents.filter(s => !currentGradeSection || s['الشعبة'] === currentGradeSection);
    
    const data = {};
    filtered.forEach((_, i) => {
        const key = `student_${i}`;
        const statusEl = document.getElementById(`day_status_${i}`);
        if (!statusEl) return;
        
        data[key] = {
            status: statusEl.value || 'present',
            fields: {}
        };
        
        // جمع جميع الحقول المخصصة
        const allTextareas = document.querySelectorAll(`textarea[id^="day_field_${i}_"]`);
        allTextareas.forEach(textarea => {
            const fieldId = textarea.id.replace(`day_field_${i}_`, '');
            const fieldEl = document.querySelector(`th span[data-field-id="${fieldId}"]`);
            if (fieldEl) {
                data[key].fields[fieldEl.textContent] = textarea.value || '';
            }
        });
    });
    
    const saved = loadFromStorage('weeklyGrades') || {};
    const dataKey = `${currentGradeClass}_${currentGradeSection}_${currentGradeSubject}_${dateStr}`;
    
    // الحصول على الحقول المخصصة من الهيدر
    const customFields = [];
    document.querySelectorAll('#dayCustomFieldsHeader th').forEach(th => {
        const span = th.querySelector('span[data-field-id]');
        if (span) {
            customFields.push({
                id: span.getAttribute('data-field-id'),
                name: span.textContent
            });
        }
    });
    
    saved[dataKey] = {
        students: data,
        customFields: customFields.length > 0 ? customFields : (saved[dataKey]?.customFields || []),
        updatedAt: new Date().toISOString(),
        lastAutoSave: isAutoSave ? new Date().toISOString() : null
    };
    
    saveToStorage('weeklyGrades', saved);
    
    if (!isAutoSave) {
        showAlert('✅ نجاح', `تم حفظ درجات يوم ${dateStr}!`, 'success');
    }
}
// === 🆕 دالة تغيير المقرر وتحديث كل شيء تلقائياً ===
function changeCurrentClass(value) {
    if (!value) return;
    
    const [className, section, subject] = value.split('|');
    
    // تحديث المتغيرات العامة
    currentGradeClass = className;
    currentGradeSection = section;
    currentGradeSubject = subject;
    
    // ✅ إعادة تحميل كل البيانات تلقائياً
    loadStudentsForTeacher(className, section, subject);
    
    // ✅ إعادة عرض صفحة الدرجات بالكامل (مع الأيام والأسابيع)
    openDailyGradeForm();
    
    // ✅ إظهار رسالة تأكيد
    showAlert('✅ تم التغيير', `تم الانتقال إلى: ${className} - ${section} (${subject})`, 'success');
}

// === جعل الدوال متاحة عالمياً ===
window.openGradeClassSelectPage = openGradeClassSelectPage;
window.loadStudentsForGrades = loadStudentsForGrades;
window.openGradeTypeSelect = openGradeTypeSelect;
window.openDailyGradeForm = openDailyGradeForm;
window.addCustomGradeField = addCustomGradeField;
window.removeCustomField = removeCustomField;
window.renderDailyGradeTable = renderDailyGradeTable;
window.saveDailyGradesAndGoWeekly = saveDailyGradesAndGoWeekly;
window.openWeeklyGradeForm = openWeeklyGradeForm;
window.showDayGradeDetails = showDayGradeDetails;
window.enableEditMode = enableEditMode;
window.saveEditedDetails = saveEditedDetails;
window.uploadWeekToMonth = uploadWeekToMonth;
window.checkAutoUploadMonth = checkAutoUploadMonth;
window.autoUploadMonth = autoUploadMonth;
window.openMonthlyGradeForm = openMonthlyGradeForm;

// === إضافة الدوال الجديدة للنافذة العالمية ===
window.openDayGrades = openDayGrades;
window.closeDayGrades = closeDayGrades;
window.saveDayGrades = saveDayGrades;
window.renderDayCustomFieldsHeader = renderDayCustomFieldsHeader;
window.renderDayGradesTable = renderDayGradesTable;
window.openCustomTableCreator = openCustomTableCreator;
window.openCustomTableBuilder = openCustomTableBuilder;
window.renderCustomTableInput = renderCustomTableInput;
window.addCustomTableRow = addCustomTableRow;
window.saveCustomTableData = saveCustomTableData;
window.viewSavedCustomTables = viewSavedCustomTables;
window.updateCustomFieldsDisplay = updateCustomFieldsDisplay;
window.changeCurrentClass = changeCurrentClass;
window.returnToDashboard = returnToDashboard;
// في نهاية الملف، أضف:
window.showWeeksView = showWeeksView;
window.viewWeekDetails = viewWeekDetails;

