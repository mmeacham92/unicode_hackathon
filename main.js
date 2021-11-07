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
      };
      searchedTokensList.push(currentToken);

      renderSections();
    });
}

function renderSections() {
  renderSearchSection();
  renderTokenList();
}

function renderSearchSection() {
  // details.classList.remove("hidden");
  // tokenDescription.innerHTML = currentToken.description;
  const currentPrice = document.querySelector("#price");
  const fetchedPrice = Number(currentToken.currentPrice).toFixed(2);
  currentPrice.innerText = fetchedPrice;
}

function renderTokenList() {
  const tokenList = document.querySelector(".tokens_list");
  tokenList.innerHTML = "";
  searchedTokensList.forEach((searchedToken) => {
    const tokenNameString =
      searchedToken.name[0].toUpperCase() + searchedToken.name.substring(1);
    const listItem = document.createElement("li");
    const html =
    `
    <span class='token_content'>
      <span class='token_name'>${tokenNameString}</span>
      <span class='token_symbol'>(${searchedToken.symbol.toUpperCase()})</span>
    </span>
    <span class='price_content'>$${searchedToken.currentPrice}</span>

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
