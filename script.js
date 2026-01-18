function toggleRooms() {
    document.getElementById('sideCabinet').classList.toggle('active');
}

function uploadRoom(imgSrc, drawer) {
    document.getElementById('mainDisplay').classList.add('active');
    const roomImg = document.getElementById('roomImage');
    roomImg.src = imgSrc;
    
    // Surprise! The fan pops out
    document.getElementById('furnitureFan').classList.add('fan-active');
}
