// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
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

// Observe elements for fade-in animation
document.querySelectorAll('.stat-card, .service-category, .portfolio-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card h3');
            statCards.forEach(card => {
                const target = parseInt(card.textContent);
                animateCounter(card, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    contactForm.classList.add('loading');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        let successMessage = contactForm.querySelector('.success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            contactForm.appendChild(successMessage);
        }
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.classList.add('show');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.classList.remove('loading');

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        console.log('Contact Form Data:', formData);
    }, 1500);
});

// ===================================
// QUOTE FORM SUBMISSION
// ===================================
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('quote-name').value,
        email: document.getElementById('quote-email').value,
        phone: document.getElementById('quote-phone').value,
        company: document.getElementById('quote-company').value,
        service: document.getElementById('quote-service').value,
        details: document.getElementById('quote-details').value,
        budget: document.getElementById('quote-budget').value
    };

    // Show loading state
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    quoteForm.classList.add('loading');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        quoteForm.reset();

        // Show success message
        let successMessage = quoteForm.querySelector('.success-message');
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            quoteForm.appendChild(successMessage);
        }
        successMessage.textContent = 'Thank you for your quote request! Our team will review it and contact you within 24 hours.';
        successMessage.classList.add('show');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        quoteForm.classList.remove('loading');

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        console.log('Quote Form Data:', formData);
    }, 1500);
});

// ===================================
// PORTFOLIO ITEM INTERACTIONS
// ===================================
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.portfolio-overlay h4').textContent;
        const description = item.querySelector('.portfolio-overlay p').textContent;

        // You can implement a modal or lightbox here
        console.log('Portfolio Item Clicked:', { title, description });

        // Optional: Show an alert for demonstration
        // alert(`${title}\n\n${description}`);
    });
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

const highlightNav = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// FORM VALIDATION ENHANCEMENTS
// ===================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Add real-time validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', (e) => {
        if (e.target.value && !validateEmail(e.target.value)) {
            e.target.style.borderColor = '#ff4444';
        } else {
            e.target.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', (e) => {
        if (e.target.value && !validatePhone(e.target.value)) {
            e.target.style.borderColor = '#ff4444';
        } else {
            e.target.style.borderColor = '';
        }
    });
});

// ===================================
// LOADING SCREEN (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounce scroll events for better performance
const debouncedHighlightNav = debounce(highlightNav, 50);
window.addEventListener('scroll', debouncedHighlightNav);

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c Educated Mageza Holdings ', 'background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Investing in Smart Growth ', 'color: #D4AF37; font-size: 14px;');
console.log('Website designed and developed by Educated Mageza Holdings');
console.log('Contact us: info@educatedmageza.co.za');