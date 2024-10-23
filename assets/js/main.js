! function () {
    "use strict";
    
    // Selector Helper Function
    let e = (selector, multiple = !1) => {
        if (!selector || selector.trim() === '') {
            console.warn("Empty or invalid selector passed:", selector);
            return null;
        }
        selector = selector.trim();
        return multiple ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
    };

    // Event Listener Helper Function
    let t = (event, selector, handler, multiple = !1) => {
        let element = e(selector, multiple);
        if (element) {
            if (multiple) {
                element.forEach(el => el.addEventListener(event, handler));
            } else {
                element.addEventListener(event, handler);
            }
        }
    };

    // Scroll Listener Helper Function
    let l = (element, handler) => {
        element.addEventListener("scroll", handler);
    };

    // Navbar Links Active State on Scroll
    let i = e("#navbar .scrollto", !0),
        o = () => {
            let scrollY = window.scrollY + 200;
            i.forEach(link => {
                if (!link.hash) return;
                let section = e(link.hash);
                if (section) {
                    scrollY >= section.offsetTop && scrollY <= section.offsetTop + section.offsetHeight ?
                        link.classList.add("active") :
                        link.classList.remove("active");
                }
            });
        };

    window.addEventListener("load", o);
    l(document, o);

    // Smooth Scroll to Section
    let a = (hash) => {
        let headerHeight = e("#header").offsetHeight,
            targetSection = e(hash);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: "smooth"
            });
        }
    };

    // Header Scroll Class Toggle
    let s = e("#header");
    if (s) {
        let r = () => {
            window.scrollY > 100 ? s.classList.add("header-scrolled") : s.classList.remove("header-scrolled");
        };
        window.addEventListener("load", r);
        l(document, r);
    }

    // Back-to-Top Button
    let n = e(".back-to-top");
    if (n) {
        let c = () => {
            window.scrollY > 100 ? n.classList.add("active") : n.classList.remove("active");
        };
        window.addEventListener("load", c);
        l(document, c);
    }

    // Mobile Navigation Toggle
    t("click", ".mobile-nav-toggle", function (event) {
        let navbar = e("#navbar");
        if (navbar) {
            navbar.classList.toggle("navbar-mobile");
            this.classList.toggle("bi-list");
            this.classList.toggle("bi-x");
        }
    });

    // Mobile Navigation Dropdowns
    t("click", ".navbar .dropdown > a", function (event) {
        let navbar = e("#navbar");
        if (navbar && navbar.classList.contains("navbar-mobile")) {
            event.preventDefault();
            let nextSibling = this.nextElementSibling;
            if (nextSibling) nextSibling.classList.toggle("dropdown-active");
        }
    }, !0);

    // Smooth Scroll with .scrollto Links
    t("click", ".scrollto", function (event) {
        if (e(this.hash)) {
            event.preventDefault();
            let navbar = e("#navbar");
            if (navbar && navbar.classList.contains("navbar-mobile")) {
                navbar.classList.remove("navbar-mobile");
                let navToggle = e(".mobile-nav-toggle");
                if (navToggle) {
                    navToggle.classList.toggle("bi-list");
                    navToggle.classList.toggle("bi-x");
                }
            }
            a(this.hash);
        }
    }, !0);

    // Scroll to section if URL has hash on page load
    window.addEventListener("load", () => {
        if (window.location.hash && e(window.location.hash)) {
            a(window.location.hash);
        }
    });

    // Preloader
    let d = e("#preloader");
    if (d) {
        window.addEventListener("load", () => {
            d.remove();
        });
    }

    // GLightbox Initialization
    GLightbox({
        selector: ".glightbox"
    });

    // Skills Progress Bar Animation
    let f = e(".skills-content");
    if (f) {
        new Waypoint({
            element: f,
            offset: "80%",
            handler: function () {
                e(".progress .progress-bar", !0).forEach(el => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            }
        });
    }

    // Portfolio Isotope and Filter
    window.addEventListener("load", () => {
        let portfolioContainer = e(".portfolio-container");
        if (portfolioContainer) {
            let isotopeInstance = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item"
            });

            let portfolioFilters = e("#portfolio-flters li", !0);
            t("click", "#portfolio-flters li", function (event) {
                event.preventDefault();
                portfolioFilters.forEach(el => el.classList.remove("filter-active"));
                this.classList.add("filter-active");

                isotopeInstance.arrange({
                    filter: this.getAttribute("data-filter")
                });

                isotopeInstance.on("arrangeComplete", function () {
                    AOS.refresh();
                });
            }, !0);
        }
    });

    // Portfolio Lightbox Initialization
    GLightbox({
        selector: ".portfolio-lightbox"
    });

    // Swiper for Portfolio Details
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: !0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: !1
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: !0
        }
    });

    // AOS Animation Initialization
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: !0,
            mirror: !1
        });
    });
}();
