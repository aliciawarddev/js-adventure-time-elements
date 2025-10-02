// ============================================
// ADVENTURE TIME ELEMENTS - INTERACTIVE SCRIPT
// ============================================

// Select all interactive
const allElements = document.querySelectorAll('.quadrant, .center-circle');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Closes all expanded elements and resets their states
 */
function closeAllElements() {
    // Loop through each element
    allElements.forEach(el => {
        // Remove the active class to collapse the element
        el.classList.remove('active');

        //Update ARIA attribute for screen readers
        el.setAttribute('aria-expanded', 'false');

        // Find the content div within this element
        const content = el.querySelector('.content');

        // If content exists, hide it
        if (content) {
            content.classList.add('hidden');
        }
    });
}

/**
 * Opens a specific element with smooth animation
 * @param {HTMLElement} element - The element to open
 */

function openElement(element) {
    // Add active class to expand the element
    element.classList.add('active');

    // Update ARIA attribute to indicate expanded state
    element.setAttribute('aria-expanded', 'true');

    // Find the content div within this element
    const content = element.querySelector('.content');

    // If content exists, show it with a slight delay for smoother animation
    if (content) {
        // Small delay allows CSS transition to start before content appears
        setTimeout(() => {
            content.classList.remove('hidden');
        }, 50);
    }
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

// Loop through each interactive element to add event listeners
allElements.forEach(element => {
    // ---- ACCESSIBILITY SETUP ----
    // Make element behave like a button for screen readers
    element.setAttribute('role', 'button');

    // Make element keyboard focusable
    element.setAttribute('tabindex', 0);

    // Initially set as not expanded
    element.setAttribute('aria-expanded', 'false');

    // ---- CLICK/ACTIVATION HANDLER ----
    // Main function to handle element activation
    const handleActivation = (e) => {
        // Prevent event from bubbling up to parent elements
        e.stopPropagation();

        // Check if this element is currently active
        const isActive = element.classList.contains('active');

        // Close all elements first (ensures only one is open at a time)
        closeAllElements();

        // If element wasn't active, open it
        if (!isActive) {
            openElement(element);
        }
        // If it was active, it stays closed (toggle behaviour)
    };

    // ---- MOUSE CLICK LISTENER ----
    // Handle mouse clicks
    element.addEventListener('click', handleActivation);

    // ---- KEYBOARD LISTENER ----
    // Handle keyboard activation for accessibility
    element.addEventListener('keydown', (e) => {
        // Check if Enter or Space key was pressed
        if (e.key === 'Enter' || e.key === ' ') {
            // Prevent default behaviour (page scroll on Space)
            e.preventDefault();

            // Activate the element
            handleActivation(e);
        }
    });
});

// ============================================
// GLOBAL EVENT LISTENERS
// ============================================

// ---- ESCAPE KEY HANDLER ---- 
// Close any open element when Escape key is pressed
document.addEventListener('keydown', (e) => {
    // Check if Escape key was pressed
    if (e.key === 'Escape') {
        // Close all open elements
        closeAllElements();
    }
});

// ---- CLICK OUTSIDE HANDLER ----
// Close elements when clicking outside the circle
document.addEventListener('click', (e) => {
    // Check if click target is not inside a quadrant or center circle
    if (!e.target.closest('.quadrant') && !e.target.closest('.center-circle')) {
        // Close all open elements
        closeAllElements();
    }
});
