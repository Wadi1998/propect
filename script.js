// ================================
// NAVIGATION
// ================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active navigation link
            updateActiveNavLink(this);
        }
    });
});

// Update active navigation link on scroll
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
    
    // Update active navigation based on scroll position
    updateActiveNavOnScroll();
});

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ================================
// FORM HANDLING
// ================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (in a real application, you would send this to a server)
        showNotification('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log to console (for demonstration purposes)
        console.log('Form submitted:', formData);
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.25rem;
        font-weight: bold;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    }
`;
document.head.appendChild(style);

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================

// Observe elements for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.animationDelay = `${index * 0.15}s`;
    observer.observe(step);
});

// ================================
// STATS COUNTER ANIMATION
// ================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (text.includes('%')) {
                statNumber.textContent = '0%';
                let current = 0;
                const timer = setInterval(() => {
                    current += 1;
                    if (current >= number) {
                        statNumber.textContent = number + '%';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = current + '%';
                    }
                }, 20);
            } else {
                statNumber.textContent = '0+';
                animateCounter(statNumber, number);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ================================
// PORTFOLIO FILTER FUNCTIONALITY
// ================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                item.classList.remove('hidden');
                // Stagger animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Initialize portfolio items with animation
portfolioItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);
});

// ================================
// PORTFOLIO HOVER EFFECTS
// ================================

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (!this.classList.contains('hidden')) {
            this.style.transform = 'translateY(-5px)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        if (!this.classList.contains('hidden')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// ================================
// TECH ITEMS INTERACTION
// ================================

document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add a pulse animation on click
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// ================================
// LOADING ANIMATION
// ================================

// Add loading class to body
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text, .hero-image').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c👋 Bienvenue sur DevPro Solutions!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cVous cherchez à développer un projet? Contactez-nous!', 'font-size: 14px; color: #64748b;');
console.log('%c✉️ contact@devpro-solutions.com', 'font-size: 14px; color: #10b981;');
