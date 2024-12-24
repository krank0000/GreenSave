document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loadingOverlay");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  let progress = 0;
  const totalDuration = 2000; // 總持續時間（毫秒）
  const updateInterval = 50; // 更新間隔（毫秒）
  const step = 100 / (totalDuration / updateInterval); // 每次增加的百分比

  const updateProgress = () => {
    progress += step;
    if (progress >= 100) {
      progress = 100;
      loadingOverlay.style.display = "none"; // 隱藏加載動畫
    } else {
      setTimeout(updateProgress, updateInterval); // 調整數字更新的頻率
    }

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
  };

  updateProgress();
});

// 圖鑑----------------------------------------------------
const galleryDialog = document.getElementById("galleryDialog");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const plantDetail = document.getElementById("plantDetail");
const plantDetailImage = document.getElementById("plantDetailImage");

const plantData = [
  {
    src: "../asset/img/game/valentinesday_rose.png",
    name: "月季",
    light: "日照充足",
    water: "中等至高水需求",
    features: "花朵五顏六色，開花期長，適合用於園藝裝飾。",
  },
  {
    src: "../asset/img/game/plant_saboten3.png",
    name: "仙人掌",
    light: "強光",
    water: "低水需求",
    features: "耐旱，適合放置於乾燥的環境中，具有獨特的外型。",
  },
  // Add more plant objects here as needed
  {
    src: "../asset/img/game/himawari.png",
    name: "向日葵",
    light: "全日照",
    water: "中等水分需求",
    features: "花朵隨陽光轉動，具有較高的觀賞價值及食用價值。",
  },
  {
    src: "../asset/img/game/plant_aloe.png",
    name: "蘆薈",
    light: "強光",
    water: "低水需求",
    features: "具有藥用價值，葉片厚實、肉質，主要用於製作護膚產品。",
  },
  {
    src: "../asset/img/game/flower_lavender.png",
    name: "薰衣草",
    light: "全日照",
    water: "低水需求",
    features: "具有療癒和放鬆的效果，廣泛用於香氛、精油和美容產品。",
  },
  {
    src: "../asset/img/game/plant_utsubokazura.png",
    name: "豬籠草",
    light: "部分陰影",
    water: "中等水分需求",
    features:
      "捕捉昆蟲以補充養分，具有獨特的外型和生態價值，廣泛用於觀賞植物和研究。",
  },
  {
    src: "../asset/img/game/plant_haetorigusa.png",
    name: "捕蠅草",
    light: "全日照",
    water: "中等水分需求",
    features:
      "捕捉並消化昆蟲以補充氮元素，具有獨特的捕食機制，是觀賞植物愛好者的熱門選擇。",
  },
];

let currentPlantIndex = 0;
let currentPage = 0;
const plantsPerPage = 6;

// 初始化圖鑑縮圖
function initGallery() {
  renderGalleryPage();
}

// 渲染當前頁面的植物縮圖
function renderGalleryPage() {
  thumbnailContainer.innerHTML = "";
  const startIndex = currentPage * plantsPerPage;
  const endIndex = Math.min(startIndex + plantsPerPage, plantData.length);

  for (let i = startIndex; i < endIndex; i++) {
    const plant = plantData[i];
    const section = document.createElement("section");
    section.innerHTML = `
      <img src="${plant.src}" alt="${plant.name}" />
      <h3>${plant.name}</h3>
    `;
    section.addEventListener("click", () => showPlantDetail(i));
    thumbnailContainer.appendChild(section);
  }

  addPaginationButtons();
}

// 添加分頁按鈕
function addPaginationButtons() {
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination-buttons";

  if (currentPage > 0) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "上一頁";
    prevButton.addEventListener("click", () => {
      currentPage--;
      renderGalleryPage();
    });
    paginationContainer.appendChild(prevButton);
  }

  if ((currentPage + 1) * plantsPerPage < plantData.length) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "下一頁";
    nextButton.addEventListener("click", () => {
      currentPage++;
      renderGalleryPage();
    });
    paginationContainer.appendChild(nextButton);
  }

  thumbnailContainer.appendChild(paginationContainer);
}

