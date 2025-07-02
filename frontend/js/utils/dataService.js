const API_URL = 'https://neonbits.up.railway.app/api'

export async function fetchProducts(page = 1, category = null) {
    const params = new URLSearchParams();
    params.append('page', page);
    
    if (category) params.append('category', category);

    const response = await fetch(`${API_URL}/products/enabled?${params.toString()}`);
    const data = await response.json();
    console.log(data);
    
    
    return data;
}

export async function fetchCartProducts(ids) {
    const cfg = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ids : ids})
    }

    const response = await fetch(`${API_URL}/products/cart`, cfg);
    const data = await response.json();

    return data;
}

export async function createSale(data) {
    const cfg = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
    }
    await fetch(`${API_URL}/sales`, cfg)
}

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart);
}

export function getUser() {
    return localStorage.getItem('takeawayName');
}

export function getCurrentDate() {
    return new Date().toLocaleDateString("es-AR", {
    day: '2-digit', month: '2-digit', year: 'numeric', hour : '2-digit', minute : '2-digit', hour12: false})
}

export function restartService() {
    localStorage.clear();
    window.location.href = './login.html';
}