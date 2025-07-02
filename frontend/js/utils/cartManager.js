import {getCart, saveCart, getUser, fetchCartProducts} from "./dataService.js";

let cart = getCart();

export function getCurrentCart() {
    return cart;
}

export async function getFullCart() {
    const ids = cart.map(item => item.id)    
    const productsDb = await fetchCartProducts(ids)    
    
    const fullCart = cart.map(cartItem => {
        const productData = productsDb.find(p => p.id === cartItem.id);
        return  {
            ...productData,
            quantity: cartItem.quantity
        }
    })
    return fullCart;
}

export async function getSaleBody() {
    const cart = await getFullCart();
    return {
        client_name : getUser(),
        total : cart.reduce((acc, p) => acc + p.price * p.quantity, 0),
        products : cart.map(p => {
            return {
                id : p.id,
                title : p.title,
                unit_price : p.price,
                quantity : p.quantity
            }
        })
    }
}

//revisar logica addtocart y updateproductquantity
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

export function getTotalPrice(cart) {
    
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const [integer, decimals] = total.toLocaleString("es-AR", {
        minimumFractionDigits: 2
    }).split(',');

    return {integer , decimals}
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

export function updateCartBtn(cart, quantityIcon) {
    const tabTitle = document.getElementById('tab-title')
    
    if (cart.length > 0){
        quantityIcon.style.display = "inline"
        quantityIcon.className = 'quantity'
        tabTitle.textContent = `(${cart.length}) NeonBits`
    } else {
        tabTitle.textContent = `NeonBits`
            quantityIcon.style.display = "none"
    }

    quantityIcon.textContent = cart.length;
}