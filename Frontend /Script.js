/*==================================================
XGM WELLNESS
MAIN JAVASCRIPT
Version 1.0
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeMobileMenu();

    initializeStickyHeader();

    initializeSmoothScroll();

    initializeBackToTop();

    initializeAnimations();

    initializeNewsletter();

    initializeContactForm();

});

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

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    });
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

    setTimeout
