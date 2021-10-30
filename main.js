const input = document.querySelector("input");
const button = document.querySelector("button");
const tokenDescription = document.querySelector('#token_description');
const details = document.querySelector('details');

const searchedTokensList = [];
let currentToken = {};




function getTokenData(token) {
  searchedTokensList.push(token);
  fetch(`https://api.coingecko.com/api/v3/coins/${token}
`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentToken = {
          name: token,
          symbol: data.symbol,
          currentPrice: data.market_data.current_price.usd,
          description: data.description.en
      }
      details.classList.toggle('hidden');
      tokenDescription.innerHTML = currentToken.description;
        const currentPrice = document.querySelector('#price');
        const fetchedPrice = Number(currentToken.currentPrice).toFixed(2);
        currentPrice.innerText = fetchedPrice;
    });
}

function renderTokenList() {
    const tokenList = document.querySelector('.tokens_list');
    searchedTokensList.forEach(searchedToken => {
        const listItem = document.createElement('li');
        listItem.textContent = searchedToken;
        tokenList.append(listItem);
    });
}

let update;

// button.addEventListener('click', function() {
//   clearInterval(update);
//   let token = input.value.toLowerCase();
//   update = setInterval(() => {
//   getTokenData(token);
// }, 1000);
// })

button.addEventListener("click", function () {
  let token = input.value.toLowerCase();
  getTokenData(token);
});
