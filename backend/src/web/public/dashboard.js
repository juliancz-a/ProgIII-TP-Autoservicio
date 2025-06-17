const toggleButtons = document.querySelectorAll('.toggle-product');
const enabledText = document.querySelectorAll('.status-active, .status-inactive')


toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const enabled = btn.value == 0 ? 1 : 0;
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
    });
});

const hamburgerBtn = document.getElementById('hamburger');
const navBtns = document.getElementById('nav-buttons')
const sidebar = document.querySelector('.sidebar');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active') 
    navBtns.classList.toggle('active')
    sidebar.classList.toggle('active')
})
