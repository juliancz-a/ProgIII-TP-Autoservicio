import { getFullCart , getTotalPrice} from "./utils/cartManager.js";
import { getUser, getCurrentDate, restartService } from "./utils/dataService.js";
import { setLoader } from "./utils/uiHelpers.js";

getFullCart().then(cart => {
    renderTicket(cart)
})

setLoader()

// DOM Elements 
const clientName = document.getElementById("client-name");
const purchaseDate = document.getElementById("purchase-date");
const exitBtn = document.getElementById('exit-btn');
const tableContent = document.querySelector('.table-content')
const tableFooterItem = document.querySelector('.footer-item')
const logoBtn = document.getElementById('logo')

// Mapping data to DOM Elements
clientName.textContent = getUser();
purchaseDate.textContent = getCurrentDate();

// Ticket Functions //
function getTotalAmount( price, quantity ) {
    return price * quantity;
}

function renderTicket(cart) {

    const {integer , decimals} = getTotalPrice(cart)
    
    cart.forEach(p => {
        const {id, title, price, img, quantity} = p;
    
        const tr = document.createElement("tr");
        tr.innerHTML = 
            `<td class="title">${title} </td>
            <td class="quantity">${quantity}</td>
            <td class="price">$${(getTotalAmount(price, quantity)).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</td>`;
        tr.className = "product-item"
        tableContent.appendChild(tr);
    });

    const td = document.createElement('td');
    td.innerHTML = `$<span>${integer},${decimals}</span>`
    tableFooterItem.appendChild(td)
}

//Ticket Events //
exitBtn.addEventListener('click', restartService);
logoBtn.addEventListener('click', restartService);

