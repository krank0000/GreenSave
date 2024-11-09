//menu按鈕設定
//變形
const menuIcons = document.querySelectorAll(".menu-icon");
let isMenuOpen = false;

menuIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    isMenuOpen ? icon.classList.add("open") : icon.classList.remove("open");
  });
});
// 點擊menu按鈕出現

$(document).ready(function () {
  // 當點擊 menu-icon 時觸發顯示/隱藏 ul_area
  $("#icon1").click(function () {
    $(".ul_area").slideToggle(); // 使用滑動效果切換顯示狀態
  });
});

// 置頂按鈕--------------------------------------------------------------
// 當頁面捲動時顯示或隱藏置頂按鈕
window.onscroll = function () {
  const topBtn = document.getElementById("topBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};
// 點擊置頂按鈕時平滑捲動回頁面頂部
document.getElementById("topBtn").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 導覽列效果--------------------------------------------------------------
/*
let lastScrollTop = 0; // 記錄上次滾動位置
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // 如果向下滾動，隱藏導航列；向上滾動，顯示導航列
  if (currentScroll > lastScrollTop) {
    // 向下滾動，隱藏導航列
    header.classList.add("hidden");
  } else {
    // 向上滾動，顯示導航列
    header.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 防止滾動過頭
});
*/

// 設定日期欄位為今日的日期-----------------------------------------------
function setTodayAsDefaultDate() {
  const today = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Taipei",
  });
  const formattedDate = today
    .replace(/\//g, "-")
    .replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1-$2-$3");
  document.getElementById("date").value = formattedDate;
}

// 頁面加載時設定日期欄位為今日
setTodayAsDefaultDate();

// 當點擊「清除」按鈕時，僅重設日期欄位而不影響其他選項
document
  .getElementById("resetButton")
  .addEventListener("click", function (event) {
    setTodayAsDefaultDate(); // 重設日期欄位為今日日期
  });

//   改變選項--------------------------------------------------------------
document.getElementById("quantity").addEventListener("input", calculateCO2);
document
  .getElementById("categoryOptions")
  .addEventListener("change", calculateCO2);
document.querySelectorAll('input[name="transport"]').forEach((input) => {
  input.addEventListener("change", calculateCO2);
});

function updateChangeSection(category) {
  const select = document.getElementById("categoryOptions");
  const unit = document.getElementById("unit");
  const transportRadios = document.querySelectorAll('input[name="transport"]');
  const transportSection = document.querySelector("section");

  select.innerHTML = ""; // 清空 select 的選項
  let options = [];
  let unitText = "單位";

  // 啟用/禁用消費型態選項
  if (category === "live") {
    // 禁用消費型態選項
    transportRadios.forEach((input) => {
      input.disabled = true;
    });
  } else {
    // 否則啟用消費型態選項
    transportRadios.forEach((input) => {
      input.disabled = false;
    });
  }

  switch (category) {
    case "food":
      options = ["素食", "非素食"];
      unitText = "份";
      break;
    case "clothes":
      options = [
        "一般T恤",
        "聚酯纖維衣",
        "純棉T恤",
        "一般褲子",
        "牛仔褲",
        "裙子",
        "襪子",
        "鞋子",
      ];
      unitText = "件";
      break;
    case "live":
      options = ["水費", "電費", "瓦斯費"];
      unitText = "度";
      break;
    case "act":
      options = ["自駕油費", "捷運", "公車", "鐵路", "長程飛機", "短程飛機"];
      unitText = "公升"; // 預設顯示「公升」
      break;
    case "other":
      options = ["具有綠色標章", "非綠色標章"];
      unitText = "件";
      break;
  }

  options.forEach((optionText, index) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    if (category === "act" && index === 0) {
      option.selected = true; // 預設為 "自駕油費"
    }
    select.appendChild(option);
  });

  // 根據選擇的類別設定單位
  unit.textContent = unitText;

  // 更新「行」類別的具體單位
  if (category === "act") {
    select.addEventListener("change", function () {
      switch (select.value) {
        case "自駕油費":
          unit.textContent = "公升";
          break;
        case "捷運":
        case "公車":
          unit.textContent = "站";
          break;
        case "鐵路":
          unit.textContent = "公里";
          break;
        case "長程飛機":
        case "短程飛機":
          unit.textContent = "次數";
          break;
        default:
          unit.textContent = "單位";
          break;
      }
      calculateCO2(); // 更新碳排量
    });
  }

  // 如果是「行」，自動選擇「自行前往」並禁止改變
  if (category === "act") {
    document.getElementById("gogo").checked = true;
    transportRadios.forEach((input) => {
      input.disabled = true;
    });
  }

  // 初始計算
  calculateCO2();
}

// 碳排放計算--------------------------------------------------------------
function calculateCO2() {
  const category = document
    .querySelector('input[name="category"]:checked')
    ?.id.toLowerCase();
  const quantity = document.getElementById("quantity").value;
  const selectOption = document.getElementById("categoryOptions").value;
  const co2Display = document.querySelector(".co2");
  const transportSelection = document.querySelector(
    'input[name="transport"]:checked'
  )?.id;

  let co2Emission = 0;

  // 基本碳排放計算
  if (category && quantity) {
    switch (category) {
      case "food":
        co2Emission = selectOption === "素食" ? quantity * 1.5 : quantity * 2.4;
        break;

      case "clothes":
        const clothesCO2 = {
          一般T恤: 9,
          聚酯纖維衣: 13,
          純棉T恤: 2,
          一般褲子: 20,
          牛仔褲: 33,
          裙子: 17,
          襪子: 4,
          鞋子: 30,
        };
        co2Emission = quantity * (clothesCO2[selectOption] || 16);
        break;

      case "live":
        const liveRates = {
          水費: 0.19,
          電費: 0.554,
          瓦斯費: 1.879,
        };
        co2Emission = quantity * (liveRates[selectOption] || 0);
        break;

      case "act":
        if (selectOption === "自駕油費") {
          co2Emission = quantity * 2.805 * 15 * 0.11;
        } else if (selectOption === "捷運") {
          co2Emission = quantity * 0.04;
        } else if (selectOption === "公車") {
          co2Emission = quantity * 0.024;
        } else if (selectOption === "鐵路") {
          co2Emission = quantity * 0.032;
        } else if (selectOption === "短程飛機") {
          co2Emission = quantity * 495;
        } else if (selectOption === "長程飛機") {
          co2Emission = quantity * 1980;
        }
        break;

      case "other":
        co2Emission =
          selectOption === "具有綠色標章" ? quantity * 1 : quantity * 1;
        break;
    }
  }

  // 根據消費型態進行額外計算
  if (category !== "live") {
    if (transportSelection === "online") {
      co2Emission += 0.6; // 物流運送會增加 0.6kg 碳排放
    }
  }

  // 顯示碳排量結果
  co2Display.textContent = co2Emission.toFixed(2); // 顯示碳排量
}

// 表格顯示--------------------------------------------------------------
$(function () {
  $("#myTable").DataTable();
});

document.getElementById("delButton").addEventListener("click", function (e) {
  e.preventDefault();
  const checkboxes = document.querySelectorAll(
    "#myTable tbody input[type='checkbox']:checked"
  );

  if (checkboxes.length === 0) {
    alert("請選擇要刪除的項目");
    return;
  }

  // 顯示確認刪除的彈窗
  if (confirm("是否確認刪除？")) {
    checkboxes.forEach((checkbox) => {
      const row = checkbox.closest("tr");
      $("#myTable").DataTable().row(row).remove().draw(); // 從 DataTable 中刪除行
    });
  }
});
