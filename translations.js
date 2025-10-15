// ===============================
// Translation Data
// ===============================

const translations = {
    es: {
        // Navigation & Header
        "name": "Matías Cofré",
        "nav-home": "Inicio",
        "nav-projects": "Proyectos",
        "nav-experience": "Experiencia",
        "nav-about": "Sobre Mí",
        "nav-contact": "Contacto",

        // Flip Cards
        "profession-label": "Profesión",
        "profession-detail": "Ingeniero en Informática",
        "location-label": "Ubicación",
        "location-detail": "Santiago, Chile",
        "languages-label": "Idiomas",
        "languages-detail": "Español · Inglés",
        "education-label": "Educación",
        "experience-label": "Experiencia",
        "experience-detail": "3+ Años",
        
        // Experience Section
        "experience-title": "Experiencia Profesional",
        "current-job-title": "Software Engineer",
        "current-company": "Ara y Bustamante Consultores",
        "current-period": "Sep 2024 - Presente",
        "current-achievement-1": "Programe un portal de clientes en PHP para la gestión de documentos, usando JWT para la autenticación y lo integré con la pagina web de la empresa",
        "current-achievement-2": "Desarrollé Bot automatizado del SII con interfaz gráfica que captura las boletas de honorario emitidas y recibidas por las empresas",
        "current-achievement-3": "Transformé infraestructura de datos migrando de Excel a MySQL",
        "current-achievement-4": "Lideré adopción tecnológica capacitando equipos en CRM Zoho",
        
        "previous-job-title": "Data Analyst & Process Automation",
        "previous-company": "Sodexo Chile",
        "previous-period": "Ago 2023 - Ago 2024",
        "previous-achievement-1": "Implementé soluciones automatizadas que mejoraron la eficiencia operativa",
        "previous-achievement-2": "Desarrollé algoritmos de limpieza de datos con Pandas y VBA",
        "previous-achievement-3": "Colaboré con equipos multidisciplinarios optimizando flujos de información",
        
        // Skills Section
        "skills-title": "Competencias Técnicas",
        "backend-title": "Backend & APIs",
        "database-title": "Bases de Datos",
        // "enterprise-title": "Sistemas Empresariales",
        // "analysis-title": "Análisis & Visualización",
        // "methodology-title": "Metodologías",
        
        // "projects-title": "Proyectos de Alto Impacto",
        "projects-subtitle": "Soluciones que han transformado la eficiencia operativa de empresas",
        
        "contact-title": "Conectemos",
        "contact-description": "Respondo en menos de 24 horas",
        
        "footer-text": "© 2025 Matías Cofré. Construido con pasión y código limpio."
    },
    
    en: {
        // Navigation & Header
        "name": "Matías Cofré",
        "nav-home": "Home",
        "nav-projects": "Projects",
        "nav-experience": "Experience",
        "nav-about": "About Me",
        "nav-contact": "Contact",

        // Hero Section
        "hero-greeting": "Hi, I'm",
        "hero-role": "Software Engineer & Backend Developer",
        "hero-description": "Computer Engineer specialized in Backend development and process automation. I transform complex ideas into efficient technological solutions that drive business growth.",
        "hero-contact": "Contact",
        "hero-projects": "View Projects",
        "view-tech": "View Technologies",

        // Tech Stack
        "tech-stack": "Technologies I Master",
        
        // About Section
        "about-title": "About Me",
        "about-p1": "I'm a backend developer with a growth and innovation-oriented mindset. My experience spans from complex process automation to designing scalable architectures in the financial, mining, and tax sectors.",
        "about-p2": "My approach goes beyond code: I seek to understand how technology can solve real business problems. I combine solid technical skills with strategic vision to create solutions that truly impact operational efficiency.",
        "about-p3": "I'm currently in my final year of Computer Engineering while working as a Software Engineer, demonstrating my adaptability and constant pursuit of professional growth.",
        "years-experience": "Years of Experience",
        "efficiency-improvement": "Efficiency Improvement",
        "industries": "Industries",

        // Flip Cards
        "profession-label": "Profession",
        "profession-detail": "Computer Engineer",
        "location-label": "Location",
        "location-detail": "Santiago, Chile",
        "languages-label": "Languages",
        "languages-detail": "Spanish · English",
        "education-label": "Education",
        "education-detail": "Computer Engineering",
        "experience-label": "Experience",
        "experience-detail": "3+ Years",
        
        // Experience Section
        "experience-title": "Professional Experience",
        "current-job-title": "Software Engineer",
        "current-company": "Ara y Bustamante Consultores",
        "current-period": "Sep 2024 - Present",
        "current-achievement-1": "Designed secure and scalable architecture integrating corporate website with application portal",
        "current-achievement-2": "Developed automated SII Bot and real-time currency conversion app",
        "current-achievement-3": "Transformed data infrastructure migrating from Excel to MySQL",
        "current-achievement-4": "Led technology adoption by training teams in Zoho CRM",
        
        "previous-job-title": "Data Analyst & Process Automation",
        "previous-company": "Sodexo Chile",
        "previous-period": "Aug 2023 - Aug 2024",
        "previous-achievement-1": "Implemented automated solutions that improved operational efficiency",
        "previous-achievement-2": "Developed data cleaning and transformation algorithms with Pandas and VBA",
        "previous-achievement-3": "Collaborated with multidisciplinary teams optimizing information system entry",
        "previous-achievement-4": "Created interactive dashboards in Power BI for executive decision-making",
        
        // Skills Section
        "skills-title": "Technical Skills",
        "backend-title": "Backend & APIs",
        "database-title": "Databases",
        "enterprise-title": "Enterprise Systems",
        "analysis-title": "Analysis & Visualization",
        "methodology-title": "Methodologies",
        
        // Projects Section
        "projects-title": "High-Impact Projects",
        "projects-subtitle": "Solutions that have transformed business operational efficiency",
        
        // Contact Section
        "contact-title": "Let's Connect",
        "contact-description": "Do you have an interesting project? Looking for someone who combines technical skills with business vision? Let's talk about how I can contribute to your team.",
        
        // Footer
        "footer-text": "© 2024 Matías Cofré. Built with passion and clean code."
    }
};

