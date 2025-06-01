const productGrid = document.getElementById('grid');

let products = [];

// Fetch data from local DB
const getProducts = async () => {
    const response = await fetch('./db/products.json')
    const data = await response.json()
    
    return data
}

function renderCards(products) {
    const fragment = document.createDocumentFragment();
    
    for(const product of products) {
        const cardDiv = createCardStructure(product)
        fragment.appendChild(cardDiv);
    }

    productGrid.replaceChildren(fragment);
}

function createCardStructure(product) {

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.innerHTML = `
            <div class="card-content">
                <div class="card-image">
                    <img src="${product.img}" alt="">
                </div>
                <div class="card-text">
                    <p class="title">${product.title}</p>
                    <p class="description">${product.description}</p>
                    <p class="price"> ${product.price} </p>
                </div>
            </div>
            <div class="card-buy">
                <div class="product-quantity">
                    <button class="decrement-button">−</button>
                    <input type="number" class="quantity-input" value="0" min="0" readonly>
                    <button class="increment-button">+</button>

                </div>
                <button class="card-buy-button"> Add to Cart</button>
        </div>`
    
    addButtonsEvents(cardDiv, product)

    return cardDiv;
    
}

function addButtonsEvents(cardDiv, product) {

    const productManager = cardDiv.querySelector('.card-buy');

    const quantityInput = productManager.querySelector('.quantity-input')
    const decrementBtn = productManager.querySelector('.decrement-button')
    const incrementBtn = productManager.querySelector('.increment-button')

    decrementBtn.addEventListener('click', () => {
        let prodQuantity = parseInt(quantityInput.value)
        
        if(prodQuantity > 0) {
            quantityInput.value = prodQuantity - 1
        }
    })

    incrementBtn.addEventListener('click', () => {
        let prodQuantity = parseInt(quantityInput.value)
        
        quantityInput.value = prodQuantity + 1
    })

    const buyBtn = productManager.querySelector('.card-buy-button')
    
    buyBtn.addEventListener('click', () => {
        let prodQuantity = parseInt(quantityInput.value)
        if (prodQuantity > 0) {
            
            saveCart(cart, prodQuantity, product)
            showPopup(product)
            updateCartBtn()
        } else {
            showPopup(null)
        }

    })

}

function saveCart(cart, quantity, product) {
    product["quantity"] = quantity;

    cart.push(product)

    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart)

}


// POP-UPS FOR ITEMS ADDED TO THE CART
const popupContainer = document.getElementById('popup-container')
let popupTimeout;

function showPopup(product) {
   
    const popup = createPopup(product);

    popupContainer.prepend(popup)

    popupTimeout = setTimeout(() => { // Remove popup after 3s
        popup.remove(); // se remueve asi mismo del container
    }, 3000)

}

function createPopup(product) {

    const popup = document.createElement('div');
    popup.className = 'popup'

    if (!product) {
            popup.classList.add('error')
            popup.innerHTML = `
                <p>Selecciona más de uno para añadirlo al carrito</p>
                <span class="material-symbols-outlined">close</span>`
        } else {
            popup.innerHTML = `
                <p>${product.title} al carrito</p>
                <span class="material-symbols-outlined">check</span>`
        }

    return popup
}

//MANAGE STATE OF CART BTN
const cartBtn = document.getElementById('cart-button');
const quantityInfo = document.createElement('span');

function updateCartBtn() {
    console.log(cart.length);
    
    if (cart.length > 0){
        quantityInfo.className = 'quantity'
        cartBtn.appendChild(quantityInfo);
    }

    quantityInfo.textContent = cart.length;

}

// BRING CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || []


// INIT FUNCTIONS
getProducts().then(data => {
    products = data;
    renderCards(products)
})

updateCartBtn()