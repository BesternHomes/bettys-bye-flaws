/* ==========================================================================
   Bettys Bye Flaws - Premium Beauty Salon
   JavaScript Functionality: Sticky Header, Mobile Menu, Accordion, Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header & Glassmorphism Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between list (hamburger) and x (close)
        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.remove('ph-list');
            toggleIcon.classList.add('ph-x');
        } else {
            toggleIcon.classList.remove('ph-x');
            toggleIcon.classList.add('ph-list');
        }
    });

    // 3. Smooth Scrolling for Anchor Links & Close Menu on Click
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only apply to internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed header
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        toggleIcon.classList.remove('ph-x');
                        toggleIcon.classList.add('ph-list');
                    }
                }
            }
        });
    });

    // 4. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Optional: Close all other accordions for a cleaner UX
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 5. Apple-Inspired Scroll Animations (Intersection Observer)
    // Select elements that should fade in smoothly as you scroll
    const animateElements = document.querySelectorAll(
        '.section-header, .about-images, .about-content, .service-card, .feature-item, .gallery-img, .review-card, .contact-info, .contact-form-wrapper'
    );
    
    // Add the base class to elements we want to animate
    animateElements.forEach(el => el.classList.add('reveal-up'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger CSS transition
                entry.target.classList.add('active');
                
                // Unobserve after animating so it only happens once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Start observing all targeted elements
    document.querySelectorAll('.reveal-up').forEach(el => {
        scrollObserver.observe(el);
    });
});