// 顯示植物詳細資訊
function showPlantDetail(index) {
  currentPlantIndex = index;
  const plant = plantData[currentPlantIndex];

  thumbnailContainer.style.display = "none";
  plantDetail.style.display = "block";

  plantDetailImage.src = plant.src;
  plantDetail.innerHTML = `
    <section>
      <img id="plantDetailImage" src="${plant.src}" alt="Plant Detail" />
      <div>
        <h3>${plant.name}</h3>
        <label>植物名稱：<span>${plant.name}</span></label>
        <label>光照需求：<span>${plant.light}</span></label>
        <label>水分需求：<span>${plant.water}</span></label>
        <label>特徵：<span>${plant.features}</span></label>
      </div>
    </section>
    <div class="navigation-buttons">
      <button id="prevPlantButton">上一個</button>
      <button onclick="closePlantDetail()">目錄</button>
      <button id="nextPlantButton">下一個</button>
    </div>
  `;

  document.getElementById("prevPlantButton").addEventListener("click", () => {
    currentPlantIndex =
      (currentPlantIndex - 1 + plantData.length) % plantData.length;
    showPlantDetail(currentPlantIndex);
  });

  document.getElementById("nextPlantButton").addEventListener("click", () => {
    currentPlantIndex = (currentPlantIndex + 1) % plantData.length;
    showPlantDetail(currentPlantIndex);
  });
}

// 返回圖鑑主畫面
function closePlantDetail() {
  thumbnailContainer.style.display = "flex";
  plantDetail.style.display = "none";
}

// 打開植物圖鑑
document.getElementById("openGalleryButton")?.addEventListener("click", () => {
  initGallery();
  galleryDialog.showModal();
});

// 通用關閉對話框
function closeDialog(dialogId) {
  document.getElementById(dialogId).close();
}

// 初始化
initGallery();

// 遊戲數據----------------------------------------------------
let points = 100; //持有點數
let wiltValue = 0; //枯萎值
let growthValue = 0; //成長值
let waterCount = 1; //澆水次數

let fertilizerCount = 1;
let reviveCount = 1;
let waterSupply = 1;

const maxGrowth = 100;
const maxWilt = 100;

const plantStages = [
  "seed.png",
  "sprout.png",
  "bud.png",
  "flower.png",
  "fruit.png",
];

const plantImage = document.getElementById("plantImage"); //植物圖片
const pointsDisplay = document.getElementById("points"); //點數
const wiltValueDisplay = document.getElementById("wiltValue"); //枯萎值
const growthValueDisplay = document.getElementById("growthValue"); //成長值
const waterCountDisplay = document.getElementById("waterCount"); //澆水次數
const fertilizerDisplay = document.getElementById("fertilizerCount"); //肥料
const reviveDisplay = document.getElementById("reviveCount"); //復活液
const waterButton = document.getElementById("waterButton"); //澆水按鈕

const questionDialog = document.getElementById("questionDialog"); //問題對話框
const inventoryDialog = document.getElementById("inventoryDialog"); //道具背包對話框

// 更新界面
function updateUI() {
  pointsDisplay.textContent = points;
  wiltValueDisplay.textContent = wiltValue;
  growthValueDisplay.textContent = growthValue;
  waterCountDisplay.textContent = waterCount;
  fertilizerDisplay.textContent = fertilizerCount;
  reviveDisplay.textContent = reviveCount;
  waterSupplyDisplay.textContent = waterSupply;

  // 更新植物階段
  const stage = Math.floor(
    growthValue / (maxGrowth / (plantStages.length - 1))
  );
  plantImage.src = plantStages[stage];

  // 檢查植物死亡狀態
  if (wiltValue >= maxWilt) {
    plantImage.src = "dead.png";
  }
}

