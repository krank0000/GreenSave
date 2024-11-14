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
