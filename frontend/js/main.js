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
    emptyGrid.className = 'empty-products';
    productGrid.replaceChildren(emptyGrid);
}

function createCardStructure(product) {    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const [intPart] = product.price.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).split(",");

    let image;
    if (product.images && product.images.length > 0) {
        image = product.images[0].url;
    } else {
        image = 'https://placehold.co/600x400?text=Sin+imagen';
    }

    cardDiv.innerHTML = `
            <div class="card-content">
                <div class="card-image">
                    <img draggable="false" src="${image}" alt="${product.title}">
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

function renderPagination(pagination, category, target) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer || !pagination) return;

    const { currentPage, totalPages } = pagination;

    const fragment = document.createDocumentFragment();

    if (currentPage > 1) {
        const prev = createPaginationLink(currentPage - 1, '<', category, target);
        fragment.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = createPaginationLink(i, i, category, target, currentPage);
        fragment.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
        const next = createPaginationLink(currentPage + 1, '>', category, target);
        fragment.appendChild(next);
    }

    paginationContainer.replaceChildren(fragment);
}

function createPaginationLink(page, label, category, target, currentPage) {
    const link = document.createElement('a');
    link.className = 'page-item';

    if (page === currentPage) {
        link.textContent = label;
        link.classList.add('active');
        link.style.cursor = 'default';     // Cursor de "no clickeable"
    } else {
        const params = new URLSearchParams();

        params.set('page', page);
        if (category) params.set('category', category);
        if (target) params.set('target', target);

        link.href = `?${params.toString()}`;
        link.textContent = label;
    }

    return link;
}


function showCategoryContent() { 
    const params = new URLSearchParams(window.location.search)
    let category = params.get('category');
    const target = params.get('target') || null;
    let page = parseInt(params.get('page')) || 1;
    
    showSpinner();

    fetchProducts({page, category, target}).then(data => {
        renderCards(data.products);
        renderPagination(data.pagination, category, target)
    })
    .catch(err => {
        console.error("Error al cargar productos", err);
        renderEmptySite();
    })
    .finally(() => {
        hideSpinner();
    })

    const fallbackCategory = selectedCategory || 'featured';

    categoryTitle.innerText = getMainTitle(selectedCategory);
    const selectedBtn = document.querySelector(`.categories-button[value=${fallbackCategory}]`)
    if (selectedBtn) selectedBtn.classList.add('selected');
}

function processQuery() {
    clearTimeout(debounceTimeout); // Reinicia el temporizador

    debounceTimeout = setTimeout(() => {
        const target = searchBar.value.trim();
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category') || null;
        const page = 1;

        const url = new URL(window.location.href);
        url.searchParams.set('target', target);
        url.searchParams.set('page', page);
        if (category) url.searchParams.set('category', category);
        else url.searchParams.delete('category');

        window.history.pushState({}, '', url);
        executeSearch(page, target, category);
    }, 400);
}

function showSpinner() {
    document.getElementById("spinner")?.classList.remove("hidden");
}

function hideSpinner() {
    document.getElementById("spinner")?.classList.add("hidden");
}

function executeSearch(page, target, category) {
    showSpinner();

    fetchProducts({page, category, target}).then(data => {
        renderCards(data.products);
        renderPagination(data.pagination, category, target);
    })
    .catch(err => {
        console.error("Error en la búsqueda", err);
        renderEmptySite();
    })
    .finally(() => {
        hideSpinner();
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