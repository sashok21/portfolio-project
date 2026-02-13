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
    // Service Cards Hover Effect
    // ========================================
    const initServiceCards = () => {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
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
                console.log(`Skill hovered: ${skillName}`);
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
    // Form Validation (if needed in future)
    // ========================================
    const initForms = () => {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add form validation logic here
                console.log('Form submitted');
            });
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
    // Scroll to Top Button (Optional)
    // ========================================
    const initScrollToTop = () => {
        const createScrollButton = () => {
            const button = document.createElement('button');
            button.innerHTML = '↑';
            button.className = 'scroll-to-top';
            button.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(button);

            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    button.classList.add('visible');
                } else {
                    button.classList.remove('visible');
                }
            });
        };

        // Uncomment to enable scroll to top button
        // createScrollButton();
    };

    // ========================================
    // Performance Monitoring
    // ========================================
    const initPerformanceMonitoring = () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    };

    // ========================================
    // Accessibility Enhancements
    // ========================================
    const initAccessibility = () => {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // ========================================
    // Responsive Navigation Toggle (Mobile)
    // ========================================
    const initMobileNav = () => {
        const navPill = document.querySelector('.nav-pill');
        const navLinks = document.querySelectorAll('.nav-link');

        // Close nav on mobile when link is clicked
        if (window.innerWidth < 768) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Add any mobile-specific behavior here
                });
            });
        }
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
        initForms();
        initLoadingAnimation();
        initLazyLoading();
        initScrollToTop();
        initPerformanceMonitoring();
        initAccessibility();
        initMobileNav();
    };

    // ========================================
    // Run on DOM Content Loaded
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // Expose API for external use
    // ========================================
    window.Portfolio = {
        version: '1.0.0',
        init: init
    };

})();