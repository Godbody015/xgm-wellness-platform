/*==================================================
XGM WELLNESS
ANIMATIONS — scroll reveals, counters, carousel

Reusable across any page. Add these classes in HTML:
  .reveal-fade   → fades + slides up into view
  .reveal-left   → slides in from the left
  .reveal-right  → slides in from the right
  .reveal-stagger on a parent → its direct children pop in
                   one after another (icons, cards)
  [data-counter] → animated count-up, fires once
==================================================*/

function initScrollReveal(){
    const revealSelectors = ".reveal-fade, .reveal-left, .reveal-right, .reveal-stagger";
    const elements = document.querySelectorAll(revealSelectors);
    if(elements.length === 0) return;

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    },{ threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

function initCounters(){
    const counters = document.querySelectorAll("[data-counter]");
    if(counters.length === 0) return;

    const animate = (el) => {
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || "";
        const duration = 1600;
        const start = performance.now();

        function tick(now){
            const progress = Math.min((now - start) / duration, 1);
            // ease-out for a natural deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value.toLocaleString() + suffix;
            if(progress < 1){
                requestAnimationFrame(tick);
            }else{
                el.textContent = target.toLocaleString() + suffix;
            }
        }
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },{ threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}

/*==================================================
TESTIMONIAL CAROUSEL
Expects markup:
  <div class="carousel" data-autoplay="6000">
    <div class="carousel-track">
      <div class="carousel-slide">...</div>
      <div class="carousel-slide">...</div>
    </div>
    <div class="carousel-dots"></div>
    <button class="carousel-prev">‹</button>
    <button class="carousel-next">›</button>
  </div>
==================================================*/
function initCarousels(){
    document.querySelectorAll(".carousel").forEach(carousel=>{
        const track = carousel.querySelector(".carousel-track");
        const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
        const dotsContainer = carousel.querySelector(".carousel-dots");
        const prevBtn = carousel.querySelector(".carousel-prev");
        const nextBtn = carousel.querySelector(".carousel-next");
        if(!track || slides.length === 0) return;

        let current = 0;
        const autoplayDelay = parseInt(carousel.dataset.autoplay) || 6000;
        let autoplayTimer = null;

        // build dots
        if(dotsContainer){
            dotsContainer.innerHTML = slides.map((_, i) =>
                `<button class="carousel-dot${i===0 ? " active" : ""}" data-index="${i}"></button>`
            ).join("");
        }

        function goTo(index){
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            if(dotsContainer){
                dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i)=>{
                    dot.classList.toggle("active", i === current);
                });
            }
        }

        function next(){ goTo(current + 1); }
        function prev(){ goTo(current - 1); }

        function startAutoplay(){
            stopAutoplay();
            autoplayTimer = setInterval(next, autoplayDelay);
        }
        function stopAutoplay(){
            if(autoplayTimer) clearInterval(autoplayTimer);
        }

        if(nextBtn) nextBtn.addEventListener("click", ()=>{ next(); startAutoplay(); });
        if(prevBtn) prevBtn.addEventListener("click", ()=>{ prev(); startAutoplay(); });
        if(dotsContainer){
            dotsContainer.addEventListener("click", (e)=>{
                const dot = e.target.closest(".carousel-dot");
                if(!dot) return;
                goTo(parseInt(dot.dataset.index));
                startAutoplay();
            });
        }

        // pause on hover so people can actually read it
        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);

        goTo(0);
        startAutoplay();
    });
}

document.addEventListener("xgm:partialsLoaded", () => {
    initScrollReveal();
    initCounters();
    initCarousels();
});

// Fallback: if a page doesn't use include.js/partials, still run on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    if(!document.getElementById("site-header")){
        initScrollReveal();
        initCounters();
        initCarousels();
    }
});
