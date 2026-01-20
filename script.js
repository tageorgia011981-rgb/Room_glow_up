document.addEventListener('DOMContentLoaded', () => {
    const roomsBtn = document.getElementById('rooms-btn');
    const cabinet = document.getElementById('main-cabinet');
    const metalPlate = roomsBtn.querySelector('.tab-card-inner');

    roomsBtn.addEventListener('click', () => {
        cabinet.classList.toggle('show-me');
        metalPlate.classList.toggle('active');
        console.log("Cabinet and Glow toggled!");
    });
});
