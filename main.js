// Inverse parallax
const img = document.getElementById("parallax-img");
let latestScrollY = 0;
let ticking = false;
let paralaxEffect = 0.3;

function updateParallax() {
    const offset = paralaxEffect * latestScrollY;
    img.style.transform = `translateY(${offset}px)`;
    ticking = false;
}

window.addEventListener("scroll", (e) => {
    latestScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
    repositionMask();
});

// Sprite mask
const spriteMask = document.getElementById('sprite-mask');
const heroImage = document.getElementById('hero-image');

const image = document.getElementById('back-image');

const r = spriteMask.getBoundingClientRect();
const height = r.width * (image.naturalHeight / image.naturalWidth);

var lastClientX = 0;
var lastClientY = 0;

function repositionMask(e) {
    const rect = spriteMask.getBoundingClientRect();

    const x = lastClientX - rect.left + (image.naturalWidth - rect.width) / 2;
    const y = lastClientY - rect.top - paralaxEffect * window.scrollY;

    spriteMask.style.setProperty('--x', x + 'px');
    spriteMask.style.setProperty('--y', y + 'px');
}

window.addEventListener('mousemove', (e) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    repositionMask();
});