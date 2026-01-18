function toggleRooms() {
    const cabinet = document.getElementById('sideCabinet');
    cabinet.classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement) {
    const mainDisplay = document.getElementById('mainDisplay');
    const roomImg = document.getElementById('roomImage');
    
    mainDisplay.classList.add('active');
    roomImg.src = imgSrc;

    // Reset all highlights and close any open furniture fans
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));

    drawerElement.classList.add('lit-up');
}

function openCategory(event, categoryId) {
    // This stops the click from "bubbling up" to the drawer
    event.stopPropagation(); 

    // Close other furniture fans first
    document.querySelectorAll('.sub-fan').forEach(sf => {
        if (sf.id !== categoryId + 'SubFan') {
            sf.classList.remove('active');
        }
    });

    const subFan = document.getElementById(categoryId + 'SubFan');
    if (subFan) {
        subFan.classList.toggle('active');
    }
}

function placeFurniture(imgSrc) {
    console.log("Placing furniture item: " + imgSrc);
    // This is where we will write the code to make the bed appear in the room!
}
