// ترتيب الأيام (يشمل السبت)
const daysOrder = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// دالة لإنشاء بطاقة أسبوع بناءً على بيانات الأسبوع
function createCard(week) {
  // إنشاء عنصر الجدول
  const table = document.createElement("table");
  let tableHTML = `
    <tr>
      <th class="card-title" colspan="2">${week.title}</th>
    </tr>
    <tr class="date-row">
      <td colspan="2">الهجري: ${week.hijri}</td>
    </tr>
    <tr class="date-row">
      <td colspan="2">الميلادي: ${week.gregorian}</td>
    </tr>
    <tr class="header-row">
      <th>اليوم</th>
      <th>الدرس</th>
    </tr>
  `;
  
  // إنشاء صفوف لكل يوم باستخدام ترتيب الأيام
  daysOrder.forEach(day => {
    const lesson = week.lessons[day] || "";
    
    // تحديد الصنف المناسب بناءً على قيمة الدرس
    let extraClass = "";
    if (lesson.includes("عيد الفطر")) {
      extraClass = "eid-fitr";
    } else if (lesson.includes("عيد الأضحى") || lesson.includes("عيد الأضحي")) {
      extraClass = "eid-adha";
    } else if (lesson.includes("إجازة أسبوعية")) {
      extraClass = "weekly-holiday";
    }
    
    tableHTML += `
      <tr class="${extraClass}">
        <td>${day}</td>
        <td>${lesson}</td>
      </tr>
    `;
  });
  
  table.innerHTML = tableHTML;
  
  // إنشاء عنصر البطاقة واحتواء الجدول بداخله
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.appendChild(table);
  return cardDiv;
}

// إضافة جميع البطاقات إلى العنصر الحاوي في الصفحة إذا وجد
const container = document.getElementById("cards-container");
if (container) {
  weeksData.forEach(week => {
    container.appendChild(createCard(week));
  });
} else {
  console.error("لم يتم العثور على العنصر 'cards-container' في الصفحة.");
}
