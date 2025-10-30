const btn = document.getElementById('getWeather');
const result = document.getElementById('result');

btn.addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  if (!city) return alert('Введите название города!');

  result.innerHTML = '<p>Загрузка...</p>';
  result.classList.remove('hidden');

  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    const info = data.current_condition[0];

    const html = `
      <h2>${city}</h2>
      <p class="desc">${info.weatherDesc[0].value}</p>
      <div class="temp">
        <span class="big">${info.temp_C}°C</span>
        <span class="feels">Ощущается как: ${info.FeelsLikeC}°C</span>
      </div>

      <div class="details-grid">
        <div><b>Влажность:</b> ${info.humidity}%</div>
        <div><b>Давление:</b> ${info.pressure} гПа</div>
        <div><b>Ветер:</b> ${info.windspeedKmph} км/ч ${info.winddir16Point}</div>
        <div><b>Облачность:</b> ${info.cloudcover}%</div>
        <div><b>Видимость:</b> ${info.visibility} км</div>
        <div><b>УФ индекс:</b> ${info.uvIndex}</div>
      </div>

      <p class="time">Время наблюдения: ${info.localObsDateTime}</p>
    `;

    result.innerHTML = html;
  } catch (e) {
    result.innerHTML = '<p class="error">Ошибка при получении данных 😞</p>';
  }
});
