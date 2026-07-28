/*==========================================
XGM WELLNESS
Main JavaScript
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeMenu();

    initializeStickyHeader();

    initializeActiveLinks();

    initializeBackToTop();

    initializeNewsletter();

    initializeRevealAnimation();

});

/*==========================================
MOBILE MENU
==========================================*/

function initializeMenu() {

    const menuButton = document.querySelector(".menu-toggle");

    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show-menu");

    });

}

/*==========================================
STICKY HEADER
==========================================*/

function initializeStickyHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("header-scroll");

        } else {

            header.classList.remove("header-scroll");

        }

    });

}

/*==========================================
ACTIVE NAVIGATION
==========================================*/

function initializeActiveLinks() {

    const currentPage = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage || (currentPage === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

}

/*==========================================
BACK TO TOP BUTTON
==========================================*/

function initializeBackToTop() {

    const button = document.querySelector(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
