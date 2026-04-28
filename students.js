// students.js - وظائف الطلاب فقط

let students = loadFromStorage('students') || {};
let savedExtraFields = loadFromStorage('savedExtraFields') || [];
let feesData = loadFromStorage('feesData') || {};
let feesCustomFields = loadFromStorage('feesCustomFields') || [];
let deletedStudents = loadFromStorage('deletedStudents') || [];
let smartSections = loadFromStorage('smartSections') || {};
classes.forEach(cls => {
  if (!students[cls]) students[cls] = [];
});

window.editingStudentOldName = null;
window.editingStudentClass = null;
window.editingStudentIndex = null;
window.customPhotos = {};


// === دوال الصور ===
function addPhotoField() {
  const fieldName = prompt("أدخل اسم الحقل (مثال: صورة الهوية):");
  if (!fieldName || fieldName.trim() === "") return;
  const name = fieldName.trim();
  const container = document.getElementById('extraFieldsContainer');
  if (savedExtraFields.some(f => f.name === name)) {
    alert("هذا الحقل موجود مسبقًا!");
    return;
  }
  savedExtraFields.push({ name, type: 'image' });
  saveToStorage('savedExtraFields', savedExtraFields);
  appendStudentField(name, 'image');
}

function handleCustomPhotoUpload(inputElement, fieldName) {
  const previewDiv = document.getElementById(`preview_${fieldName}`);
  previewDiv.innerHTML = '';
  if (!inputElement.files[0]) {
    delete window.customPhotos[fieldName];
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    window.customPhotos[fieldName] = dataUrl;
    previewDiv.innerHTML = `<img src="${dataUrl}" alt="${fieldName}" style="max-width:120px; max-height:120px; border-radius:6px; border:1px solid #00eaff;">`;
  };
  reader.readAsDataURL(inputElement.files[0]);
}

// === دالة فتح صفحة الطلاب ===
function openStudentsPage() {
  navigateTo("menuPage", "studentsPage");
}
function showAddStudent() {
    navigateTo("studentsPage", "addStudentPage");
    document.getElementById('extraFieldsContainer').innerHTML = '';
    savedExtraFields.forEach(field => appendStudentField(field.name, field.type));
    window.customPhotos = {};
    
    // ✅ إظهار حقل الشعبة عند الإضافة الجديدة
    const sectionContainer = document.getElementById('sectionContainer');
    if (sectionContainer) {
        sectionContainer.style.display = 'block';
    }
    document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
    document.getElementById('sectionDisplay').style.color = '#fff';
    
    updateSectionOptions();
}

function showViewStudents() {
  navigateTo("studentsPage", "viewStudentsPage");
  const grid = document.getElementById('classGrid');
  grid.innerHTML = '';
  classes.forEach(c => {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerText = c;
    div.onclick = () => showStudentsList(c);
    grid.appendChild(div);
  });
}

function showStudentsList(cls) {
  document.getElementById('currentClass').innerText = cls;
  navigateTo("viewStudentsPage", "studentsListPage");
  renderStudentsList(cls);
}

