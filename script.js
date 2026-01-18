function toggleRooms() {
    document.getElementById('sideCabinet').classList.toggle('active');
    document.getElementById('rooms-trigger').classList.toggle('lit-up');
}

function uploadRoom(imageSrc, element) {
    const img = document.getElementById('roomImage');
    const fan = document.getElementById('furnitureFan');
    
    // Clear old glows
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    element.classList.add('lit-up');
    
    // Switch Room
    img.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('placeholderText').style.display = 'none';
        img.src = imageSrc;
        img.onload = () => {
            img.style.opacity = '1';
            img.classList.add('show');
            // Trigger Fan
            setTimeout(() => fan.classList.add('fan-active'), 200);
        };
    }, 400);
}
