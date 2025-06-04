const cartGrid = document.getElementById('cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderiza todos los productos del carrito
function renderCart(products) {
    cartGrid.innerHTML = '';

    if (products.length === 0) {
        const emptyCart = document.createElement('h1')
        emptyCart.textContent = 'No hay elementos en el carrito';
        cartGrid.appendChild(emptyCart);
        updateSubtotalDisplay();
        return;
    }

    const fragment = document.createDocumentFragment();

    for (const product of products) {
        const productDiv = createCartProduct(product);
        fragment.appendChild(productDiv);
    }

    cartGrid.appendChild(fragment);
    updateSubtotalDisplay()
}

// Crea un producto en el DOM del carrito
function createCartProduct(product) {
    const {id, title, price, img, quantity} = product;

    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    const split_price = price.toFixed(2).split(".");

    productDiv.innerHTML = `
        <div class="product-content">
            <div class="product-details-wrapper">
                <div class="product-image">
                    <img src="${img}" alt="${title}">
                </div>
                <div class="product-details">
                    <p class="product-title">${title}</p>
                </div>
            </div>
            <div class="product-quantity">
                <div class="quantity-wrapper">
                    <button class="quantity-btn decrement">−</button>
                    <input type="number" readonly class="quantity-input" value="${quantity}" min="1" />
                    <button class="quantity-btn increment">+</button>
                </div>
            </div>
            <div class="product-price">
                <div class="final-price">
                    <h5>${split_price[0]}<sup>${split_price[1]}</sup></h5>
                </div>
            </div>
        </div>`

    addQuantityEvents(productDiv, id);
    return productDiv;
}

// Asigna eventos a los botones de cantidad
function addQuantityEvents(productDiv, productId) {
    const decrementBtn = productDiv.querySelector(".decrement");
    const incrementBtn = productDiv.querySelector(".increment");
    const input = productDiv.querySelector(".quantity-input");
    const finalPrice = productDiv.querySelector(".product-price h5");

    const cartItem = cart.find(p => p.id === productId);

    incrementBtn.addEventListener("click", () => {
        cartItem.quantity++;
        input.value = cartItem.quantity;
        updatePriceDisplay(input, finalPrice, cartItem.price);
        updateSubtotalDisplay();
        updateCart();
    });

    decrementBtn.addEventListener("click", () => {
        const current = parseInt(input.value);
        if (current > 1) {
            cartItem.quantity--;
            input.value = cartItem.quantity;
            updatePriceDisplay(input, finalPrice, cartItem.price);
            updateSubtotalDisplay();
            updateCart();
        } else {
            deleteFromCart(cartItem);
            renderCart(cart);
            return;
        }
    });

    input.value = cartItem.quantity;
    updatePriceDisplay(input, finalPrice, cartItem.price);
}

// Actualiza el precio en el container del producto
function updatePriceDisplay(input, finalPrice, unitPrice) {
    const quantity = parseInt(input.value);
    const total = unitPrice * quantity;
    const [intPart, decimal] = total.toFixed(2).split(".");
    finalPrice.innerHTML = `${intPart}<sup>${decimal}</sup>`;
}

// Suma todos los productos y muestra el subtotal y total
function updateSubtotalDisplay() {
    const subtotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const [intPart, decimal] = subtotal.toFixed(2).split(".");

    const subtotalElement = document.getElementById("subtotal-amount");
    const totalElement = document.getElementById("total-amount");

    if (subtotalElement) {
        subtotalElement.innerHTML = `
            <span>Subtotal</span>
            <span class="price">${intPart}<sup>${decimal}</sup></span>
        `;
    }
    if (totalElement) {
        totalElement.innerHTML = `
            <span>Total</span>
            <span class="price">${intPart}<sup>${decimal}</sup></span>
        `;
    }
}

function deleteFromCart(product) {
    cart = cart.filter(p => p.id !== product.id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

renderCart(cart);