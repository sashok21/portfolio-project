/**
 * Portfolio Website - Main JavaScript
 * Author: Vlad
 */

(function() {
    'use strict';

    // ========================================
    // Navigation Active State
    // ========================================
    const initNavigation = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active state on scroll
        const updateActiveNav = () => {
            let current = 'home';
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        // Throttle scroll event
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(updateActiveNav);
        });
    };

    // ========================================
    // Timeline Animation
    // ========================================
    const initTimelineAnimation = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    };

    // ========================================
    // Service Cards Hover & Click Effect
    // ========================================
    const initServiceCards = () => {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            // Hover ефекти
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            // Клік по всій картці (включаючи фото)
            card.addEventListener('click', (e) => {
                // Перевіряємо, чи клік не був по самій стрілці (щоб не було подвійного кліку)
                if (!e.target.closest('.service-arrow')) {
                    const link = card.querySelector('.service-arrow');
                    // Якщо посилання існує і це не "#"
                    if (link) {
                        link.click();
                    }
                }
            });
        });
    };

    // ========================================
    // Skills Hover Animation
    // ========================================
    const initSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');

        skillItems.forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                const skillName = this.getAttribute('data-skill');
                // Optional: add logic here
            });
        });
    };

    // ========================================
    // Parallax Effect for Hero Photo
    // ========================================
    const initParallax = () => {
        const photo = document.querySelector('.photo-circle');

        if (!photo) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                photo.style.transform = `translateY(${rate}px)`;
            }
        });
    };

    // ========================================
    // Emoji Animations
    // ========================================
    const initEmojiAnimations = () => {
        const emojiDecorations = document.querySelectorAll('.emoji-decoration');

        emojiDecorations.forEach((emoji, index) => {
            const delay = index * 0.3;
            emoji.style.animationDelay = `${delay}s`;
        });
    };

    // ========================================
    // Loading Animation
    // ========================================
    const initLoadingAnimation = () => {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Fade in elements
            const fadeElements = document.querySelectorAll('.hero, .nav');
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                }, index * 100);
            });
        });
    };

    // ========================================
    // Lazy Loading Images
    // ========================================
    const initLazyLoading = () => {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // ========================================
    // Scroll to Top Button
    // ========================================
    const initScrollToTop = () => {
        const createScrollButton = () => {
            const button = document.createElement('button');
            button.innerHTML = '↑';
            button.className = 'scroll-to-top';
            button.setAttribute('aria-label', 'Scroll to top');

            // Стилі для кнопки
            Object.assign(button.style, {
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--cyan)',
                color: 'var(--black)',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                zIndex: '999',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease'
            });

            document.body.appendChild(button);

            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-5px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
            });
        };

        createScrollButton();
    };

    // ========================================
    // Accessibility Enhancements
    // ========================================
    const initAccessibility = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    };

    // ========================================
    // Initialize All Functions
    // ========================================
    const init = () => {
        console.log('Portfolio initialized');

        initNavigation();
        initTimelineAnimation();
        initServiceCards();
        initSkills();
        initParallax();
        initEmojiAnimations();
        initLoadingAnimation();
        initLazyLoading();
        initScrollToTop();
        initAccessibility();
    };

    // ========================================
    // Run on DOM Content Loaded
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();