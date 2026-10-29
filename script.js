/* =========================================================
   DARA CANTIKA DEWI — DATA PORTFOLIO
   script.js
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    /* =====================================================
       02. HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            () => {

                menuButton.classList.toggle("active");

                navLinks.classList.toggle("active");

            }
        );


        navigationLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuButton.classList.remove("active");

                    navLinks.classList.remove("active");

                }
            );

        });


        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideMenu =
                    navLinks.contains(event.target);

                const clickedMenuButton =
                    menuButton.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedMenuButton
                ) {

                    menuButton.classList.remove("active");

                    navLinks.classList.remove("active");

                }

            }
        );

    }


    /* =====================================================
       04. SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       05. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 160;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                navigationLinks.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href") ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       06. LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    const imageTriggers =
        document.querySelectorAll(
            ".image-trigger"
        );


    function openLightbox(imageSource) {

        if (
            !lightbox ||
            !lightboxImage ||
            !imageSource
        ) {
            return;
        }


        lightboxImage.src =
            imageSource;


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(
            () => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    lightboxImage.src = "";

                }

            },
            300
        );

    }


    imageTriggers.forEach(
        (trigger) => {

            trigger.addEventListener(
                "click",
                () => {

                    const imageSource =
                        trigger.dataset.image;


                    openLightbox(
                        imageSource
                    );

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();


                if (
                    menuButton &&
                    navLinks
                ) {

                    menuButton.classList.remove(
                        "active"
                    );

                    navLinks.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* =====================================================
       07. HERO COUNTER
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    function animateCounter(counter) {

        const target =
            Number(
                counter.dataset.target
            );


        if (
            !target ||
            counter.dataset.animated === "true"
        ) {
            return;
        }


        counter.dataset.animated =
            "true";


        const duration =
            1300;


        const startTime =
            performance.now();


        function updateCounter(
            currentTime
        ) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress * target
                );


            counter.textContent =
                currentValue;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    const counterObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.6
            }

        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );

        }
    );


    /* =====================================================
       08. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-intro,
            .about-main,
            .about-facts,
            .featured-project,
            .project-showcase,
            .project-card,
            .timeline-item,
            .journey-copy,
            .graduation-gallery,
            .organization-feature,
            .activity-feature,
            .activity-small,
            .activity-list-grid article,
            .certificate-card,
            .skill-column
            `
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       09. SLIGHT HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    function heroParallax() {

        if (!heroVisual) {
            return;
        }


        if (
            window.innerWidth <= 900
        ) {

            heroVisual.style.transform =
                "translateY(0)";

            return;
        }


        const scroll =
            window.scrollY;


        if (
            scroll < window.innerHeight
        ) {

            const movement =
                scroll * 0.035;


            heroVisual.style.transform =
                `translateY(${movement}px)`;

        }

    }


    window.addEventListener(
        "scroll",
        heroParallax
    );


    /* =====================================================
       10. IMAGE FALLBACK
    ===================================================== */

    const portfolioImages =
        document.querySelectorAll(
            "img"
        );


    portfolioImages.forEach(
        (image) => {

            image.addEventListener(
                "error",
                function () {

                    this.classList.add(
                        "image-error"
                    );


                    console.warn(
                        `Image not found: ${this.src}`
                    );

                }
            );

        }
    );


    /* =====================================================
       11. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            "footer span"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()}`;

    }


});