function toggleRooms() {
    document.getElementById('sideCabinet').classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement) {
    document.getElementById('mainDisplay').classList.add('active');
    document.getElementById('roomImage').src = imgSrc;

    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));

    drawerElement.classList.add('lit-up');
}

function openCategory(event, categoryId) {
    event.stopPropagation();
    const subFan = document.getElementById(categoryId + 'SubFan');
    if (subFan) subFan.classList.toggle('active');
}
