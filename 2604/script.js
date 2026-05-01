const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('active');
});

drawer.addEventListener('click', function(e) {
    if (e.target === drawer) {
        hamburger.classList.remove('active');
        drawer.classList.remove('active');
    }
});

const drawerLinks = document.querySelectorAll('.drawer-menu a');
drawerLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        drawer.classList.remove('active');
    });
});
