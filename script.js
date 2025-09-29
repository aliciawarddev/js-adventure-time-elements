// Get all quadrants and center circle
const quadrants = document.querySelectorAll('.quadrant');
const centerCircle = document.querySelector('.center-circle');
const allElements = document.querySelectorAll('.quadrant, .center-circle');

// Add click event listener to each element (quadrants + center)
allElements.forEach(element => {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Check if this element is already active
        const isActive = this.classList.contains('active');
        
        // Hide all elements first
        allElements.forEach(el => {
            el.classList.remove('active');
            const content = el.querySelector('.content, .lumps-content');
            if (content) {
                content.classList.add('hidden');
            }
        });
        
        // If the clicked element wasn't active, show it
        if (!isActive) {
            this.classList.add('active');
            const content = this.querySelector('.content, .lumps-content');
            if (content) {
                content.classList.remove('hidden');
            }
        }
    });
});
