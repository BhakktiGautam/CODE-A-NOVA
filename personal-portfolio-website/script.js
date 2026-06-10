// ==============================
// Typing Animation
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        const texts = [
            "Frontend Developer 💻",
            "ECE Student ⚡",
            "Open Source Contributor 🌍",
            "Robotics Enthusiast 🤖"
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentText = texts[textIndex];

            if (!isDeleting) {

                typingElement.textContent =
                    currentText.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1200);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentText.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        typeEffect();
    }

    // ==============================
    // Scroll Reveal Animation
    // ==============================

    const sections = document.querySelectorAll("section");

    function revealSections() {

        sections.forEach(section => {

            const top = section.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    revealSections();

    window.addEventListener("scroll", revealSections);

    // ==============================
    // Active Navbar Highlight
    // ==============================

    const navLinks = document.querySelectorAll("nav ul li a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (
                window.scrollY >= sectionTop - 150 &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    }

    updateActiveNav();

    window.addEventListener("scroll", updateActiveNav);

});