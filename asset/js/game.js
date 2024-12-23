const galleryDialog = document.getElementById("galleryDialog");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const plantDetail = document.getElementById("plantDetail");
const plantDetailImage = document.getElementById("plantDetailImage");
const plantDetailDescription = document.getElementById(
  "plantDetailDescription"
);

const plantData = [
  { src: "seed.png", description: "種子：生命的開始。" },
  { src: "sprout.png", description: "幼苗：生機勃勃。" },
  { src: "bud.png", description: "花苞：即將綻放的美麗。" },
  { src: "flower.png", description: "開花：美麗的高峰。" },
  { src: "fruit.png", description: "結果：豐收的喜悅。" },
];

let currentPlantIndex = 0;

// 初始化圖鑑縮圖
function initGallery() {
  thumbnailContainer.innerHTML = "";
  plantData.forEach((plant, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    thumbnail.innerHTML = `<img src="${plant.src}" alt="Plant Thumbnail">`;
    thumbnail.addEventListener("click", () => showPlantDetail(index));
    thumbnailContainer.appendChild(thumbnail);
  });
}

// 顯示植物詳細資訊
function showPlantDetail(index) {
  currentPlantIndex = index;
  thumbnailContainer.style.display = "none";
  plantDetail.style.display = "inline";
  updatePlantDetail();
}

// 更新植物詳細內容
function updatePlantDetail() {
  const plant = plantData[currentPlantIndex];
  plantDetailImage.src = plant.src;
  plantDetailDescription.textContent = plant.description;
}

// 切換到上一個植物
document.getElementById("prevPlantButton").addEventListener("click", () => {
  currentPlantIndex =
    (currentPlantIndex - 1 + plantData.length) % plantData.length;
  updatePlantDetail();
});

// 切換到下一個植物
document.getElementById("nextPlantButton").addEventListener("click", () => {
  currentPlantIndex = (currentPlantIndex + 1) % plantData.length;
  updatePlantDetail();
});

// 返回圖鑑主畫面
function closePlantDetail() {
  thumbnailContainer.style.display = "inline";
  plantDetail.style.display = "none";
}

// 打開植物圖鑑
document.getElementById("openGalleryButton").addEventListener("click", () => {
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

// 回答問題
function answerQuestion(isCorrect) {
  if (isCorrect) {
    waterCount += 2;
    alert("回答正確！增加2次澆水次數！");
  } else {
    waterCount += 1;
    alert("回答錯誤！增加1次澆水次數！");
  }
  updateUI();
  closeDialog("questionDialog");
}

// 初始化
updateUI();
