// ===== DOM Elements =====
const preloader = document.getElementById('preloader');
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const backToTop = document.getElementById('backToTop');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const vLine = document.querySelector('.v-line');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const dots = document.querySelectorAll('.dot');

// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 800);
});

// ===== Custom Cursor =====
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
});

function animateFollower() {
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, input, textarea, select');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ===== Header Scroll =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Header background
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (currentScroll > 500) {
        backToTop.closest('.back-to-top').classList.add('visible');
    } else {
        backToTop.closest('.back-to-top').classList.remove('visible');
    }

    // Vertical line progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (currentScroll / docHeight) * 100;
    if (vLine) {
        vLine.style.height = scrollPercent + '%';
    }

    // Active nav link based on scroll position
    updateActiveNav();

    lastScroll = currentScroll;
});

// ===== Back to Top =====
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Active Nav Link =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Mobile Menu =====
let overlay = null;

function openMobileMenu() {
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Create overlay
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('mobile-overlay');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeMobileMenu);
    }
    setTimeout(() => overlay.classList.add('active'), 10);
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto';

    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
                overlay = null;
            }
        }, 500);
    }
}

hamburger.addEventListener('click', openMobileMenu);
menuClose.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('[data-animate]');

function checkAnimations() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;

    animateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const delay = el.getAttribute('data-delay') || 0;

        if (elementTop < triggerPoint) {
            setTimeout(() => {
                el.classList.add('animated');
            }, parseInt(delay));
        }
    });
}

window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', () => {
    setTimeout(checkAnimations, 100);
});

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;

    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        counterStarted = true;

        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    num.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    num.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===== Portfolio Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 400);
            }
        });
    });
});

// ===== Testimonials Slider =====
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.testimonial-card').length;

function updateSlider() {
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-play testimonials
let autoPlay = setInterval(nextSlide, 5000);

const sliderArea = document.querySelector('.testimonials-slider');
sliderArea.addEventListener('mouseenter', () => clearInterval(autoPlay));
sliderArea.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
});

// Touch/Swipe support for testimonials
let touchStartX = 0;
let touchEndX = 0;

sliderArea.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderArea.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
    }
}

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#10b981';
        btn.style.opacity = '1';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
        }, 2500);
    }, 1500);
});

// ===== Tilt Effect on Portfolio Items =====
portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== Parallax on Hero =====
const heroSection = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    if (!heroSection || !heroImage) return;
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    heroImage.style.transform = `translateY(${rate}px)`;
});

// ===== Magnetic Effect on Buttons =====
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Typing Effect on Hero (subtle) =====
function initLetterAnimation() {
    const letters = document.querySelectorAll('.letter-by-letter');
    letters.forEach((letter, index) => {
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(30px)';
        letter.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 1000 + index * 300);
    });
}

window.addEventListener('load', () => {
    setTimeout(initLetterAnimation, 800);
});

// ===== Text Scramble Effect on Service Titles =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span style="color: var(--accent)">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// Apply scramble to nav logo on hover
const logoEl = document.querySelector('.logo a');
if (logoEl) {
    const scramble = new TextScramble(logoEl);
    const originalText = logoEl.textContent;

    logoEl.addEventListener('mouseenter', () => {
        scramble.setText('Alex.');
    });

    logoEl.addEventListener('mouseleave', () => {
        scramble.setText(originalText);
    });
}

// ===== Intersection Observer for better performance =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || 0;
            setTimeout(() => {
                el.classList.add('animated');
            }, parseInt(delay));
            observer.unobserve(el);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    checkAnimations();
    animateCounters();
});
