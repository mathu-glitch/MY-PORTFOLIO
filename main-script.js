document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // --- Preloader ---
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                body.style.overflowY = 'auto';
            }, 500);
        });
        body.style.overflowY = 'hidden';
    }

    // --- Header Scroll Effect & Active Nav Link ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        let currentSectionId = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - header.offsetHeight - 50) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflowY = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        navLinks.forEach(link => link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflowY = 'auto';
            }
        }));
    }

    // --- Footer Year & Back to Top Button ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopButton.classList.add('visible');
            else backToTopButton.classList.remove('visible');
        });
    }

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.section-padding, .skill-item');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For general section fade-in
                if (entry.target.classList.contains('section-padding')) {
                    entry.target.classList.add('is-visible');
                }
                // For skill bar animation
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.classList.add('in-view');
                }
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.15 });
    animatedElements.forEach(el => {
        if (el.classList.contains('section-padding')) el.classList.add('section-fade-in');
        observer.observe(el);
    });
});