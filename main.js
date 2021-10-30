let input = document.querySelector('input');
let button = document.querySelector('button');

function getCoinData(coin) {
  fetch(`https://api.coincap.io/v2/assets/${coin}
`).then(response => response.json())
  .then(data => {
  console.log(data);
  let currentPrice = document.querySelector('#price');
  let fetchedPrice = Number(data.data.priceUsd).toFixed(2);
  currentPrice.innerText = fetchedPrice;
});
}

let update;

button.addEventListener('click', function() {
  clearInterval(update);
  let coin = input.value.toLowerCase();
  update = setInterval(() => {
  getCoinData(coin);
}, 1000);
})