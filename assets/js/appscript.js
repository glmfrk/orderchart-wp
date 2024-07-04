// Initial Update State Object

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

const itemRows = document.querySelectorAll(".pd_item_row");
const checkbox = document.querySelector('input[type="checkbox"]');
const productPrice = document.querySelector(".pd_pricing span");
const minus = document.querySelector(".minus");
const inputBox = document.querySelector(".input-box");
const plus = document.querySelector(".plus");

checkbox.addEventListener("change", (event) => {
  const itemId = event.target.id;

  // Single Product Item Object
  const itemData = {
    id: itemId,
    ctegoryId: "",
    inventoryId: "",
    unit: 1,
    quantity: parseInt(inputBox.value),
    price: parseFloat(productPrice.childNodes[0].nodeValue),
    title: "",
    image: "",
  };

  if (checkbox === event.target) {
    if (checkbox.checked) {
      checkbox.style.background = "green";
      initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove if it already exists
      initialState.items.push(itemData);
    } else {
      checkbox.style.background = "";
      initialState.items = initialState.items.filter((i) => i.id !== itemId); // Remove unchecked item
    }
  }
});

const handleHtmlElements = (quantity) => {
  quantity.forEach((element) => {
    if (element.className === "input-box" || element.type === "number") {
      element.addEventListener("keyup", function (event) {
        console.log(event.target.value);
      });
    } else if (element.className === "plus") {
      element.addEventListener("click", function (event) {
        isNaN(parseInt(Number(event.target.value)))
          ? 0
          : Math.max(value + 1, 0);
      });
    } else if (element.className === "minus") {
      element.addEventListener("click", function (event) {
        isNaN(parseInt(Number(event.target.value)))
          ? 0
          : Math.max(value - 1, 0);
      });
    }
  });
};
handleHtmlElements([minus, inputBox, plus]);
