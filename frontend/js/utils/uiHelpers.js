// POP-UPS MANAGEMENT
const popupContainer = document.getElementById('popup-container')

function showPopup(body) {    
    if (body.type === 'error') {
       popupContainer.innerHTML = ''; // Evitar apilar popups
    }

    const popup = createPopup(body);
    popupContainer.prepend(popup)

    setTimeout(() => { // Remove popup after 3s
        popup.remove(); // Se remueve sola del contenedor
    }, 3000)
}

function createPopup(body) {

    const popup = document.createElement('div');
    popup.className = 'popup';    
    popup.style.backgroundColor = body.color;

    popup.innerHTML = `
        <p>${body.message}</p>
        <span class="material-symbols-outlined">${body.icon}</span>
    `;

    return popup;
}

// CHECKOUT MODAL MANAGEMENT
function activateModal(modal, cart, popupBody) {
    cart.length !== 0 ?  modal.classList.add('active') : showPopup(popupBody)
}

function redirectToMain() {
    window.location.href = './index.html';
}

function closeModal(modal, modalContent) {
    modalContent.classList.add('fade-out');
    setTimeout(() => {
        modal.classList.remove('active');
        modalContent.classList.remove('fade-out');
    }, 250);
}

function confirmPurchase() {
    setTimeout(() => {
        window.location.href = "./checkout.html";
    }, 500)
}

// LOADING SPINNER MANAGEMENT
// function setLoader() {
//     document.addEventListener('DOMContentLoaded', () => {
//         const loader = document.getElementById("loader");
        
//         window.addEventListener("load", () => {
//             loader.style.opacity = "0";
//             loader.style.pointerEvents = "none";
//             setTimeout(() => {
//                 loader.remove();
//             }, 300); 
//         });
//     });

// }

export {showPopup, closeModal, confirmPurchase, redirectToMain, activateModal}