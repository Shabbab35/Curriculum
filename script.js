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
    
    // تحديد الصنف المناسب إذا كانت قيمة الدرس تشير إلى إجازة
    let extraClass = "";
    if (lesson === "إجازة عيد الفطر") {
      extraClass = "eid-fitr";
    } else if (lesson === "إجازة عيد الأضحى") {
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
