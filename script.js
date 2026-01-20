// Glow stays lit on click
const innerCards = document.querySelectorAll('.tab-card-inner');

innerCards.forEach(card => {
  card.addEventListener('click', () => {
    innerCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
