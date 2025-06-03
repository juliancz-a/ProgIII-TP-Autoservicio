const cartGrid = document.getElementById('cart')

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function createCartProduct( product ) {
    const {title, description, category, price, img} = product;

    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    productDiv.innerHTML = `<div class="product-content">
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
                                        <input type="number" class="quantity-input" value="1" min="1" />
                                        <button class="quantity-btn increment">+</button>
                                    </div>
                                </div>
                                <div class="product-price">
                                    <div class="final-price">
                                        <h5>${price}</h5>
                                    </div>
                                </div>
                            </div>`
    

    addQuantityEvents(productDiv);

    return productDiv;
}

function renderCart( products ) {
    if (products.length > 0) {
        console.log("No hay nada");
    }

    const fragment = document.createDocumentFragment();

    for (const product of products) {
        const productDiv = createCartProduct(product);

        fragment.appendChild(productDiv);
    }

    cartGrid.appendChild(fragment);
}

function addQuantityEvents( productDiv ) {
    const decrementBtn = productDiv.querySelector(".decrement");
    const incrementBtn = productDiv.querySelector(".increment");
    const input = productDiv.querySelector(".quantity-input");

    incrementBtn.addEventListener("click", () => {
        input.value = parseInt(input.value) + 1;
    });

    decrementBtn.addEventListener("click", () => {
        const current = parseInt(input.value);
        if (current > 1) {
            input.value = current - 1;
        } else {
            productDiv.remove();
            // 💾 También podrías actualizar localStorage si es necesario:
            // removeFromCart(product.id);
        }
    });
}

renderCart(cart);