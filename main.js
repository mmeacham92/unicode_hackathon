const input = document.querySelector("input");
const button = document.querySelector("button");
const tokenDescription = document.querySelector("#token_description");
const details = document.querySelector("details");

const searchedTokensList = [];
let currentToken = {};

function getTokenData(token) {
  fetch(`https://api.coingecko.com/api/v3/coins/${token}
`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentToken = {
        name: token,
        symbol: data.symbol,
        currentPrice: data.market_data.current_price.usd,
        description: data.description.en,
        imageSrc: data.image.small,
        marketCap: data.market_data.market_cap.usd,
      };
      searchedTokensList.push(currentToken);

      renderSections();
    });
}

function renderSections() {
  renderSearchResults();
  renderTokenList();
}

function renderTokenList() {
  const tokenList = document.querySelector(".tokens_list");
  tokenList.innerHTML = "";
  searchedTokensList.forEach((searchedToken) => {
    const tokenNameString =
      searchedToken.name[0].toUpperCase() + searchedToken.name.substring(1);
    const listItem = document.createElement("li");
    listItem.classList.add('tokens_list-item');
    const html =
    `
    <span class='token_content'>
      <span class='token_name'>${tokenNameString}</span>
      <span class='token_symbol'>(${searchedToken.symbol.toUpperCase()})</span>
    </span>
    <span class='price_content'>$${searchedToken.currentPrice.toFixed(2)}</span>

    `;
    // <button class='list_item-button'>X</button>
    listItem.innerHTML = html;

    const itemButton = document.createElement('button');
    itemButton.textContent = 'X';
    itemButton.classList.add('list_item-button');
    listItem.append(itemButton);

    itemButton.addEventListener('click', function() {
      searchedTokensList.splice(searchedTokensList.indexOf(searchedToken), 1);
      renderTokenList();
    })
    
    tokenList.append(listItem);
  });
}

function renderSearchResults() {
  details.classList.remove("hidden");
  document.querySelector('.search_results-data').classList.remove('hidden');
  const imageElement = document.querySelector('.result_image');
  imageElement.src = currentToken.imageSrc;
  const nameElement = document.querySelector('.result_name')
  const currentPrice = document.querySelector("#price");
  const fetchedPrice = Number(currentToken.currentPrice).toFixed(2).toLocaleString('en-us');
  currentPrice.innerText = fetchedPrice;
  nameElement.textContent = currentToken.name[0].toUpperCase() + currentToken.name.substring(1);
  const marketCap = document.querySelector('#market_cap');
  marketCap.textContent = currentToken.marketCap.toLocaleString('en-us');
  const description = document.querySelector('.token_description');
  description.innerHTML = currentToken.description;

}

let update;

button.addEventListener("click", function () {
  let token = input.value.toLowerCase();
  getTokenData(token);
});


