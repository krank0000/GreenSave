// 點數商店-----------------------------------------------------------

// 取得所有商品卡片和搜尋輸入框
const products = Array.from(document.querySelectorAll(".product"));
const searchInput = document.querySelector(".search_product_area input");

// 搜尋商品功能
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  // 遍歷所有商品，判斷是否包含搜尋詞
  products.forEach((product) => {
    const productName = product.querySelector("h4").textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "block"; // 顯示匹配的商品
    } else {
      product.style.display = "none"; // 隱藏不匹配的商品
    }
  });
});

//商品彈窗的功能
// 開啟對話框
function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.showModal();

  // 選取數量控制按鈕和輸入框
  const decreaseButton = dialog.querySelector(".decrease");
  const increaseButton = dialog.querySelector(".increase");
  const quantityInput = dialog.querySelector(".quantity-input");
  const cancelButton = dialog.querySelector(".btn_style");
  const confirmButton = dialog.querySelector(".btn_style_green");

  // 設置按鈕點擊事件
  decreaseButton.onclick = () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > parseInt(quantityInput.min)) {
      quantityInput.value = currentValue - 1;
    }
  };

  increaseButton.onclick = () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  };

  // 防止手動輸入不合法數字
  quantityInput.oninput = () => {
    if (
      quantityInput.value === "" ||
      parseInt(quantityInput.value) < parseInt(quantityInput.min)
    ) {
      quantityInput.value = quantityInput.min;
    }
  };

  // 設置取消按鈕事件
  cancelButton.onclick = () => {
    closeDialog(dialogId);
  };

  // 設置確認按鈕事件
  confirmButton.onclick = () => {
    const quantity = parseInt(quantityInput.value);
    alert(`已兌換！ 商品數量 ${quantity} 個`);
    closeDialog(dialogId);
  };
}

// 關閉對話框
function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.close();
}

// 點數商店-----------------------------------------------------------
// 取得篩選區的元素
const filtersSection = document.querySelector(".filters");
const filtersLabel = filtersSection.querySelector("label");

// 點擊 Label 切換展開/收起
filtersLabel.addEventListener("click", () => {
  // 切換 active 狀態
  filtersSection.classList.toggle("active");
});

//常見問題區-----------------------
// 使用 classList, setAttribute 和 querySelectorAll
// 若要在 IE8/9 中運行，則需要進行 polyfill
(function () {
  var d = document,
    accordionToggles = d.querySelectorAll(".js-accordionTrigger"), // 選取所有可觸發折疊的元素
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = "ontouchstart" in window, // 檢查是否支援觸控
    pointerSupported = "pointerdown" in window; // 檢查是否支援指針事件

  // 取消點擊延遲
  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  };

  // 設置 ARIA 屬性（ariaType 和新值）
  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };

  // 設置手風琴折疊的 ARIA 屬性
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
      case "true":
        setAriaAttr(el1, "aria-expanded", "true"); // 設置為展開
        setAriaAttr(el2, "aria-hidden", "false"); // 設置內容顯示
        break;
      case "false":
        setAriaAttr(el1, "aria-expanded", "false"); // 設置為收縮
        setAriaAttr(el2, "aria-hidden", "true"); // 設置內容隱藏
        break;
      default:
        break;
    }
  };

  // 切換手風琴折疊狀態
  switchAccordion = function (e) {
    console.log("triggered"); // 控制台輸出以便調試
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling; // 獲取當前問題的答案元素
    var thisQuestion = e.target; // 獲取當前點擊的問題元素
    if (thisAnswer.classList.contains("is-collapsed")) {
      // 檢查答案是否處於折疊狀態
      setAccordionAria(thisQuestion, thisAnswer, "true"); // 更新 ARIA 屬性，標示為展開
    } else {
      setAccordionAria(thisQuestion, thisAnswer, "false"); // 更新 ARIA 屬性，標示為收縮
    }
    thisQuestion.classList.toggle("is-collapsed"); // 切換問題的折疊狀態
    thisQuestion.classList.toggle("is-expanded"); // 切換問題的展開狀態
    thisAnswer.classList.toggle("is-collapsed"); // 切換答案的折疊狀態
    thisAnswer.classList.toggle("is-expanded"); // 切換答案的展開狀態

    thisAnswer.classList.toggle("animateIn"); // 觸發動畫效果
  };

  // 為每個可觸發手風琴的元素添加事件監聽
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      // 如果支持觸控設備
      accordionToggles[i].addEventListener("touchstart", skipClickDelay, false); // 防止點擊延遲
    }
    if (pointerSupported) {
      // 如果支持指針事件
      accordionToggles[i].addEventListener(
        "pointerdown",
        skipClickDelay,
        false
      ); // 防止點擊延遲
    }
    accordionToggles[i].addEventListener("click", switchAccordion, false); // 監聽點擊事件以切換折疊狀態
  }
})();
