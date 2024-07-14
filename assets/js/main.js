/**********
 * Initial State Object
 *********/
const initialObj = {
  items: [],
  shippingInfo: {},
  shippingCharge: 0,
  subTotal: 0,
  grandTotal: 0,
  orderNote: "",
};

/*************
 * All importent dom elements selected
 ************/
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const radioBoxes = document.querySelectorAll('input[type="radio"]');
const inputBoxes = document.querySelectorAll(".input-box");
const minusButtons = document.querySelectorAll(".minus");
const plusButtons = document.querySelectorAll(".plus");
const orderNote = document.querySelector('input[name="orderNote"]');
const removeItem = document.querySelectorAll(".close_icon");

document.addEventListener("DOMContentLoaded", function () {
  const handleInputChange = (item) => {
    item.addEventListener("keyup", function () {
      const itemRow = this.closest(".product__table_row");
      const quantity = parseInt(this.value);
      const checkbox = itemRow.querySelector('input[type="checkbox"]');

      if (!isNaN(quantity)) {
        checkbox.checked = true;
        initialObj.items = initialObj.items.filter(
          (i) => i.id !== itemRow.getAttribute("data-id")
        );
        initialObj.items.push(updateItemData(itemRow, quantity));
      } else {
        checkbox.checked = false;
        initialObj.items = initialObj.items.filter(
          (i) => i.id !== itemRow.getAttribute("data-id")
        );
      }

      updateTotals();
    });
  };

  const handleCheckboxChange = (item) => {
    item.addEventListener("change", function () {
      const itemRow = this.closest(".product__table_row");
      const quantityInput = itemRow.querySelector('input[type="number"]');
      let quantity = parseInt(quantityInput.value);

      if (this.checked) {
        quantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
        quantityInput.value = quantity;
        initialObj.items = initialObj.items.filter(
          (i) => i.id !== itemRow.getAttribute("data-id")
        );
        initialObj.items.push(updateItemData(itemRow, quantity));
      } else {
        initialObj.items = initialObj.items.filter(
          (i) => i.id !== itemRow.getAttribute("data-id")
        );
        // quantityInput.value = 0;
      }

      updateTotals();
    });
  };

  const handleDecrementButton = (item) => {
    item.addEventListener("click", function () {
      const itemRow = this.closest(".product__table_row");
      const quantityInput = itemRow.querySelector('input[type="number"]');
      let quantity = parseInt(quantityInput.value);

      quantity = isNaN(quantity) || quantity <= 1 ? 0 : quantity - 1;
      quantityInput.value = quantity;
      itemRow.querySelector('input[type="checkbox"]').checked = quantity > 0;

      initialObj.items = initialObj.items.filter(
        (i) => i.id !== itemRow.getAttribute("data-id")
      );
      if (quantity > 0)
        initialObj.items.push(updateItemData(itemRow, quantity));

      updateTotals();
    });
  };

  const handleIncrementButton = (item) => {
    item.addEventListener("click", function () {
      const itemRow = this.closest(".product__table_row");
      const quantityInput = itemRow.querySelector('input[type="number"]');
      let quantity = parseInt(quantityInput.value);

      quantity = isNaN(quantity) ? 1 : quantity + 1;
      quantityInput.value = quantity;
      itemRow.querySelector('input[type="checkbox"]').checked = true;

      initialObj.items = initialObj.items.filter(
        (i) => i.id !== itemRow.getAttribute("data-id")
      );
      initialObj.items.push(updateItemData(itemRow, quantity));

      updateTotals();
    });
  };

  const handleShippingMethod = (item) => {
    item.addEventListener("change", function () {
      const itemRow = this.closest(".shifting_table_row");
      const shippingCost = parseInt(
        itemRow.querySelector(".shiftingCost").textContent
      );
      initialObj.shippingCharge = shippingCost;
      updateTotals();
    });
  };

  // Function to handle removing product from product list and updating initialObj state
  const handleCloseItem = (item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const itemRow = this.closest(".product__table_row");
      const itemId = itemRow.getAttribute("data-id");

      // Find the item in the initialObj.items array
      const itemIndex = initialObj.items.findIndex((i) => i.id === itemId);

      if (itemIndex !== -1) {
        const item = initialObj.items[itemIndex];
        initialObj.items.splice(itemIndex, 1);

        // Update totals
        initialObj.subTotal -= item.price;

        initialObj.shippingCharge -= item.shippingCost;
        itemRow.remove();

        initialObj.grandTotal = initialObj.subTotal + initialObj.shippingCharge;
      } else {
        console.log("Item not found:", itemId);
      }

      updateTotals();
    });
  };
  const attachEventHandlers = (inputsArray) => {
    inputsArray.forEach((elements) => {
      elements.forEach((element) => {
        if (element.type === "number") handleInputChange(element);
        if (element.type === "checkbox") handleCheckboxChange(element);
        if (element.type === "radio") handleShippingMethod(element);
        if (element.classList.contains("minus")) handleDecrementButton(element);
        if (element.classList.contains("plus")) handleIncrementButton(element);
        if (element.classList.contains("close_icon")) handleCloseItem(element);
      });
    });
  };

  attachEventHandlers([
    checkBoxes,
    inputBoxes,
    minusButtons,
    plusButtons,
    radioBoxes,
    removeItem,
  ]);
});

// Relevent all callback functions define here
const updateItemData = (itemRow, quantity) => {
  const itemId = itemRow.getAttribute("data-id");
  const price = parseInt(itemRow.querySelector(".pd_pricing span").textContent);
  const title = itemRow.querySelector("label").textContent; // Replace with actual title
  const image = itemRow.querySelector("img").src; // Replace with actual image URL
  return { id: itemId, title, image, quantity, price };
};

const updateTotals = () => {
  initialObj.subTotal = initialObj.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  initialObj.grandTotal = initialObj.subTotal + initialObj.shippingCharge;
  updateViewData();
};

const updateViewData = () => {
  document.querySelector(".net_price span").textContent = initialObj.subTotal;
  document.querySelector(".delivery_charge").textContent =
    initialObj.shippingCharge;
  document.querySelector(".total_price span").textContent =
    initialObj.grandTotal;
  initialObj.orderNote = orderNote.value;
};

// Order Confirm Form Validation Here

document
  .getElementById("userInfoForm")
  .addEventListener("submit", handleFormValidation);

function handleFormValidation(event) {
  event.preventDefault();

  let userName = event.target.userName.value.replace(/\s+/g, " ").trim();
  let userPhone = event.target.userPhone.value.replace(/\s+/g, " ").trim();
  let userEmail = event.target.userEmail.value.replace(/\s+/g, " ").trim();
  let userAddress = event.target.userAddress.value.replace(/\s+/g, " ").trim();

  if (userName === "" || userPhone === "" || userAddress === "") {
    alert("All fields are required.");
    return false;
  } else {
    initialObj.shippingInfo = {
      userName,
      userPhone,
      userEmail,
      userAddress,
    };
  }

  // Send data to email
  const mailtoLink = `mailto:${userEmail}?subject=Shipping%20Information%20Details&body=Name: ${userName}%0APhone: ${userPhone}%0AAddress: ${userAddress}%0AOrder Note: ${initialObj.orderNote}%0ASubTotal Price: ${initialObj.subTotal}%0AShipping Cost: ${initialObj.shippingCharge}%0AGrand Total: ${initialObj.grandTotal}`;
  window.location.href = mailtoLink;

  console.log(initialObj);
}
