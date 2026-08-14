/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 130;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    links.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   IMAGE FALLBACK
========================================= */

const profileImage = document.querySelector(".profile-image img");

if (profileImage) {

    profileImage.addEventListener("error", function () {

        this.alt = "Rebe Imran profile picture";

        this.style.display = "none";

        const parent = this.parentElement;

        parent.classList.add("image-error");

    });

}


/* =========================================
   CV CHECK
========================================= */

const cvButton = document.querySelector(".cv-button");

if (cvButton) {

    cvButton.addEventListener("click", function (event) {

        const cvPath = "cv.jpeg";

        /*
         The browser will open the exact file:
         cv.jpeg
        */

        if (!cvPath) {
            event.preventDefault();
        }

    });

}


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    if (!navbar || !menuToggle) {
        return;
    }

    const clickedInsideNavbar = navbar.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (
        navbar.classList.contains("open") &&
        !clickedInsideNavbar &&
        !clickedMenuButton
    ) {

        navbar.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   INITIAL NAVIGATION
========================================= */

updateActiveNavigation();
