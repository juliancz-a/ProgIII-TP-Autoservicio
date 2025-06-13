const editButton = document.getElementById('edit-product');
const toggleButtons = document.querySelectorAll('.toggle-product');

toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        
        fetch(`/products/toggle/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(() => location.reload());
    });
});