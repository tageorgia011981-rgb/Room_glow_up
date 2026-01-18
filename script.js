let currentRoomIndex = 1;

function toggleRooms() {
    const panel = document.getElementById('sideCabinet');
    const btn = document.getElementById('rooms-trigger');
    if (panel) panel.classList.toggle('active');
    if (btn) btn.classList.toggle('lit-up');
}

function uploadRoom(imageSrc, element) {
    const img = document.getElementById('roomImage');
    const placeholder = document.getElementById('placeholderText');
    const fan = document.getElementById('furnitureFan');
    
    // Toggle between the two living room files
    let fileName = imageSrc;
    if (imageSrc === 'livingroom.png') {
        fileName = currentRoomIndex === 1 ? 'livingroom.png' : 'livingroom2.png';
        currentRoomIndex = currentRoomIndex === 1 ? 2 : 1; // Swap for next click
    }

    // Reset Glow
    document.querySelectorAll('.side-drawer').forEach(drawer => drawer.classList.remove('lit-up'));
    element.classList.add('lit-up');

    // Reset Fan to re-trigger "unfolding"
    fan.classList.remove('fan-active');

    img.style.opacity = '0'; 
    setTimeout(() => {
        if (placeholder) placeholder.style.display = 'none';
        img.src = fileName;
        img.onload = function() {
            img.style.opacity = '1';
            img.classList.add('show');
            
            // Deploy the Fan Blades toward the center
            setTimeout(() => {
                fan.classList.add('fan-active');
            }, 150);
        };
    }, 400); 
}
