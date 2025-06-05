const categoriesBtns = document.getElementsByClassName('categories-button')

////////////////// NAV BAR HAMBURGUER BUTTON  => //////////////////
const hamburguerBtn = document.getElementById('hamburger');
const navContent = document.getElementById('nav-content')

hamburguerBtn.addEventListener('click', () => {
    hamburguerBtn.classList.toggle('active') //cambiar clase de los elementos mobile a active
    navContent.classList.toggle('active')
})



////////////////// NAV BAR CATEGORIES BUTTONS => //////////////////

//setear evento
for (const btn of categoriesBtns) {
    btn.addEventListener('click', () => {
        hamburguerBtn.classList.remove('active')
        navContent.classList.remove('active')

        redirectToCategory(btn.value)
        
    })
}

//establecer direccion url a dirigir - establecer parametro en la URL con la categoria
function redirectToCategory(category) {
    
    const url = new URL('/', window.location.origin);
    console.log(window.location.origin);
    
    if(category != 'featured') {
        url.searchParams.set('category', category);
    }
    
    if (window.location.href !== url.toString()) { // Evitar recargas innecesarias
        window.location.href = url.toString();
    }
}

////////////// NAV BAR CART BUTTON MANAGEMENT => //////////////////

const cartBtn = document.getElementById('cart-button');
const quantityInfo = document.createElement('span');
cartBtn.appendChild(quantityInfo);

const tabTitle = document.getElementById('tab-title')

function updateCartBtn() {

    if (cart.length > 0){
        quantityInfo.style.display = "inline"
        quantityInfo.className = 'quantity'
        tabTitle.textContent = `(${cart.length}) NeonBits`
    } else {
        tabTitle.textContent = `NeonBits`
            quantityInfo.style.display = "none"

    }

    quantityInfo.textContent = cart.length;

}

updateCartBtn()
