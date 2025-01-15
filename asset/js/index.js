// 輪播圖-切換
const carouselItems = document.querySelectorAll(".carousel > div");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

const updateCarousel = () => {
  carouselItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

// 初始化位置
updateCarousel();

// 滾動至特定區域-----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // 取得 "立即行動" 的元素
  const actNowButton = document.querySelector(".actNow");
  const scrollButton = document.querySelector("#scrollToIndex");

  // 取得目標區塊的元素
  const targetSection = document.querySelector("#index_p2");

  // 點擊事件
  actNowButton.addEventListener("click", function () {
    targetSection.scrollIntoView({
      behavior: "smooth", // 平滑滾動
      block: "start", // 將目標區塊滾動到視窗頂部
    });
  });
  scrollButton.addEventListener("click", function () {
    targetSection.scrollIntoView({
      behavior: "smooth", // 平滑滾動
      block: "start", // 將目標元素滾動到視窗頂部
    });
  });
});
