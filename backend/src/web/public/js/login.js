const loginForm = document.querySelector('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const autocompleteBtn = document.querySelector('.autocomplete-button')

autocompleteBtn.addEventListener('click', () => {
    username.value = 'admin';
    password.value = 'admin';
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const credentials = {
        username: formData.get('username'),
        password: formData.get('password'),
    };

    try {
        const res = await fetch('/login', {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(credentials) });

        const data = await res.json();
        
        if (!res.ok) {
            alert(data.message);
            return;
        }

        window.location.href = data.redirect;

    } catch (err) {
        console.log(err);
        
        alert("Error de red");
        console.error(err);
    }
});

