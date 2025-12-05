/**
 * Initializes the application logic when the DOM is fully loaded.
 * Handles the burger menu interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.getElementById('burger-menu-icon');
    const menuOverlay = document.getElementById('burger-menu-overlay');
    const closeBtn = document.getElementById('close-menu');

    if (burgerIcon && menuOverlay && closeBtn) {
        /**
         * Opens the burger menu.
         */
        burgerIcon.addEventListener('click', () => {
            menuOverlay.classList.remove('-right-full');
            menuOverlay.classList.add('right-0');
        });

        /**
         * Closes the burger menu.
         */
        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('right-0');
            menuOverlay.classList.add('-right-full');
        });

        /**
         * Closes the burger menu when clicking outside the content.
         * @param {Event} e - The click event.
         */
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('right-0');
                menuOverlay.classList.add('-right-full');
            }
        });
    }
});