// === عرض قائمة الطلاب في صف معين - النسخة الاحترافية ===
function renderStudentsList(cls) {
  const tbody = document.querySelector('#studentsTable tbody');
  const thead = document.querySelector('#studentsTable thead');
  tbody.innerHTML = '';
  const list = students[cls] || [];
  
  if (list.length === 0) {
    thead.innerHTML = '<tr><th colspan="4">لا يوجد طلاب</th></tr>';
    document.getElementById('sectionFieldsContainer').style.display = 'none';
    document.getElementById('sectionSearchInput').parentElement.style.display = 'none';
    return;
  }

  // === عرض الشعب المتاحة ===
  const sectionsContainer = document.getElementById('sectionFieldsContainer');
  const searchContainer = document.getElementById('sectionSearchInput').parentElement;
  const uniqueSections = [...new Set(list.map(s => s["الشعبة"] || "بدون شعبة"))];
  
  sectionsContainer.style.display = 'flex';
  searchContainer.style.display = 'flex';
  sectionsContainer.innerHTML = '';
  
  // زر الكل
  const allBtn = document.createElement('button');
  allBtn.className = 'btn';
  allBtn.style.background = '#00eaff';
  allBtn.style.color = '#000';
  allBtn.style.flex = '0 0 auto';
  allBtn.style.width = 'auto';
  allBtn.style.padding = '8px 15px';
  allBtn.innerHTML = 'الكل <span style="background:#111; color:#00eaff; padding:2px 8px; border-radius:10px; margin-right:5px;">' + list.length + '</span>';
  allBtn.onclick = () => filterStudentsBySection(cls, 'الكل');
  sectionsContainer.appendChild(allBtn);
  
  // أزرار الشعب
  uniqueSections.forEach(section => {
    const count = list.filter(s => s["الشعبة"] === section).length;
    const sectionBtn = document.createElement('button');
    sectionBtn.className = 'btn';
    sectionBtn.style.background = '#111';
    sectionBtn.style.color = '#00eaff';
    sectionBtn.style.border = '2px solid #00eaff';
    sectionBtn.style.flex = '0 0 auto';
    sectionBtn.style.width = 'auto';
    sectionBtn.style.padding = '8px 15px';
    sectionBtn.style.whiteSpace = 'nowrap';
    sectionBtn.innerHTML = section + ' <span style="background:#00eaff; color:#000; padding:2px 8px; border-radius:10px; margin-right:5px;">' + count + '</span>';
    sectionBtn.onclick = () => filterStudentsBySection(cls, section);
    sectionsContainer.appendChild(sectionBtn);
  });
  
  // === جمع الحقول ===
  const allKeys = [...new Set(list.flatMap(s => 
    Object.keys(s).filter(k => !["الاسم الكامل", "الشعبة", "رقم ولي الأمر", "الجنس", "رقم شهادة الميلاد", "ملاحظات", "fees"].includes(k))
  ))];
  
  const imageKeys = allKeys.filter(key => {
    return list.some(s => typeof s[key] === 'string' && s[key].startsWith('data:image'));
  });
  const textKeys = allKeys.filter(key => !imageKeys.includes(key));
  
  // === العناوين ===
  const headers = ["الصورة", "الاسم الكامل", "الشعبة", ...textKeys, "الإجراءات"];
  thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
  // === ✅ صفوف الطلاب مع كلاس للأعمدة الثابتة (بدون inline sticky) ===
tbody.innerHTML = list.map((s, i) => {
  let mainPhoto = '';
  for (const key in s) {
    if (typeof s[key] === 'string' && s[key].startsWith('data:image')) {
      mainPhoto = s[key];
      break;
    }
  }
  
  const photoCell = mainPhoto 
    ? `<img src="${mainPhoto}" style="width:50px; height:50px; border-radius:8px; border:2px solid #00eaff; object-fit:cover; cursor:pointer;" onclick="openStudentModal('${cls}', ${i})"/>`
    : `<div style="width:50px; height:50px; border-radius:8px; background:#333; display:flex; align-items:center; justify-content:center; color:#00eaff; font-size:20px;">👤</div>`;
  
  let textCells = textKeys.map(key => {
    const value = s[key] || '';
    return `<td>${value}</td>`;
  });
  
  const actionCell = `
    <td>
      <button class="btn btn-sm" onclick="openStudentModal('${cls}', ${i})">👁️</button>
      <button class="btn btn-sm" onclick="editStudent('${cls}', ${i})">✏️</button>
      <button class="btn btn-sm btn-danger" onclick="deleteStudent('${cls}', ${i})">❌</button>
    </td>`;
  
  // === ✅ الصف مع كلاس للأعمدة الثابتة (الحل الذكي) ===
  return `<tr data-section="${s["الشعبة"] || "بدون شعبة"}">
    <td class="sticky-col col-photo" style="text-align:center;">${photoCell}</td>
    <td class="sticky-col col-name" style="font-weight:bold; color:#00eaff;">${s["الاسم الكامل"] || ''}</td>
    <td class="sticky-col col-section" style="background:#1a1a1a; color:#00eaff; font-weight:bold;">${s["الشعبة"] || "بدون شعبة"}</td>
    ${textCells.join('')}
    ${actionCell}
  </tr>`;
}).join('');

// === ✅ تفعيل الأعمدة الثابتة ديناميكيًا ===
setTimeout(() => {
  autoStickyColumns();
}, 100);


  
  // === ✅ البحث - نسخة سريعة ===
  const sectionSearch = document.getElementById('sectionSearchInput');
  sectionSearch.placeholder = 'ابحث باسم الطالب أو الشعبة...';
  sectionSearch.value = '';
  sectionSearch.oninput = () => {
    const term = sectionSearch.value.toLowerCase().trim();
    tbody.querySelectorAll('tr').forEach(row => {
      // ✅ بحث سريع في النص الكامل للصف
      row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  };
  
  // ✅ لا نحتاج setTimeout - CSS يتكفل بالباقي
}

// ✅ تفعيل التمرير الأفقي
setTimeout(() => {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        tableContainer.style.overflowX = 'auto';
        tableContainer.style.webkitOverflowScrolling = 'touch'; // للجوال
    }
}, 100);

// === دالة فلترة الطلاب حسب الشعبة ===
function filterStudentsBySection(cls, sectionName) {
    const tbody = document.querySelector('#studentsTable tbody');
    
    if (sectionName === 'الكل') {
        tbody.querySelectorAll('tr').forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    tbody.querySelectorAll('tr').forEach(row => {
        const section = row.getAttribute('data-section') || '';
        row.style.display = section === sectionName ? '' : 'none';
    });
}




// === دوال إدارة الشعب (النهائية مع تحسينات) ===
function updateSections() {
  const classSelect = document.getElementById('stuClassForNew');
  const sectionContainer = document.getElementById('sectionContainer');
  
  if (classSelect.value) {
    sectionContainer.style.display = 'block';
  } else {
    sectionContainer.style.display = 'none';
    document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
  }
}

function toggleSectionOptions() {
  const sectionOptions = document.getElementById('sectionOptions');
  sectionOptions.style.display = sectionOptions.style.display === 'none' ? 'block' : 'none';
}

function selectSection(sectionName) {
  // عرض الشعبة المختارة في الحقل العلوي
  document.getElementById('sectionDisplay').textContent = sectionName;
  // إغلاق القائمة
  document.getElementById('sectionOptions').style.display = 'none';
}

function removeSection(sectionName, event) {
  event.stopPropagation(); // منع فتح القائمة عند حذف
  if (!confirm(`هل أنت متأكد من حذف الشعبة "${sectionName}"؟`)) return;
  
  // حذف من القائمة المخصصة
  const options = document.querySelectorAll('.section-option');
  options.forEach(option => {
    const sectionText = option.querySelector('span:first-child').textContent;
    if (sectionText === sectionName) {
      option.remove();
    }
  });
  
  // تحديث العرض
  if (document.getElementById('sectionDisplay').textContent === sectionName) {
    document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
  }
  
  alert(`✅ تم حذف الشعبة "${sectionName}"!`);
}

function addCustomSection() {
  const sectionName = prompt("أدخل اسم الشعبة الجديدة (مثال: س، ص، ق):");
  if (!sectionName || sectionName.trim() === "") return;
  
  const cleanName = sectionName.trim();
  
  // التحقق إذا كانت الشعبة موجودة مسبقاً
  const options = document.querySelectorAll('.section-option span:first-child');
  let exists = false;
  options.forEach(opt => {
    if (opt.textContent === cleanName) exists = true;
  });
  

  if (exists) {
    alert("هذه الشعبة موجودة مسبقاً!");
    return;
  }
  
  // إضافة الشعبة الجديدة
  const sectionOptions = document.getElementById('sectionOptions');
  const newOption = document.createElement('div');
  newOption.className = 'section-option';
  newOption.style.padding = '12px';
  newOption.style.display = 'flex';
  newOption.style.justifyContent = 'space-between';
  newOption.style.alignItems = 'center';
  newOption.style.cursor = 'pointer';
  newOption.style.borderBottom = '1px solid #333';
  newOption.onclick = function() { selectSection(cleanName); };
  newOption.innerHTML = `
    <span style="color: #00eaff; font-weight: bold;">${cleanName}</span>
    <span class="section-delete-btn" onclick="removeSection('${cleanName}', event)" style="color: #ff3366; cursor: pointer; font-size: 20px; font-weight: bold;">×</span>
  `;
  sectionOptions.insertBefore(newOption, sectionOptions.lastChild);
  
  alert(`✅ تم إضافة الشعبة "${cleanName}" بنجاح!`);
}

function appendStudentField(name, type = 'text') {
    const container = document.getElementById('extraFieldsContainer');
    const div = document.createElement('div');
    div.className = 'form-group';
    
    if (type === 'image') {
        const inputId = `photoInput_${Date.now()}`;
        div.style.cssText = `
            margin: 20px 0;
            animation: slideIn 0.3s ease;
        `;
        
        div.innerHTML = `
            <label style="color: #e5e7eb; font-weight: 600; font-size: 15px; display: block; margin-bottom: 10px;">📸 ${name}</label>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="file" id="${inputId}" accept="image/*" 
                    style="flex: 1; width: 100%; padding: 14px 18px; border-radius: 16px; border: 2px solid rgba(139,92,246,0.3); 
                    background: rgba(0,0,0,0.3); color: #fff; font-size: 15px; outline: none; transition: all 0.3s;"
                    onchange="handleCustomPhotoUpload(this, '${name}')"
                    onfocus="this.style.borderColor='#8b5cf6'; this.style.boxShadow='0 0 20px rgba(139,92,246,0.2)';" 
                    onblur="this.style.borderColor='rgba(139,92,246,0.3)'; this.style.boxShadow='none';" />
                
                <button type="button" onclick="removeStudentField('${name}')" 
                    style="width: 44px; height: 44px; min-width: 44px; border-radius: 12px; border: none; 
                    background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; 
                    font-size: 20px; font-weight: bold; cursor: pointer; transition: all 0.3s; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 2px 8px rgba(239,68,68,0.3);"
                    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 15px rgba(239,68,68,0.5)';" 
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(239,68,68,0.3)';">
                    ✕
                </button>
            </div>
            <div id="preview_${name}" style="margin-top:10px; text-align:center;"></div>
        `;
    } else {
        div.style.cssText = `
            margin: 20px 0;
            animation: slideIn 0.3s ease;
        `;
        
        div.innerHTML = `
            <label style="color: #e5e7eb; font-weight: 600; font-size: 15px; display: block; margin-bottom: 10px;">📝 ${name}</label>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" data-field-name="${name}" placeholder="أدخل ${name}" class="extraFieldValue"
                    style="flex: 1; width: 100%; padding: 14px 18px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.1); 
                    background: rgba(0,0,0,0.3); color: #fff; font-size: 15px; outline: none; transition: all 0.3s;"
                    onfocus="this.style.borderColor='#fbbf24'; this.style.boxShadow='0 0 20px rgba(251,191,36,0.2)';" 
                    onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.boxShadow='none';" />
                
                <button type="button" onclick="removeStudentField('${name}')" 
                    style="width: 44px; height: 44px; min-width: 44px; border-radius: 12px; border: none; 
                    background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; 
                    font-size: 20px; font-weight: bold; cursor: pointer; transition: all 0.3s; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 2px 8px rgba(239,68,68,0.3);"
                    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 15px rgba(239,68,68,0.5)';" 
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 8px rgba(239,68,68,0.3)';">
                    ✕
                </button>
            </div>
        `;
    }
    
    container.appendChild(div);
}



function addExtraField() {
  const name = prompt("أدخل اسم الحقل الجديد:");
  if (!name || name.trim() === "") return;
  const n = name.trim();
  if (savedExtraFields.some(f => f.name === n)) { alert("الحقل موجود!"); return; }
  savedExtraFields.push({ name: n, type: 'text' });
  saveToStorage('savedExtraFields', savedExtraFields);
  appendStudentField(n, 'text');
}

function removeStudentField(fieldName) {
  if (!confirm(`هل أنت متأكد من حذف الحقل "${fieldName}" نهائيًا؟ سيتم إزالته من جميع الطلاب!`)) return;
  savedExtraFields = savedExtraFields.filter(f => f.name !== fieldName);
  saveToStorage('savedExtraFields', savedExtraFields);
  const container = document.getElementById('extraFieldsContainer');
  const fieldDiv = container.querySelector(`[data-field-name="${fieldName}"]`)?.closest('.form-group');
  if (fieldDiv) fieldDiv.remove();
  delete window.customPhotos[fieldName];
}

function saveStudent() {
    const newClass = document.getElementById('stuClassForNew').value;
    const fullName = document.getElementById("stuFullName").value.trim();
    
    if (!newClass || !classes.includes(newClass) || !fullName) {
        alert("تأكد من الصف والاسم!");
        return;
    }
    
    // ✅ عند التعديل: نستخدم الشعبة المحفوظة، عند الإضافة: نستخدم الشعبة المختارة
    let section;
    if (window.editingStudentOldName) {
        // وضع التعديل - نحتفظ بالشعبة الأصلية
        section = window.editingStudentSection || "بدون شعبة";
    } else {
        // وضع الإضافة - نستخدم الشعبة المختارة
        section = document.getElementById('sectionDisplay').textContent;
        if (section === "اختر الشعبة" || section === "اختر الصف") {
            alert("⚠️ يرجى اختيار شعبة ذكية للطالب!");
            return;
        }
    }
    
    const studentData = {
        "الاسم الكامل": fullName,
        "الشعبة": section,  // ✅ الشعبة تُحفظ هنا وتظهر في جدول العرض
        "رقم ولي الأمر": document.getElementById("stuGuardianPhone").value.trim(),
        "الجنس": document.getElementById("stuGender").value,
        "رقم شهادة الميلاد": document.getElementById("stuBirthCert").value.trim(),
        "ملاحظات": document.getElementById("stuNotes").value.trim(),
        fees: []
    };
    
    // حقول إضافية
    document.querySelectorAll('#extraFieldsContainer .extraFieldValue').forEach(input => {
        const name = input.getAttribute('data-field-name');
        if (name) {
            studentData[name] = input.value.trim();
            if (!savedExtraFields.some(f => f.name === name)) {
                savedExtraFields.push({ name, type: 'text' });
            }
        }
    });
    
    // صور مخصصة
    Object.keys(window.customPhotos).forEach(fieldName => {
        studentData[fieldName] = window.customPhotos[fieldName];
        if (!savedExtraFields.some(f => f.name === fieldName)) {
            savedExtraFields.push({ name: fieldName, type: 'image' });
        }
    });
    
    // حفظ أو تعديل
    if (window.editingStudentOldName && window.editingStudentClass && window.editingStudentIndex !== undefined) {
        const oldName = window.editingStudentOldName;
        const oldClass = window.editingStudentClass;
        const idx = window.editingStudentIndex;
        students[oldClass].splice(idx, 1);
        
        // تحديث بيانات الرسوم
        if (oldName !== fullName && feesData) {
            Object.keys(feesData).forEach(c => {
                Object.keys(feesData[c] || {}).forEach(month => {
                    const monthData = feesData[c][month];
                    if (monthData.students && monthData.students[oldName] !== undefined) {
                        monthData.students[fullName] = monthData.students[oldName];
                        delete monthData.students[oldName];
                    }
                });
            });
            saveToStorage('feesData', feesData);
        }
        
        if (!students[newClass]) students[newClass] = [];
        students[newClass].push(studentData);
        
        // ✅ تنظيف متغيرات التعديل
        delete window.editingStudentOldName;
        delete window.editingStudentClass;
        delete window.editingStudentIndex;
        delete window.editingStudentSection;
        
        alert("✅ تم تعديل الطالب بنجاح!");
    } else {
        if (!students[newClass]) students[newClass] = [];
        students[newClass].push(studentData);
        alert("✅ تم الحفظ!");
    }
    
    saveToStorage('students', students);
    saveToStorage('savedExtraFields', savedExtraFields);
    
    // مسح الحقول
    ['stuFullName', 'stuGuardianPhone', 'stuBirthCert', 'stuNotes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('stuGender').value = 'ذكر';
    document.getElementById('extraFieldsContainer').innerHTML = '';
    window.customPhotos = {};
    
    // ✅ إظهار حقل الشعبة مرة أخرى للإضافات الجديدة
    const sectionContainer = document.getElementById('sectionContainer');
    if (sectionContainer) {
        sectionContainer.style.display = 'block';
    }
    
    goBack();
}

// ✅ في نهاية دالة saveStudent - إظهار حقل الشعبة للإضافات الجديدة
const sectionContainer = document.getElementById('sectionContainer');
if (sectionContainer) {
    sectionContainer.style.display = 'block';
}

// التحقق التلقائي عند كتابة اسم الطالب
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('stuFullName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const studentName = this.value.trim();
            const sectionDisplay = document.getElementById('sectionDisplay')?.textContent;
            
            if (studentName && sectionDisplay && sectionDisplay !== "اختر الشعبة" && sectionDisplay !== "اختر الصف") {
                autoAssignSectionForStudent(sectionDisplay);
            }
        });
    }
});
function editStudent(cls, index) {
    const oldName = students[cls][index]["الاسم الكامل"];
    const s = students[cls][index];
    
    navigateTo("studentsListPage", "addStudentPage");
    document.getElementById('stuClassForNew').value = cls;
    document.getElementById('stuFullName').value = oldName || '';
    document.getElementById('stuGuardianPhone').value = s["رقم ولي الأمر"] || '';
    document.getElementById('stuGender').value = s["الجنس"] || 'ذكر';
    document.getElementById('stuBirthCert').value = s["رقم شهادة الميلاد"] || '';
    document.getElementById('stuNotes').value = s["ملاحظات"] || '';
    
    // ✅ إخفاء حقل الشعبة عند التعديل
    const sectionContainer = document.getElementById('sectionContainer');
    if (sectionContainer) {
        sectionContainer.style.display = 'none';
    }
    
    const cont = document.getElementById('extraFieldsContainer');
    cont.innerHTML = '';
    window.customPhotos = {};
    
    // جمع أسماء الحقول الموجودة في الطالب
    const studentKeys = Object.keys(s).filter(k =>
        !["الاسم الكامل", "رقم ولي الأمر", "الجنس", "رقم شهادة الميلاد", "ملاحظات", "fees", "الشعبة"].includes(k)
    );
    
    // ✅ عرض الحقول باستخدام appendStudentField (نفس الإضافة)
    studentKeys.forEach(k => {
        const fieldInfo = savedExtraFields.find(f => f.name === k);
        const fieldType = fieldInfo ? fieldInfo.type : (typeof s[k] === 'string' && s[k].startsWith('data:image') ? 'image' : 'text');
        
        if (fieldType === 'image') {
            // ✅ استخدام appendStudentField للصور أيضاً
            appendStudentField(k, 'image');
            window.customPhotos[k] = s[k];
            // عرض الصورة المحفوظة
            const previewDiv = document.getElementById(`preview_${k}`);
            if (previewDiv) {
                previewDiv.innerHTML = `<img src="${s[k]}" style="max-width:120px; max-height:120px; border-radius:6px; border:1px solid #00eaff;">`;
            }
        } else {
            // ✅ استخدام appendStudentField للنصوص
            appendStudentField(k, 'text');
            const input = cont.querySelector(`[data-field-name="${k}"]`);
            if (input) input.value = s[k] || '';
        }
        
        // التأكد من وجود الحقل في savedExtraFields
        if (!savedExtraFields.some(f => f.name === k)) {
            savedExtraFields.push({ name: k, type: fieldType });
        }
    });
    
    saveToStorage('savedExtraFields', savedExtraFields);
    
    // ✅ حفظ معلومات التعديل
    window.editingStudentOldName = oldName;
    window.editingStudentClass = cls;
    window.editingStudentIndex = index;
    window.editingStudentSection = s["الشعبة"] || "بدون شعبة";
}


