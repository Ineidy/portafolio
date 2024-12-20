document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const terminalTexts = document.querySelectorAll('.terminal-text');
    const terminalPrompt = document.querySelector('.terminal-prompt');
    const header = document.querySelector('header');

    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
    });
    terminalTexts.forEach((text, index) => {
        text.style.setProperty('--order', index);
    });
    function startMainContent() {
        landingPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('active');
        document.body.style.overflow = 'visible';
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !landingPage.classList.contains('hidden')) {
            startMainContent();
        }
    });
    terminalPrompt.addEventListener('click', startMainContent);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                highlightNavLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function highlightNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === sectionId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 50);
        } else if (element.nextElementSibling) {
            setTimeout(() => {
                typeWriter(element.nextElementSibling, element.nextElementSibling.textContent);
            }, 500);
        } else {
            terminalPrompt.style.display = 'block';
        }
    }
    if (terminalTexts.length > 0) {
        terminalTexts[0].textContent = '';
        typeWriter(terminalTexts[0]);
    }
    let prevScrollPos = window.pageYOffset;

    window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            header.style.top = "0"; 
        } else {
            header.style.top = "-100px"; 
        }
        prevScrollPos = currentScrollPos;
    };
});
