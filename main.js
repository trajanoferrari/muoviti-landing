// Reveal on Scroll Effect V8
const observerOptions = { 
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" 
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should reveal
    const revealElements = document.querySelectorAll('.reveal-init');
    revealElements.forEach(el => revealObserver.observe(el));

    // Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }
});

// Change Main Image in Hover Carousel
function changeImg(src) {
    const mainImg = document.getElementById('carousel-img-main');
    if (mainImg) {
        mainImg.src = src;
    }
}

console.log('Muoviti Master Presentation V8 - International Agency Level Loaded');
