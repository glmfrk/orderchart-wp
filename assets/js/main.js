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
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 0);
      const itemId = inputBox.closest(".product__table_row");

      const checkbox = checkBoxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  inputBoxes.forEach((element, index) => {
    if (element.type === "number") {
      this.addEventListener("keyup", (event) => {
        event.preventDefault();
        const quantity = parseInt(event.target.value);
        const itemId = element.closest(".product__table_row");

        const checkbox = checkBoxes[index];
        checkbox.checked = true;
        handleCheckboxChange(checkbox);
        updateItemQuantity(itemId, quantity);
      });
    }
  });

  plusButtons.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue + 1, 0);
      const itemId = inputBox.closest(".product__table_row");

      const checkbox = checkBoxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  checkBoxes.forEach((element) => {
    element.addEventListener("change", function (event) {
      handleCheckboxChange(this);
    });
  });
  radioBoxes.forEach((element) => {
    element.addEventListener("change", function (event) {
      handleRadioInput(this);
    });
  });
};
eventHandler();

function handleCheckboxChange(element) {
  const tableRow = element.closest(".product__table_row");
  const itemId = tableRow.getAttribute("data-id");

  const quantity = parseInt(tableRow.querySelector(".input-box").value);
  const price = parseInt(
    tableRow.querySelector(".pd_pricing span").textContent
  );
  let itemName = element.nextElementSibling.textContent;
  const itemImage = tableRow
    .querySelector(".product_demo img")
    .getAttribute("src");

  const itemData = {
    id: itemId,
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
