document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Apply CSS styles to hide sections and show the first one
    sections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Smooth scrolling function
    const smoothScrollTo = (element, duration = 500) => {
        const targetPosition = element.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const easing = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Ease in-out quadratic
            const run = easing(timeElapsed / duration) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    // Fade-in effect
    const fadeIn = (element, duration = 500) => {
        element.style.opacity = 0;
        element.style.transition = `opacity ${duration}ms`;

        setTimeout(() => {
            element.style.opacity = 1;
        }, 50);
    };

    navLinks.forEach((navLink) => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            smoothScrollTo(targetSection);

            // Hide all sections
            sections.forEach((section) => {
                section.style.display = 'none';
            });

            // Show the target section with fade-in effect
            targetSection.style.display = 'block';
            fadeIn(targetSection);
        });
    });
});
