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

//記帳資料新增按鈕碳排量超標提示---------------------
function addData() {
  const co2Display = document.querySelector(".co2").textContent;

  // 檢查碳排量是否超過 27kg
  if (parseFloat(co2Display) > 27) {
    alert("注意！此紀錄碳足跡量已超標!!");
  }
}

//本日累積，贈送碳權--------------------------------------------------------------
function showGift() {
  y = window.prompt("輸入贈與人會員編號");
  if (y != null) {
    alert("已贈送碳權給會員編號：" + y);
  }
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
  if (confirm("請注意！刪除紀錄將扣除一點！")) {
    checkboxes.forEach((checkbox) => {
      const row = checkbox.closest("tr");
      $("#myTable").DataTable().row(row).remove().draw(); // 從 DataTable 中刪除行
    });
  }
});

// 歷史紀錄的圖表--------------------------------------------------------------
// 取得類別碳排量與金額資料
function getCarbonEmissionsAndAmountByCategory() {
  const table = document.getElementById("myTable");
  const rows = table.querySelectorAll("tbody tr");
  const categoryData = {
    食: { emissions: 0, amount: 0 },
    衣: { emissions: 0, amount: 0 },
    住: { emissions: 0, amount: 0 },
    行: { emissions: 0, amount: 0 },
    其他: { emissions: 0, amount: 0 },
  };

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const categoryIcon = cells[4].querySelector("i").className;
    const carbonEmission = parseFloat(cells[3].querySelector("span").innerText);
    const amount = parseFloat(cells[2].innerText.replace("$", ""));

    let categoryName;
    if (categoryIcon.includes("fa-utensils")) categoryName = "食";
    else if (categoryIcon.includes("fa-shirt")) categoryName = "衣";
    else if (categoryIcon.includes("fa-house-user")) categoryName = "住";
    else if (categoryIcon.includes("fa-car")) categoryName = "行";
    else if (categoryIcon.includes("fa-ellipsis")) categoryName = "其他";

    categoryData[categoryName].emissions += carbonEmission;
    categoryData[categoryName].amount += amount;
  });

  return {
    categories: Object.keys(categoryData),
    emissions: Object.values(categoryData).map((data) => data.emissions),
    amounts: Object.values(categoryData).map((data) => data.amount),
  };
}

// 初始化圖表
const ctx = document.getElementById("myChart").getContext("2d");
const initialData = getCarbonEmissionsAndAmountByCategory();

let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: initialData.categories,
    datasets: [
      {
        type: "bar",
        label: "碳排量 (kg)",
        data: initialData.emissions,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "金額 (NT$)",
        data: initialData.amounts,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        title: { display: true, text: "碳排量 (kg)" },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "金額 (NT$)" },
        grid: { drawOnChartArea: false },
      },
    },
  },
});

// 切換圖表類型並改變尺寸
function changeChartType(type) {
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");

  // 重新取得數據
  const data = getCarbonEmissionsAndAmountByCategory();

  // 清除原先圖表
  myChart.destroy();

  // 設定畫布大小
  if (type === "mixed") {
    canvas.width = 500;
    canvas.height = 300;
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: initialData.categories,
        datasets: [
          {
            type: "bar",
            label: "碳排量 (kg)",
            data: initialData.emissions,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            type: "line",
            label: "金額 (NT$)",
            data: initialData.amounts,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            position: "left",
            title: { display: true, text: "碳排量 (kg)" },
          },
          y1: {
            beginAtZero: true,
            position: "right",
            title: { display: true, text: "金額 (NT$)" },
            grid: { drawOnChartArea: false },
          },
        },
      },
    });
  } else if (type === "pie") {
    canvas.width = 350;
    canvas.height = 250;
    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: initialData.categories,
        datasets: [
          {
            label: "碳排量",
            data: initialData.emissions,
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });
  } else if (type === "line") {
    canvas.width = 500;
    canvas.height = 350;
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: initialData.categories,
        datasets: [
          {
            label: "碳排量 (kg)",
            data: initialData.emissions,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "碳排量 (kg)" },
          },
        },
      },
    });
  }
}

// 會員中心--------------------------------------------------------------
//會員登出提示
function signOut() {
  if (confirm("確定要登出嗎？")) {
    alert("已登出！");
  }
}

// 頁面切換------------
function showContent(sectionId) {
  // 隱藏所有內容區域
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => (content.style.display = "none"));

  // 顯示所選區域
  const selectedContent = document.getElementById(sectionId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }

  // 移除所有選單項目的 current 類別
  const menuItems = document.querySelectorAll(".menu a");
  menuItems.forEach((item) => item.classList.remove("current"));

  // 為當前點擊的選單項目添加 current 類別
  const activeLink = document.querySelector(
    `.menu a[onclick="showContent('${sectionId}')"]`
  );
  if (activeLink) {
    activeLink.classList.add("current");
  }
}

// 修改密碼
// 切換顯示或隱藏修改密碼的表單
function togglePasswordChange() {
  // 隱藏密碼顯示區塊
  document.getElementById("passwordLabel").style.display = "none";

  // 顯示修改密碼表單
  document.getElementById("passwordChangeForm").style.display = "block";
}

// 取消修改，隱藏修改密碼表單，顯示原來的密碼區塊
function cancelPasswordChange() {
  // 顯示密碼顯示區塊
  document.getElementById("passwordLabel").style.display = "block";

  // 隱藏修改密碼表單
  document.getElementById("passwordChangeForm").style.display = "none";
}

// 顯示/隱藏密碼的可見性
function togglePasswordVisibility(passwordFieldId) {
  const passwordField = document.getElementById(passwordFieldId);
  const icon = passwordField.nextElementSibling; // 獲取相鄰的<i>標籤

  // 切換密碼的顯示方式
  const currentType = passwordField.type;
  passwordField.type = currentType === "password" ? "text" : "password";

  // 切換圖示
  if (passwordField.type === "password") {
    // 密碼隱藏，顯示「眼睛斜線」圖示
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    // 密碼顯示，顯示「眼睛」圖示
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// 確認密碼修改的處理函數
function confirmPasswordChange() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmNewPassword =
    document.getElementById("confirmNewPassword").value;

  if (newPassword !== confirmNewPassword) {
    alert("新密碼與確認密碼不一致！");
    return;
  }

  // 這裡可以進行更多的密碼驗證操作，例如驗證原密碼是否正確

  alert("密碼修改成功！");

  // 隱藏修改密碼區塊
  document.getElementById("passwordChangeForm").style.display = "none";

  // 顯示密碼顯示區塊（即顯示原本的密碼欄位）
  document.getElementById("passwordLabel").style.display = "block";
}

// 取消更改
function cancelChanges() {
  // 有一個表單，這裡將重置表單到初始狀態
  const form = document.querySelector("form");
  form.reset(); // 重設表單欄位

  alert("變更已取消！");
}

// 儲存變更
function saveChanges() {
  // 從表單中獲取資料並儲存
  const form = document.querySelector("form");
  const formData = new FormData(form);

  // 這裡可以把資料儲存到伺服器或本地存儲
  // 例如，使用 fetch API 發送資料到伺服器
  // fetch('/save', {
  //   method: 'POST',
  //   body: formData
  // }).then(response => response.json())
  //   .then(data => alert('變更已儲存！'))
  //   .catch(error => alert('儲存失敗！'));

  alert("變更已儲存！");
}
