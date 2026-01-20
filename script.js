window.onload = function() {
    const roomsBtn = document.getElementById('rooms-btn');
    const cabinet = document.getElementById('main-cabinet');
    const plate = roomsBtn.querySelector('.tab-card-inner');

    roomsBtn.onclick = function() {
        // Slide cabinet
        cabinet.classList.toggle('show-me');
        // Light up tab
        plate.classList.toggle('active');
    };
};
