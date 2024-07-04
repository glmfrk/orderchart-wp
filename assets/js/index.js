const initialState = {
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

const eventHandler = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const inputBoxes = document.querySelectorAll(".input-box");
  const minusButtons = document.querySelectorAll(".minus");
  const plusButtons = document.querySelectorAll(".plus");

  const updateItemQuantity = (itemId, quantity) => {
    const item = initialState.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
    updateTotals();
  };

  const updateTotals = () => {
    initialState.subTotal = initialState.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    // Add logic to update other totals like shippingCharge, discount, tax, grandTotal, etc.
    console.log(initialState);
  };

  minusButtons.forEach((minus, index) => {
    minus.addEventListener("click", (event) => {
      event.preventDefault();
      const checkbox = checkboxes[index];
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 1);
      const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");
      if (event.type === "click") {
        if (checkbox.checked) {
          checkbox.style.background = "green";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove if it already exists
          initialState.items.push(itemData);
        } else {
          checkbox.style.background = "";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove unchecked item
        }
      }
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  inputBoxes.forEach((input, index) => {
    if (input.type === "number") {
      this.addEventListener("keyup", (event) => {
        event.preventDefault();
        const checkbox = checkboxes[index];
        const quantity = parseInt(event.target.value);
        const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");
        if (event.type === "keyup") {
          if (checkbox.checked) {
            checkbox.style.background = "green";
            initialState.items = initialState.items.filter(
              (i) => i.id !== itemId
            ); // Remove if it already exists
            initialState.items.push(itemData);
          } else {
            checkbox.style.background = "";
            initialState.items = initialState.items.filter(
              (i) => i.id !== itemId
            ); // Remove unchecked item
          }
        }
        updateItemQuantity(itemId, quantity);
      });
    }
  });

  plusButtons.forEach((plus, index) => {
    plus.addEventListener("click", (event) => {
      event.preventDefault();
      const checkbox = checkboxes[index];
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue + 1, 1);
      const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");
      if (event.type === "click") {
        if (checkbox.checked) {
          checkbox.style.background = "green";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove if it already exists
          initialState.items.push(itemData);
        } else {
          checkbox.style.background = "";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove unchecked item
        }
      }
      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const itemRow = checkbox.closest(".pd_item_row");
      const itemId = itemRow.getAttribute("data-id");
      const inputBox = itemRow.querySelector(".input-box");
      const quantity = parseInt(inputBox.value);
      const price = parseFloat(
        itemRow.querySelector(".pd_pricing span").textContent
      );

      // Single Product Item Object
      const itemData = {
        id: itemId,
        categoryId: "",
        inventoryId: "",
        unit: 1,
        quantity: quantity,
        price: price,
        title: "",
        image: "",
      };

      if (event.target.checked) {
        event.target.style.background = "green";
        initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove if it already exists
        initialState.items.push(itemData);
      } else {
        event.target.style.background = "";
        initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove unchecked item
      }

      updateTotals();
    });
  });
};

eventHandler();
