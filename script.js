function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    cabinet.classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');
    
    mainDisplay.classList.add('active');
    roomImg.src = imgSrc;

    // Reset old highlights and set the new one
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    drawerElement.classList.add('lit-up');
}

function openCategory(category) {
    console.log("Exploring category: " + category);
}
