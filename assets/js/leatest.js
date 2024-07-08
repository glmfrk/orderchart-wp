const initalObj = {
  subTotal: 0,
  shippingCharge: 0,
  discount: 0,
  tax: 0,
  grandTotal: 0,
  billingAddress: "",
  shippingAddress: "",
  paymentMethodId: "",
  items: [],
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const inputBoxes = document.querySelectorAll(".input-box");
const minusButtons = document.querySelectorAll(".minus");
const plusButtons = document.querySelectorAll(".plus");
const shiftingRows = document.querySelectorAll(".shifting_table_row");
const deliveryCharge = document.querySelectorAll(".delivery_charge span");
const totalPrice = document.querySelectorAll(".net_price span");
const grandTotal = document.querySelector(".total_price span");

const eventHandler = function () {
  minusButtons.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 0);
      const itemId = inputBox
        .closest(".product__table_row")
        .getAttribute("data-id");

      const checkbox = checkboxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  inputBoxes.forEach((element, index) => {
    if (element.type === "number") {
      element.addEventListener("keyup", (event) => {
        event.preventDefault();
        const quantity = parseInt(event.target.value);
        const itemId = element
          .closest(".product__table_row")
          .getAttribute("data-id");

        const checkbox = checkboxes[index];
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
      const itemId = inputBox
        .closest(".product__table_row")
        .getAttribute("data-id");

      const checkbox = checkboxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  checkboxes.forEach((element, index) => {
    element.addEventListener("change", (event) => {
      handleCheckboxChange(element);
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
    const deliveryChargeValue = parseInt(
      tableRow.querySelector(".delivery_charge span").textContent
    );
    console.log(deliveryChargeValue);
    initalObj.shippingCharge += deliveryChargeValue;
  } else {
    initalObj.items = initalObj.items.filter((i) => i.id !== itemId);
    const deliveryChargeValue = parseInt(
      tableRow.querySelector(".delivery_charge span").textContent
    );
    initalObj.shippingCharge -= deliveryChargeValue;
  }

  updateTotals();
}

function updateItemQuantity(itemId, quantity) {
  const item = initalObj.items.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity;
  }
  updateTotals();
}

const updateTotals = () => {
  initalObj.subTotal = initalObj.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal =
    initalObj.subTotal +
    initalObj.shippingCharge -
    initalObj.discount +
    initalObj.tax;
  initalObj.grandTotal = grandTotal;
  updateViewData(initalObj.grandTotal);
};

const updateViewData = (value = null) => {
  totalPrice.forEach((element) => {
    element.textContent = value;
  });
  grandTotal.textContent = value;
};
