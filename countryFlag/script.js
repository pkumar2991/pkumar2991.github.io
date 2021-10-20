'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Render country details
const renderCountry = function (data, neighborCountryClass) {
  let languages = Object.values(data.languages).join();
  let currency = Object.values(data.currencies)[0];
  let cssClass = 'country';
  if (neighborCountryClass) {
    cssClass = cssClass + ' ' + neighborCountryClass;
  }
  const html = `
    <article class="${cssClass}">
        <img class="country__img" src=${data.flags.svg} />
        <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} M people</p>
        <p class="country__row"><span>🗣️</span>${languages}</p>
        <p class="country__row"><span>💰</span>${
          currency.name + ' (' + currency.symbol + ')'
        }</p>
        </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountry = function () {
  // Fetch Country Details
  const request = fetch('https://restcountries.com/v3.1/alpha?codes=in')
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      let neighbors = data[0].borders.join();
      if (!neighbors) return;

      return fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbors}`);
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        data.forEach(neighborCountry => {
          renderCountry(neighborCountry, 'neighbour');
        });
      } else {
        return;
      }
    })
    .catch(error => {
      error;
    })
    .finally(()=> {
        countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', ()=>{
    getCountry();

});