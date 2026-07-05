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
