/* =========================================================
   REBE IMRAN PORTFOLIO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");

    const navbar =
        document.getElementById("navbar");

    const modal =
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

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!navMenu || !menuButton) {
            return;
        }

        navMenu.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Close navigation"
        );

        const icon =
            menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        }

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenu() {

        if (!navMenu || !menuButton) {
            return;
        }

        navMenu.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

        const icon =
            menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

        document.body.classList.remove(
            "menu-open"
        );

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (
                    navMenu &&
                    navMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /* =====================================================
       CLOSE MENU AFTER NAVIGATION
    ===================================================== */

    if (navMenu) {

        const links =
            navMenu.querySelectorAll(
                "a"
            );

        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });

    }


    /* =====================================================
       CLOSE MENU OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (!navMenu || !menuButton) {
                return;
            }

            if (
                navMenu.classList.contains(
                    "active"
                ) &&
                !navMenu.contains(
                    event.target
                ) &&
                !menuButton.contains(
                    event.target
                )
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU ON ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 20) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveLink() {

        let current =
            "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();


    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const projectButtons =
        document.querySelectorAll(
            ".view-project"
        );


    function openProject(
        image,
        title,
        description
    ) {

        if (!modal) {
            return;
        }


        if (modalImage) {

            modalImage.src =
                image || "";

            modalImage.alt =
                title || "Project";

        }


        if (modalTitle) {

            modalTitle.textContent =
                title || "Project";

        }


        if (modalDescription) {

            modalDescription.textContent =
                description || "";

        }


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        if (modalClose) {

            setTimeout(() => {

                modalClose.focus();

            }, 100);

        }

    }


    function closeProject() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        if (modalImage) {

            modalImage.src = "";

        }

    }


    projectButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const image =
                    button.dataset.image;

                const title =
                    button.dataset.title;

                const description =
                    button.dataset.description;


                openProject(
                    image,
                    title,
                    description
                );

            }
        );

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProject
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProject
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeProject();

            }

        }
    );


    /* =====================================================
       CV IMAGE CHECK
    ===================================================== */

    const cvImages =
        document.querySelectorAll(
            '.cv-preview img'
        );


    cvImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                const preview =
                    image.closest(
                        ".cv-preview"
                    );


                if (preview) {

                    preview.classList.add(
                        "cv-image-error"
                    );

                }

            }
        );

    });


    /* =====================================================
       DP IMAGE CHECK
    ===================================================== */

    const dp =
        document.querySelector(
            ".dp"
        );


    if (dp) {

        dp.addEventListener(
            "error",
            () => {

                console.warn(
                    "dp.jpeg could not be loaded."
                );

            }
        );

    }


    /* =====================================================
       PROJECT IMAGE ERROR CHECK
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    projectImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity =
                    "0.25";

                console.warn(
                    "Project image could not be loaded:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(() => {

                    if (
                        window.innerWidth > 850
                    ) {

                        closeMenu();

                    }

                }, 150);

        }
    );


    /* =====================================================
       PREVENT HORIZONTAL OVERFLOW
    ===================================================== */

    document.body.style.overflowX =
        "hidden";


    /* =====================================================
       IMAGE LOADING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                }
            );

        }

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    console.log(
        "Rebe Imran Portfolio loaded successfully."
    );

});
