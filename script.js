document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.cart a');
    const addToCartButtons = document.querySelectorAll('.product-card button');
    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartButton.textContent = `Cart (${cartCount})`;
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.product-card button');

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.parentElement;
            const productId = productCard.getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;

            // Add product to cart
            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginForm.addEvent








// Sample cart data
let cart = [
    {id: 1, product: 'Product 1', price: 29.99, quantity: 1},
    {id: 2, product: 'Product 2', price: 19.99, quantity: 2},
    {id: 3, product: 'Product 3', price: 39.99, quantity: 1}
];

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" onchange="changeQuantity(event)">
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${item.id})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function changeQuantity(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    const newQuantity = parseInt(event.target.value);
    
    const item = cart.find(item => item.id === id);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        updateCart();
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Initial cart update
updateCart();
