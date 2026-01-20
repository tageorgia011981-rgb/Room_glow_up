const roomsBtn = document.getElementById('rooms-btn');
const cabinet = document.getElementById('main-cabinet');

roomsBtn.onclick = function() {
    cabinet.classList.toggle('show-me');
    console.log("Rooms button was clicked!");
};
