/**
 * NekoCode Animation System
 * Scroll reveals, split-text, counters, 3D tilt, and custom cursor
 */

// Wait for DOM and Astro page transitions
document.addEventListener('astro:page-load', initAnimations);

function initAnimations() {
    initScrollReveal();
    initSplitText();
    initCounterAnimation();
    initCardTilt();
    initCustomCursor();
    initMagneticButtons();
}

/**
 * Scroll Reveal - Intersection Observer based
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing after reveal
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1, // Wait for 10% visibility
            rootMargin: '0px 0px -50px 0px' // Slightly negative margin to ensure element is actually entering
        }
    );

    reveals.forEach((el) => observer.observe(el));
}

/**
 * Split Text Animation - Word by word reveal
 */
/**
 * Split Text Animation - Word by word reveal
 */
function initSplitText() {
    const elements = document.querySelectorAll('[data-split-text]');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((el) => {
        // Skip if already processed
        if (el.classList.contains('split-text')) return;

        const text = el.textContent;
        const words = text.split(' ');

        el.innerHTML = '';
        el.classList.add('split-text');

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            span.style.animationDelay = `${index * 0.08}s`;
            el.appendChild(span);

            // Add space between words
            if (index < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });

        observer.observe(el);
    });
}

/**
 * Counter Animation - Numbers count up on scroll
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
    const target = el.getAttribute('data-counter');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1500;
    const startTime = performance.now();

    // Handle mixed content like "7+" or "FSRS-5"
    const numMatch = target.match(/(\d+)/);
    if (!numMatch) {
        el.textContent = target;
        return;
    }

    const endValue = parseInt(numMatch[1]);
    const textBefore = target.substring(0, numMatch.index);
    const textAfter = target.substring(numMatch.index + numMatch[1].length);

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.round(endValue * easeProgress);

        el.textContent = `${prefix}${textBefore}${current}${textAfter}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * 3D Card Tilt Effect
 */
function initCardTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = ((y - centerY) / centerY) * -8;
            const tiltY = ((x - centerX) / centerX) * 8;

            card.style.setProperty('--tilt-x', `${tiltX}deg`);
            card.style.setProperty('--tilt-y', `${tiltY}deg`);
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
            card.style.transform = '';
        });
    });
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Check if cursor already exists
    if (document.querySelector('.custom-cursor')) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
    });

    // Smooth cursor follow
    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover states
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('[data-magnetic]');

    buttons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// Export for potential external use
if (typeof window !== 'undefined') {
    window.NekoAnimations = {
        initScrollReveal,
        initSplitText,
        initCounterAnimation,
        initCardTilt,
        initCustomCursor,
        initMagneticButtons
    };
}
