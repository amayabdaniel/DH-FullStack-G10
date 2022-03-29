window.addEventListener("load", function () {
  const deleteItemFromCartButtons =
    document.getElementsByClassName("delete-btn");
  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  console.log(JSON.parse(localStorage.getItem("productsInCart")));

  // Function to change cart total in function of quantity and price and update the cart's total
  const updateCartTotal = () => {
    const cartItemContainer = document.getElementsByClassName("cartContent")[0];
    const cartRows = cartItemContainer.getElementsByClassName("cartItem");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.getElementsByClassName("cart-price")[0];
      const quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];

      const price = parseFloat(priceElement.innerText.replace("$", ""));

      const quantity = quantityElement.value;

      total = total + price * quantity;
    }
    document.getElementsByClassName(
      "cart-total-price"
    )[0].innerText = `$${total}`;
  };

  // Function to get every item from LocalStorage and place it into the cart
  const addItemToCart = () => {
    const cart = JSON.parse(localStorage.getItem("productsInCart")) || [];
    cart.forEach((item) => {
      const title = item.title;
      const price = item.price;
      const imageSource = item.imageSource;
      console.log(title, price, imageSource);
      const cartItems = document.getElementsByClassName("cartContent")[0];
      const cartRow = document.createElement("div");
      cartRow.classList.add("cartItem");
      cartRow.innerHTML = `
        <div class="cart-item cart-column">
          <img
            src="${imageSource}"
            alt="${title}"
            class="cart-item-image"
            height=100
            width=100
          />
          <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">$${price}</span>
        <div class="cart-quantity cart-column">
          <input type="number" class="cart-quantity-input" value="1" />
          <button class="delete-btn" type="button">Eliminar</button>
        </div>`;

      cartItems.append(cartRow);
    });
    updateCartTotal();
  };
  addItemToCart();

  // Function to remove item from cart
  const removeCartItem = (event) => {
    const deleteButtonClicked = event.target;
    deleteButtonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  };

  for (let i = 0; i < deleteItemFromCartButtons.length; i++) {
    const deleteButton = deleteItemFromCartButtons[i];
    deleteButton.addEventListener("click", removeCartItem);
  }

  // Function to update cart total based on quantity input change
  const quantityChanged = (event) => {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  };

  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
});
