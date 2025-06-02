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

        if (isInCart(product)) {
            updateCard(cardDiv, product)
        }

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
                </div>
            </div>
            <div class="card-buy">
                <div class="price-wrapper">
                    <p class="price"> $${product.price} </p>
                </div>
                <button class="card-buy-button"> Add to Cart</button>
            </div>`
    
    addButtonsEvents(cardDiv, product)

    return cardDiv;
    
}

function addButtonsEvents(cardDiv, product) {

    const productManager = cardDiv.querySelector('.card-buy');
    const buyBtn = productManager.querySelector('.card-buy-button')
    
    buyBtn.addEventListener('click', () => {
            
            showPopup(product)

            addToCart(cart, product)
            updateCard(cardDiv, product)
            updateCartBtn()

    })

}

function addToCart(cart, product) {

    cart.push(product)
    updateCart();

}

function removeFromCart(product) {
    
    cart = cart.filter((p) => {
        return p.id != product.id
    })
    
    updateCart();
}

function updateCart() {
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart)
}


function updateCard(cardDiv, product) { // Updating CardDiv if is in the cart
    const cardBuy = cardDiv.lastChild
    
    const removeBtn = document.createElement('button')
    removeBtn.className = 'card-buy-button';
    removeBtn.textContent = 'Remove from cart'
    
    cardBuy.replaceChildren(removeBtn)
    
    cardDiv.classList.add('card-added');

    removeBtn.addEventListener('click', () => {
        showPopup(product) // SHOW Removal popup and then remove from the cart
        removeFromCart(product)
        updateCartBtn()

        const newCardDiv = createCardStructure(product)
        cardDiv.replaceWith(newCardDiv)

    })
}

function isInCart(product) {
    return productAdded = cart.find(p => p.id === product.id);
}


// POP-UPS FOR ITEMS ADDED TO THE CART/REMOVED FROM THE CART/0 QUANTITY SELECTED
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
    popup.className = 'popup';

    let message = '';
    let icon = '';
    let type;


    if (isInCart(product)) {
        message = `${product.title} eliminado del carrito`;
        icon = 'undo';
        type = 'undo';
    } else {
        message = `${product.title} al carrito`;
        icon = 'check';
    }

    if (type) {
        popup.classList.add(type);
    }

    popup.innerHTML = `
        <p>${message}</p>
        <span class="material-symbols-outlined">${icon}</span>
    `;

    return popup;
}

// CATEGORIES BUTTONS

const categoriesBtns = document.getElementsByClassName('categories-button')

for (const btn of categoriesBtns) {
    btn.addEventListener('click', () => {

       for (const btn of categoriesBtns) { // check for selected class
            btn.classList.remove('selected')
        }

        getProducts().then(data => {
            if (btn.value == "") {
                products = data;
            } else {
                products = data.filter(p => p.category === btn.value);
            }
            renderCards(products);
            btn.classList.add('selected')
    })
    });
}

//MANAGE STATE OF CART BTN
const cartBtn = document.getElementById('cart-button');
const quantityInfo = document.createElement('span');
cartBtn.appendChild(quantityInfo);

const tabTitle = document.getElementById('tab-title')

function updateCartBtn() {
    quantityInfo.style.display = "none"

    if (cart.length > 0){
        quantityInfo.style.display = "inline"
        quantityInfo.className = 'quantity'
        tabTitle.textContent = `(${cart.length}) NeonBits`
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

categoriesBtns[0].classList.add('selected');
updateCartBtn()