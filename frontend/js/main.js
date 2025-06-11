import { fetchProducts } from "./utils/dataService.js";
import {getCurrentCart, addToCart, isInCart, updateCartBtn} from "./utils/cartManager.js";

const productGrid = document.getElementById('grid');

if (!localStorage.getItem("takeawayName")) {
    window.location.href = "/login.html";   
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

        if(isInCart(product)) {
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
                    <div class="price-wrapper">
                        <p class="price">${intPart}</p>
                    </div>
                </div>
            </div>
            <div class="card-buy">
                
                <button title="Agregar al carrito" class="card-buy-button product-button"> Add to Cart <span class="material-symbols-outlined">add_shopping_cart </span></button>
            </div>`
    
    addButtonsEvents(cardDiv, product)

    return cardDiv;
    
}

function addButtonsEvents(cardDiv, product) {

    const productManager = cardDiv.querySelector('.card-buy');
    const buyBtn = productManager.querySelector('.card-buy-button')
    
    buyBtn.addEventListener('click', () => {
            
            showPopup(product)            
            addToCart(product)
            updateCard(cardDiv, product)
            updateCartBtn(getCurrentCart())

    })

}

function updateCard(cardDiv, product) { // Updating CardDiv if is in the cart
    cardDiv.classList.add('card-added');

    const cardBuy = cardDiv.lastChild
    const buyBtn = cardBuy.querySelector('button');
    const currentQuantity = document.createElement('span');
    const quantityWrapper = document.createElement('div');
    quantityWrapper.className = 'quantityWrapper'

    quantityWrapper.appendChild(currentQuantity);
    buyBtn.appendChild(quantityWrapper)
    
    let productInCart = isInCart(product);

    currentQuantity.innerText = `${productInCart.quantity}`
    currentQuantity.classList = 'added';

    cardBuy.replaceChildren(buyBtn)
}

// POP-UPS FOR ITEMS ADDED TO THE CART/REMOVED FROM THE CART/0 QUANTITY SELECTED
const popupContainer = document.getElementById('popup-container')
let popupTimeout;

function showPopup(product) {
   
    const popup = createPopup(product);

    popupContainer.prepend(popup)

    popupTimeout = setTimeout(() => { // Remove popup after 3s
        popup.remove(); // se remueve asi mismo del container
    }, 2000)

}

function createPopup(product) {

    const popup = document.createElement('div');
    popup.className = 'popup';

    let message = `${product.title} al carrito`;
    let icon = 'check';
    

    popup.innerHTML = `
        <p>${message}</p>
        <span class="material-symbols-outlined">${icon}</span>
    `;

    return popup;
}

const categoryTitle = document.getElementById('category-title')

function setTitle(category) {
    const titles = {
        'accessory': 'Accesorios',
        'component': 'Componentes de PC',
        'featured': 'Nuestros productos'
    };

    return titles[category] || 'Nuestros productos';
}

function showCategoryContent() { // Location => tiene informacion de la URL actual // Search => info de los params de la url
    const params = new URLSearchParams(window.location.search) //URLSearchParams => obj con los params
    let selectedCategory = params.get('category'); // accessory / component / featured (all)

    if (!selectedCategory) selectedCategory = 'featured'; 
    
    fetchProducts().then(data => {
        let products = (selectedCategory === 'accessory' || selectedCategory === 'component') ? data.filter(p => p.category === selectedCategory) : data;
        
        renderCards(products)
    })

    categoryTitle.innerText = setTitle(selectedCategory)
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
        return p.title.toLowerCase().includes(query.toLowerCase());
    })
    renderCards(filteredItems);
}

//INIT

let cart = getCurrentCart();

showCategoryContent()
updateCartBtn(cart)
