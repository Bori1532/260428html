document.addEventListener("DOMContentLoaded", function () {
    var home = document.getElementById("panel-home");
    var footer = document.getElementById("panel-footer");
    var dots = document.querySelectorAll(".page-dots__link");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scrollOpts() {
        return { behavior: reduceMotion ? "auto" : "smooth", block: "start" };
    }

    function setActiveDot(index) {
        dots.forEach(function (dot, i) {
            var on = i === index;
            dot.classList.toggle("is-active", on);
            if (on) {
                dot.setAttribute("aria-current", "page");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    function syncFromScroll() {
        if (!footer) {
            return;
        }
        var trigger = Math.min(window.innerHeight * 0.35, 200);
        var ft = footer.getBoundingClientRect().top;
        if (ft <= trigger) {
            setActiveDot(1);
        } else {
            setActiveDot(0);
        }
    }

    dots.forEach(function (dot) {
        dot.addEventListener("click", function (e) {
            e.preventDefault();
            var id = dot.getAttribute("data-target");
            var target = id ? document.getElementById(id) : null;
            if (target) {
                target.scrollIntoView(scrollOpts());
            }
        });
    });

    window.addEventListener(
        "scroll",
        function () {
            syncFromScroll();
        },
        { passive: true }
    );

    if (home) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    home.classList.toggle("section--text-active", entry.isIntersecting && entry.intersectionRatio > 0.2);
                });
            },
            { threshold: [0, 0.15, 0.35, 0.55, 1] }
        );
        io.observe(home);
    }

    syncFromScroll();
});
