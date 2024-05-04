document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
        event.preventDefault();

        // Get product details from data attributes
        const productName = button.getAttribute("data-name");
        const productPriceElement = button.parentNode.querySelector(".price");
        const productPrice = parseFloat(productPriceElement.getAttribute("data-price"));

        // Create or update cart item quantity
        const cartItems = document.querySelector(".cart-items");
        let itemExist = false;

        [...cartItems.children].forEach(function(item) {
            if (item.dataset.name === productName) {
            // Update quantity if item already exists
            let quantity = parseInt(item.dataset.quantity) + 1;
            item.dataset.quantity = quantity;
            item.innerHTML = `${productName} (Qty: ${quantity}) - Php ${computeItemPrice(productPrice, quantity).toFixed(2)}`;
            itemExist = true;
            }
        });

        if (!itemExist) {
          // Create new item if it doesn't exist
            const cartItem = document.createElement("ul");
            cartItem.dataset.name = productName;
            cartItem.dataset.quantity = 1;
            cartItem.innerHTML = `${productName} (Qty: 1) - Php ${productPrice.toFixed(2)}`;
            cartItems.appendChild(cartItem);
        }

        // Update total price
        const totalPrice = document.querySelector(".cart-total");
        const currentTotal = parseFloat(totalPrice.textContent.replace("Total: Php", ""));
        const newTotal = currentTotal + productPrice;
        totalPrice.textContent = `Total: Php ${newTotal.toFixed(2)}`;
        });
    });
});

    function computeItemPrice(price, quantity) {
    return price * quantity;
}