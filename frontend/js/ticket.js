import { getFullCart } from "./utils/cartManager.js";

getFullCart().then(cart => {
    renderTicket(cart)
})



// Obtener datos guardados
const name = localStorage.getItem("takeawayName");

document.getElementById("client-name").textContent = name;

const today = new Date().toLocaleDateString("es-AR", {
    day: '2-digit', month: '2-digit', year: 'numeric', hour : '2-digit', minute : '2-digit', hour12: false})

document.getElementById("purchase-date").textContent = today;

function getTotalAmount( price, quantity ) {
    return price * quantity;
}

// Mostrar productos

function renderTicket(cart) {
    const list = document.getElementById("product-list");
    cart.forEach(p => {
        const {id, title, price, img, quantity} = p;
    
        const li = document.createElement("li");
        li.innerHTML = `<span id="title">${title} × ${quantity}</span><span id="price">$${(getTotalAmount(price, quantity)).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>`;
        li.className = "product-item"
        list.appendChild(li);
    });

}

document.getElementById('exit-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = './login.html';
})

