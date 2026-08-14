/* =========================================================
   REBE IMRAN PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const icon = menuButton.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            const icon = menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const projectButtons = document.querySelectorAll(".view-project");


function openProjectModal(button) {

    const image = button.getAttribute("data-image");
    const title = button.getAttribute("data-title");
    const description = button.getAttribute("data-description");

    if (modalImage) {
        modalImage.src = image;
        modalImage.alt = title;
    }

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalDescription) {
        modalDescription.textContent = description;
    }

    if (projectModal) {

        projectModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

}


function closeProjectModal() {

    if (projectModal) {

        projectModal.classList.remove("active");

        document.body.style.overflow = "";

    }

}


projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        openProjectModal(button);

    });

});


if (modalClose) {

    modalClose.addEventListener("click", function () {

        closeProjectModal();

    });

}


if (modalOverlay) {

    modalOverlay.addEventListener("click", function () {

        closeProjectModal();

    });

}


/* Close modal with Escape key */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeProjectModal();

    }

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const profileImage = document.querySelector(".dp");

if (profileImage) {

    profileImage.addEventListener("error", function () {

        console.warn(
            "DP image could not be loaded. Make sure the file is named dp.jpeg."
        );

    });

}


const cvImage = document.querySelector(".cv-preview img");

if (cvImage) {

    cvImage.addEventListener("error", function () {

        console.warn(
            "CV image could not be loaded. Make sure the file is named cv.jpeg."
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {

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


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);

internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (
            targetId === "#" ||
            !targetId
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight = document.querySelector(
            ".navbar"
        )?.offsetHeight || 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   PREVENT BROKEN PROJECT IMAGES FROM LOOKING EMPTY
========================================================= */

const projectImages = document.querySelectorAll(
    ".project-image img"
);

projectImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

        const parent = image.parentElement;

        if (parent) {

            parent.style.background =
                "linear-gradient(135deg,#eee7df,#d9d0c5)";

        }

    });

});


/* =========================================================
   PAGE LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.body.classList.add("loaded");

});


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener("resize", function () {

    if (
        window.innerWidth > 800 &&
        navMenu
    ) {

        navMenu.classList.remove("active");

        if (menuButton) {

            const icon = menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    }

});
