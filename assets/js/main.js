const initalObj = {
  items: [],
  shippingInfo: {},
  shippingCharge: 0,
  subTotal: 0,
  grandTotal: 0,
  orderNote: "",
};

const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const radioBoxes = document.querySelectorAll('input[type="radio"]');
const inputBoxes = document.querySelectorAll(".input-box");
const minusButtons = document.querySelectorAll(".minus");
const plusButtons = document.querySelectorAll(".plus");
const totalPrice = document.querySelectorAll(".net_price span");
const deliveryCost = document.querySelector(".delivery_charge");
const grandTotal = document.querySelector(".total_price span");
const pdItemImage = document.querySelector(".product_demo img");
const pdItem = document.querySelector(".pd_item p");
const orderNote = document.querySelector('input[name="orderNote"]');

const eventHandler = function () {
  minusButtons.forEach((element, index) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();

      const inputBox = inputBoxes[index];
      let quantity = parseInt(inputBox.value);
      inputBox.value = isNaN(quantity) ? 0 : Math.max(quantity - 1, 0);

      const checkbox = checkBoxes[index];
      const itemRow = inputBox.closest(".product__table_row");

      handleCheckboxChange(checkbox, itemRow);
      updateItemQuantity(itemRow, parseInt(inputBox.value));
    });
  });

  inputBoxes.forEach((element, index) => {
    element.addEventListener("keyup", function (event) {
      event.preventDefault();

      const checkbox = checkBoxes[index];
      const quantity = parseInt(this.value);
      const itemRow = this.closest(".product__table_row");

      handleCheckboxChange(checkbox, itemRow);
      updateItemQuantity(itemRow, quantity);
    });
  });

  plusButtons.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const inputBox = inputBoxes[index];
      const quantity = parseInt(inputBox.value);
      inputBox.value = isNaN(quantity) ? 0 : Math.max(quantity + 1, 0);

      const checkbox = checkBoxes[index];
      const itemRow = inputBox.closest(".product__table_row");

      handleCheckboxChange(checkbox, itemRow);
      updateItemQuantity(itemRow, parseInt(inputBox.value));
    });
  });

  checkBoxes.forEach((element, index) => {
    element.addEventListener("change", function (event) {
      event.preventDefault();

      const inputBox = inputBoxes[index];
      const itemRow = inputBox.closest(".product__table_row");

      handleCheckboxChange(this, itemRow);
      updateItemQuantity(itemRow, parseInt(inputBox.value));
    });
  });
  radioBoxes.forEach((element) => {
    element.addEventListener("change", function (event) {
      event.preventDefault();
      handleRadioInput(this);
    });
  });
};
eventHandler();

function handleCheckboxChange(element, item) {
  const quantity = parseInt(item.querySelector(".input-box").value);
  const price = parseInt(item.querySelector(".pd_pricing span").textContent);
  let itemName = element.nextElementSibling.textContent;
  const itemImage = item.querySelector("img").getAttribute("src");
  console.log(itemImage);

  const itemData = {
    id: item,
    categoryId: "",
    inventoryId: "",
    quantity: quantity,
    price: price,
    title: itemName,
    image: itemImage,
  };

  if (element.checked) {
    initalObj.items = initalObj.items.filter((i) => i.id !== itemId);
    initalObj.items.push(itemData);
  } else {
    initalObj.items = initalObj.items.filter((i) => i.id !== itemId);
  }
  console.log(initalObj);
}
function handleRadioInput(element) {
  const itemRow = element.closest(".shifting_table_row");
  const selectedCharge = itemRow.querySelector(".shiftingCost").textContent;

  initalObj.shippingCharge = parseInt(selectedCharge);
  updateTotals();
}
function updateItemQuantity(element, quantity) {
  const itemId = element.getAttribute("data-id");
  const item = initalObj.items.find((i) => i.id === itemId);
  if (item) {
    item.quantity === quantity;
  }
  const checkbox = element.querySelector('input[type="checkbox"]');
  quantity === 0 ? (checkbox.checked = false) : (checkbox.checked = true);
  updateTotals();
}

const updateTotals = () => {
  initalObj.subTotal = initalObj.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal = initalObj.subTotal + initalObj.shippingCharge;
  initalObj.grandTotal = grandTotal;
  updateViewData(grandTotal);
};

const updateViewData = (value = null) => {
  totalPrice.forEach((element) => {
    element.textContent = initalObj.subTotal;
  });

  initalObj.items.forEach((item) => {
    pdItemImage.src = item.image;
    pdItem.innerHTML = item.title;
  });

  deliveryCost.textContent = initalObj.shippingCharge;
  grandTotal.textContent = value;
};

// Order Confirm Form Validation Here

document.forms[1].addEventListener("submit", handleFormValidation);

function handleFormValidation(event) {
  event.preventDefault();

  let orderNoteMgs = orderNote.value.replace(/\s+/g, " ").trim();
  let userName = event.target.userName.value.replace(/\s+/g, " ").trim();
  let userPhone = event.target.userPhone.value.replace(/\s+/g, " ").trim();
  let userAddress = event.target.userAddress.value.replace(/\s+/g, " ").trim();

  if (userName === "" || userPhone === "" || userAddress === "") {
    alert("All fields are required.");
    return false;
  } else {
    initalObj.shippingInfo = {
      userName,
      userPhone,
      userAddress,
    };
  }
  initalObj.orderNote = orderNoteMgs;
  // Send data to email
  const mailtoLink = `mailto:golamfaruk204@gmail.com?subject=Shipping%20Information%20Details&body=Name: ${userName}%0APhone: ${userPhone}%0AAddress: ${userAddress}%0AOrder Note: ${orderNoteMgs}`;
  window.location.href = mailtoLink;
}
