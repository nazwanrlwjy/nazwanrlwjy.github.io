// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .bg-gray-50').forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name')?.value;
            
            // Simple validation
            if (!name) {
                alert('Please fill in your name.');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Project detail modals (placeholder functionality)
    document.querySelectorAll('button:contains("View Details")').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            alert(`Project details for: ${projectTitle}\n\nThis would open a detailed project modal with more information.`);
        });
    });
    
    // Source code buttons
    document.querySelectorAll('button:contains("Source Code")').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            alert(`Source code for: ${projectTitle}\n\nThis would link to the GitHub repository.`);
        });
    });
    
    // Current year for copyright
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('footer p:first-child').forEach(el => {
        el.textContent = el.textContent.replace('2024', currentYear);
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('nav');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});