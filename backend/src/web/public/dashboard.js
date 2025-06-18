// Modal DOM
const modal = document.getElementById('modal-confirm')
const modalContent = modal.querySelector('.modal-content');
const confirmBtn = document.getElementById('btn-confirm');
const cancelBtn = document.getElementById('btn-cancel');

// Table products DOM
let currentToggleBtn;
const toggleButtons = document.querySelectorAll('.toggle-product');
const enabledText = document.querySelectorAll('.status-active, .status-inactive')

// Modal functions
function activateModal() {
    modal.classList.add('active');
    renderModalContent()
}

function renderModalContent() {
  const p = document.createElement('p');
  p.innerHTML = (currentToggleBtn.value == 0) ? '¿Deseas activar este producto?' : '¿Deseas desactivar este producto?'
  modalContent.prepend(p);
}

function closeModal() {
    modalContent.classList.add('fade-out');
    setTimeout(() => {
      modal.classList.remove('active');
      modalContent.classList.remove('fade-out');
      const p = modalContent.querySelector('p');
      if (p) {
        modalContent.removeChild(p)
      }
    }, 250);
}

function confirm() {
    const id = currentToggleBtn.dataset.id; // producto id
    const enabled = currentToggleBtn.value == 0 ? 1 : 0; // status
    const enabledText = document.querySelector(`[data-id="${id}"]`);
    
    const cfg = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enabled : enabled
      }),
    };
    
    enabledText.classList.toggle('status-active')

    if (enabledText.className === 'status') {
        enabledText.innerHTML = 'Inactivo'
    } else {
        enabledText.innerHTML = 'Activo'
    }
    
    fetch(`https://neonbits.up.railway.app/products/${id}`, cfg)
    closeModal()
}

// Events
toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentToggleBtn = btn;
      activateModal()
    });
});
  
confirmBtn.addEventListener('click', confirm);
cancelBtn.addEventListener('click', closeModal);


// Hamburguer
const hamburgerBtn = document.getElementById('hamburger');
const navBtns = document.getElementById('nav-buttons')
const sidebar = document.querySelector('.sidebar');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active') 
    navBtns.classList.toggle('active')
    sidebar.classList.toggle('active')
})
