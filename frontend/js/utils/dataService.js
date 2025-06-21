export async function fetchProducts() {
    const response = await fetch('http://localhost:5000/products')
    const data = await response.json()
    
    return data
}

export async function createSale(data) {
    const dataJson =  JSON.stringify(data);

    const cfg = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : dataJson
    }
    await fetch('http://localhost:5000/sales', cfg)
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