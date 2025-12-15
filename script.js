// ===== Scroll Reveal Animation =====
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal');
    });
    
    // About section
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) aboutImage.classList.add('reveal-left');
    if (aboutText) aboutText.classList.add('reveal-right');
    
    // Game cards with stagger
    document.querySelectorAll('.game-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Project placeholder
    const projectsPlaceholder = document.querySelector('.projects-placeholder');
    if (projectsPlaceholder) projectsPlaceholder.classList.add('reveal');
    
    // Contact items with stagger
    document.querySelectorAll('.contact-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Music dropdown
    const musicDropdown = document.querySelector('.music-dropdown');
    if (musicDropdown) musicDropdown.classList.add('reveal');
    
    // Stats
    document.querySelectorAll('.stat').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Initial check
    reveal();
});

window.addEventListener('scroll', reveal);

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

// ===== Parallax Effect for Hero Visual =====
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ===== Mouse Follow Effect for Hero =====
const hero = document.querySelector('.hero');
const centerSphere = document.querySelector('.center-sphere');

if (hero && centerSphere) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        centerSphere.style.transform = `translate(calc(-50% + ${x * 50}px), calc(-50% + ${y * 50}px))`;
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===== Tilt Effect on Cards =====
let tiltEnabled = window.innerWidth > 768;

window.addEventListener('resize', () => {
    tiltEnabled = window.innerWidth > 768;
});

document.querySelectorAll('.game-card').forEach(card => {
    if (!tiltEnabled) return;
    
    card.addEventListener('mousemove', (e) => {
        if (!tiltEnabled) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transition = 'transform 0.1s ease';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    if (!tiltEnabled) return;
    
    card.addEventListener('mousemove', (e) => {
        if (!tiltEnabled) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        card.style.transition = 'transform 0.1s ease';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Music Dropdown Animation =====
const musicDropdown = document.querySelector('.music-dropdown');

if (musicDropdown) {
    const summary = musicDropdown.querySelector('summary');
    const content = musicDropdown.querySelector('.music-content');
    const artistsCloud = musicDropdown.querySelector('.artists-cloud');
    let isAnimating = false;
    
    summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (isAnimating) return;
        isAnimating = true;
        
        const tags = content.querySelectorAll('.artist-tag');
        
        if (!musicDropdown.open) {
            // Opening
            musicDropdown.open = true;
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            
            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.5s ease, opacity 0.4s ease';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            });
            
            // Reset and animate tags
            tags.forEach((tag, i) => {
                tag.style.transition = 'none';
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(12px)';
            });
            
            setTimeout(() => {
                tags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, i * 25);
                });
            }, 200);
            
            setTimeout(() => {
                content.style.maxHeight = 'none';
                isAnimating = false;
            }, 500);
            
        } else {
            // Closing
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.transition = 'none';
            
            requestAnimationFrame(() => {
                content.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            });
            
            setTimeout(() => {
                musicDropdown.open = false;
                content.style.maxHeight = '';
                content.style.opacity = '';
                content.style.transition = '';
                
                // Reset tags
                tags.forEach(tag => {
                    tag.style.transition = '';
                    tag.style.opacity = '';
                    tag.style.transform = '';
                });
                
                isAnimating = false;
            }, 400);
        }
    });
}

// ===== Easter Egg Modals =====
const easterEggs = [
    { trigger: 'easterEgg', modal: 'easterModal' },
    { trigger: 'easterGamer', modal: 'gamerModal' },
    { trigger: 'easterMusic', modal: 'musicModal' }
];

easterEggs.forEach(({ trigger, modal }) => {
    const triggerEl = document.getElementById(trigger);
    const modalEl = document.getElementById(modal);
    
    if (triggerEl && modalEl) {
        triggerEl.addEventListener('click', () => {
            modalEl.classList.add('active');
        });
        
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) {
                modalEl.classList.remove('active');
            }
        });
    }
});

// Close buttons for all modals
document.querySelectorAll('.easter-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.easter-modal').classList.remove('active');
    });
});

// ===== Copy Discord to Clipboard =====
const copyElements = document.querySelectorAll('.contact-copy');

copyElements.forEach(el => {
    el.addEventListener('click', () => {
        const textToCopy = el.dataset.copy;
        navigator.clipboard.writeText(textToCopy);
    });
});

// ===== Basic Protection =====
// Отключить правый клик
document.addEventListener('contextmenu', e => e.preventDefault());

// Отключить горячие клавиши DevTools
document.onkeydown = function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (просмотр кода)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Ctrl+S (сохранить)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
};

// ===== Performance Optimization =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Prevent layout shift =====
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = [
        'images/avatar.png',
        'images/logo.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});

console.log('🚀 Сайт загружен! Добро пожаловать.');