// 澆水
waterButton.addEventListener("click", () => {
  if (waterCount > 0) {
    growthValue += 5;
    waterCount -= 1;
    wiltValue = Math.max(0, wiltValue - 5); // 澆水減少枯萎值

    // 更新 SCSS 自定義屬性 --gw
    const plantGrowing = document.querySelector(".plant-growing");
    let currentGw =
      parseFloat(getComputedStyle(plantGrowing).getPropertyValue("--gw")) || 0;
    currentGw = Math.min(50, currentGw + 2.5); // 確保最大值為 50%
    plantGrowing.style.setProperty("--gw", `${currentGw}%`);

    // 澆水動畫
    gsap.set("#wateringCan", {
      duration: 1,
      rotateZ: 0,
      opacity: 0,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
    gsap.to("#wateringCan", {
      duration: 1,
      rotateZ: -30,
      opacity: 1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    //植物動畫
    gsap.to("#plantImage", {
      duration: 0.5,
      delay: 0.8,
      y: -10,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
    updateUI();
  } else {
    alert("澆水次數不足！");
  }
});

// 打開道具背包
document.getElementById("openInventoryButton").addEventListener("click", () => {
  inventoryDialog.showModal();
});

// 打開環保小問題
document.getElementById("openQuestionButton").addEventListener("click", () => {
  questionDialog.showModal();
});

// 關閉對話框
function closeDialog(dialogId) {
  document.getElementById(dialogId).close();
}

// 使用肥料
function useFertilizer() {
  if (fertilizerCount > 0) {
    growthValue += 30;
    fertilizerCount -= 1;

    // 更新 SCSS 自定義屬性 --gw
    const plantGrowing = document.querySelector(".plant-growing");
    let currentGw =
      parseFloat(getComputedStyle(plantGrowing).getPropertyValue("--gw")) || 0;
    currentGw = Math.min(50, currentGw + 15); // 確保最大值為 50%
    plantGrowing.style.setProperty("--gw", `${currentGw}%`);

    //植物動畫
    gsap.to("#plantImage", {
      duration: 0.5,
      delay: 0,
      y: -10,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
    updateUI();
  } else {
    alert("肥料不足！");
  }
}

// 使用復活液
function useRevive() {
  if (reviveCount > 0) {
    wiltValue = 0;
    reviveCount -= 1;
    updateUI();
  } else {
    alert("復活液不足！");
  }
}

// // 回答問題
// function answerQuestion(isCorrect) {
//   if (isCorrect) {
//     waterCount += 2;
//     alert("回答正確！增加2次澆水次數！");
//   } else {
//     waterCount += 1;
//     alert("回答錯誤！增加1次澆水次數！");
//   }
//   updateUI();
//   closeDialog("questionDialog");
// }

// 檢查回答是否正確
function confrimalert(event) {
  // 獲取使用者選中的答案
  const selectedAnswer = document.querySelector(
    'input[name="question"]:checked + label'
  ).innerText;

  // 正確答案
  const correctAnswer = "(2) 4 月 22 號";

  // 判斷答案是否正確
  if (selectedAnswer === correctAnswer) {
    waterCount += 2;
    alert("回答正確！增加2次澆水次數！");
  } else {
    waterCount += 1;
    alert("回答錯誤！增加1次澆水次數！");
  }

  // 更新 UI（需要根據需求實現 updateUI 函數）
  updateUI();

  // 關閉對話框
  closeDialog("questionDialog");
}

// 初始化
// updateUI();

document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("signInButton"); // 簽到按鈕
  const signInCount = document.getElementById("signInCount"); // 簽到天數顯示
  const signInArea = document.getElementById("signInArea"); // 簽到區域
  const sections = signInArea.querySelectorAll("section"); // 每一天的節點

  // 簽到天數初始化為 0，每次重整都清零
  let count = 0;
  localStorage.setItem("signInCount", count); // 重設 localStorage 的簽到天數

  // 更新簽到區域的樣式
  const updateSignInArea = () => {
    sections.forEach((section, index) => {
      if (index < count) {
        section.style.backgroundColor = "#fece21"; // 高亮背景顏色
        section.style.color = "#fff"; // 高亮文字顏色
        section.style.border = "2px solid #ffe3b2"; // 高亮外框
        section.style.fontWeight = "bold"; // 粗體
      } else {
        section.style.backgroundColor = "#ddd"; // 默認背景顏色
        section.style.color = "#999"; // 默認文字顏色
        section.style.border = "none"; // 移除外框
        section.style.fontWeight = "normal"; // 恢復正常字體
      }
    });
  };

  // 更新簽到天數
  const updateSignInCount = () => {
    signInCount.textContent = count; // 更新簽到天數顯示
    localStorage.setItem("signInCount", count); // 儲存簽到天數到 localStorage
    updateSignInArea(); // 更新簽到區域樣式
  };

  // 點擊簽到按鈕的處理邏輯
  signInButton.addEventListener("click", () => {
    if (count < sections.length) {
      count += 1; // 簽到天數增加
      updateSignInCount(); // 更新顯示
      alert(`簽到成功！已連續簽到 ${count} 天`);
    } else {
      alert("已完成7天簽到！");
    }
  });

  // 初始化時更新顯示
  updateSignInCount();
});

// 關閉對話框
function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.close();
}
