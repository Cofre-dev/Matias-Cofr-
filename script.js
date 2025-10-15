// ===============================
// Portfolio JavaScript Functionality
// ===============================

class PortfolioManager {
    constructor() {
        this.currentTheme = 'dark';
        this.currentLanguage = 'es';
        this.isMobile = this.detectMobile();
        this.isTouchDevice = this.detectTouch();
        this.init();
    }

    // ===============================
    // Device Detection
    // ===============================
    detectMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    detectTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    init() {
        this.initializeTheme();
        this.initializeLanguage();
        this.bindEventListeners();
        this.initializeScrollAnimations();
        this.initializeIntersectionObserver();

        // Initialize features based on device
        if (!this.isMobile) {
            this.initializeCodeRain();
            this.initializeParticleSystem();
        }

        this.initializeTechCarousel();
        this.initializeAdvancedAnimations();
        this.initializeCodeTabs();
        this.initializeFlipCards();

        // Touch-specific optimizations
        if (this.isTouchDevice) {
            this.initializeTouchOptimizations();
        }
    }

    initializeTheme() {
        // In a real environment, you would use localStorage:
        // const savedTheme = localStorage.getItem('theme') || 'light';
        const savedTheme = 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a subtle animation to the theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    initializeLanguage() {
        // In a real environment, you would use localStorage:
        // const savedLanguage = localStorage.getItem('language') || 'es';
        const savedLanguage = 'es';
        this.setLanguage(savedLanguage);
    }

    setLanguage(language) {
        this.currentLanguage = language;
        this.updateLanguageDisplay();
        this.translatePage(language);
        
        // In a real environment, you would save to localStorage:
        // localStorage.setItem('language', language);
    }

    updateLanguageDisplay() {
        const langDisplay = document.getElementById('currentLang');
        if (langDisplay) {
            langDisplay.textContent = this.currentLanguage.toUpperCase();
        }
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.setLanguage(newLanguage);
        
        // Add animation to language toggle
        const languageToggle = document.getElementById('languageToggle');
        languageToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            languageToggle.style.transform = 'scale(1)';
        }, 150);
    }

    translatePage(language) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language] && translations[language][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
    }

    bindEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroll suave a la sección
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleHeaderScroll());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    // ===============================
    // Scroll Effects
    // ===============================
    handleHeaderScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    initializeScrollAnimations() {
        // Add scroll-triggered animations
        const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-card');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    }

    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ===============================
    // Keyboard Navigation
    // ===============================
    handleKeyboardNavigation(e) {
        // Toggle theme with Ctrl/Cmd + Shift + T
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Toggle language with Ctrl/Cmd + Shift + L
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            this.toggleLanguage();
        }
    }

    // ===============================
    // Utility Methods
    // ===============================
    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--border);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px var(--shadow);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add typing effect to hero subtitle
    initializeTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const typeSpeed = 100;
            
            function typeWriter() {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                }
            }
            
            // Start typing effect after hero animation
            setTimeout(typeWriter, 1000);
        }
    }

    // Parallax effect for hero section
    initializeParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent) {
                const rate = scrolled * -0.5;
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }


    // Performance optimization: Throttled scroll handler
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===============================
    // Code Rain Effect
    // ===============================
    initializeCodeRain() {
        const codeRain = document.querySelector('.code-rain');
        if (!codeRain) return;

        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789</>{}[]()';
        const columns = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${i * 20}px;
                animation: codeRainFall ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                color: var(--primary);
                font-family: var(--font-mono);
                font-size: 16px;
                opacity: 0.8;
                font-weight: 600;
            `;

            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
            }
            column.innerHTML = text;
            codeRain.appendChild(column);
        }
    }

    // ===============================
    // Tech Carousel Implementation
    // ===============================
    initializeTechCarousel() {
        const carousel = document.querySelector('.tech-carousel');
        const track = document.querySelector('.tech-track');

        if (!carousel || !track) return;

        // Clone items for seamless loop
        const items = track.querySelectorAll('.tech-item');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // ===============================
    // Terminal Typing Effect
    // ===============================
    initializeTerminalTyping() {
        const commands = document.querySelectorAll('.command');

        commands.forEach((command, index) => {
            const text = command.textContent;
            command.textContent = '';

            const typeCommand = () => {
                let i = 0;
                const typing = setInterval(() => {
                    if (i < text.length) {
                        command.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typing);
                    }
                }, 100);
            };

            setTimeout(typeCommand, (index + 1) * 1000);
        });
    }

    // ===============================
    // Code Editor Enhancements
    // ===============================
    initializeCodeEditor() {
        const codeLines = document.querySelectorAll('.code-line');

        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 200 + 2000);
        });
    }

    // ===============================
    // Particle System
    // ===============================
    initializeParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const symbols = ['⚡', '💎', '🔮', '✨', '⭐', '🌟', '💫'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        particle.innerHTML = symbol;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            animation: particle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.6;
        `;

        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.createParticle(container);
            }
        }, (Math.random() * 20 + 10) * 1000);
    }

    // ===============================
    // Advanced Animations
    // ===============================
    initializeAdvancedAnimations() {
        // Staggered animations for skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.animation = `slideInFromBottom 0.6s ease forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.opacity = '0';
        });

        // Bouncing animation for tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.animation = 'bounceIn 0.6s ease';
            });

            item.addEventListener('animationend', () => {
                item.style.animation = '';
            });
        });

        // Section reveal animations
        this.setupSectionReveal();
    }

    setupSectionReveal() {
        const sections = document.querySelectorAll('.section');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');

                    // Animate children with stagger
                    const children = entry.target.querySelectorAll('.project-card, .skill-category, .timeline-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = 'slideInFromBottom 0.8s ease forwards';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }



    // ===============================
    // Enhanced Scroll Effects
    // ===============================
    initializeParallaxElements() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .code-editor');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // ===============================
    // Code Tabs Functionality
    // ===============================
    initializeCodeTabs() {
        const tabs = document.querySelectorAll('.tab[data-lang]');
        const codeTabs = document.querySelectorAll('.code-tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetLang = tab.getAttribute('data-lang');

                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                codeTabs.forEach(ct => ct.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding code tab
                const targetCodeTab = document.getElementById(`${targetLang}-code`);
                if (targetCodeTab) {
                    targetCodeTab.classList.add('active');
                }

                // Add subtle animation
                tab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tab.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // ===============================
    // Info Cards - No Flip Needed
    // ===============================
    initializeFlipCards() {
        // Cards now display all information without flipping
        // Just add smooth hover interactions
        const infoCards = document.querySelectorAll('.flip-card');

        infoCards.forEach(card => {
            // Add subtle scale effect on hover for better UX
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ===============================
    // Advanced Animation System
    // ===============================
    initializeAdvancedScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.style.animation = `fadeInUpBig 0.8s ease-out forwards`;
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animationObserver.observe(el);
        });
    }

    // ===============================
    // 3D Tilt Effect for Cards
    // ===============================
    initialize3DTilt() {
        // Skip 3D tilt on mobile devices
        if (this.isMobile || this.isTouchDevice) return;

        const cards = document.querySelectorAll('.project-card.enhanced, .flip-card, .timeline-content');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 5;
                const rotateY = ((centerX - x) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ===============================
    // Cursor Trail Effect
    // ===============================
    initializeCursorTrail() {
        const trail = [];
        const trailLength = 20;

        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY });

            if (trail.length > trailLength) {
                trail.shift();
            }

            this.renderTrail(trail);
        });
    }

    renderTrail(trail) {
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

        // Create new trail
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${10 - (index * 0.5)}px;
                height: ${10 - (index * 0.5)}px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                opacity: ${1 - (index / trail.length)};
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(dot);
        });
    }

    // ===============================
    // Magnetic Button Effect
    // ===============================
    initializeMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .nav-link-cta, .repository-button');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===============================
    // Parallax Scroll Effect
    // ===============================
    initializeParallaxScroll() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .floating-card, .code-editor');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ===============================
    // Reveal Text Animation
    // ===============================
    initializeTextReveal() {
        const textElements = document.querySelectorAll('.hero-title, .section-title');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ===============================
    // Ripple Effect on Click
    // ===============================
    initializeRippleEffect() {
        const rippleElements = document.querySelectorAll('.btn, .nav-link, .project-card');

        rippleElements.forEach(element => {
            element.classList.add('ripple');
        });
    }

    // ===============================
    // Spotlight Follow Cursor
    // ===============================
    initializeSpotlight() {
        const cards = document.querySelectorAll('.project-card.enhanced, .timeline-content');

        cards.forEach(card => {
            card.classList.add('spotlight');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const spotlight = card.querySelector('::before');
                if (spotlight) {
                    card.style.setProperty('--x', `${x}px`);
                    card.style.setProperty('--y', `${y}px`);
                }
            });
        });
    }

    // ===============================
    // Enhanced Loading Animation
    // ===============================
    initializeLoadingAnimation() {
        const elements = document.querySelectorAll('.hero-content > *, .section-title, .project-card, .timeline-item');

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // ===============================
    // Scroll Progress Indicator
    // ===============================
    initializeScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            z-index: 10000;
            transition: width 0.2s ease;
            box-shadow: 0 0 10px var(--primary);
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    // ===============================
    // Animated Counter
    // ===============================
    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ===============================
    // Touch Device Optimizations
    // ===============================
    initializeTouchOptimizations() {
        // Add touch-friendly classes
        document.body.classList.add('touch-device');

        // Optimize touch interactions for cards
        const cards = document.querySelectorAll('.project-card.enhanced, .flip-card');
        cards.forEach(card => {
            // Add visual feedback on touch
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            }, { passive: true });

            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 100);
            }, { passive: true });
        });

        // Optimize button touches
        const buttons = document.querySelectorAll('.btn, .repository-button, .nav-link-cta');
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
            }, { passive: true });

            button.addEventListener('touchend', () => {
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            }, { passive: true });
        });

        // Optimize tech items for touch
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('touchstart', (e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.08)';
            }, { passive: true });

            item.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }, 200);
            }, { passive: true });
        });

        // Prevent long-press context menu on interactive elements
        const interactiveElements = document.querySelectorAll('.project-card, .btn, .tech-item, .flip-card');
        interactiveElements.forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        });

        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleHeaderScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Add swipe detection for mobile menu
        this.initializeSwipeGestures();
    }

    // ===============================
    // Swipe Gestures for Mobile
    // ===============================
    initializeSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;

        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX, mobileMenu, mobileMenuToggle);
        }, { passive: true });
    }

    handleSwipe(startX, endX, menu, toggle) {
        const swipeThreshold = 100;
        const diff = startX - endX;

        // Swipe left to close menu
        if (diff > swipeThreshold && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        }

        // Swipe right to open menu (only from left edge)
        if (diff < -swipeThreshold && startX < 50 && !menu.classList.contains('active')) {
            toggle.classList.add('active');
            menu.classList.add('active');
        }
    }

    // ===============================
    // Auto-apply Animation Classes
    // ===============================
    autoApplyAnimationClasses() {
        // Add animation classes to elements on page load
        const projectCards = document.querySelectorAll('.project-card.enhanced');
        projectCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.animationDelay = `${index * 0.15}s`;
        });

        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.classList.add('floating');
        });
    }
}

