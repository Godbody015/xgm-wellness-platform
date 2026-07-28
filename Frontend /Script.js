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

}
