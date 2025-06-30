// Hamburguer Menu
const hamburgerBtn = document.getElementById('hamburger');
const navBtns = document.getElementById('nav-buttons')
const sidebar = document.querySelector('.sidebar');
const body = document.querySelector('body');

export function setupHamburguerMenu() {
    hamburgerBtn.addEventListener('click', () => {
    
        body.classList.toggle('no-scroll')
        hamburgerBtn.classList.toggle('active') 
        navBtns.classList.toggle('active')
        sidebar.classList.toggle('active')
})
}