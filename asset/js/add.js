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

//合作店家-----------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // 搜尋功能
  document
    .querySelector(".search_store_area input")
    .addEventListener("input", function () {
      const keyword = this.value.toLowerCase().trim();
      const stores = document.querySelectorAll(".store");

      stores.forEach((store) => {
        const storeName = store.querySelector("h4").textContent.toLowerCase();
        if (storeName.includes(keyword)) {
          store.style.display = "";
        } else {
          store.style.display = "none";
        }
      });
    });

  // 排序功能
  document
    .querySelector('[name="store_sort"]')
    .addEventListener("change", function () {
      const sortOption = this.value;
      const storeList = document.querySelector(".store_list");
      const stores = Array.from(storeList.querySelectorAll(".store"));

      if (sortOption === "distance") {
        stores.sort((a, b) => {
          const distanceA = parseFloat(
            a
              .querySelector(".fa-route + p")
              .textContent.replace("距離 ", "")
              .replace("m", "")
          );
          const distanceB = parseFloat(
            b
              .querySelector(".fa-route + p")
              .textContent.replace("距離 ", "")
              .replace("m", "")
          );
          return distanceA - distanceB;
        });
      } else if (sortOption === "score") {
        stores.sort((a, b) => {
          const scoreA = parseFloat(
            a.querySelector(".store_star p").textContent
          );
          const scoreB = parseFloat(
            b.querySelector(".store_star p").textContent
          );
          return scoreB - scoreA;
        });
      }

      storeList.innerHTML = "";
      stores.forEach((store) => storeList.appendChild(store));
    });

  // 類別篩選功能
  document
    .querySelector('[name="store_category"]')
    .addEventListener("change", function () {
      const category = this.value;
      const stores = document.querySelectorAll(".store");

      stores.forEach((store) => {
        const storeCategory = store.querySelector(".categoryinfo").textContent;
        if (category === "all" || storeCategory === category) {
          store.style.display = "";
        } else {
          store.style.display = "none";
        }
      });
    });
});

// 點擊改變地圖
function store1() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7234.719797002199!2d121.241378!3d24.953867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468221537961605%3A0x726514471680ef54!2z5b6X5L6G57Sg6JSs6aOf5pep5Y2I6aSQLeS4reWjouS4reWOn-W6lw!5e0!3m2!1szh-TW!2stw!4v1732176321789!5m2!1szh-TW!2stw" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store2() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.485740194574!2d121.24358999999998!3d24.955541!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682214593b75ff%3A0x8f992daa5441e6cd!2z5ZyT57ej6YCa5ZCD6aSo!5e0!3m2!1szh-TW!2stw!4v1732177219330!5m2!1szh-TW!2stw"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store3() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.87448746387!2d121.24139700000002!3d24.953887!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682215391d4d2f%3A0x716b9214e61f2005!2z57ag6YeO6a6u6LmkIChWZWdldGFyaWFuKQ!5e0!3m2!1szh-TW!2stw!4v1732179595781!5m2!1szh-TW!2stw" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store4() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.58939282185!2d121.2417!3d24.9551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823ab3c543f27%3A0xfc0b77394e834ee1!2z5p2x6IiI57Sg6aOfIOahg-WckuW4guS4reWjouWNgOWkp-S7geS4ieihlzEy6Jmf!5e0!3m2!1szh-TW!2stw!4v1732179741890!5m2!1szh-TW!2stw" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store5() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.390665018826!2d121.2411808!3d24.9559455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468221575586b19%3A0x1611f12fa1ec74c2!2z57Sg5oCh5ZyS57Sg6aOf6Ieq5Yqp6aSQ!5e0!3m2!1szh-TW!2stw!4v1732180056519!5m2!1szh-TW!2stw"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store6() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28937.934683704425!2d121.2374681!3d24.9578854!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468223e5cc21d27%3A0xdb316d602a6084ff!2z5ZC-6Iqz57Sg6aOf!5e0!3m2!1szh-TW!2stw!4v1732180333662!5m2!1szh-TW!2stw"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store7() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.321443742512!2d121.237787!3d24.95624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682325d9fefa6b%3A0x88c37d2ce0bc2ae!2z6KiA5Y2I6ICB54mM57Sg6aOf5rC054WO5YyFLeWOn-aWsOiOiuWci-S4reaXgQ!5e0!3m2!1szh-TW!2stw!4v1732180389349!5m2!1szh-TW!2stw" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}
function store8() {
  document.querySelector("#store_map").innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28938.834767718447!2d121.23159500000001!3d24.954056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346822473c55ca5f%3A0x873269dc08ab4a92!2z5pyo5Yyg55qE5a625YWs55uK5LqM5omL5bqX!5e0!3m2!1szh-TW!2stw!4v1732180543476!5m2!1szh-TW!2stw"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
}

//RWD 地圖出現
document
  .querySelector("i.fa-map-location-dot")
  .addEventListener("click", function () {
    const map = document.getElementById("store_map");
    map.classList.toggle("show");
  });
