document.addEventListener("DOMContentLoaded", () => {
    // Typing Effect for Hero Title
    const heroText = document.querySelector(".title");
    const words = ["Full Stack Developer", "Web3 Enthusiast", "Open Source Contributor"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        let currentWord = words[wordIndex];
        let displayText = isDeleting
            ? currentWord.substring(0, charIndex--)
            : currentWord.substring(0, charIndex++);

        heroText.innerHTML = displayText;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect(); // Start typing effect

    // Smooth Scroll for Navigation Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Hover Glow Effect on Projects
    document.querySelectorAll(".project").forEach(project => {
        project.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = project.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;

            project.style.transform = `perspective(1000px) rotateY(${x / 25}deg) rotateX(${-y / 25}deg)`;
        });

        project.addEventListener("mouseleave", () => {
            project.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.createElement("button");
    themeToggle.innerText = "🌙";
    themeToggle.style.cssText = `
        position: fixed; top: 20px; right: 20px; font-size: 20px; padding: 10px;
        background: white; color: black; border: none; cursor: pointer; border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5); transition: 0.3s;
    `;
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Apply Dark Mode Styles
    const darkModeStyle = document.createElement("style");
    darkModeStyle.innerHTML = `
        .dark-mode { background: #0d0d0d; color: white; }
        .dark-mode header { background: rgba(20, 20, 20, 0.95); }
        .dark-mode .project { background: rgba(255, 255, 255, 0.1); }
    `;
    document.head.appendChild(darkModeStyle);
});
