"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    initMobileMenu();

    initSmoothScroll();

    initActiveNavigation();

    initPortfolioFilters();

    initProjectModal();

    initCurrentYear();

});


/* =========================
   HEADER
========================= */

function initHeader() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================
   MOBILE MENU
========================= */

function initMobileMenu() {

    const toggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");


    if (!toggle || !nav) return;


    toggle.addEventListener(
        "click",
        () => {

            const opened =
                nav.classList.toggle("open");

            toggle.classList.toggle(
                "active",
                opened
            );

            toggle.setAttribute(
                "aria-expanded",
                String(opened)
            );

        }
    );


    nav.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("open");

                    toggle.classList.remove("active");

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {

                nav.classList.remove("open");

                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {

                nav.classList.remove("open");

                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================
   SMOOTH SCROLL
========================= */

function initSmoothScroll() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");


                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(id);


                if (!target) return;


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    12;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================
   ACTIVE NAVIGATION
========================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !links.length
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        links.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================
   PROJECT FILTERS
========================= */

function initPortfolioFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !buttons.length ||
        !cards.length
    ) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                cards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });

}


/* =========================
   PROJECT MODAL
========================= */

function initProjectModal() {

    const modal =
        document.getElementById(
            "projectModal"
        );


    const modalImage =
        document.getElementById(
            "modalImage"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalType =
        document.getElementById(
            "modalType"
        );


    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    const close =
        document.getElementById(
            "modalClose"
        );


    const backdrop =
        document.getElementById(
            "modalBackdrop"
        );


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !modal ||
        !cards.length
    ) {
        return;
    }


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.dataset.image;


                const title =
                    card.dataset.title;


                const type =
                    card.dataset.type;


                const description =
                    card.dataset.description;


                modalImage.src = image;

                modalImage.alt = title;

                modalTitle.textContent = title;

                modalType.textContent = type;

                modalDescription.textContent =
                    description;


                modal.classList.add(
                    "active"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.classList.add(
                    "modal-open"
                );

            }
        );

    });


    function closeModal() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            closeModal
        );

    }


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

}


/* =========================
   CURRENT YEAR
========================= */

function initCurrentYear() {

    const year =
        new Date().getFullYear();


    const element =
        document.getElementById(
            "currentYear"
        );


    if (element) {

        element.textContent = year;

    }

}


/* =========================
   IMAGE ERROR HANDLING
========================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.target.classList.add(
                "image-error"
            );

        }

    },
    true
);
