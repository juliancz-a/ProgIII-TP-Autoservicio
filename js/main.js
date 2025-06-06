const productGrid = document.getElementById('grid');

let products = [];

if (!localStorage.getItem("takeawayName")) {
    window.location.href = "login.html";
}

// Fetch data from local DB
const getProducts = async () => {
    const response = await fetch('./db/products.json')
    const data = await response.json()
    
    return data
}

function renderCards(products) {
    const fragment = document.createDocumentFragment();

    if (products.length === 0) {
        const emptyGrid = document.createElement('h1')
        emptyGrid.textContent = 'No encontramos ningun producto';
        productGrid.replaceChildren(emptyGrid)
        return;
    }
    
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

    const [intPart, decimalPart] = product.price.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).split(",");

    
    cardDiv.innerHTML = `
            <div class="card-content">
                <div class="card-image">
                    <img draggable="false" src="${product.img}" alt="${product.title}">
                </div>
                <div class="card-text">
                    <p class="title">${product.title}</p>
                    <p class="description">${product.description}</p>
                </div>
            </div>
            <div class="card-buy">
                <div class="price-wrapper">
                    <p class="price">${intPart}</p>
                </div>
                <button title="Agregar al carrito" class="card-buy-button product-button"> Add to Cart</button>
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
    
    product.quantity = 1;
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
    removeBtn.classList.add('card-buy-button');
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

    if (isInCart(product)) {
        message = `${product.title} eliminado del carrito`;
        icon = 'undo';
        popup.classList.add('undo');
    } else {
        message = `${product.title} al carrito`;
        icon = 'check';
    }

    popup.innerHTML = `
        <p>${message}</p>
        <span class="material-symbols-outlined">${icon}</span>
    `;

    return popup;
}


function showCategoryContent() { // Location => tiene informacion de la URL actual // Search => info de los params de la url
    const params = new URLSearchParams(window.location.search) //URLSearchParams => obj con los params
    let selectedCategory = params.get('category'); // accessory / component / featured (all)

    if (!selectedCategory) selectedCategory = 'featured'; 
    
    getProducts().then(data => {
        products = (selectedCategory === 'accessory' || selectedCategory === 'component') ? data.filter(p => p.category === selectedCategory) : data;
        console.log(products);
        
        renderCards(products)
    })

    const selectedBtn = document.querySelector(`.categories-button[value=${selectedCategory}]`)
    selectedBtn.classList.add('selected')
    
}

const searchBar = document.getElementById('query');
let debounceTimeout;
searchBar.value = '';

searchBar.addEventListener('input', () => {
    clearTimeout(debounceTimeout); // Reinicia el temporizador

    debounceTimeout = setTimeout(() => {
        const query = searchBar.value.trim();
        ejecutarBusqueda(query); // Tu función de búsqueda
    }, 400); // Espera 400 ms desde la última tecla
});

function ejecutarBusqueda( query ) {
    const filteredItems = products.filter((p) => {
        return p.title.toLowerCase().includes(query);
    })
    renderCards(filteredItems);
}

// BRING CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || []

//INIT
showCategoryContent()

