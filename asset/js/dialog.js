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
