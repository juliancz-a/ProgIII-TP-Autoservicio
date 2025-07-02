const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', (evn) => {
    evn.preventDefault();
    const data = new FormData(searchForm);
    
    
    processQuery(data.get('query'));
})

function processQuery(search) {
    console.log(search);
    
    const target = search.trim();

    if (target === '') return;

    const params = new URLSearchParams(window.location.search);
    const username = params.get('username')
    const page = 1;

    const url = new URL(window.location.href);
    url.searchParams.set('username', username);
    url.searchParams.set('target', target);
    url.searchParams.set('page', page);

    window.history.pushState({}, '', url);

    window.location.href = url;
}