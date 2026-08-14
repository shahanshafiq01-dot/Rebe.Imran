document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================================
       PROJECT MODAL
    ========================================= */

    const modal = document.getElementById("projectModal");
    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalClose = document.getElementById("modalClose");

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    const projectButtons = document.querySelectorAll(".view-project");


    function openModal(button) {

        const title = button.getAttribute("data-title");
        const description = button.getAttribute("data-description");
        const image = button.getAttribute("data-image");

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modalImage.src = image;
        modalImage.alt = title;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            openModal(button);

        });

    });


    if (modalClose) {

        modalClose.addEventListener("click", closeModal);

    }


    if (modalBackdrop) {

        modalBackdrop.addEventListener("click", closeModal);

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });


        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================================
       IMAGE ERROR HANDLING
       Keeps broken images from looking confusing.
    ========================================= */

    const images = document.querySelectorAll("img");

    images.forEach(img => {

        img.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                img.getAttribute("src")
            );

        });

    });

});
