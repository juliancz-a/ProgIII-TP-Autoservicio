import { fetchProducts } from "./utils/dataService.js";
import { getCurrentCart, addToCart, isInCart, updateCartBtn } from "./utils/cartManager.js";
import { showPopup, setLoader} from "./utils/uiHelpers.js";

if (!localStorage.getItem("takeawayName")) {
    window.location.href = "/login.html";   
}

// Main Functions //
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

    let popupBody = {
    message : `${product.title} agregado al carrito`,
    color : '#568a33',
    icon : 'check'
    }

    const productManager = cardDiv.querySelector('.card-buy');
    const buyBtn = productManager.querySelector('.card-buy-button')
    
    buyBtn.addEventListener('click', () => {
            
            showPopup(popupBody)            
            addToCart(product)
            updateCard(cardDiv, product)
            updateCartBtn(cart, quantityIcon)
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

function getMainTitle(category) {
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
        
        renderCards(products);
    }).catch(err => {
        console.log("NO LLEGA");
        console.log(err);
    })

    categoryTitle.innerText = getMainTitle(selectedCategory)
    const selectedBtn = document.querySelector(`.categories-button[value=${selectedCategory}]`)
    selectedBtn.classList.add('selected')
    
}
function processQuery() {
    clearTimeout(debounceTimeout); // Reinicia el temporizador

    debounceTimeout = setTimeout(() => {
        const query = searchBar.value.trim();
        executeSearch(query); //función de búsqueda
    }, 400); // Espera 400 ms desde la última tecla
}

function executeSearch(query) {
    fetchProducts().then(data => {
        let products = data;
        const filteredItems = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        renderCards(filteredItems);
    })
}

// DOM Elements
const productGrid = document.getElementById('grid');

const categoryTitle = document.getElementById('category-title')

const searchBar = document.getElementById('query');
let debounceTimeout;
searchBar.value = '';

const quantityIcon = document.createElement('span');
const cartBtn = document.getElementById('cart-button');
cartBtn.appendChild(quantityIcon);

// Events
searchBar.addEventListener('input', processQuery)

//INIT FUNCTIONS
let cart = getCurrentCart();
showCategoryContent()
updateCartBtn(cart, quantityIcon)
setLoader()