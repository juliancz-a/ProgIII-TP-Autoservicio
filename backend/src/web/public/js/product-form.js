////////////////////////////////////////////////////////////////////////////////////////////////

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

productForm.addEventListener('submit', async(evn) => {
    evn.preventDefault();
    // validateEntries([evn.target[0], evn.target[1], evn.target[3], evn.target[4]])

    const formData = new FormData(productForm);
    formData.delete('image');

    try {
        // IMAGE UPLOADING PROCESS
        const file = fileInput.files[0];
        const imageForm = new FormData();
        imageForm.append('image', file);

        const imageResponse = await fetch('/images', {
            method: 'POST',
            body: imageForm
        });

        if (!imageResponse.ok) throw new Error('Error subiendo imagen');

        const imageData = await imageResponse.json();
        console.log(imageData);

        // FULL PRODUCT UPLOADING PROCESS
        formData.append('image_id', imageData.payload.id)

        const productRes = await fetch(productForm.action, {
            method: 'POST',
            body: formData
        });

        
        if (!productRes.ok) throw new Error('Error creando producto');

        const productData = await productRes.json();

        if (productData.action === 'created') {
            window.location.href =`/dashboard/edit/${productData.payload.id}${window.location.search}`
        } else {
            alert('Producto actualizado con éxito')
        }
        
    } catch(error) {
        console.error(error);
    }

})

function validateEntries (fields) {
    let uncompleteFields = '';

    fields.forEach(field => {
        console.log(field.value);
        
        if(!field.value) {
            uncompleteFields += `${field.name}\n`
        }
    })
    
    if (uncompleteFields != '') {
        alert(`Campos incompletos:\n${uncompleteFields}`)
    }
}