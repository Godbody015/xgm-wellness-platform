/*==================================================
XGM WELLNESS
CART — localStorage-based

Cart shape: [{ id, name, price, image_url, qty }, ...]
Stored under the key "xgm_cart".

Note: this is fine for a straightforward store. If you
later want carts to persist across devices for logged-in
users, this same shape can be written to a Supabase
`cart_items` table keyed by user id instead.
==================================================*/

function getCart(){
    try{
        return JSON.parse(localStorage.getItem("xgm_cart") || "[]");
    }catch(e){
        return [];
    }
}

function saveCart(cart){
    localStorage.setItem("xgm_cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product, qty = 1){
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if(existing){
        existing.qty += qty;
    }else{
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            qty
        });
    }

    saveCart(cart);
    if(typeof showToast === "function"){
        showToast(`${product.name} added to cart`, "success");
    }
}

function removeFromCart(productId){
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartItemQty(productId, qty){
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if(!item) return;
    item.qty = Math.max(1, qty);
    saveCart(cart);
}

function getCartTotal(){
    return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function clearCart(){
    localStorage.removeItem("xgm_cart");
    updateCartCount();
}

/*==================================================
CART PAGE RENDERING
Only runs if #cart-items exists on the current page
==================================================*/
function renderCartPage(){
    const container = document.getElementById("cart-items");
    if(!container) return;

    const cart = getCart();

    if(cart.length === 0){
        container.innerHTML = `<p class="cart-empty">Your cart is empty. <a href="products.html">Continue shopping</a>.</p>`;
        updateCartTotals();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-row" data-id="${item.id}">
            <img src="${item.image_url}" alt="${item.name}">
            <div class="cart-row-info">
                <h3>${item.name}</h3>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>
            <div class="cart-row-qty">
                <button class="qty-decrease" data-id="${item.id}">-</button>
                <span>${item.qty}</span>
                <button class="qty-increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-row-subtotal">${formatCurrency(item.price * item.qty)}</div>
            <button class="cart-row-remove" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join("");

    updateCartTotals();

    container.querySelectorAll(".qty-increase").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const item = getCart().find(i => i.id === btn.dataset.id);
            if(item) updateCartItemQty(btn.dataset.id, item.qty + 1);
            renderCartPage();
        });
    });
    container.querySelectorAll(".qty-decrease").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const item = getCart().find(i => i.id === btn.dataset.id);
            if(item) updateCartItemQty(btn.dataset.id, item.qty - 1);
            renderCartPage();
        });
    });
    container.querySelectorAll(".cart-row-remove").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            removeFromCart(btn.dataset.id);
            renderCartPage();
        });
    });
}

function updateCartTotals(){
    const totalEl = document.getElementById("cart-total");
    if(totalEl){
        totalEl.textContent = formatCurrency(getCartTotal());
    }
}

document.addEventListener("DOMContentLoaded", renderCartPage);