function deleteStudent(cls, index) {
    const student = students[cls][index];
    const studentName = student["الاسم الكامل"] || "غير معروف";
    if (!confirm(`⚠️ تحذير: سيتم حذف الطالب "${studentName}" من النظام!
    الطالب سيتم نقله إلى سلة المحذوفين ويمكنك استرجاعه لاحقًا.
    هل أنت متأكد من المتابعة؟`)) return;
    
    // إضافة معلومات الحذف
    student.__originalClass = cls;
    student.__deletedAt = new Date().toLocaleString('ar-EG');
    student.__deletedBy = 'المدير';
    
    // 1. نقل الطالب إلى السلة
    deletedStudents.push(student);
    saveToStorage('deletedStudents', deletedStudents);
    
    // 2. حذفه من القائمة الرئيسية
    students[cls].splice(index, 1);
    saveToStorage('students', students);
    
    // 3. تحديث عرض القائمة الحالية (تبقى بنفس الصفحة)
    renderStudentsList(cls);
    
    // 4. إظهار رسالة النجاح فقط ✅ بدون انتقال تلقائي
    alert("✅ تم حذف الطالب بنجاح ونقله إلى سلة المحذوفين!");
    
    // ❌ تم حذف هذا الجزء (الانتقال التلقائي)
    // setTimeout(() => {
    //     showDeletedStudents();
    // }, 100);
}

// === الطلاب المحذوفون ===
function showDeletedStudents() {
    navigateTo("studentsPage", "deletedStudentsPage");
    renderDeletedStudents();
}



