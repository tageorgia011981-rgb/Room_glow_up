function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    cabinet.classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement) {
    document.getElementById('mainDisplay').classList.add('active');
    document.getElementById('roomImage').src = imgSrc;

    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    drawerElement.classList.add('lit-up');
}
