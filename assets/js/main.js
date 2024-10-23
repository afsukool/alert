/**
 * Template Name: Arsha
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
    "use strict";

    // Helper function to select elements
    const select = (selector, all = false) => {
        selector = selector.trim();
        return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
    };

    // Add event listener to an element or all matching elements
    const addEvent = (eventType, selector, callback, all = false) => {
        const elements = select(selector, all);
        if (elements) {
            if (all) {
                elements.forEach(element => element.addEventListener(eventType, callback));
            } else {
                elements.addEventListener(eventType, callback);
            }
        }
    };

    // Add scroll event listener
    const onScroll = (element, callback) => {
        element.addEventListener("scroll", callback);
    };

    const navbarLinks = select("#navbar .scrollto", true);
    const setActiveLink = () => {
        const scrollY = window.scrollY + 200;
        navbarLinks.forEach(link => {
            if (!link.hash) return;
            const targetElement = select(link.hash);
            if (targetElement) {
                if (scrollY >= targetElement.offsetTop && scrollY <= targetElement.offsetTop + targetElement.offsetHeight) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    };

    // Smooth scrolling function
    const smoothScrollTo = (target) => {
        const headerHeight = select("#header").offsetHeight;
        const targetPosition = select(target).offsetTop;
        window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: "smooth"
        });
    };

    // Initialize event listeners and functionality
    window.addEventListener("load", setActiveLink);
    onScroll(document, setActiveLink);

    // Header scroll class
    const header = select("#header");
    if (header) {
        const toggleHeaderClass = () => {
            window.scrollY > 100 ? header.classList.add("header-scrolled") : header.classList.remove("header-scrolled");
        };
        window.addEventListener("load", toggleHeaderClass);
        onScroll(document, toggleHeaderClass);
    }

    // Back to top button
    const backToTopButton = select(".back-to-top");
    if (backToTopButton) {
        const toggleBackToTopButton = () => {
            window.scrollY > 100 ? backToTopButton.classList.add("active") : backToTopButton.classList.remove("active");
        };
        window.addEventListener("load", toggleBackToTopButton);
        onScroll(document, toggleBackToTopButton);
    }

    // Mobile navigation toggle
    addEvent("click", ".mobile-nav-toggle", function () {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    // Dropdown toggle for mobile
    addEvent("click", ".navbar .dropdown > a", function (event) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
            event.preventDefault();
            this.nextElementSibling.classList.toggle("dropdown-active");
        }
    }, true);

    // Smooth scrolling for scrollto links
    addEvent("click", ".scrollto", function (event) {
        if (select(this.hash)) {
            event.preventDefault();
            const navbar = select("#navbar");
            if (navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile");
                const mobileNavToggle = select(".mobile-nav-toggle");
                mobileNavToggle.classList.toggle("bi-list");
                mobileNavToggle.classList.toggle("bi-x");
            }
            smoothScrollTo(this.hash);
        }
    }, true);

    // Auto-scroll to hash on page load
    window.addEventListener("load", () => {
        if (window.location.hash && select(window.location.hash)) {
            smoothScrollTo(window.location.hash);
        }
    });

    // Preloader removal
    const preloader = select("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.remove();
        });
    }

    // GLightbox initialization
    GLightbox({ selector: ".glightbox" });

    // Skills progress bar
    const skillsContent = select(".skills-content");
    if (skillsContent) {
        new Waypoint({
            element: skillsContent,
            offset: "80%",
            handler: function () {
                select(".progress .progress-bar", true).forEach(progressBar => {
                    progressBar.style.width = progressBar.getAttribute("aria-valuenow") + "%";
                });
            }
        });
    }

    // Portfolio filtering
    window.addEventListener("load", () => {
        const portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            const iso = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item"
            });
            const filters = select("#portfolio-flters li", true);
            addEvent("click", "#portfolio-flters li", function (event) {
                event.preventDefault();
                filters.forEach(filter => filter.classList.remove("filter-active"));
                this.classList.add("filter-active");
                iso.arrange({
                    filter: this.getAttribute("data-filter")
                });
                iso.on("arrangeComplete", function () {
                    AOS.refresh();
                });
            }, true);
        }
    });

    // Portfolio details slider
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    });

    // AOS initialization
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });

})();
