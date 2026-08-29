/*==================================================
XGM WELLNESS
PARTIALS LOADER

Every page includes a <div id="site-header"></div> and
<div id="site-footer"></div>. This script fetches
partials/header.html and partials/footer.html and injects
them, then calls XGM_init() (defined in script.js) once
both are in place — so nav/cart/back-to-top all work
correctly on every page, not just index.html.
==================================================*/

async function loadPartial(elementId, path){
    const target = document.getElementById(elementId);
    if(!target) return;
    try{
        const response = await fetch(path);
        if(!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
        const html = await response.text();
        target.innerHTML = html;
    }catch(err){
        console.error("XGM partial load error:", err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadPartial("site-header", "partials/header.html"),
        loadPartial("site-footer", "partials/footer.html")
    ]);

    // Mark the current page's nav link active, wire up cart/menu/etc.
    if(typeof XGM_init === "function"){
        XGM_init();
    }

    // Let page-specific scripts (products.js, cart.js, auth.js) know
    // the shared header/footer are ready, in case they need cart-count
    // or nav elements too.
    document.dispatchEvent(new CustomEvent("xgm:partialsLoaded"));
});
