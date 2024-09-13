document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');

    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(`${apiURL}?base=${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} => ${convertedAmount} ${to}`;
            });
    });
});
