const btn = document.getElementById('newDog');
const dogDiv = document.getElementById('dog');

btn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    dogDiv.innerHTML = `<img src="${data.message}" alt="dog" />`;
  } catch {
    dogDiv.innerText = 'Ошибка загрузки картинки 🐾';
  }
});
