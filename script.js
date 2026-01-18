// STAGE 1: Reveal the Cabinet
function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    const display = document.getElementById('mainDisplay');
    
    cabinet.classList.toggle('active');

    // Reset if cabinet is closed
    if (!cabinet.classList.contains('active')) {
        display.classList.remove('active');
        document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    }
}

// STAGE 2: Reveal the Room and the Specific Fan
function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');

    // Show display box and room
    mainDisplay.classList.add('active');
    roomImg.src = imgSrc;

    // Reset all fans first
    document.querySelectorAll('.side-drawer').forEach(drawer => {
        drawer.classList.remove('lit-up');
    });

    // Swing out ONLY this drawer's fan
    drawerElement.classList.add('lit-up');
}

// STAGE 3: Handle Category Selection
function openCategory(category) {
    console.log("Selected category: " + category);
    // This is where we will add the furniture items next!
}
