const searchForm = document.getElementById('search-form');
const resetBtn = document.querySelector('.reset-btn');
const selectOrder = document.getElementById('order')

selectOrder.addEventListener('change', () => {
    // const params = new URLSearchParams(window.location.search);
    const url = new URL(window.location.href);
    if(selectOrder.value !== '') {
        url.searchParams.set('order', selectOrder.value);
    } else {
        url.searchParams.delete('order')
    }

    window.location.href = url;
    
})

searchForm.addEventListener('submit', (evn) => {
    evn.preventDefault();
    const data = new FormData(searchForm);

    let target = data.get('query')

    processQuery(target);
})

resetBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('target');
    url.searchParams.set('page', 1);
    window.location.href = url;
})

function processQuery(search) {    
    const target = search.trim();

    const params = new URLSearchParams(window.location.search);
    const username = params.get('username')
    const page = 1;
    
    const url = new URL(window.location.href);
    url.searchParams.set('username', username);
    url.searchParams.set('target', target);
    url.searchParams.set('page', page);
    
    
    if (target === '') {
        url.searchParams.delete('target')
    }

    window.history.pushState({}, '', url);

    window.location.href = url;
}
