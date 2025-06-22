const detailsButtons = document.querySelectorAll('.view-details');


detailsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const detailsTable = document.querySelector(`[data-id="${btn.value}"]`)
        
        detailsTable.classList.toggle('active')
    })
});

