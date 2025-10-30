document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.index-card').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 80 * i);
  });
});