document.addEventListener("DOMContentLoaded", function () {
    var block = document.querySelector("[data-product-slider]");
    if (!block) {
        return;
    }

    var viewport = block.querySelector(".product-slider__viewport");
    var prev = block.querySelector(".product-slider__arrow--prev");
    var next = block.querySelector(".product-slider__arrow--next");

    if (!viewport || !prev || !next) {
        return;
    }

    function pageDelta() {
        return viewport.clientWidth;
    }

    function updateArrows() {
        var maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth - 1);
        var x = viewport.scrollLeft;
        prev.disabled = x <= 1;
        next.disabled = x >= maxScroll - 1;
    }

    prev.addEventListener("click", function () {
        viewport.scrollBy({ left: -pageDelta(), behavior: "smooth" });
    });

    next.addEventListener("click", function () {
        viewport.scrollBy({ left: pageDelta(), behavior: "smooth" });
    });

    viewport.addEventListener(
        "scroll",
        function () {
            window.requestAnimationFrame(updateArrows);
        },
        { passive: true }
    );

    window.addEventListener("resize", updateArrows);
    updateArrows();
});
