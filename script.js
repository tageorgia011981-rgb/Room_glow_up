/**
 * STEP 1: Toggle the Cabinet
 * This handles the "Rooms" tab. It slides the cabinet in or out.
 */
function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    const display = document.getElementById('mainDisplay');
    
    cabinet.classList.toggle('active');

    // If we close the cabinet, we hide the room display and fans too
    if (!cabinet.classList.contains('active')) {
        display.classList.remove('active');
        const drawers = document.querySelectorAll('.side-drawer');
        drawers.forEach(d => d.classList.remove('lit-up'));
    }
}

/**
 * STEP 2: Upload the Room & Open the Fan
 * Triggered when a specific drawer (Living Room, etc.) is clicked.
 */
function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');

    // 1. Show the main display box (The "Glow Up" area)
    mainDisplay.classList.add('active');

    // 2. Load the specific room image
    roomImg.src = imgSrc;
    roomImg.classList.add('show');

    // 3. Clear any fans that are already open
    const allDrawers = document.querySelectorAll('.side-drawer');
    allDrawers.forEach(drawer => {
        drawer.classList.remove('lit-up');
    });

    // 4. Open the mechanical fan for THIS drawer only
    drawerElement.classList.add('lit-up');
}

/**
 * STEP 3: Category Selection (Placeholder for next step)
 * This will handle clicking Seating, Tables, etc.
 */
function openCategory(category) {
    console.log("Opening category: " + category);
    // We will build the furniture "Sub-Fan" here next!
}