function renderDeletedStudents() {
  const tbody = document.querySelector('#deletedStudentsTable tbody');
  const thead = document.querySelector('#deletedStudentsTable thead');
  tbody.innerHTML = '';
  
  if (deletedStudents.length === 0) {
    thead.innerHTML = '<tr><th colspan="6" style="text-align:center; color:#ffcc00; font-size:18px; padding:30px;">📭 لا يوجد طلاب محذوفين</th></tr>';
    return;
  }
  
  const headers = ["الصورة", "الاسم الكامل", "الصف الأصلي", "تاريخ الحذف", "الإجراءات"];
  thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
  
  tbody.innerHTML = deletedStudents.map((s, i) => {
    const name = s["الاسم الكامل"] || 'غير معروف';
    const originalClass = s.__originalClass || 'غير معروف';
    const deletedAt = s.__deletedAt || 'غير محدد';
    const deletedBy = s.__deletedBy || 'غير معروف';
    
    // البحث عن صورة الطالب
    let studentPhoto = '';
    for (const key in s) {
      if (typeof s[key] === 'string' && s[key].startsWith('data:image')) {
        studentPhoto = s[key];
        break;
      }
    }
    
    // عرض الصورة أو أيقونة افتراضية
    const photoCell = studentPhoto 
      ? `<img src="${studentPhoto}" style="width:50px; height:50px; border-radius:8px; border:2px solid #00eaff; object-fit:cover; cursor:pointer;" onclick="openImageModal('${studentPhoto}', 'صورة الطالب')"/>`
      : `<div style="width:50px; height:50px; border-radius:8px; background:#333; display:flex; align-items:center; justify-content:center; color:#00eaff; font-size:20px;">👤</div>`;
    
    return `
    <tr>
      <td style="text-align:center; padding:8px;">${photoCell}</td>
      <td style="font-weight:bold; color:#00eaff;">${name}</td>
      <td style="color:#ffcc00;">${originalClass}</td>
      <td style="font-size:13px; color:#999;">
        ${deletedAt}<br>
        <small style="color:#666;">(${deletedBy})</small>
      </td>
      <td style="display:flex; gap:8px; justify-content:center; align-items:center;">
        <button class="btn btn-sm" 
                onclick="restoreStudent(${i})" 
                style="background:#28a745; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold;">
          ↩️ استرجاع
        </button>
        <button class="btn btn-sm btn-danger" 
                onclick="deleteStudentPermanently(${i})" 
                style="background:#dc3545; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:bold;">
          🗑️ حذف نهائي
        </button>
      </td>
    </tr>
    `;
  }).join('');
}
function restoreStudent(index) {
    const student = deletedStudents[index];
    const cls = student.__originalClass;
    
    if (!cls || !classes.includes(cls)) {
        alert("❌ خطأ: لا يمكن تحديد الصف الأصلي للطالب!");
        return;
    }
    
    if (!confirm(`هل أنت متأكد من استرجاع الطالب "${student["الاسم الكامل"]}" إلى صف ${cls}؟`)) return;
    
    // إنشاء نسخة من الطالب بدون معلومات الحذف
    const restoredStudent = { ...student };
    delete restoredStudent.__originalClass;
    delete restoredStudent.__deletedAt;
    delete restoredStudent.__deletedBy;
    
    // إضافة الطالب إلى صفه الأصلي
    if (!students[cls]) students[cls] = [];
    students[cls].push(restoredStudent);
    saveToStorage('students', students);
    
    // حذف الطالب من المحذوفين
    deletedStudents.splice(index, 1);
    saveToStorage('deletedStudents', deletedStudents);
    
    // تحديث العرض
    renderDeletedStudents();
    
    alert("✅ تم استرجاع الطالب بنجاح إلى صف " + cls + "!");
}


// === حذف الطالب نهائياً من سلة المهملات ===
function deleteStudentPermanently(index) {
    const student = deletedStudents[index];
    const studentName = student["الاسم الكامل"] || "غير معروف";
    
    if (!confirm(`⚠️ تحذير: سيتم حذف الطالب "${studentName}" نهائياً من النظام ولا يمكن استرجاعه!
    
هل أنت متأكد من المتابعة؟`)) return;
    
    // حذف الطالب من جميع بيانات الرسوم
    if (feesData) {
        Object.keys(feesData).forEach(cls => {
            Object.keys(feesData[cls] || {}).forEach(month => {
                const monthData = feesData[cls][month];
                if (monthData.students && monthData.students[studentName] !== undefined) {
                    delete monthData.students[studentName];
                }
            });
        });
        saveToStorage('feesData', feesData);
    }
    
    // حذف من سلة المهملات
    deletedStudents.splice(index, 1);
    saveToStorage('deletedStudents', deletedStudents);
    
    // تحديث العرض
    renderDeletedStudents();
    
    alert("✅ تم حذف الطالب نهائياً من النظام!");
}



// === مودال عرض بيانات الطالب ===
// ✅ تعديل 1: تصحيح شرط اكتشاف الصور
function openStudentModal(cls, index) {
  const student = students[cls][index];
  if (!student) return;
  
  let mainPhoto = '';
  for (const key in student) {
    // ✅ تغيير الشرط من 'image' إلى 'data:image'
    if (typeof student[key] === 'string' && student[key].startsWith('data:image')) {
      mainPhoto = student[key];
      break;
    }
  }
  
  let dataHTML = '';
  for (const key in student) {
    if (key === 'fees') continue;
    let value = student[key];
    
    // ✅ تغيير الشرط هنا أيضًا
    if (typeof value === 'string' && value.startsWith('data:image')) {
      dataHTML += `
<tr>
  <td style="text-align:left; padding:8px;">${key}</td>
  <td style="text-align:right; padding:8px;">
    <!-- ✅ تعديل 2: إضافة مساحة للصورة مع تحسين التصميم -->
    <div style="display: flex; justify-content: center; align-items: center; height: 60px;">
      <img src="${value}" alt="${key}" 
           style="max-width: 80px; max-height: 80px; object-fit: cover; border-radius: 8px; 
                  border: 2px solid #00eaff; cursor: pointer; transition: transform 0.3s ease;"
           onclick="openImageModal('${value}', '${key}'); event.stopPropagation();">
    </div>
  </td>
</tr>
`;
    } else {
      dataHTML += `<tr><td style="text-align:left; padding:8px;">${key}</td><td style="text-align:right; padding:8px;">${value || ''}</td></tr>`;
    }
  }
  
  document.getElementById('modalStudentPhoto').src = mainPhoto || '';
  document.getElementById('modalStudentData').innerHTML = dataHTML;
  document.getElementById('studentModal').style.display = 'flex';
}


// === الرسوم ===
function showFeesPage() {
  navigateTo("studentsPage", "feesClassSelectPage");
  const grid = document.getElementById('feesClassGridUnique');
  grid.innerHTML = '';
  classes.forEach(c => {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerText = c;
    div.onclick = () => {
      window.currentUnifiedClass = c;
      showUnifiedFeesPage(c);
    };
    grid.appendChild(div);
  });
}

function showUnifiedFeesPage(cls) {
  navigateTo("feesClassSelectPage", "feesUnifiedPage");
  document.getElementById('feesUnifiedClassName').innerText = cls;
  renderUnifiedPage(cls);
}

function renderUnifiedPage(cls) {
  renderUnifiedMonthsList(cls);
  document.getElementById('unifiedStudentsTableContainer').style.display = 'none';
}

function toggleAddMonthForm() {
  const form = document.getElementById('addMonthForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// === حفظ شهر الرسوم (مع دعم التعديل بدون تكرار) ===
function saveUnifiedFeeMonth() {
  const cls = window.currentUnifiedClass;
  const month = document.getElementById('unifiedFeeMonth').value.trim();
  const year = document.getElementById('unifiedFeeYear').value.trim();
  const amount = parseFloat(document.getElementById('unifiedFeeAmount').value);
  const note = document.getElementById('unifiedFeeNote').value.trim();

  if (!month || !year || isNaN(amount) || amount <= 0) {
    alert("يرجى تعبئة جميع الحقول بشكل صحيح!");
    return;
  }

  const newFullMonth = `${month} ${year}`;

  // إذا كان في وضع التعديل
  if (window.pendingEditMonth) {
    const { cls: editCls, oldMonthKey } = window.pendingEditMonth;
    
    // إذا كان الاسم الجديد مختلف، ننقل البيانات
    if (oldMonthKey !== newFullMonth) {
      if (feesData[editCls] && feesData[editCls][oldMonthKey]) {
        const studentsData = feesData[editCls][oldMonthKey].students;
        delete feesData[editCls][oldMonthKey];
        feesData[editCls][newFullMonth] = { amount, note, students: studentsData };
      }
    } else {
      // نفس الاسم → نعدّل البيانات فقط
      if (feesData[editCls] && feesData[editCls][oldMonthKey]) {
        feesData[editCls][oldMonthKey].amount = amount;
        feesData[editCls][oldMonthKey].note = note;
      }
    }
    
    delete window.pendingEditMonth;
    alert("✅ تم تعديل الشهر بنجاح!");
  } else {
    // إضافة شهر جديد
    if (!feesData[cls]) feesData[cls] = {};
    if (feesData[cls][newFullMonth]) {
      alert("هذا الشهر موجود مسبقًا!");
      return;
    }
    feesData[cls][newFullMonth] = { amount, note, students: {} };
    students[cls]?.forEach(s => {
      const name = s["الاسم الكامل"];
      if (name) {
        feesData[cls][newFullMonth].students[name] = { paid: false, note: "", customAmount: null };
        feesCustomFields.forEach(field => {
          feesData[cls][newFullMonth].students[name][field] = "";
        });
      }
    });
    alert("✅ تم حفظ الشهر!");
  }

  saveToStorage('feesData', feesData);
  document.getElementById('unifiedFeeMonth').value = '';
  document.getElementById('unifiedFeeYear').value = '';
  document.getElementById('unifiedFeeAmount').value = '';
  document.getElementById('unifiedFeeNote').value = '';
  toggleAddMonthForm();
  renderUnifiedPage(cls);
}

// === 🔄 دالة معدّلة: دمج أزرار التعديل والحذف داخل مربع الشهر ===
function renderUnifiedMonthsList(cls) {
  const container = document.getElementById('unifiedMonthsList');
  container.innerHTML = '';
  if (!feesData[cls] || Object.keys(feesData[cls]).length === 0) {
    container.innerHTML = '<p style="color:#ffcc00; width:100%; text-align:right;">لا توجد شهور مضافة بعد.</p>';
    return;
  }
  Object.keys(feesData[cls]).forEach(month => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '8px';
    div.style.alignItems = 'center';
    div.style.flexWrap = 'wrap';

    // مربع الشهر ككل (يحتوي الاسم + الأزرار)
    const monthBox = document.createElement('div');
    monthBox.className = 'btn';
    monthBox.style.fontSize = '14px';
    monthBox.style.padding = '8px 12px';
    monthBox.style.flex = '1';
    monthBox.style.display = 'flex';
    monthBox.style.justifyContent = 'space-between';
    monthBox.style.alignItems = 'center';
    monthBox.innerText = month;
    monthBox.onclick = () => showUnifiedStudentsTable(cls, month);

    // أزرار التعديل والحذف
    const actionsDiv = document.createElement('div');
    actionsDiv.style.display = 'flex';
    actionsDiv.style.gap = '6px';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm';
    editBtn.innerText = '✏️';
    editBtn.style.padding = '2px 6px';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editUnifiedFeeMonth(cls, month);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.innerText = '🗑️';
    deleteBtn.style.padding = '2px 6px';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`هل أنت متأكد من حذف "${month}" نهائيًا؟`)) {
        delete feesData[cls][month];
        saveToStorage('feesData', feesData);
        renderUnifiedPage(cls);
      }
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    monthBox.appendChild(actionsDiv);
    div.appendChild(monthBox);
    container.appendChild(div);
  });
}

