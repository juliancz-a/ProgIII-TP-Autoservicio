export async function fetchProducts() {
    const response = await fetch('http://localhost:5000/')
    const data = await response.json()
    
    return data
}

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    
    const jsonCart = JSON.stringify(cart)
    localStorage.setItem('cart', jsonCart);
}