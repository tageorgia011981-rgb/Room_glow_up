// Glow stays lit on click
const innerCards = document.querySelectorAll('.tab-card-inner');

innerCards.forEach(card => {
  card.addEventListener('click', () => {
    innerCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
const roomsButton = document.getElementById('rooms-btn');
const cabinetImage = document.getElementById('main-cabinet');

roomsButton.addEventListener('click', function() {
  cabinetImage.classList.toggle('show-me');
});
