(function () {
    function syncMenuHighlight(anchor) {
        document.querySelectorAll(".main-menu li, .drawer-menu li").forEach(function (li) {
            var match = li.getAttribute("data-menuanchor") === anchor;
            li.classList.toggle("active", Boolean(match));
        });
    }

    function setDrawerOpen(open) {
        var drawer = document.getElementById("mobileDrawer");
        var overlay = document.getElementById("drawerOverlay");
        drawer.classList.toggle("is-open", open);
        overlay.classList.toggle("is-open", open);
        drawer.setAttribute("aria-hidden", open ? "false" : "true");
        overlay.setAttribute("aria-hidden", open ? "false" : "true");

        if (typeof fullpage_api !== "undefined") {
            fullpage_api.setAllowScrolling(!open, "down, up");
            fullpage_api.setKeyboardScrolling(!open);
        }

        document.body.style.overflow = open ? "hidden" : "";
    }

    document.addEventListener("DOMContentLoaded", function () {
        var drawer = document.getElementById("mobileDrawer");
        var overlay = document.getElementById("drawerOverlay");
        var btnOpen = document.getElementById("hamburgerBtn");
        var btnClose = document.getElementById("drawerCloseBtn");

        if (btnOpen) {
            btnOpen.addEventListener("click", function () {
                setDrawerOpen(true);
            });
        }

        if (btnClose) {
            btnClose.addEventListener("click", function () {
                setDrawerOpen(false);
            });
        }

        if (overlay) {
            overlay.addEventListener("click", function () {
                setDrawerOpen(false);
            });
        }

        document.querySelectorAll(".drawer-menu a").forEach(function (link) {
            link.addEventListener("click", function () {
                setDrawerOpen(false);
            });
        });

        new fullpage("#fullpage", {
            licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
            anchors: ["company", "product", "contact", "board"],
            menu: ".top-header .main-menu",
            navigation: true,
            navigationPosition: "right",
            scrollingSpeed: 650,
            paddingTop: "72px",
            afterLoad: function (_origin, destination) {
                if (destination && destination.anchor) {
                    syncMenuHighlight(destination.anchor);
                }
            },
        });

        syncMenuHighlight("company");
    });
})();
