(() => {
  const btn = document.getElementById('newDog');
  const dogDiv = document.getElementById('dog');

  // Список пород
  const breeds = [
    'shiba',
    'retriever',
    'husky',
    'poodle',
    'beagle',
    'boxer',
    'bulldog',
    'chihuahua'
  ];

  async function fetchDogByBreed(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error('API вернуло ошибку');
    return data.message;
  }

  async function fetchRandomDog() {
    const url = `https://dog.ceo/api/breeds/image/random`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'success') throw new Error('API вернуло ошибку');
    return data.message;
  }

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = 'Загружаем...';
    dogDiv.innerHTML = '<div class="loading-message">Загружаем собачку...</div>';

    try {
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      let imageUrl;

      try {
        imageUrl = await fetchDogByBreed(randomBreed);
      } catch (err) {
        console.warn('Ошибка с породой, пробуем общий эндпоинт:', err);
        imageUrl = await fetchRandomDog();
      }

      const img = document.createElement('img');
      img.alt = `Собака (${randomBreed || 'random'})`;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.display = 'block';

      await new Promise((resolve, reject) => {
        let timedOut = false;
        const timeoutId = setTimeout(() => {
          timedOut = true;
          reject(new Error('Таймаут загрузки изображения'));
        }, 10000);

        img.onload = () => {
          if (!timedOut) {
            clearTimeout(timeoutId);
            resolve();
          }
        };

        img.onerror = () => {
          clearTimeout(timeoutId);
          reject(new Error('Ошибка загрузки изображения'));
        };

        img.src = imageUrl;
      });

      dogDiv.innerHTML = '';
      dogDiv.appendChild(img);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      dogDiv.innerHTML = `
        <div class="error-message">
          Упс… не получилось загрузить собачку 😔<br>
          Попробуй ещё раз.
        </div>
      `;
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  console.log('dogs.js успешно загружен ✅');
})();
