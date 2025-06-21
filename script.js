document.addEventListener("DOMContentLoaded", () => {
    /** 📝 Typing Effect */
    const heroText = document.querySelector(".title");
    const words = ["Full Stack Developer", "Web3 Enthusiast", "Open Source Contributor"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor";
    cursorSpan.innerText = "|";
    heroText.after(cursorSpan);

    function typeEffect() {
        const current = words[wordIndex];
        heroText.textContent = isDeleting
            ? current.substring(0, --charIndex)
            : current.substring(0, ++charIndex);

        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => isDeleting = true, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();

    /** 🔗 Smooth Scroll */
    document.querySelectorAll("nav a[href^='#']").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /** 🌟 Project Hover Glow */
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        project.style.transition = "transform 0.1s ease";

        project.addEventListener("mousemove", e => {
            const rect = project.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 25;
            const y = -(e.clientY - rect.top - rect.height / 2) / 25;
            requestAnimationFrame(() => {
                project.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
            });
        });

        project.addEventListener("mouseleave", () => {
            requestAnimationFrame(() => {
                project.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
            });
        });
    });

    /** 🌗 Dark Mode Toggle */
    const themeToggle = document.createElement("button");
    themeToggle.innerText = "🌙";
    themeToggle.setAttribute("aria-label", "Toggle Dark Mode");
    themeToggle.style.cssText = `
        position: fixed; top: 20px; right: 20px; font-size: 20px;
        padding: 10px; background: white; color: black; border: none;
        cursor: pointer; border-radius: 10px; z-index: 999;
        box-shadow: 0 0 10px rgba(0,0,0,0.2); transition: 0.3s;
    `;
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    /** 🎨 Dark Mode Styles */
    const darkModeStyle = document.createElement("style");
    darkModeStyle.innerHTML = `
        .dark-mode { background: #0d0d0d; color: white; transition: background 0.3s, color 0.3s; }
        .dark-mode header { background: rgba(20, 20, 20, 0.95); }
        .dark-mode .project { background: rgba(255, 255, 255, 0.05); transition: background 0.3s; }
        .cursor { animation: blink 1s infinite; margin-left: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `;
    document.head.appendChild(darkModeStyle);
});
