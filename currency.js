const btn = document.getElementById('convert');
const resultDiv = document.getElementById('result');

async function fetchExchangeRate(amount, from, to) {
  // Пробуем сначала основной API
  try {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error('API вернул ошибку');
    }
    return data;
  } catch (error) {
    // Если основной API не работает, пробуем резервный
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    if (!res.ok) {
      throw new Error(`Оба API недоступны! Статус: ${res.status}`);
    }
    const data = await res.json();
    if (!data.rates || !data.rates[to]) {
      throw new Error('Не удалось получить курс обмена');
    }
    // Рассчитываем конвертацию вручную
    return {
      result: amount * data.rates[to],
      success: true
    };
  }
}

btn.addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  if (!amount || isNaN(amount)) {
    resultDiv.innerText = 'Пожалуйста, введите корректную сумму';
    resultDiv.style.color = '#dc3545';
    resultDiv.classList.add('show');
    return;
  }

  try {
    btn.disabled = true;
    btn.innerText = 'Загрузка...';
    resultDiv.classList.remove('show');

    const data = await fetchExchangeRate(amount, from, to);

    resultDiv.style.color = '#185a9d';
    resultDiv.innerText = `${Number(amount).toLocaleString()} ${from} = ${data.result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ${to}`;

  } catch (error) {
    console.error('Ошибка:', error);
    resultDiv.style.color = '#dc3545';
    resultDiv.innerText = `Ошибка: ${error.message}`;
  } finally {
    btn.disabled = false;
    btn.innerText = 'Конвертировать';
    resultDiv.classList.add('show');
  }
});
