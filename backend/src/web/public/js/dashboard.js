// Modal DOM
const modal = document.getElementById('modal-confirm')
const modalContent = modal.querySelector('.modal-content');
const confirmBtn = document.getElementById('btn-confirm');
const cancelBtn = document.getElementById('btn-cancel');
const createBtn = document.getElementById('new-product-btn')

// Table products DOM
let currentToggleBtn;
const toggleButtons = document.querySelectorAll('.toggle-product');
const enabledText = document.querySelectorAll('.status-active, .status-inactive')
const editButtons = document.querySelectorAll('.edit-product');

createBtn.addEventListener('click', () => {
  const currentUrl = new URL(window.location.href);
  const username = currentUrl.searchParams.get("username");

  window.location.href = `/dashboard/create?username=${username}`;
})

// Modal functions
function activateModal() {
  modal.classList.add('active');
  renderModalContent();
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
  const enabled = currentToggleBtn.value !== "true";
  const enabledText = document.querySelector(`[data-id="${id}"]`);
  
  const cfg = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled
    })
  };
  
  if (enabled) {
    enabledText.classList.add("status-active");
    enabledText.innerHTML = "Activo";
  } else {
    enabledText.classList.remove("status-active");
    enabledText.innerHTML = "Inactivo";
  }

  fetch(`/products/${id}`, cfg)
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar el estado");
      
      currentToggleBtn.value = String(enabled); // mantenerlo como string "true"/"false"
      closeModal();
    })
    .catch(err => {
      console.error(err);
      alert("Error al actualizar el producto.");
    });
}

// Events
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentToggleBtn = btn;
    activateModal()
  });
});

editButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const currentUrl = new URL(window.location.href);
    const username = currentUrl.searchParams.get("username");

    window.location.href = `/dashboard/edit/${productId}?username=${username}`;
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
