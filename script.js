document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Hide mobile nav if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    });

    // --- Counter Animation Script for Milestones ---
    const counterElements = document.querySelectorAll('.counter');
    const speed = 200; // The lower the number, the faster the count

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        let count = 0;
        const increment = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                el.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counterElements.forEach(counter => {
        observer.observe(counter);
    });
});