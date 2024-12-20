const newsList = document.getElementById("news-list");
const dialog = document.getElementById("news-dialog");
const title = document.getElementById("dialog-title");
const content = document.getElementById("dialog-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const closeButton = document.getElementById("close-button");

const newsData = [
  {
    title: "12月實體快閃活動開跑！",
    content: `
          <p>
            各位親愛的用戶，我們將於12月下旬開始出沒中原大學！成功在校園捕獲我們的蹤影，並參與現場快閃活動，還有機會參加抽獎活動！敬請留意官方平台最新消息，我們中原見！
          </p>
        `,
  },
  {
    title: "YouTube頻道正式上線！",
    content: `
          <p>
            趕快按讚訂閱【存碳養綠】官方YouTube頻道，開啟小鈴鐺收聽主持人—阿亮與來賓們的最新Podcast，追蹤我們實體活動的精采集錦！
          </p>
          <a href="http://www.youtube.com/@greenbook_1228" target="_blank">點我開啟連結!</a>
        `,
  },
  {
    title: "合作店家地圖公佈，歡迎共襄盛舉！",
    content: `
          <p>
            期間限定，近十家合作店鋪就在中原周遭！歡迎大眾前往踩點消費，當場找到我們的宣傳物，還能解鎖通關密語獲得神秘好禮！心動不如馬上行動，現在就趕快手刀支持！
          </p>
        `,
  },
];

let currentIndex = 0;

newsList.addEventListener("click", (e) => {
  const item = e.target.closest("li");
  if (item) {
    currentIndex = parseInt(item.dataset.index, 10);
    updateDialog();
    dialog.showModal();
  }
});

const updateDialog = () => {
  title.textContent = newsData[currentIndex].title;
  content.innerHTML = newsData[currentIndex].content;
};

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + newsData.length) % newsData.length;
  updateDialog();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % newsData.length;
  updateDialog();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
