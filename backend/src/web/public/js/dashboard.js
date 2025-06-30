import { activateModal, closeModal, setupHamburguerMenu} from "./uiHelpers.js";

//Current Button Selected for toggling status
let currentToggleBtn;

//TOGGLE BUTTONS
const toggleButtons = document.querySelectorAll('.toggle-product');

//MODAL
const modalStructure = {
  contentHTML: `<p> ¿Deseas confirmar esta acción?</p>`,
  buttonsHTML: `<button class="btn-confirm">Confirmar</button>
                <button class="btn-cancel">Cancelar</button>`,
  onOpen
}

function onOpen() {
  const confirmBtn = document.querySelector('.btn-confirm')
  confirmBtn.addEventListener('click', confirm)

  const cancelBtn = document.querySelector('.btn-cancel');
  cancelBtn.addEventListener('click', closeModal)
}

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentToggleBtn = btn;
    activateModal(modalStructure)
  });
});

function confirm() {
  const id = currentToggleBtn.dataset.id; // producto id
  const enabledText = document.querySelector(`[data-id="${id}"]`);
  const enabled = currentToggleBtn.value !== "true";

  const cfg = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({enabled})
  };
  
  if (enabled) {
    enabledText.classList.add("status-active");
    enabledText.innerHTML = "Activo";
  } else {
    enabledText.classList.remove("status-active");
    enabledText.innerHTML = "Inactivo";
  }

  fetch(`/api/products/${id}`, cfg)
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


// Table products DOM
const createBtn = document.getElementById('new-product-btn')
const editButtons = document.querySelectorAll('.edit-product');

createBtn.addEventListener('click', () => {
  const currentUrl = new URL(window.location.href);
  const username = currentUrl.searchParams.get("username");
  window.location.href = `/dashboard/create?username=${username}`;
})


// Events
editButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const currentUrl = new URL(window.location.href);
    const username = currentUrl.searchParams.get("username");

    window.location.href = `/dashboard/edit/${productId}?username=${username}`;
  });
});

setupHamburguerMenu()