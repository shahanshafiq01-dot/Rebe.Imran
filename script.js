document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenu = document.getElementById("mobileMenu");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenu && navMenu) {

        mobileMenu.addEventListener("click", function () {

            navMenu.classList.toggle("open");

            const icon = mobileMenu.querySelector("i");

            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");

                const icon = mobileMenu.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       CV IMAGE
       
       PRIMARY FILE:
       cv.jpeg

       The code checks common capitalization variants only
       if the primary lowercase file cannot be found.
    ===================================================== */

    const cvImage = document.getElementById("cvImage");
    const cvError = document.getElementById("cvError");

    const cvFiles = [
        "cv.jpeg",
        "cv.jpg",
        "CV.jpeg",
        "CV.jpg",
        "cv.JPEG",
        "CV.JPEG"
    ];

    let currentCvIndex = 0;


    function tryNextCvFile() {

        if (currentCvIndex >= cvFiles.length) {

            if (cvError) {
                cvError.classList.add("show");
            }

            return;
        }

        const file = cvFiles[currentCvIndex];

        currentCvIndex++;

        cvImage.src = file;

    }


    if (cvImage) {

        cvImage.addEventListener("load", function () {

            if (cvError) {
                cvError.classList.remove("show");
            }

        });


        cvImage.addEventListener("error", function () {

            tryNextCvFile();

        });


        /* Start with the exact requested filename */

        cvImage.src = "cv.jpeg";

    }


    /* =====================================================
       CV OPEN / DOWNLOAD BUTTONS
       
       These buttons use the same working filename found
       by the image checker.
    ===================================================== */

    const openCv = document.getElementById("openCv");
    const downloadCv = document.getElementById("downloadCv");
    const heroCvButton = document.getElementById("heroCvButton");


    function updateCvLinks(filename) {

        if (openCv) {
            openCv.href = filename;
        }

        if (downloadCv) {
            downloadCv.href = filename;
        }

        if (heroCvButton) {
            heroCvButton.href = filename;
        }

    }


    if (cvImage) {

        cvImage.addEventListener("load", function () {

            updateCvLinks(cvImage.src);

        });

    }


    /* =====================================================
       PROFILE IMAGE
       
       PRIMARY FILE:
       dp.jpeg
    ===================================================== */

    const profilePhoto = document.getElementById("profilePhoto");

    const profileFiles = [
        "dp.jpeg",
        "dp.jpg",
        "DP.jpeg",
        "DP.jpg",
        "dp.JPEG",
        "DP.JPEG"
    ];

    let profileIndex = 0;


    function tryNextProfile() {

        if (profileIndex >= profileFiles.length) {
            return;
        }

        profilePhoto.src = profileFiles[profileIndex];

        profileIndex++;

    }


    if (profilePhoto) {

        profilePhoto.addEventListener("error", function () {

            tryNextProfile();

        });

        profilePhoto.src = "dp.jpeg";

    }


    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const projectModal = document.getElementById("projectModal");
    const modalBackground = document.getElementById("modalBackground");
    const modalClose = document.getElementById("modalClose");

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription =
        document.getElementById("modalDescription");

    const projectButtons =
        document.querySelectorAll(".project-button");


    function openProject(button) {

        const image =
            button.getAttribute("data-image");

        const title =
            button.getAttribute("data-title");

        const description =
            button.getAttribute("data-description");


        modalImage.src = image;
        modalImage.alt = title;

        modalTitle.textContent = title;

        modalDescription.textContent = description;


        projectModal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    function closeProject() {

        projectModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    projectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            openProject(button);

        });

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProject
        );

    }


    if (modalBackground) {

        modalBackground.addEventListener(
            "click",
            closeProject
        );

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeProject();

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    function updateNavigation() {

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === "#" + current) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateNavigation
    );


    updateNavigation();


    /* =====================================================
       CLOSE MOBILE MENU WHEN WINDOW RESIZES
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 800) {

            navMenu.classList.remove("open");

            const icon =
                mobileMenu.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =====================================================
       IMAGE DEBUGGING
    ===================================================== */

    document.querySelectorAll("img").forEach(function (image) {

        image.addEventListener("error", function () {

            console.warn(
                "Could not load image:",
                image.getAttribute("src")
            );

        });

    });

});