// ===============================
// Translation Utility Functions
// ===============================

/**
 * Get translation for a specific key
 * @param {string} key - Translation key
 * @param {string} language - Language code (es/en)
 * @returns {string} Translated text or key if not found
 */
function getTranslation(key, language = 'es') {
    if (translations[language] && translations[language][key]) {
        return translations[language][key];
    }
    
    // Fallback to Spanish if translation not found
    if (language !== 'es' && translations.es && translations.es[key]) {
        return translations.es[key];
    }
    
    // Return key if no translation found
    return key;
}

/**
 * Get all available languages
 * @returns {Array} Array of language codes
 */
function getAvailableLanguages() {
    return Object.keys(translations);
}

/**
 * Check if a language is supported
 * @param {string} language - Language code to check
 * @returns {boolean} True if language is supported
 */
function isLanguageSupported(language) {
    return translations.hasOwnProperty(language);
}

/**
 * Get language name in native format
 * @param {string} language - Language code
 * @returns {string} Language name
 */
function getLanguageName(language) {
    const languageNames = {
        'es': 'Español',
        'en': 'English'
    };
    
    return languageNames[language] || language.toUpperCase();
}

/**
 * Detect browser language and return supported language code
 * @returns {string} Supported language code
 */
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    return isLanguageSupported(langCode) ? langCode : 'es';
}

/**
 * Validate all translation keys are present in all languages
 * @returns {Object} Validation report
 */
function validateTranslations() {
    const languages = getAvailableLanguages();
    const allKeys = new Set();
    const report = {
        valid: true,
        missing: {},
        extra: {}
    };
    
    // Collect all keys from all languages
    languages.forEach(lang => {
        Object.keys(translations[lang]).forEach(key => allKeys.add(key));
    });
    
    // Check each language for missing/extra keys
    languages.forEach(lang => {
        const langKeys = Object.keys(translations[lang]);
        const missing = [...allKeys].filter(key => !langKeys.includes(key));
        const extra = langKeys.filter(key => !allKeys.has(key));
        
        if (missing.length > 0) {
            report.missing[lang] = missing;
            report.valid = false;
        }
        
        if (extra.length > 0) {
            report.extra[lang] = extra;
            report.valid = false;
        }
    });
    
    return report;
}

// ===============================
// Export for external use
// ===============================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        translations,
        getTranslation,
        getAvailableLanguages,
        isLanguageSupported,
        getLanguageName,
        detectBrowserLanguage,
        validateTranslations
    };
}

// Make available globally
window.translations = translations;
window.translationUtils = {
    getTranslation,
    getAvailableLanguages,
    isLanguageSupported,
    getLanguageName,
    detectBrowserLanguage,
    validateTranslations
};

// Development helper: Log translation validation in console
if (process?.env?.NODE_ENV === 'development') {
    const validation = validateTranslations();
    if (!validation.valid) {
        console.warn('Translation validation failed:', validation);
    } else {
        console.log('✅ All translations validated successfully');
    }
}