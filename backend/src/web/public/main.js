const autocompleteBtn = document.querySelector('.autocomplete-button');
const username = document.getElementById('username');
const password = document.getElementById('password');

autocompleteBtn.addEventListener('click', () => {
    username.value = 'mase';
    password.value = 'barcelav1uk';
})

