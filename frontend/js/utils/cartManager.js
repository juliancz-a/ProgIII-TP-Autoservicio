import { fetchProducts, getCart, saveCart } from "./dataService.js";

let cart = getCart();

export function getCurrentCart() {
    return cart;
}

export async function getFullCart() {
    const productsDb = await fetchProducts()
    
    const fullCart = getCart().map(cartItem => {
        const productData = productsDb.find(p => p.id === cartItem.id);
        return  {
            ...productData,
            quantity: cartItem.quantity
        }
    })
    return fullCart;
}

export function addToCart(product) {
    
    let productInCart = isInCart(product);

    if(productInCart) {
        productInCart.quantity++;
        const index = cart.findIndex(p => p.id === product.id);
        cart[index].quantity = productInCart.quantity;

    } else {
        cart.push({id : product.id,
                    quantity : 1});
    }

    saveCart(cart);
}

export function removeFromCart(product) {
    
    cart = cart.filter((p) => {
        return p.id !== product.id
    })
    
    saveCart(cart);
}

export function updateProductQuantity(productId, newQty) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = newQty;
    }
    saveCart(cart);
}

export function isInCart(product) {
    return cart.find(p => p.id === product.id);
}

const cartBtn = document.getElementById('cart-button');
const quantityInfo = document.createElement('span');
cartBtn.appendChild(quantityInfo);

const tabTitle = document.getElementById('tab-title')

export function updateCartBtn(cart) {
    
    if (cart.length > 0){
        quantityInfo.style.display = "inline"
        quantityInfo.className = 'quantity'
        tabTitle.textContent = `(${cart.length}) NeonBits`
    } else {
        tabTitle.textContent = `NeonBits`
            quantityInfo.style.display = "none"
    }

    quantityInfo.textContent = cart.length;
}