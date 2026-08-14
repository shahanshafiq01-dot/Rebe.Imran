/* =====================================================
   REBE IMRAN PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuButton.querySelector("i");

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuButton.setAttribute(
                    "aria-label",
                    "Close navigation"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }

        });


        /* Close menu when navigation link is clicked */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

    }


    /* =================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener("click", (event) => {

        if (!navMenu || !menuButton) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            navMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navMenu.classList.remove("active");

            const icon = menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =================================================
       PROJECT MODAL
    ================================================= */

    const projectModal =
        document.getElementById("projectModal");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");


    const projectButtons =
        document.querySelectorAll(".view-project");


    /* Open project modal */

    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const image =
                button.getAttribute("data-image");

            const title =
                button.getAttribute("data-title");

            const description =
                button.getAttribute("data-description");


            if (modalImage) {

                modalImage.src = image;

                modalImage.alt = title;

            }


            if (modalTitle) {

                modalTitle.textContent =
                    title || "Project";

            }


            if (modalDescription) {

                modalDescription.textContent =
                    description || "";

            }


            if (projectModal) {

                projectModal.classList.add("active");

                document.body.style.overflow = "hidden";

            }

        });

    });


    /* Close modal function */

    function closeModal() {

        if (!projectModal) return;

        projectModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    /* =================================================
       ESC KEY CLOSES MODAL
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const navbar =
                document.querySelector(".navbar");


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =================================================
       ACTIVE NAVIGATION LINK
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 140;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =================================================
       CV / DP IMAGE FALLBACK CHECK
    ================================================= */

    const dpImage =
        document.querySelector(".dp");

    const cvImage =
        document.querySelector(".cv-preview img");


    /*
       DP fallback:
       If dp.jpeg cannot be found, keep the alt text
       visible instead of showing a broken layout.
    */

    if (dpImage) {

        dpImage.addEventListener(
            "error",
            () => {

                dpImage.style.display = "none";

                const parent =
                    dpImage.parentElement;

                if (parent) {

                    parent.setAttribute(
                        "data-image-error",
                        "Profile image could not be loaded"
                    );

                }

            }
        );

    }


    /*
       CV fallback:
       The CV itself remains clickable through the
       Open CV / Download CV buttons.
    */

    if (cvImage) {

        cvImage.addEventListener(
            "error",
            () => {

                cvImage.style.display = "none";

                const preview =
                    cvImage.parentElement;

                if (preview) {

                    preview.classList.add(
                        "cv-image-error"
                    );

                    preview.setAttribute(
                        "data-message",
                        "CV image could not be loaded"
                    );

                }

            }
        );

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const footerYear =
        document.querySelector(
            ".footer-bottom span"
        );


    if (footerYear) {

        footerYear.innerHTML =
            footerYear.innerHTML.replace(
                "2026",
                new Date().getFullYear()
            );

    }


    /* =================================================
       PREVENT BODY HORIZONTAL OVERFLOW
    ================================================= */

    document.body.style.overflowX = "hidden";


    /* =================================================
       BUTTON CLICK FEEDBACK
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".btn, .cv-btn, .top-whatsapp"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.add(
                    "clicked"
                );


                setTimeout(() => {

                    button.classList.remove(
                        "clicked"
                    );

                }, 250);

            }
        );

    });


    /* =================================================
       IMAGE LOADING
    ================================================= */

    const allImages =
        document.querySelectorAll("img");


    allImages.forEach(image => {

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "image-loaded"
                );

            }
        );

    });


    /* =================================================
       RESIZE HANDLER
    ================================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(() => {

                    /*
                       Automatically close mobile
                       navigation when switching back
                       to desktop width.
                    */

                    if (
                        window.innerWidth > 800 &&
                        navMenu
                    ) {

                        navMenu.classList.remove(
                            "active"
                        );

                        if (menuButton) {

                            const icon =
                                menuButton.querySelector(
                                    "i"
                                );

                            if (icon) {

                                icon.classList.remove(
                                    "fa-xmark"
                                );

                                icon.classList.add(
                                    "fa-bars"
                                );

                            }

                        }

                    }

                }, 150);

        }
    );


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "Rebe Imran Portfolio loaded successfully."
    );

});
