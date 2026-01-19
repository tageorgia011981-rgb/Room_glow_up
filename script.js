const roomsBtn = document.getElementById('roomsBtn');
const sideCabinet = document.getElementById('sideCabinet');
const drawers = document.querySelectorAll('.side-drawer');
const roomImage = document.getElementById('roomImage');
const furniturePreview = document.getElementById('furniturePreview');

roomsBtn.addEventListener('click', () => {
  sideCabinet.classList.toggle('active');
});

drawers.forEach(drawer => {
  drawer.addEventListener('click', () => {
    drawers.forEach(d => d.classList.remove('active'));
    drawer.classList.add('active');

    // Show fan for this drawer
    const fans = drawer.querySelectorAll('.fan-system');
    fans.forEach(f => f.classList.add('active'));

    // Hide other drawers' fans
    drawers.forEach(d => {
      if (d !== drawer) {
        const otherFans = d.querySelectorAll('.fan-system');
        otherFans.forEach(f => f.classList.remove('active'));
      }
    });

    // Update room image
    const roomSrc = drawer.dataset.room;
    roomImage.src = roomSrc;

    // Hide furniture preview
    furniturePreview.innerHTML = '';
  });
});

// Fan items click → show sub-fan
const fanItems = document.querySelectorAll('.fan-item');
fanItems.forEach(item => {
  item.addEventListener('click', e => {
    e.stopPropagation();

    // Remove active from other sub-fans
    fanItems.forEach(i => {
      if (i !== item) i.querySelector('.sub-fan').classList.remove('active');
    });

    const subFan = item.querySelector('.sub-fan');
    subFan.classList.toggle('active');
  });
});

// Furniture item click → preview in main display
const furnitureItems = document.querySelectorAll('.furniture-item');
furnitureItems.forEach(f => {
  f.addEventListener('click', e => {
    e.stopPropagation();
    const src = f.dataset.src;
    furniturePreview.innerHTML = `<img src="${src}" width="200">`;
  });
});
