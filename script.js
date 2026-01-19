const roomsBtn = document.getElementById("roomsBtn");
const cabinet = document.getElementById("cabinet");
const drawers = document.querySelectorAll(".drawer");
const roomDisplay = document.getElementById("roomDisplay");
const roomImage = document.getElementById("roomImage");

roomsBtn.addEventListener("click", () => {
  cabinet.classList.toggle("active");
});

drawers.forEach(drawer => {
  drawer.addEventListener("click", () => {

    drawers.forEach(d => d.classList.remove("active"));
    drawer.classList.add("active");

    roomDisplay.classList.add("active");

    const room = drawer.dataset.room;
    roomImage.src = `${room}.png`;
  });
});
