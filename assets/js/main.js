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
let itemRows = document.querySelectorAll(".pd_item_row");
const eventHandler = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // changed to querySelectorAll
  const productPrice = document.querySelector(".pd_pricing span");
  const minus = document.querySelector(".minus");
  const inputBox = document.querySelector(".input-box");
  const plus = document.querySelector(".plus");

  minus.addEventListener("click", (event) => {
    event.preventDefault();
    const currentValue = parseInt(inputBox.value);
    inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue - 1, 1);
    updateItemQuantity(parseInt(inputBox.value));
    updateTotals();
  });

  if (inputBox.type === "number") {
    inputBox.addEventListener("keyup", (event) => {
      event.preventDefault();
      const quantity = parseInt(event.target.value);
      updateItemQuantity(parseInt(quantity));
      updateTotals();
    });
  }

  plus.addEventListener("click", (event) => {
    event.preventDefault();
    const currentValue = parseInt(inputBox.value);
    inputBox.value = isNaN(currentValue) ? 0 : Math.max(currentValue + 1, 1);
    updateItemQuantity(parseInt(inputBox.value));
    updateTotals();
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      // const itemId = event.target.id;

      const itemId = itemRows.id;
      const quantity = parseInt(inputBox.value);
      const price = parseFloat(productPrice.textContent);

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

const updateItemQuantity = (quantity) => {
  const itemId = itemRows.id;
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
  // You can add logic to update other totals like shippingCharge, discount, tax, grandTotal, etc.
  console.log(initialState.subTotal);
  console.log(initialState);
};

eventHandler();
