document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    const terminalTexts = document.querySelectorAll('.terminal-text');
    const terminalPrompt = document.querySelector('.terminal-prompt');
    const header = document.querySelector('header'); // Selección del header para ocultarlo/mostrarlo

    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
    });

    // Animar los textos del terminal
    terminalTexts.forEach((text, index) => {
        text.style.setProperty('--order', index);
    });

    // Función para iniciar el contenido principal
    function startMainContent() {
        landingPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('active');
        document.body.style.overflow = 'visible';
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }

    // Escuchar la tecla Enter
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !landingPage.classList.contains('hidden')) {
            startMainContent();
        }
    });

    // También permitir hacer clic en el prompt para continuar
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

    // Animación de escritura para el contenido del terminal
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

    // Iniciar la animación de escritura para el primer elemento de texto del terminal
    if (terminalTexts.length > 0) {
        terminalTexts[0].textContent = '';
        typeWriter(terminalTexts[0]);
    }

    // Ocultar el header al hacer scroll hacia abajo y mostrarlo al hacer scroll hacia arriba
    let prevScrollPos = window.pageYOffset;

    window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            header.style.top = "0"; // Muestra el header
        } else {
            header.style.top = "-100px"; // Oculta el header
        }
        prevScrollPos = currentScrollPos;
    };
});
