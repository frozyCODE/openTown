document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.getElementById('burger-menu-icon');
    const menuOverlay = document.getElementById('burger-menu-overlay');
    const closeBtn = document.getElementById('close-menu');

    if (burgerIcon && menuOverlay && closeBtn) {
        burgerIcon.addEventListener('click', () => {
            menuOverlay.classList.remove('-right-full');
            menuOverlay.classList.add('right-0');
        });

        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('right-0');
            menuOverlay.classList.add('-right-full');
        });

        // Fermer en cliquant en dehors du contenu
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('right-0');
                menuOverlay.classList.add('-right-full');
            }
        });
    }
});
