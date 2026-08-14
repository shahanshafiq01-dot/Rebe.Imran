/* =========================================================
   REBE IMRAN PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER SCROLL
    ========================== */

    const header = document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

    });


    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
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

    });


    /* =========================
       PROJECT FILTER
    ========================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selectedFilter =
                button.dataset.filter;


            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    card.classList.remove("hide");

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });


    /* =========================
       PROJECT MODAL
    ========================== */

    const projectModal =
        document.getElementById("projectModal");

    const modalBackdrop =
        document.getElementById("modalBackdrop");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalType =
        document.getElementById("modalType");

    const modalDescription =
        document.getElementById("modalDescription");


    function openProject(card) {

        const title =
            card.dataset.title;

        const type =
            card.dataset.type;

        const image =
            card.dataset.image;

        const description =
            card.dataset.description;


        modalTitle.textContent = title;

        modalType.textContent = type;

        modalDescription.textContent =
            description;

        modalImage.src = image;

        modalImage.alt =
            `${title} project`;


        projectModal.classList.add("active");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

    }


    function closeProject() {

        projectModal.classList.remove("active");

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");

        setTimeout(() => {

            modalImage.src = "";

        }, 250);

    }


    projectCards.forEach(card => {

        card.addEventListener("click", () => {

            openProject(card);

        });

    });


    modalClose.addEventListener(
        "click",
        closeProject
    );

    modalBackdrop.addEventListener(
        "click",
        closeProject
    );


    /* =========================
       CV MODAL
    ========================== */

    const cvModal =
        document.getElementById("cvModal");

    const cvModalBackdrop =
        document.getElementById("cvModalBackdrop");

    const cvModalClose =
        document.getElementById("cvModalClose");

    const viewCvBtn =
        document.getElementById("viewCvBtn");


    function openCV() {

        cvModal.classList.add("active");

        cvModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

    }


    function closeCV() {

        cvModal.classList.remove("active");

        cvModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");

    }


    viewCvBtn.addEventListener(
        "click",
        openCV
    );

    cvModalClose.addEventListener(
        "click",
        closeCV
    );

    cvModalBackdrop.addEventListener(
        "click",
        closeCV
    );


    /* =========================
       ESCAPE KEY
    ========================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeProject();
            closeCV();

        }

    });


    /* =========================
       SIMPLE REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, .project-card, .detail, .skill-tag"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal-ready");

        revealObserver.observe(element);

    });

});