// === تعديل شهر الرسوم ===
function editUnifiedFeeMonth(cls, oldMonthKey) {
  const monthData = feesData[cls][oldMonthKey];
  if (!monthData) return;

  const parts = oldMonthKey.split(' ');
  const year = parts.pop();
  const monthName = parts.join(' ');

  document.getElementById('unifiedFeeMonth').value = monthName;
  document.getElementById('unifiedFeeYear').value = year;
  document.getElementById('unifiedFeeAmount').value = monthData.amount;
  document.getElementById('unifiedFeeNote').value = monthData.note || '';

  window.pendingEditMonth = { cls, oldMonthKey };
  toggleAddMonthForm();
}

function removeFeesCustomField(fieldName) {
  if (!confirm(`هل أنت متأكد من حذف الحقل "${fieldName}" نهائيًا من نظام الرسوم؟`)) return;
  feesCustomFields = feesCustomFields.filter(f => f !== fieldName);
  saveToStorage('feesCustomFields', feesCustomFields);
  if (feesData) {
    Object.keys(feesData).forEach(cls => {
      Object.keys(feesData[cls] || {}).forEach(month => {
        const studentsInMonth = feesData[cls][month]?.students || {};
        Object.keys(studentsInMonth).forEach(studentName => {
          delete studentsInMonth[studentName][fieldName];
        });
      });
    });
    saveToStorage('feesData', feesData);
  }
  if (window.currentUnifiedClass && window.currentUnifiedMonth) {
    showUnifiedStudentsTable(window.currentUnifiedClass, window.currentUnifiedMonth);
  } else {
    alert("✅ تم حذف الحقل بنجاح!");
  }
}

// === 🖨️ دالة طباعة مباشرة — مُعدّلة لاستخدام دالة العرض ===
function printStudentFeesReceipt(cls, studentName) {
  // استخدام نفس دالة العرض
  showStudentFeesHistoryUnified(cls, studentName);
  
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      closeReceiptStudent();
    }, 500);
  }, 100);
}

