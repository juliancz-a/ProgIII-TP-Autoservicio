////////////////// NAV BAR TOGGLE LIGHT/DARK MODE BTN /////////////

const toggleBtn = document.getElementById('toggle');
const body = document.querySelector('body');
const moonIcon = document.querySelector('.moon');
const sunIcon = document.querySelector('sunny')
const ball = document.querySelector('.ball');

toggleBtn.addEventListener('change', () => {
    updateColorSchema();

})

function updateColorSchema() {
    ball.classList.remove('no-transition')
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    localStorage.setItem('color-schema', body.className);
}

function setDefaultColorSchema() {
    const savedMode = localStorage.getItem('color-schema') || localStorage.setItem('color-schema', 'dark-mode');
    if (savedMode === 'light-mode') {
        ball.classList.add('no-transition') // evitar transicion al recargar pagina
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggleBtn.checked = false;
    }
}

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
    
    if(category != 'featured') {
        url.searchParams.set('category', category);
    }
    
    if (window.location.href !== url.toString()) { // Evitar recargas innecesarias
        window.location.href = url.toString();
    }
}

setDefaultColorSchema()
