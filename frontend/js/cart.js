import { getCurrentCart, getFullCart, removeFromCart, updateProductQuantity, updateCartBtn } from "./utils/cartManager.js";

const cartGrid = document.getElementById('cart');

if (!localStorage.getItem("takeawayName")) {
    window.location.href = "login.html";
}

// Renderiza todos los productos del carrito
function renderCart(products) {
    cartGrid.innerHTML = '';    

    if (products.length === 0) {
        const emptyCart = document.createElement('h1')
        emptyCart.textContent = 'No hay elementos en el carrito';
        cartGrid.appendChild(emptyCart);
        updateSubtotalDisplay([]);
        return;
    }

    const fragment = document.createDocumentFragment();

    for (const product of products) {
        const productDiv = createCartProduct(product);
        fragment.appendChild(productDiv);
    }

    cartGrid.appendChild(fragment);
    updateSubtotalDisplay(products)
}

// Crea un producto en el DOM del carrito
function createCartProduct(product) {
    
    const {id , title, price, img, quantity} = product;

    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    const split_price = price.toFixed(2).split(".");
        
    productDiv.innerHTML = `
        <div class="product-content">
            <div class="product-details-wrapper">
                <div class="product-image">
                    <img draggable="false" src="${img}" alt="${title}">
                </div>
                <div class="product-details">
                    <p class="product-title">${title}</p>
                </div>
            </div>
            <div class="product-quantity">
                <div class="quantity-wrapper">
                    <button title="Reducir cantidad" class="quantity-btn decrement">−</button>
                    <input type="number" readonly class="quantity-input" value="${quantity}" min="1" />
                    <button title="Aumentar cantidad" class="quantity-btn increment">+</button>
                </div>
            </div>
            <div class="product-price">
                <div class="final-price">
                    <h5>${split_price[0]}<sup>${split_price[1]}</sup></h5>
                </div>
            </div>
            <button class="delete-btn" title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30" fill="currentColor">
                    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                </svg>
            </button>
        </div>`

    addQuantityEvents(productDiv, product);
    
    return productDiv;
}

// Asigna eventos a los botones de cantidad
function addQuantityEvents(productDiv, product) {
    const decrementBtn = productDiv.querySelector(".decrement");
    const incrementBtn = productDiv.querySelector(".increment");
    const input = productDiv.querySelector(".quantity-input");
    const finalPrice = productDiv.querySelector(".product-price h5");
    const deleteBtn = productDiv.querySelector(".delete-btn");

    incrementBtn.addEventListener("click", () => {
        product.quantity++;
        input.value = product.quantity;
        updatePriceDisplay(input, finalPrice, product.price);
        updateSubtotalDisplay(fullCart);
        updateProductQuantity(product.id, product.quantity)
    });

    decrementBtn.addEventListener("click", () => {
        const current = parseInt(input.value);

        if (current > 1) {
            product.quantity--;
            input.value = current - 1
            updatePriceDisplay(input, finalPrice, product.price);
            updateSubtotalDisplay(fullCart);
            updateProductQuantity(product.id, product.quantity)
        } else {
            removeFromCart(product);
            fullCart = fullCart.filter(p => p.id !== product.id);
            updateCartBtn(fullCart)
            renderCart(fullCart);
            
            return;
        }
    });

    deleteBtn.addEventListener("click", () => {
        removeFromCart(product);
        fullCart = fullCart.filter(p => p.id !== product.id);
        updateCartBtn(fullCart)
        renderCart(fullCart);
        
    });

    input.value = product.quantity;
    updatePriceDisplay(input, finalPrice, product.price);
}

// Actualiza el precio en el container del producto
function updatePriceDisplay(input, finalPrice, unitPrice) {
    const quantity = parseInt(input.value);
    const total = unitPrice * quantity;
    const [entero, decimales] = total.toLocaleString("es-AR", {
        minimumFractionDigits: 2
    }).split(',');

    finalPrice.innerHTML = `${entero}<sup>${decimales}</sup>`;
}

// Suma todos los productos y muestra el subtotal y total
function updateSubtotalDisplay(products) {    
    
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const [entero, decimales] = subtotal.toLocaleString("es-AR", {
        minimumFractionDigits: 2
    }).split(',');
    
    const subtotalElement = document.getElementById("subtotal-amount");
    const totalElement = document.getElementById("total-amount");

    if (subtotalElement) {
        subtotalElement.innerHTML = `
            <span>Subtotal</span>
            <span class="price">${entero}<sup>${decimales}</sup></span>
        `;
    }
    if (totalElement) {
        totalElement.innerHTML = `
            <span>Total</span>
            <span class="price">${entero}<sup>${decimales}</sup></span>
        `;
    }
}

const modal = document.getElementById('modal-confirm');
const modalContent = modal.querySelector('.modal-content');

function closeModal() {
    modalContent.classList.add('fade-out');
    setTimeout(() => {
        modal.classList.remove('active');
        modalContent.classList.remove('fade-out');
    }, 250);
}

document.getElementById('redirect-main').addEventListener('click', () => {
    window.location.href = './index.html';
});

// Abrir modal (ejemplo: desde un botón)
document.getElementById('redirect-checkout').addEventListener('click', () => {
    document.getElementById('modal-confirm').classList.add('active');
});

// Confirmar compra
document.getElementById('btn-confirm').addEventListener('click', () => {
    // lógica: redireccionar, limpiar carrito, mostrar agradecimiento, etc.
    console.log('Compra confirmada');
    setTimeout(() => {
        window.location.href = "./checkout.html";
    }, 500)
});

// Cancelar / cerrar modal
document.getElementById('btn-cancel').addEventListener('click', closeModal);

let fullCart = [];

getFullCart().then(cart => {    
    fullCart = cart
    renderCart(fullCart);
    updateCartBtn(fullCart)
})