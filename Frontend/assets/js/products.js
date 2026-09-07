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
function initFilterTabs(){
    const tabs = document.querySelectorAll(".filter-tab");
    if(tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", async () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const category = tab.dataset.category;
            const container = document.getElementById("products-grid");
            if(!container) return;

            const products = category === "all"
                ? await fetchProducts({})
                : await fetchProducts({ category });

            if(products.length === 0){
                container.innerHTML = `<p class="products-empty">No products found${category !== "all" ? ` in ${category}` : ""}.</p>`;
                return;
            }
            container.innerHTML = products.map(renderProductCard).join("");
        });
    });
}
async function loadProductDetail(){
    const container = document.getElementById("product-detail");
    if(!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if(!id){
        container.innerHTML = `<p class="products-empty">No product specified.</p>`;
        return;
    }

    const { data: product, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if(error || !product){
        console.error("XGM: failed to fetch product", error);
        container.innerHTML = `<p class="products-empty">Sorry, we couldn't find that product.</p>`;
        return;
    }

    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image_url}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <span class="price">${formatCurrency(product.price)}</span>

            <div class="product-detail-description">
                <p>${product.description || ""}</p>
            </div>

            <div class="product-detail-block">
                <h3>Ingredients</h3>
                <p>${product.ingredients || "Ingredients information coming soon."}</p>
            </div>

            <div class="product-detail-block">
                <h3>Directions for Use</h3>
                <p>${product.directions || "Directions for use coming soon."}</p>
            </div>
        </div>
    `;
}
document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedProducts();
    loadAllProducts();
    initFilterTabs();
    loadProductDetail();
});
