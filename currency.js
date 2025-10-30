const btn = document.getElementById('convert');

btn.addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  if (!amount) return alert('Введите сумму!');

  const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
  const data = await res.json();
  document.getElementById('result').innerText =
    `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
});
