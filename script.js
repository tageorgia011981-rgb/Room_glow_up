function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');
    
    mainDisplay.classList.add('active');
    roomImg.src = imgSrc;

    // Reset everything else first
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));

    // Light up only the one you clicked
    drawerElement.classList.add('lit-up');
}
