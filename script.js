function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    cabinet.classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');
    
    mainDisplay.classList.add('active');
    roomImg.src = imgSrc;

    // Reset everything
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));

    drawerElement.classList.add('lit-up');
}

function openCategory(event, categoryId) {
    event.stopPropagation(); // Prevents clicking the drawer accidentally
    const subFan = document.getElementById(categoryId + 'SubFan');
    if (subFan) subFan.classList.toggle('active');
}

function placeFurniture(imgSrc) {
    console.log("Placing: " + imgSrc);
}
