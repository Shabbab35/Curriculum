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
    
    // تحديد الصنف المناسب إذا كان اليوم من أيام الإجازات باستخدام المفاتيح العربية
    let extraClass = "";
    if (week["إجازة عيد الفطر"] && week["إجازة عيد الفطر"].includes(day)) {
      extraClass = "eid-fitr";
    } else if (week["إجازة عيد الأضحى"] && week["إجازة عيد الأضحى"].includes(day)) {
      extraClass = "eid-adha";
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
