const roomsBtn = document.getElementById('rooms-btn');
const cabinet = document.getElementById('main-cabinet');

// This targets the specific metal plate inside the Rooms tab
const roomsInner = roomsBtn.querySelector('.tab-card-inner');

roomsBtn.onclick = function() {
    // This makes the cabinet glide
    cabinet.classList.toggle('show-me');
    
    // This turns your CSS "Warm Glow" on and off
    roomsInner.classList.toggle('active');
};
