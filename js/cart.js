function renderProduct( product ) {
    const {title, description, category, price, img} = product;

    const product = document.createElement('div');
    product.className = 'product';

    product.innerHTML = `<div class="product-content">
                            <div class="product-image">
                                <img src="${img}" alt="${title}">
                            </div>
                            <div class="product-details">
                                <p class="product-title">${title}</p>
                            </div>
                            <div class="product-quantity">
                                <div class="quantity-wrapper">
                                    <button class="quantity-btn">−</button>
                                    <input type="number" class="quantity-input" value="1" min="1" />
                                    <button class="quantity-btn">+</button>
                                </div>
                            </div>
                            <div class="product-price">
                                <div class="final-price">
                                    <h5>${price}</h5>
                                </div>
                            </div>
                        </div>`
}