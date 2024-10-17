document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-button');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
    });

    startButton.addEventListener('click', () => {
        landingPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('active');
        document.body.style.overflow = 'visible';
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    });

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

    const glitchElement = document.querySelector('.glitch');
    const glitchText = glitchElement.textContent;
    glitchElement.innerHTML = `
        ${glitchText}
        <span aria-hidden="true">${glitchText}</span>
        <span aria-hidden="true">${glitchText}</span>
    `;
    const subtitle = document.querySelector('.subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
});