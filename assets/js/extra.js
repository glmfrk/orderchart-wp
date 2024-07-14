// Front page script start here

const cartNumber = document.querySelector("#topActionCartNumber");
const addCartButton = document.querySelectorAll(".add__cart");

let count = 0;

addCartButton.forEach((element) => {
  element.addEventListener("click", function (event) {
    count++;
    cartNumber.innerText = count;
  });
});
