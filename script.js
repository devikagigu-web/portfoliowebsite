// ** High-Performance JavaScript: Intersection Observer for Efficiency **

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ensure the link is not just '#' or an external link
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 2. ACTIVE NAVIGATION HIGHLIGHT (Performance Optimized) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    // Select all sections AND the hero header
    const sections = document.querySelectorAll('section, header#hero');

    // Configuration for the Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        // 50% visibility threshold for activation
        threshold: 0.5
    };

    /**
     * Callback function executed when a target element intersects the viewport.
     */
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Get the ID of the intersecting section
                const currentId = entry.target.id;

                // Find the corresponding link and add 'active'
                const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Start observing each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 3. SIMPLE HEADER SHADOW ON SCROLL (Aesthetic) ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Applies a subtle shadow using the accent color for a professional lift
            nav.style.boxShadow = '0 2px 10px rgba(0, 255, 200, 0.15)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
});