function showUnifiedStudentsTable(cls, month) {
    window.currentUnifiedMonth = month;
    document.getElementById('unifiedMonthTitle').innerText = `حالة الطلاب لـ ${month}`;
    document.getElementById('unifiedStudentsTableContainer').style.display = 'block';
    const list = students[cls] || [];

    if (!feesData[cls]) feesData[cls] = {};
    if (!feesData[cls][month]) feesData[cls][month] = { amount: 0, note: "", students: {} };
    const monthData = feesData[cls][month];

    // ✅ إضافة الطلاب الجدد فقط للشهر (بدون حذف القدامى)
    list.forEach(s => {
        const name = s["الاسم الكامل"];
        if (name && !monthData.students[name]) {
            monthData.students[name] = { paid: false, note: "", customAmount: null, paidAmount: null };
            feesCustomFields.forEach(field => {
                monthData.students[name][field] = "";
            });
        }
    });

    // ❌ تم حذف جزء تنظيف الطلاب المحذوفين (عشان نحتفظ بالسجل التاريخي)

    saveToStorage('feesData', feesData);

    const tbody = document.querySelector('#unifiedStudentsTable tbody');
    const thead = document.querySelector('#unifiedStudentsTable thead');
    tbody.innerHTML = '';

    // === العناوين - ✅ تم إزالة "ملاحظات" من العناوين الثابتة ===
    let headers = ["اسم الطالب", "المبلغ المستحق", "المبلغ المدفوع"];
    
    // ✅ إضافة جميع الحقول المخصصة (بما فيها ملاحظات)
    feesCustomFields.forEach(field => {
        headers.push(`<span style="display:flex; align-items:center; gap:6px; justify-content:center;">
            ${field}
            <button type="button" class="btn btn-sm btn-danger" style="padding:2px 6px; font-size:12px;" 
            onclick="removeFeesCustomField('${field}')">×</button>
        </span>`);
    });
    
    headers.push(`<button type="button" class="btn btn-sm" onclick="addFeesCustomFieldFromTable()" 
    style="padding:2px 6px; font-size:16px;">➕</button>`);
    headers.push("الإجراءات");
    thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';

    // === صفوف الطلاب (من بيانات الرسوم مباشرة) ===
    tbody.innerHTML = Object.keys(monthData.students).map(name => {
        const stData = monthData.students[name] || { paid: false, note: "", customAmount: null, paidAmount: null };
        const actualAmount = stData.customAmount !== null ? stData.customAmount : monthData.amount;
        const paidAmount = stData.paidAmount || "";

        let cells = [
            // ✅ الخلية الأولى (اسم الطالب) - مع خصائص sticky
            `<td style="font-weight:bold; color:#00eaff; position: sticky; right: 0; background: rgba(251,191,36,0.15); z-index: 10; min-width: 150px; border-left: 2px solid rgba(251,191,36,0.4); box-shadow: -2px 0 10px rgba(0,0,0,0.3);">
                ${name}
            </td>`,
            
            `<td style="text-align:center;">
            <div style="display:flex; align-items:center; gap:6px; justify-content:center;">
            <input type="number" value="${actualAmount}" data-student="${name}" data-field="customAmount" class="fees-input fast-input" placeholder="المبلغ" style="width:100px; padding:6px; border:2px solid #00eaff; border-radius:6px; background:#1a1a1a; color:#fff; text-align:center; font-weight:bold;" />
            ${stData.customAmount !== null ?
            `<button type="button" class="btn btn-sm btn-danger" onclick="resetCustomAmount('${cls}', '${month}', '${name}')" style="padding:4px 8px; font-size:14px; width:30px;">×</button>` :
            ''}
            </div>
            </td>`,
            
            `<td style="text-align:center;">
            <input type="number" value="${paidAmount}" data-student="${name}" data-field="paidAmount" class="fees-input fast-input" placeholder="المدفوع" style="width:100px; padding:6px; border:2px solid #28a745; border-radius:6px; background:#1a1a1a; color:#28a745; text-align:center; font-weight:bold;" />
            </td>`
        ];

        // ✅ إضافة خلايا الحقول المخصصة (بما فيها ملاحظات) - بنفس التنسيق
        feesCustomFields.forEach(field => {
            const val = stData[field] || "";
            cells.push(`<td style="text-align:center;">
                <input type="text" value="${val}" data-student="${name}" data-field="${field}" 
                class="fees-input fast-input" placeholder="${field}" 
                style="width:100px; padding:6px; border:2px solid #00eaff; border-radius:6px; 
                background:#1a1a1a; color:#fff; text-align:center;" />
            </td>`);
        });

        cells.push(`<td></td>`);
        cells.push(`<td style="text-align:center;">
        <button class="btn btn-sm" onclick="showStudentFeesHistoryUnified('${cls}', '${name}')" style="padding:6px 12px; font-size:14px;">👁️</button>
        <button class="btn btn-sm" onclick="printStudentFeesReceipt('${cls}', '${name}')" style="padding:6px 12px; font-size:14px;">🖨️</button>
        </td>`);

        return `<tr>${cells.join('')}</tr>`;
    }).join('');

    // === ربط الحقول بالتحديث الفوري ===
    document.querySelectorAll('.fees-input').forEach(input => {
        let timeout;
        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const name = input.getAttribute('data-student');
                const field = input.getAttribute('data-field');
                let value = input.value.trim();
                if (field === 'customAmount' || field === 'paidAmount') {
                    if (value === "") {
                        value = null;
                    } else {
                        const num = parseFloat(value.replace(/,/g, ''));
                        value = isNaN(num) ? null : num;
                    }
                } else {
                    value = value || "";
                }
                if (!feesData[cls] || !feesData[cls][month]) return;
                if (!feesData[cls][month].students[name]) {
                    feesData[cls][month].students[name] = { paid: false, note: "", customAmount: null, paidAmount: null };
                }
                feesData[cls][month].students[name][field] = value;
                saveToStorage('feesData', feesData);
                if (field === 'paidAmount' && value) {
                    input.style.background = '#1a3a1a';
                    input.style.borderColor = '#28a745';
                } else if (field === 'paidAmount') {
                    input.style.background = '#1a1a1a';
                    input.style.borderColor = '#28a745';
                }
            }, 100);
        });

        input.addEventListener('focus', function() {
            this.select();
            this.style.borderColor = '#ff00ff';
        });

        input.addEventListener('blur', function() {
            if (this.classList.contains('fast-input')) {
                this.style.borderColor = this.getAttribute('data-field') === 'paidAmount' ? '#28a745' : '#00eaff';
            }
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
    
    // ✅ إظهار شريط التمرير الأفقي إذا لزم الأمر
    setTimeout(() => {
        updateHorizontalScrollbar();
    }, 100);
}
// === دالة إعادة تعيين المبلغ المخصص ===
function resetCustomAmount(cls, month, studentName) {
  if (!feesData[cls] || !feesData[cls][month] || !feesData[cls][month].students[studentName]) return;
  
  delete feesData[cls][month].students[studentName].customAmount;
  saveToStorage('feesData', feesData);
  
  // تحديث العرض
  showUnifiedStudentsTable(cls, month);
}









// === إضافة حقل مخصص من الجدول مباشرة ===
function addFeesCustomFieldFromTable() {
  const fieldName = prompt("أدخل اسم الحقل المخصص:");
  if (!fieldName || fieldName.trim() === "") return;
  const name = fieldName.trim();
  if (feesCustomFields.includes(name)) {
    alert("هذا الحقل موجود مسبقًا!");
    return;
  }
  feesCustomFields.push(name);
  saveToStorage('feesCustomFields', feesCustomFields);
  alert(`✅ تم إضافة الحقل: ${name}`);
  // تحديث الجدول الحالي
  if (window.currentUnifiedClass && window.currentUnifiedMonth) {
    showUnifiedStudentsTable(window.currentUnifiedClass, window.currentUnifiedMonth);
  }
}

// === متغيرات مؤقتة للملاحظات ===
let currentNoteClass = '';
let currentNoteStudent = null;
let noteDynamicFields = [];

function showNoteClassSelection() {
  navigateTo("studentsPage", "noteClassSelectPage");
  const grid = document.getElementById('noteClassGrid');
  grid.innerHTML = '';
  classes.forEach(cls => {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.style.background = '#ffecec';
    div.style.color = '#8b0000';
    div.style.border = '2px solid #ff6b6b';
    div.innerText = cls;
    div.onclick = () => showNoteStudentsInClass(cls);
    grid.appendChild(div);
  });
}

function showNoteStudentsInClass(cls) {
  currentNoteClass = cls;
  navigateTo("noteClassSelectPage", "noteStudentSelectPage");
  document.getElementById('noteSelectedClass').innerText = cls;
  renderNoteStudentsTable(cls);
}

function renderNoteStudentsTable(cls) {
  const tbody = document.querySelector('#noteStudentsTable tbody');
  const list = students[cls] || [];
  tbody.innerHTML = '';
  
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; color:#8b0000;">لا يوجد طلاب في هذا الصف</td></tr>';
    return;
  }

  list.forEach((s, i) => {
    const name = s["الاسم الكامل"] || 'غير معروف';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${name}</td>
      <td><button class="btn btn-sm" onclick="startNoteForStudent('${cls}', ${i})" style="background:#8b0000; color:white; border:none;">اختيار</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('noteStudentSearchInClass').oninput = () => {
    const term = document.getElementById('noteStudentSearchInClass').value.toLowerCase();
    tbody.querySelectorAll('tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  };
}

function startNoteForStudent(cls, index) {
  const student = students[cls][index];
  currentNoteStudent = {
    name: student["الاسم الكامل"],
    class: cls,
    index: index
  };
  navigateTo("noteStudentSelectPage", "noteFormPage");
  document.getElementById('noteFormStudentName').innerText = `الملاحظة لـ: ${currentNoteStudent.name}`;
  noteDynamicFields = [];
  document.getElementById('noteFieldsContainer').innerHTML = '';
}

function addDynamicField() {
  const fieldName = prompt("أدخل اسم البند (مثال: سبب التأخير، مبلغ الغرامة):");
  if (!fieldName || fieldName.trim() === "") return;
  
  const cleanName = fieldName.trim();
  const fieldId = 'noteField_' + Date.now();
  
  const container = document.createElement('div');
  container.style.marginBottom = '20px';
  container.innerHTML = `
    <label style="display:block; font-weight:bold; color:#c00; margin-bottom:8px;">${cleanName}</label>
    <input type="text" id="${fieldId}" placeholder="أدخل ${cleanName}" 
           style="width:100%; padding:10px; border:2px solid #c00; border-radius:8px; background:#fff; color:#000; font-size:16px;" />
    <button type="button" onclick="this.parentElement.remove()" 
            style="margin-top:8px; background:#ff6b6b; color:white; border:none; padding:6px 12px; border-radius:6px; font-size:14px; font-weight:bold;">
      🗑️ حذف البند
    </button>
  `;
  
  document.getElementById('noteFieldsContainer').appendChild(container);
  noteDynamicFields.push({ fieldName: cleanName, elementId: fieldId });
}
    

function submitTemporaryNote() {
  if (!currentNoteStudent) {
    alert("❌ لم يتم تحديد طالب!");
    return;
  }
  
  let hasData = false;
  const data = {};
  noteDynamicFields.forEach(field => {
    const input = document.getElementById(field.elementId);
    if (input && input.value.trim()) {
      data[field.fieldName] = input.value.trim();
      hasData = true;
    }
  });
  
  if (!hasData) {
    alert("❌ يرجى إضافة بند واحد على الأقل وتعبئته!");
    return;
  }
  
  alert("✅ تم إرسال الملاحظة بنجاح!\n(سيتم ربطها بالنظام عند تفعيل الصلاحيات)");
  goBack();
}

// === سند الرسوم المحسن (مع المتبقي لكل شهر) ===
function showStudentFeesHistoryUnified(cls, studentName) {
  const receiptPage = document.getElementById('receiptStudentPage');
  if (!receiptPage) {
    alert("❌ خطأ: سند الرسوم غير موجود!");
    return;
  }

  window.receiptReturnPage = 'feesUnifiedPage';
  window.receiptStudentClass = cls;
  window.receiptStudentName = studentName;
  document.getElementById('receipt-student-name').innerText = studentName;
  document.getElementById('receipt-student-class').innerText = cls;

  let detailsHTML = '';
  let totalDue = 0, totalPaid = 0;

  if (feesData[cls]) {
    Object.keys(feesData[cls]).forEach(month => {
      const monthData = feesData[cls][month];
      const stData = monthData.students[studentName] || { paid: false, note: "", customAmount: null, paidAmount: null };
      const baseAmount = monthData.amount || 0;
      const customAmount = stData.customAmount;
      const actualAmount = customAmount !== null ? customAmount : baseAmount;
      const paidAmount = stData.paidAmount !== null ? stData.paidAmount : (stData.paid ? actualAmount : 0);
      
      totalDue += actualAmount;
      totalPaid += paidAmount;

      // حساب المتبقي
      const remaining = actualAmount - paidAmount;

      detailsHTML += `
        <div style="padding:8px; border-bottom:1px dashed #ccc; color: black !important;">
          <strong>${month}</strong><br>
          <span style="color:#555;">المبلغ الأصلي:</span> ${baseAmount.toLocaleString()} ريال<br>
          ${customAmount !== null ? `<span style="color:#d35400;">المبلغ المعدّل:</span> ${customAmount.toLocaleString()} ريال<br>` : ''}
          <span style="color:#27ae60; font-weight:bold;">المبلغ المستحق:</span> ${actualAmount.toLocaleString()} ريال<br>
          ${paidAmount > 0 ? `<span style="color:#27ae60;">المبلغ المدفوع: ${paidAmount.toLocaleString()} ريال ✔️</span><br>` : '<span style="color:#e74c3c;">غير مدفوع ❌</span>'}
          ${remaining > 0 ? 
            `<span style="color:#e74c3c; font-weight:bold;">المتبقي: ${remaining.toLocaleString()} ريال</span><br>` : 
            '<span style="color:#27ae60; font-weight:bold;">لم يبقَ شيء</span><br>'
          }
          ${stData.note ? `<br><span style="color:#7f8c8d;">ملاحظة:</span> ${stData.note}` : ''}
          ${feesCustomFields.map(field => stData[field] ? `<br><span style="color:#7f8c8d;">${field}:</span> ${stData[field]}` : '').join('')}
        </div>
      `;
    });
  }

  if (!detailsHTML) {
    detailsHTML = '<p style="color:#666; text-align:center;">لا توجد بيانات رسوم.</p>';
  }

  // المجموع الكلي
  const totalRemaining = totalDue - totalPaid;
  detailsHTML += `
    <div style="margin-top:20px; padding-top:15px; border-top:2px solid #000; font-weight:bold; color:black !important;">
      <p>المجموع المستحق: <strong>${totalDue.toLocaleString()} ريال</strong></p>
      <p>المجموع المدفوع: <strong style="color:#27ae60;">${totalPaid.toLocaleString()} ريال</strong></p>
      <p>المتبقي الكلي: <strong style="color:${totalRemaining > 0 ? '#e74c3c' : '#27ae60'};">${totalRemaining > 0 ? totalRemaining.toLocaleString() + ' ريال' : 'لم يبقَ شيء'}</strong></p>
    </div>
  `;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('ar-EG') + ' - ' + now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  detailsHTML += `<div style="margin-top:30px; text-align:center; font-size:14px; color:black !important;">مدرسة الفاخر النموذجية<br>التاريخ: ${formattedDate}</div>`;

  document.getElementById('receipt-fees-details').innerHTML = detailsHTML;
  showPage('receiptStudentPage');
}


// === حفظ طالب في Firebase ===
async function saveStudentToFirebase(studentData) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) throw new Error('لم يتم تسجيل الدخول');
        
        // إضافة معلومات المدرسة
        studentData.schoolId = currentUser.type === 'admin' ? currentUser.id : currentUser.schoolId;
        studentData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        
        // حفظ في جدول الطلاب
        const studentRef = await db.collection('students').add(studentData);
        
        console.log('✅ تم حفظ الطالب في Firebase:', studentRef.id);
        return studentRef.id;
        
    } catch (error) {
        console.error('❌ خطأ في حفظ الطالب:', error);
        throw error;
    }
}

// إظهار نموذج إضافة شعبة ذكية
function showSectionRangeForm() {
    const form = document.getElementById('sectionRangeForm');
    if (form) {
        form.style.display = 'block';
        updateSectionPreview();
    } else {
        console.error('❌ النموذج غير موجود!');
        alert("خطأ: النموذج غير موجود في الصفحة!");
    }
}
// إلغاء النموذج
function cancelSectionRange() {
    const form = document.getElementById('sectionRangeForm');
    if (form) {
        form.style.display = 'none';
        // مسح الحقول
        document.getElementById('sectionNameInput').value = '';
        document.getElementById('sectionFromLetter').value = '';
        document.getElementById('sectionToLetter').value = '';
        updateSectionPreview();
    }
}
// تحديث معاينة التقسيم
function updateSectionPreview() {
    const from = document.getElementById('sectionFromLetter')?.value || 'أ';
    const to = document.getElementById('sectionToLetter')?.value || 'د';
    const sectionName = document.getElementById('sectionNameInput')?.value || 'شعبة جديدة';
    const previewText = document.getElementById('sectionPreviewText');
    if (previewText) {
        previewText.innerHTML = `
            <strong style="color: #00eaff;">${sectionName}</strong><br>
            سيتم وضع الطلاب الذين تبدأ أسماؤهم بـ
            <span style="color: #00ff9d; font-weight: bold;">(${from})</span>
            حتى
            <span style="color: #ffcc00; font-weight: bold;">(${to})</span>
            في هذه الشعبة
        `;
    }
}

function cancelSectionRange() {
    const form = document.getElementById('sectionRangeForm');
    if (form) {
        form.style.display = 'none';
        // مسح الحقول
        document.getElementById('sectionNameInput').value = '';
        document.getElementById('sectionFromLetter').value = 'أ';
        document.getElementById('sectionToLetter').value = 'د';
        updateSectionPreview();
    }
}

function updateSectionPreview() {
    const from = document.getElementById('sectionFromLetter')?.value || 'أ';
    const to = document.getElementById('sectionToLetter')?.value || 'د';
    const sectionName = document.getElementById('sectionNameInput')?.value || 'شعبة جديدة';
    const previewText = document.getElementById('sectionPreviewText');
    if (previewText) {
        previewText.innerHTML = `
            <strong style="color: #00eaff;">${sectionName}</strong><br>
            سيتم وضع الطلاب الذين تبدأ أسماؤهم بـ
            <span style="color: #00ff9d; font-weight: bold;">(${from})</span>
            حتى
            <span style="color: #ffcc00; font-weight: bold;">(${to})</span>
        `;
    }
}
// تحديث معاينة التقسيم
function updateSectionPreview() {
    const from = document.getElementById('sectionFromLetter')?.value || 'أ';
    const to = document.getElementById('sectionToLetter')?.value || 'د';
    const sectionName = document.getElementById('sectionNameInput')?.value || 'شعبة جديدة';
    
    const previewText = document.getElementById('sectionPreviewText');
    if (previewText) {
        previewText.innerHTML = `
            <strong style="color: #4ecdc4;">${sectionName}</strong><br>
            سيتم وضع الطلاب الذين تبدأ أسماؤهم بـ 
            <span style="color: #00ff9d; font-weight: bold;">(${from})</span> 
            حتى 
            <span style="color: #ffcc00; font-weight: bold;">(${to})</span> 
            في هذه الشعبة
        `;
    }
}
// حفظ الشعبة الذكية
function saveSectionRange() {
    const sectionName = document.getElementById('sectionNameInput')?.value.trim();
    const fromLetter = document.getElementById('sectionFromLetter')?.value.trim();
    const toLetter = document.getElementById('sectionToLetter')?.value.trim();

    if (!sectionName) {
        alert("⚠️ يرجى إدخال اسم الشعبة!");
        return;
    }

    if (!fromLetter || !toLetter) {
        alert("⚠️ يرجى إدخال الحرفين (من) و (إلى)!");
        return;
    }

    // التحقق من وجود الشعبة
    if (smartSections[sectionName]) {
        if (!confirm(`الشعبة "${sectionName}" موجودة مسبقاً. هل تريد استبدالها؟`)) {
            return;
        }
    }

    // حفظ الشعبة الذكية
    smartSections[sectionName] = {
        from: fromLetter,
        to: toLetter,
        createdAt: new Date().toLocaleString('ar-EG')
    };

    saveToStorage('smartSections', smartSections);

    alert(`✅ تم إنشاء الشعبة الذكية "${sectionName}" بنجاح!
سيتم وضع الطلاب من (${fromLetter}) إلى (${toLetter}) تلقائياً`);

    // إغلاق النموذج
    cancelSectionRange();

    // تحديث قائمة الشعب
    updateSectionOptions();
}
// تحديث قائمة الشعب في القائمة المنسدلة
function updateSectionOptions() {
    const sectionOptions = document.getElementById('sectionOptions');
    if (!sectionOptions) return;
    
    // مسح جميع الشعب القديمة
    sectionOptions.innerHTML = '';
    
    // التحقق: إذا لم تكن هناك شعب ذكية
    if (!smartSections || Object.keys(smartSections).length === 0) {
        sectionOptions.innerHTML = `
        <div style="padding: 15px; text-align: center; color: #ffcc00;">
            <p style="margin: 0;">⚠️ لا توجد شعب ذكية</p>
            <p style="margin: 5px 0 10px; font-size: 12px; color: #aaa;">
                اضغط على زر "إضافة شعبة ذكية" لإنشاء شعبة
            </p>
        </div>
        `;
        return;
    }
    
    // إضافة الشعب الذكية فقط
    Object.keys(smartSections).forEach(sectionName => {
        const sectionInfo = smartSections[sectionName];
        const option = document.createElement('div');
        option.className = 'section-option';
        option.style.cssText = `
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            border-bottom: 1px solid #333;
            background: #0a0a0a;
            transition: all 0.2s;
        `;
        option.onmouseover = function() { this.style.background = '#111'; };
        option.onmouseout = function() { this.style.background = '#0a0a0a'; };
        option.onclick = function() {
            selectSection(sectionName);
            autoAssignSectionForStudent(sectionName);
        };
        option.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
            <span style="color: #4ecdc4; font-weight: bold; font-size: 16px;">${sectionName}</span>
            <span style="color: #00ff9d; font-size: 12px; margin-top: 3px;">
                🅰️ ${sectionInfo.from} - 🅱️ ${sectionInfo.to}
            </span>
        </div>
        <span class="section-delete-btn"
            onclick="removeSection('${sectionName}', event)"
            style="color: #ff3366; cursor: pointer; font-size: 20px; font-weight: bold; background: rgba(255, 51, 102, 0.2); padding: 2px 8px; border-radius: 4px;">
            ×
        </span>
        `;
        sectionOptions.appendChild(option);
    });
}

// حذف شعبة ذكية
function removeSection(sectionName, event) {
    event.stopPropagation(); // منع فتح القائمة عند حذف
    if (!confirm(`هل أنت متأكد من حذف الشعبة "${sectionName}"؟`)) return;
    
    // حذف من المتغير
    delete smartSections[sectionName];
    saveToStorage('smartSections', smartSections);
    
    // تحديث العرض
    updateSectionOptions();
    
    // إذا كانت الشعبة المختارة هي المحذوفة، نعيد تعيينها
    if (document.getElementById('sectionDisplay').textContent === sectionName) {
        document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
        document.getElementById('sectionDisplay').style.color = '#fff';
    }
    
    alert(`✅ تم حذف الشعبة "${sectionName}" بنجاح!`);
}
// إلغاء النموذج
function cancelSectionRange() {
    const form = document.getElementById('sectionRangeForm');
    if (form) {
        form.style.display = 'none';
        // مسح الحقول
        document.getElementById('sectionNameInput').value = '';
        document.getElementById('sectionFromLetter').value = '';
        document.getElementById('sectionToLetter').value = '';
        updateSectionPreview();
    }
}// ✅ هذه هي الدالة الصحيحة - احتفظ بها فقط
function autoAssignSectionForStudent() {
    const studentName = document.getElementById('stuFullName').value.trim();
    
    if (!studentName) {
        // إعادة تعيين الشعبة إذا لم يكن هناك اسم
        document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
        document.getElementById('sectionDisplay').style.color = '#fff';
        return;
    }
    
    const firstLetter = studentName.charAt(0);
    const letterCode = firstLetter.charCodeAt(0);
    
    // البحث عن الشعبة المناسبة
    let selectedSection = null;
    for (const sectionName in smartSections) {
        const sectionInfo = smartSections[sectionName];
        const fromCode = sectionInfo.from.charCodeAt(0);
        const toCode = sectionInfo.to.charCodeAt(0);
        
        // التحقق إذا كان الحرف ضمن نطاق هذه الشعبة
        if (letterCode >= fromCode && letterCode <= toCode) {
            selectedSection = sectionName;
            break;
        }
    }
    
    // عرض الشعبة المختارة أو رسالة تحذير
    const sectionDisplay = document.getElementById('sectionDisplay');
    if (selectedSection) {
        sectionDisplay.textContent = selectedSection;
        sectionDisplay.style.color = '#00ff9d';
        console.log(`✅ تم اختيار الشعبة "${selectedSection}" تلقائياً للطالب "${studentName}"`);
    } else {
        sectionDisplay.textContent = '⚠️ لا توجد شعبة مناسبة';
        sectionDisplay.style.color = '#ff3366';
        console.log(`⚠️ لا توجد شعبة مناسبة للحرف "${firstLetter}"`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('stuFullName');
    if (nameInput) {
        // عند كتابة الاسم، يتم تحديد الشعبة تلقائياً
        nameInput.addEventListener('input', function() {
            autoAssignSectionForStudent();
        });
    }
});


// التحقق التلقائي عند كتابة اسم الطالب
document.getElementById('stuFullName').addEventListener('input', function() {
    const studentName = this.value.trim();
    const sectionDisplay = document.getElementById('sectionDisplay').textContent;
    
    if (studentName && sectionDisplay !== "اختر الشعبة" && sectionDisplay !== "اختر الصف") {
        const firstLetter = studentName.charAt(0);
        const sectionInfo = smartSections[sectionDisplay];
        
        if (sectionInfo) {
            const fromCode = sectionInfo.from.charCodeAt(0);
            const toCode = sectionInfo.to.charCodeAt(0);
            const letterCode = firstLetter.charCodeAt(0);
            
            const indicator = document.getElementById('sectionIndicator');
            if (indicator) {
                if (letterCode >= fromCode && letterCode <= toCode) {
                    indicator.style.display = 'block';
                    indicator.style.color = '#00ff9d';
                    indicator.innerHTML = `✅ الطالب ينتمي للشعبة (${sectionInfo.from} - ${sectionInfo.to})`;
                } else {
                    indicator.style.display = 'block';
                    indicator.style.color = '#ff3366';
                    indicator.innerHTML = `⚠️ الطالب لا ينتمي للشعبة! (${sectionInfo.from} - ${sectionInfo.to})`;
                }
            }
        }
    }
});

// التقسيم التلقائي واختيار الشعبة للطالب
function autoAssignSectionForStudent() {
    const studentName = document.getElementById('stuFullName').value.trim();
    if (!studentName) {
        // إعادة تعيين الشعبة إذا لم يكن هناك اسم
        document.getElementById('sectionDisplay').textContent = 'اختر الشعبة';
        document.getElementById('sectionDisplay').style.color = '#fff';
        return;
    }
    
    const firstLetter = studentName.charAt(0);
    const letterCode = firstLetter.charCodeAt(0);
    
    // البحث عن الشعبة المناسبة
    let selectedSection = null;
    
    for (const sectionName in smartSections) {
        const sectionInfo = smartSections[sectionName];
        const fromCode = sectionInfo.from.charCodeAt(0);
        const toCode = sectionInfo.to.charCodeAt(0);
        
        // التحقق إذا كان الحرف ضمن نطاق هذه الشعبة
        if (letterCode >= fromCode && letterCode <= toCode) {
            selectedSection = sectionName;
            break;
        }
    }
    

    // === دالة التمرير الأفقي للجدول ===
function scrollTableHorizontally(value) {
    const container = document.querySelector('#unifiedStudentsTableContainer > div[style*="overflow-x: auto"]');
    if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const scrollPosition = (value / 100) * maxScroll;
        container.scrollLeft = scrollPosition;
    }
}

// === تحديث عرض شريط التمرير ===
function updateHorizontalScrollbar() {
    const container = document.querySelector('#unifiedStudentsTableContainer > div[style*="overflow-x: auto"]');
    const scrollBar = document.getElementById('tableHorizontalScroll');
    
    if (container && scrollBar) {
        // التحقق إذا كان المحتوى أعرض من الحاوية
        if (container.scrollWidth > container.clientWidth) {
            scrollBar.style.display = 'block';
            // تحديث القيمة القصوى
            const rangeInput = scrollBar.querySelector('input[type="range"]');
            if (rangeInput) {
                rangeInput.max = 100;
                rangeInput.value = 0;
            }
        } else {
            scrollBar.style.display = 'none';
        }
    }
}


    // عرض الشعبة المختارة أو رسالة تحذير
    const sectionDisplay = document.getElementById('sectionDisplay');
    if (selectedSection) {
        sectionDisplay.textContent = selectedSection;
        sectionDisplay.style.color = '#00ff9d';
        console.log(`✅ تم اختيار الشعبة "${selectedSection}" تلقائياً للطالب "${studentName}"`);
    } else {
        sectionDisplay.textContent = '⚠️ لا توجد شعبة مناسبة';
        sectionDisplay.style.color = '#ff3366';
        console.log(`⚠️ لا توجد شعبة مناسبة للحرف "${firstLetter}"`);
    }
}

// === ✅ تفعيل التمرير الأفقي للجدول ===
const wrapper = document.querySelector('#studentsTable').parentElement;
if (wrapper && !wrapper.classList.contains('table-container')) {
    wrapper.style.overflowX = 'auto';
    wrapper.style.paddingBottom = '10px';
}



// === 🔥 دالة تثبيت الأعمدة ديناميكيًا (الحل الذكي) ===
function autoStickyColumns() {
  const table = document.getElementById('studentsTable');
  if (!table) return;

  const rows = table.querySelectorAll('tbody tr');
  if (rows.length === 0) return;

  let rightOffset = 0;
  // الأعمدة بالترتيب من اليمين: الصورة (0)، الاسم (1)، الشعبة (2)
  const stickyIndexes = [0, 1, 2];

  stickyIndexes.forEach(index => {
    rows.forEach(row => {
      const cells = row.children;
      if (!cells[index]) return;
      
      const cell = cells[index];
      cell.style.position = 'sticky';
      cell.style.right = rightOffset + 'px';
      cell.style.zIndex = (100 - index).toString();
      cell.style.background = getComputedStyle(cell).backgroundColor || '#111';
      cell.style.boxShadow = index === 0 ? '-5px 0 25px rgba(0,0,0,1)' : 'none';
      cell.style.borderLeft = index === 0 ? '3px solid #fbbf24' : '2px solid #fbbf24';
    });

    // حساب عرض العمود من أول صف
    const firstRow = table.querySelector('tbody tr');
    if (firstRow && firstRow.children[index]) {
      rightOffset += firstRow.children[index].offsetWidth;
    }
  });
}

// === 🔄 إعادة حساب الأعمدة عند تغيير حجم الشاشة ===
window.addEventListener('resize', () => {
  if (document.getElementById('studentsListPage')?.style.display === 'block') {
    autoStickyColumns();
  }
});