// ===============================
// Page Load Handler
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio manager
    const portfolio = new PortfolioManager();

    // Initialize additional effects
    portfolio.initializeTypingEffect();
    portfolio.initializeParallax();
    portfolio.initializeTerminalTyping();
    portfolio.initializeCodeEditor();
    portfolio.initializeParallaxElements();

    // Auto-apply animation classes
    portfolio.autoApplyAnimationClasses();

    // Initialize advanced animations (only on desktop)
    if (!portfolio.isMobile) {
        portfolio.initializeAdvancedScrollAnimations();
        portfolio.initialize3DTilt();
        portfolio.initializeMagneticButtons();
        portfolio.initializeParallaxScroll();
        portfolio.initializeTextReveal();
        portfolio.initializeSpotlight();
    }

    // Initialize on all devices
    portfolio.initializeRippleEffect();
    portfolio.initializeLoadingAnimation();
    portfolio.initializeScrollProgress();
    portfolio.animateCounters();

    // Optional: Initialize cursor trail (can be resource-intensive)
    // Uncomment if you want the cursor trail effect
    // portfolio.initializeCursorTrail();

    // Add loading animation completion
    document.body.classList.add('loaded');

    // Add a welcome message for first-time visitors
    setTimeout(() => {
        const welcomeMessage = portfolio.currentLanguage === 'es'
            ? '✨ Bienvenido a mi portfolio. Presiona Ctrl+Shift+T para cambiar el tema o Ctrl+Shift+L para cambiar idioma.'
            : '✨ Welcome to my portfolio. Press Ctrl+Shift+T to change theme or Ctrl+Shift+L to change language.';

        console.log('💡 ' + welcomeMessage);
    }, 1000);

});

// ===============================
// Service Worker Registration (for PWA)
// ===============================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In a real application, you would register a service worker here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===============================
// Error Handling
// ===============================
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // In a real application, you might want to send this to an error tracking service
});


window.PortfolioManager = PortfolioManager;