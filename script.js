// ===============================
// Portfolio JavaScript Functionality
// ===============================

class PortfolioManager {
    constructor() {
        this.currentTheme = 'dark';
        this.currentLanguage = 'es';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeLanguage();
        this.bindEventListeners();
        this.initializeScrollAnimations();
        this.initializeIntersectionObserver();
        this.initializeCodeRain();
        this.initializeTechCarousel();
        this.initializeParticleSystem();
        this.initializeAdvancedAnimations();
        this.initializeCodeTabs();
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

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
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
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            if (this.currentTheme === 'dark') {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            header.style.background = 'var(--bg-card)';
        }
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

        // Add hover pause functionality
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
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
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Add a welcome message for first-time visitors
    setTimeout(() => {
        const welcomeMessage = portfolio.currentLanguage === 'es' 
            ? 'Bienvenido a mi portfolio. Presiona Ctrl+Shift+T para cambiar el tema o Ctrl+Shift+L para cambiar idioma.'
            : 'Welcome to my portfolio. Press Ctrl+Shift+T to change theme or Ctrl+Shift+L to change language.';
        
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