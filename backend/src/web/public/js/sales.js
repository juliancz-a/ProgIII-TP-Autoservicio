import { activateModal, closeModal} from "./ui/modalManager.js";
import { setupHamburguerMenu } from "./ui/hamburguerMenu.js";

const detailsButtons = document.querySelectorAll('.view-details');

async function renderDetailTable(id) {

    const saleDetails = await getProductDetails(id)

    const detailsTable = document.createElement('table');
    
    detailsTable.innerHTML = `
    <thead class="table-head nested-table-head">
        <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
        </tr>
    </thead>
    <tbody class="table-body nested-table-body">
    </tbody>`
    detailsTable.classList = 'table nested-table'

    const fragment = createDetails(saleDetails);
    detailsTable.querySelector('tbody').appendChild(fragment);

    return detailsTable;
}

function createDetails(saleDetails) {
    const fragment = document.createDocumentFragment();

    saleDetails.forEach(saleDetail => {
        
        const {product_id, product_name, quantity, unit_price} = saleDetail
        const tr = document.createElement('tr')

        tr.innerHTML = 
            `<td data-label="ID producto">${product_id}</td>
            <td data-label="Nombre producto">${product_name}</td>
            <td data-label="Cantidad">${quantity}</td>
            <td data-label="Precio unitario">$${unit_price}</td>`
        
        fragment.appendChild(tr)
        
    })
    return fragment;
}

async function getProductDetails(id) {
    const res = await fetch(`/api/sales/${id}`);
    if (!res.ok) throw new Error('Error getting sales details');
    const sale = await res.json();
    return sale.sale_details;
}

detailsButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        const table = await renderDetailTable(btn.value)

        const modalStructure = {
            contentHTML: `<p>Detalles de la venta N°${btn.value}</p> ${table.outerHTML}`,
            buttonsHTML: `<button class="btn-cancel">Cerrar</button>`,
            onOpen : onOpen
        }

        activateModal(modalStructure)
        
    })
});

function onOpen() {
    const closeBtn = document.querySelector('.btn-cancel');
    closeBtn.addEventListener('click', closeModal)
}

setupHamburguerMenu()