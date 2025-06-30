//Modals
const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const modalBody = modal.querySelector('.modal-body');
const modalButtons = modal.querySelector('.modal-buttons')

export function activateModal({contentHTML = '', buttonsHTML = '', onOpen = null}) {
    modalBody.innerHTML = contentHTML
    modalButtons.innerHTML = buttonsHTML
    modalOverlay.classList.add('active');

    if(typeof onOpen === 'function') { //set eventListeners
        onOpen();
    }
}

export function closeModal() {
    modal.classList.add('fade-out');
    setTimeout(() => {
        modalOverlay.classList.remove('active');
        modal.classList.remove('fade-out');
        modalBody.innerHTML =  '';
        modalButtons.innerHTML = '';
    }, 250);
}

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
