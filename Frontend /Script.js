/* =====================================
   XGM WELLNESS PLATFORM
   Version 1.0
   Author: Everyday Plug
===================================== */

console.log("XGM Wellness Platform Loaded Successfully");

/* Smooth scroll for navigation */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

});

/* Welcome */

window.addEventListener("load",()=>{

    console.log("Welcome to XGM Wellness");

});
const buttons = document.querySelectorAll(".shop-btn,.reseller-btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="scale(1.05)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="scale(1)";

});

});
const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.boxShadow="0 20px 40px rgba(0,0,0,.25)";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="0 5px 15px rgba(0,0,0,.1)";

});

});
window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>80){

header.style.boxShadow="0 5px 20px rgba(0,0,0,.25)";

}

else{

header.style.boxShadow="none";

}

});
