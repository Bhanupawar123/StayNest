const rating = document.getElementById('rating');
const ratingValue = document.getElementById('rating-value');
rating.addEventListener('input', () => {
  ratingValue.textContent = rating.value;
});