////////////////////////////////////////////////////////////////////////////////////////////////
import { setupHamburguerMenu } from "./ui/hamburguerMenu.js";
import productValidator from "./productValidator.js";

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
    });
});

fileInput.addEventListener('change', () => {
    setFile(fileInput.files)
});

dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    setFile(files)
});

function setFile(files) {
    if (files.length && isValidFile(files[0])) {
        fileInput.files = files;
        previewImage.src = URL.createObjectURL(files[0])
    } else {
        fileInput.value = '';
        previewImage.src = 'https://placehold.co/600x400?text=Sin+imagen'
}}

function isValidFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if(!allowedTypes.includes(file.type)) {
        alert("Archivo inválido")
        return false
    }

    if(file.size > maxSize) {
        alert("Peso mayor a 5MB, intente con otro archivo")
        return false;
    }
    
    return true;
}

//////////////////////////////////////DINAMIC PREVIEW////////////////////////////////////////////////////

//Input fields
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');
const statusRadios = document.querySelectorAll('input[name="enabled"]'); //radios
const priceInput = document.getElementById('price');

//Preview fields
const previewTitle = document.getElementById('preview-title');
const previewDescription = document.getElementById('preview-description');
const previewCategory = document.getElementById('preview-category');
const previewPrice = document.getElementById('preview-price');
const previewStatus = document.getElementById('preview-status');
const previewImage = document.getElementById('preview-image');

// Título 
titleInput.addEventListener('input', () => {
    previewTitle.textContent = titleInput.value || 'Sin título';
});

// Descripción
descriptionInput.addEventListener('input', () => {
    previewDescription.textContent = descriptionInput.value || 'Sin descripción';
});

  // Categoría
categorySelect.addEventListener('change', () => {
    const selected = categorySelect.options[categorySelect.selectedIndex].text;
    previewCategory.textContent = selected || 'Sin categoría';
});

// Precio
priceInput.addEventListener('input', (e) => {
    let value = priceInput.value;
    
    // Remover todo excepto números y punto [REGEX] (y mostrar solo esto en el input)
    value = value.replace(/[^0-9.]/g, '');
    priceInput.value = value
    
    // Permitir solo un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Mostrar en el preview
    const number = parseFloat(value);
    previewPrice.textContent = `$${!isNaN(number) ? number.toFixed(2) : '0.00'}`;
});

// Status
statusRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const isActive = document.querySelector('input[name="enabled"]:checked').value === 'true';
        previewStatus.textContent = isActive ? 'Activo' : 'Inactivo';
        previewStatus.className = `preview-item status ${isActive ? 'status-active' : 'status-inactive'}`;
    });
});


const productForm = document.getElementById('product-form');
const imageName = document.getElementById('existingImageName') // previous image name prod
const imageUrl = document.getElementById('existingImageUrl') //previous image url prod
const imageId = document.getElementById('existingImageId') //previous image id prod
const buttonSave = document.getElementById('save')

let method;
let url;

productForm.addEventListener('submit', async(evn) => {
    evn.preventDefault();
        
    const formData = new FormData(productForm);
    const file = fileInput.files[0];

    if(!imageId.value) {
        if (!file || !isValidFile(file)) {
            alert("Por favor, seleccione una imagen válida.");
            return;
        }
        method = 'POST'
        url = '/api/products/'
    } else {
        formData.append('imageId', imageId.value)
        formData.append("existingImageFile", JSON.stringify({name : imageName.value, url : imageUrl.value}));
        method = 'PUT'
        url = `/api/products/${buttonSave.dataset.id}`
    }    

    try {
        productValidator.validateProduct({title: evn.target[0].value, description: evn.target[1].value, category: evn.target[2].value, price: evn.target[3].value})
        const res = await fetch(url, {
            method : method,
            body : formData
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        const productId = data.payload.id;

        alert('Producto guardado')
        window.location.href = `/dashboard/edit/${productId}${window.location.search}`;
        
    } catch(error) {
        alert(error.message)
        console.error(`${error.name} - ${error.message}`);
    }
})

setupHamburguerMenu()