let input = document.querySelector('input');
let button = document.querySelector('button');

function getTokenData(token) {
  fetch(`https://api.coingecko.com/api/v3/coins/${token}
`).then(response => response.json())
  .then(data => {
  console.log(data);
//   let currentPrice = document.querySelector('#price');
//   let fetchedPrice = Number(data.data.priceUsd).toFixed(2);
//   currentPrice.innerText = fetchedPrice;
});
}

function addTokenToList() {

}

let update;

// button.addEventListener('click', function() {
//   clearInterval(update);
//   let token = input.value.toLowerCase();
//   update = setInterval(() => {
//   getTokenData(token);
// }, 1000);
// })

button.addEventListener('click', function() {
    let token = input.value.toLowerCase();
    getTokenData(token)
})