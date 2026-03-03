// Change Main Image in Hover Carousel
function changeImg(src) {
    const mainImg = document.getElementById('carousel-img-main');
    if (mainImg) {
        mainImg.src = src;
    }
}

// Reveal on Scroll Effect
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .hero-card, .b-item, .m-card, .pricing-card, .logistics-card, .tv-interview-box, .hover-carousel').forEach(el => {
    el.classList.add('reveal-init');
    revealObserver.observe(el);
});

// Cursor Glow Effect (Subtle)
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}

// Smooth Scroll for Nav Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('Muoviti Master Presentation V3 Loaded');
