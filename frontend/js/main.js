import { fetchProducts } from "./utils/dataService.js";
import { getCurrentCart, addToCart, isInCart, updateCartBtn } from "./utils/cartManager.js";
import { showPopup } from "./utils/uiHelpers.js";

if (!localStorage.getItem("takeawayName")) {
    window.location.href = "/login.html";   
}

// Main Functions //
function renderCards(products) {    
    const fragment = document.createDocumentFragment();

    if (products.length === 0) {
        renderEmptySite();
        return;
    }
    
    for (const product of products) {
    
        const cardDiv = createCardStructure(product)

        if(isInCart(product)) {
            updateCard(cardDiv, product)
        }
        
        fragment.appendChild(cardDiv);
    }

    productGrid.replaceChildren(fragment);
}

function renderEmptySite() {
    const emptyGrid = document.createElement('h2')
    emptyGrid.textContent = 'No encontramos ningun producto';
    productGrid.replaceChildren(emptyGrid)
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

function renderPagination(pagination) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer || !pagination) return;

    const { currentPage, totalPages } = pagination;

    const fragment = document.createDocumentFragment();

    if (currentPage > 1) {
        const prev = createPaginationLink(currentPage - 1, '<');
        fragment.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = createPaginationLink(i, i, currentPage);
        if (i === currentPage) pageBtn.classList.add('active');
        fragment.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
        const next = createPaginationLink(currentPage + 1, '>');
        fragment.appendChild(next);
    }

    paginationContainer.replaceChildren(fragment);
}

function createPaginationLink(page, label, currentPage) {
    const link = document.createElement('a');
    link.className = 'page-item';

    if (page === currentPage) {
        link.textContent = label;
        link.classList.add('active');
        link.style.cursor = 'default';     // Cursor de "no clickeable"
    } else {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        link.href = `?${params.toString()}`;
        link.textContent = label;
    }

    return link;
}


function showCategoryContent() { // Location => tiene informacion de la URL actual // Search => info de los params de la url
    const params = new URLSearchParams(window.location.search) //URLSearchParams => obj con los params
    let selectedCategory = params.get('category'); // accessory / component / featured (all)
    let currentPage = parseInt(params.get('page')) || 1;
    
    showSpinner();

    fetchProducts(currentPage, selectedCategory).then(data => {
        let products = data.products;

        renderCards(products);
        renderPagination(data.pagination);
    }).catch(err => {
        console.error("Error al cargar productos", err);
        renderEmptySite();
    }).finally(() => {
        hideSpinner();
    })

    const fallbackCategory = selectedCategory || 'featured';

    categoryTitle.innerText = getMainTitle(selectedCategory);
    const selectedBtn = document.querySelector(`.categories-button[value=${fallbackCategory}]`)
    selectedBtn.classList.add('selected');
}

function processQuery() {
    clearTimeout(debounceTimeout); // Reinicia el temporizador

    debounceTimeout = setTimeout(() => {
        const query = searchBar.value.trim();
        executeSearch(query); //función de búsqueda
    }, 400); // Espera 400 ms desde la última tecla
}

function showSpinner() {
    document.getElementById("spinner").classList.remove("hidden");
}

function hideSpinner() {
    document.getElementById("spinner").classList.add("hidden");
}

function executeSearch(query) {
    fetchProducts().then(data => {
        let products = data.products;
        const filteredItems = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        renderCards(filteredItems);
    }).catch(err => {
        console.error("Error en la búsqueda", err);
        renderEmptySite();
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
// setLoader()