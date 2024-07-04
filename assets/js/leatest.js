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
    let item = initialState.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    } else {
      const itemRow = document.querySelector(
        `.pd_item_row[data-id="${itemId}"]`
      );
      const price = parseFloat(
        itemRow.querySelector(".pd_pricing span").textContent
      );
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
      initialState.items.push(itemData);
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

  const handleCheckboxChange = (checkbox) => {
    const itemRow = checkbox.closest(".pd_item_row");
    const itemId = itemRow.getAttribute("data-id");
    const inputBox = itemRow.querySelector(".input-box");
    const quantity = parseInt(inputBox.value);
    const price = parseFloat(
      itemRow.querySelector(".pd_pricing span").textContent
    );

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

    if (checkbox.checked) {
      initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove if it already exists
      initialState.items.push(itemData);
    } else {
      initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove unchecked item
    }

    updateTotals();
  };

  minusButtons.forEach((minus, index) => {
    minus.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 0);
      const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");

      const checkbox = checkboxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);

      updateItemQuantity(itemId, currentValue);
    });
  });

  inputBoxes.forEach((inputBox, index) => {
    if (inputBox.type === "number") {
      inputBox.addEventListener("keyup", (event) => {
        event.preventDefault();
        const quantity = parseInt(event.target.value);
        const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");

        const checkbox = checkboxes[index];
        checkbox.checked = true;
        handleCheckboxChange(checkbox);

        updateItemQuantity(itemId, quantity);
      });
    }
  });

  plusButtons.forEach((plus, index) => {
    plus.addEventListener("click", (event) => {
      event.preventDefault();
      const inputBox = inputBoxes[index];
      const currentValue = parseInt(inputBox.value);
      inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue + 1, 0);
      const itemId = inputBox.closest(".pd_item_row").getAttribute("data-id");

      const checkbox = checkboxes[index];
      checkbox.checked = true;
      handleCheckboxChange(checkbox);

      updateItemQuantity(itemId, parseInt(inputBox.value));
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      handleCheckboxChange(checkbox);
    });
  });
};

eventHandler();
