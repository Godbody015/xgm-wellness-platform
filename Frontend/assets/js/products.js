/*==================================================
XGM WELLNESS
PRODUCTS — fetches from Supabase `products` table
ASSUMED COLUMN NAMES (confirm/adjust once schema is shared):
  id, name, slug, description, price, image_url, category, badge, stock
If your real column names differ, only the small "row.X"
references below need renaming — the render logic stays
the same.
==================================================*/
async function fetchProducts({ limit = null, category = null } = {}){
    let query = supabaseClient.from("products").select("*").order("created_at", { ascending: false });
    if(category){
        query = query.eq("category", category);
    }
    if(limit){
        query = query.limit(limit);
    }
    const { data, error } = await query;
    if(error){
        console.error("XGM: failed to fetch products", error);
        return [];
    }
    return data || [];
}
function renderProductCard(product){
    const badge = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : "";
    return `
        <article class="product-card">
            ${badge}
            <img src="${product.image_url}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description ? product.description.slice(0, 90) : ""}</p>
                <div class="product-bottom">
                    <span class="price">${formatCurrency(product.price)}</span>
                    <a href="product.html?id=${product.id}" class="product-btn">View Product</a>
                </div>
            </div>
        </article>
    `;
}
async function loadFeaturedProducts(){
    const container = document.getElementById("featured-products");
    if(!container) return;
    const products = await fetchProducts({ limit: 4 });
    if(products.length === 0){
        container.innerHTML = `<p class="products-empty">No products available yet.</p>`;
        return;
    }
    container.innerHTML = products.map(renderProductCard).join("");
}
async function loadAllProducts(){
    const container = document.getElementById("products-grid");
    if(!container) return;
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const products = await fetchProducts({ category });
    if(products.length === 0){
        container.innerHTML = `<p class="products-empty">No products found${category ? ` in ${category}` : ""}.</p>`;
        return;
    }
    container.innerHTML = products.map(renderProductCard).join("");
}
document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedProducts();
    loadAllProducts();
});
