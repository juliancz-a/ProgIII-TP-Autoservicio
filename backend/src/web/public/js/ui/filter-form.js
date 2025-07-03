const filterForm = document.getElementById('filter-form');

filterForm.addEventListener('submit', async (evn) => {
    evn.preventDefault()

    const params = new URLSearchParams(window.location.search);
    const data = new FormData(filterForm);

    for (const [key, value] of data.entries()) {
        if (value !== '') {
            params.set(key, value); 
        } else {
            params.delete(key)
        }
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.location.href = newUrl;
})