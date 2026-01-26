const cab = document.getElementById('cab');
const fanSystem = document.getElementById('fan-system');

/**
 * Handles switching between different editor modes.
 * @param {string} mode - 'rooms', 'decor', or 'furniture'
 * @param {HTMLElement} el - The button element that was clicked
 */
function openMode(mode, el) {
    // Reset the fan state and clear previous content
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = '';
    
    // Hide cabinet by default unless 'rooms' is picked
    cab.classList.remove('cabinet-visible');

    if (mode === 'decor') {
        if (el) {
            const rect = el.getBoundingClientRect();
            // Perfectly anchors the fan to the tab's location
            fanSystem.style.left = (rect.left + (rect.width / 2)) + 'px';
            fanSystem.style.top = (rect.bottom + window.scrollY) + 'px';
        }
        // Small delay to ensure the fan clears before rebuilding
        setTimeout(openDecorFan, 100);
    } 
    else if (mode === 'rooms') {
        // This trigger starts the CSS Stage Glide
        cab.classList.add('cabinet-visible');
    }
}

/**
 * Builds the 5-blade Decor category fan.
 */
function openDecorFan() {
    fanSystem.classList.add('fan-down');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    
    // Your exact 5 categories
    const categories = ['Lighting', 'Rugs', 'Curtains', 'Plants', 'Extras'];

    categories.forEach((name, i) => {
        const blade = document.createElement('div');
        // Assigns s-1 through s-5 to match the CSS rotation math
        blade.className = `swatch-blade s-${i + 1}`;
        
        // Blade contains the text label and the hidden preview box
        blade.innerHTML = `
            <div class="fan-text">${name}</div>
            <div class="decor-preview">
                <img src="${name.toLowerCase()}_preview.png" alt="${name} preview">
            </div>
        `;
        
        // Logic for when a category is clicked
        blade.onclick = () => {
            console.log("Selected Category: " + name);
            // This is where you would call the next fan level (e.g., openRugsFan())
        };
        
        fanSystem.appendChild(blade);
    });

    // Trigger the fan-out animation
    setTimeout(() => {
        fanSystem.classList.add('active-fan');
    }, 50);
}

// Optional: Helper to hide overlays if you have other UI elements
function hideOverlays() {
    // Add any specific cleanup logic here if needed
}
