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
9
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

    // ===============================
    // Event Listeners
    // ===============================
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

    // Add smooth hover effects
    initializeHoverEffects() {
        // Add magnetic effect to buttons
        document.querySelectorAll('.btn, .social-link').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
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
    portfolio.initializeHoverEffects();
    portfolio.initializeTerminalTyping();
    portfolio.initializeCodeEditor();
    
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