/*==================================================
XGM WELLNESS
MAIN JAVASCRIPT
Version 1.1 (fixed scoping bug)
==================================================*/

// Called by include.js once header.html + footer.html have been
// injected into the page — NOT on raw DOMContentLoaded, because the
// header/footer elements (.nav-links, .cart-count, .back-to-top,
// .header etc.) don't exist in the DOM until that fetch resolves.
function XGM_init(){
    initializeNavigation();
    initializeMobileMenu();
    initializeStickyHeader();
    initializeSmoothScroll();
    initializeBackToTop();
    initializeAnimations();
    initializeNewsletter();
    initializeContactForm();
    updateCartCount();
}
window.XGM_init = XGM_init;

/*==================================================
NAVIGATION
==================================================*/
function initializeNavigation(){
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link=>{
        const href = link.getAttribute("href");
        if(href===currentPage){
            link.classList.add("active");
        }
    });
}

/*==================================================
MOBILE MENU
==================================================*/
function initializeMobileMenu(){
    const button=document.querySelector(".menu-toggle");
    const menu=document.querySelector(".nav-links");
    if(!button || !menu) return;
    button.addEventListener("click",()=>{
        menu.classList.toggle("show-menu");
    });
}

/*==================================================
STICKY HEADER
==================================================*/
function initializeStickyHeader(){
    const header=document.querySelector(".header");
    if(!header) return;
    window.addEventListener("scroll",()=>{
        if(window.scrollY>50){
            header.classList.add("header-scroll");
        }else{
            header.classList.remove("header-scroll");
        }
    });
}

/*==================================================
SMOOTH SCROLL
==================================================*/
function initializeSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener("click",function(e){
            const targetId = this.getAttribute("href");
            if(targetId.length <= 1) return; // ignore bare "#" links
            const target=document.querySelector(targetId);
            if(target){
                e.preventDefault();
                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
            }
        });
    });
}

/*==================================================
BACK TO TOP
==================================================*/
function initializeBackToTop(){
    const button=document.querySelector(".back-to-top");
    if(!button) return;
    window.addEventListener("scroll",()=>{
        if(window.scrollY>400){
            button.classList.add("show");
        }else{
            button.classList.remove("show");
        }
    });
    button.addEventListener("click",(e)=>{
        e.preventDefault();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}

/*==================================================
SCROLL REVEAL ANIMATION
==================================================*/
function initializeAnimations(){
    const elements=document.querySelectorAll(
        ".feature-card, .product-card, .category-card, .why-card, .testimonial-card"
    );
    if(elements.length===0) return;

    const observer=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0)";
            }
        });
    },{
        threshold:0.15
    });

    elements.forEach(element=>{
        element.style.opacity="0";
        element.style.transform="translateY(40px)";
        element.style.transition="all .6s ease";
        observer.observe(element);
    });
}

/*==================================================
NEWSLETTER
==================================================*/
function initializeNewsletter(){
    const form=document.querySelector(".newsletter-form");
    if(!form) return;
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const email=form.querySelector("input");
        if(!email.value.trim()){
            showToast("Please enter your email.","error");
            return;
        }
        showToast("Thank you for subscribing!","success");
        form.reset();
    });
}

/*==================================================
CONTACT FORM
==================================================*/
function initializeContactForm(){
    const form=document.querySelector(".contact-form");
    if(!form) return;
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const inputs=form.querySelectorAll("input, textarea");
        let valid=true;
        inputs.forEach(input=>{
            if(input.value.trim()===""){
                valid=false;
            }
        });
        if(!valid){
            showToast("Please complete all fields.","error");
            return;
        }
        showToast("Your message has been sent.","success");
        form.reset();
    });
}

/*==================================================
CART COUNT (reads from localStorage cart)
Every page calls this on load so the badge is
consistent site-wide, not just on cart.html
==================================================*/
function updateCartCount(){
    const countEl = document.querySelector(".cart-count");
    if(!countEl) return;
    try{
        const cart = JSON.parse(localStorage.getItem("xgm_cart") || "[]");
        const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        countEl.textContent = totalItems;
    }catch(e){
        countEl.textContent = "0";
    }
}

/*==================================================
TOAST NOTIFICATIONS
==================================================*/
function showToast(message,type="success"){
    const existing=document.querySelector(".toast");
    if(existing){
        existing.remove();
    }
    const toast=document.createElement("div");
    toast.className=`toast ${type}`;
    toast.innerHTML=message;
    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },100);

    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=> toast.remove(), 300);
    },3000);
}

/*==================================================
LOADING SCREEN
==================================================*/
window.addEventListener("load",()=>{
    const loader=document.querySelector(".loader");
    if(loader){
        loader.classList.add("loader-hidden");
        setTimeout(()=>{
            loader.remove();
        },500);
    }
});

/*==================================================
NUMBER COUNTER
==================================================*/
function animateCounters(){
    const counters=document.querySelectorAll("[data-counter]");
    if(counters.length===0) return;
    counters.forEach(counter=>{
        const target=parseInt(counter.dataset.counter);
        let current=0;
        const increment=Math.ceil(target/80);
        const timer=setInterval(()=>{
            current+=increment;
            if(current>=target){
                current=target;
                clearInterval(timer);
            }
            counter.textContent=current;
        },20);
    });
}
window.addEventListener("load",animateCounters);

/*==================================================
IMAGE LAZY LOADING
==================================================*/
document.querySelectorAll("img").forEach(image=>{
    image.loading="lazy";
});

/*==================================================
COPYRIGHT YEAR
==================================================*/
const year=document.getElementById("currentYear");
if(year){
    year.textContent=new Date().getFullYear();
}

/*==================================================
UTILITY FUNCTIONS
==================================================*/
function formatCurrency(price){
    return "R"+Number(price).toFixed(2);
}

function scrollTopPage(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

/*==================================================
CONSOLE
==================================================*/
console.log("====================================");
console.log("XGM Wellness Website");
console.log("Version 1.1");
console.log("Status : Running");
console.log("====================================");
