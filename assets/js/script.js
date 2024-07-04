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

let handleArray;
console.log("line number 16 is : ", handleArray);

document.addEventListener("DOMContentLoaded", () => {
  const itemRows = document.querySelectorAll(".pd_item_row");

  itemRows.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const productPrice = item.querySelector(".pd_pricing span");
    const minus = item.querySelector(".minus");
    const inputBox = item.querySelector(".input-box");
    const plus = item.querySelector(".plus");
    handleArray = [minus, inputBox, plus, checkbox, productPrice];
    handleHtmlElements(handleArray);

    checkbox.addEventListener("change", function (event) {
      const itemId = item.getAttribute("data-id");
      handleHtmlElements(handleArray);
      // handleMinusButton(minus);
      // handlePlusButton(plus);
      // handleInputBox(inputBox);

      // let price = ;
      // let quantity = ;

      // Single Product Item Object
      const itemData = {
        id: itemId,
        ctegoryId: "",
        inventoryId: "",
        unit: 1,
        quantity: parseFloat(inputBox.value),
        price: parseFloat(productPrice.childNodes[0].nodeValue),
        title: "",
        image: "",
      };

      if (checkbox === event.target) {
        if (checkbox.checked) {
          checkbox.style.background = "green";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove if it already exists
          initialState.items.push(itemData);
          console.log(initialState);
        } else {
          checkbox.style.background = "";
          initialState.items = initialState.items.filter(
            (i) => i.id !== itemId
          ); // Remove unchecked item
          console.log(initialState);
        }
      }
    });
  });
});

const handleHtmlElements = (quantity) => {
  quantity.forEach((element) => {
    if (element.className === "input-box" || element.type === "number") {
      element.addEventListener("keyup", function (event) {
        console.log();
        isNaN(parseInt(Number(event.target.value)))
          ? 0
          : Math.max(value - 1, 0);
      });
    } else {
      element.addEventListener("click", function (event) {
        console.log(event.target);
      });
    }
  });
};

const handleMinusButton = function (minus) {
  minus.addEventListener("click", function (event) {
    event.preventDefault();
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 0 : Math.max(value - 1, 0);
    inputBox.value = value;
    console.log(inputBox.value, "minus...");
  });
};
const handlePlusButton = function (plus) {
  plus.addEventListener("click", function (event) {
    event.preventDefault();
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 0 : Math.max(value + 1);
    inputBox.value = value;
    console.log(inputBox.value, "plus...");
  });
};
const handleInputBox = function (inputBox) {
  inputBox.addEventListener("keyup", function (event) {
    event.preventDefault();
    let value = event.target.value;
    value = parseInt(Number(value));
    inputBox.value = value;
  });
};
