// ترتيب الأيام (يشمل السبت)
const daysOrder = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// دالة لإنشاء بطاقة أسبوع بناءً على بيانات الأسبوع
function createCard(week) {
  // إنشاء عنصر الجدول
  const table = document.createElement("table");

  // صف عنوان الأسبوع
  table.innerHTML += `<tr>
    <th class="card-title" colspan="2">${week.title}</th>
  </tr>`;

  // صف التاريخ الهجري
  table.innerHTML += `<tr class="date-row">
    <td colspan="2">الهجري: ${week.hijri}</td>
  </tr>`;

  // صف التاريخ الميلادي
  table.innerHTML += `<tr class="date-row">
    <td colspan="2">الميلادي: ${week.gregorian}</td>
  </tr>`;

  // صف رأس الجدول (اليوم والدرس)
  table.innerHTML += `<tr class="header-row">
    <th>اليوم</th>
    <th>الدرس</th>
  </tr>`;

  // إنشاء صفوف لكل يوم باستخدام ترتيب الأيام
  daysOrder.forEach(day => {
    const lesson = week.lessons[day] || "";
    const row = `<tr>
      <td>${day}</td>
      <td>${lesson}</td>
    </tr>`;
    table.innerHTML += row;
  });

  // إنشاء عنصر بطاقة واحتواء الجدول بداخله
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.appendChild(table);
  return cardDiv;
}

// إضافة جميع البطاقات إلى العنصر الحاوي في الصفحة
const container = document.getElementById("cards-container");
weeksData.forEach(week => {
  container.appendChild(createCard(week));
});
