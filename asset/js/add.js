// 會員中心--歷史紀錄
$(document).ready(function () {
  $("#example").DataTable({
    paging: true, // 分頁
    ordering: true, // 排序
    searching: true, // 搜尋
    pageLength: 10, // 每頁顯示筆數
  });
});
// 會員中心--獎勵點數
// 點數核發方式彈窗------------
/* 改寫
document.addEventListener("DOMContentLoaded", (event) => {
  const dialog = document.getElementById("myDialog");
  const openDialogBtn = document.getElementById("openDialogBtn");
  const closeDialogBtn = document.getElementById("closeDialogBtn");

  openDialogBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeDialogBtn.addEventListener("click", () => {
    dialog.close();
  });
});
*/

// 會員中心--獎勵點數--表格日期只顯示日月
function formatDate() {
  const cells = document.querySelectorAll("td");

  cells.forEach((cell) => {
    const dateText = cell.textContent.trim();

    // 確保格式為 "YYYY-MM-DD"
    if (dateText.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateText.split("-");

      // 格式化成 "MM-DD"
      cell.textContent = `${month}-${day}`;
    }
  });
}

// 當頁面載入完成時執行格式化
window.addEventListener("load", () => {
  formatDate();
});

// 監聽視口大小變化，當寬度小於或等於 455px 時格式化
window.addEventListener("resize", () => {
  if (window.innerWidth <= 455) {
    formatDate();
  }
});
