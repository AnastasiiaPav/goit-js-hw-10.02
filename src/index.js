import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(event) {
  const startPage = event.target.value.trim();
  if (startPage !== '') {
    fetchCountries(startPage)
      .then(data => {
        if (data.length === 1) {
          shablon(data);
          listCountry.innerHTML = '';
        } else if (data.length <= 10 && data.length >= 2) {
          shablonList(data);
        } else if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}

function shablon(event) {
  const set = event
    .map(
      country => `<img src=${country.flags.svg} alt=${
        country.name
      } width='250'/>
   <h1>Name official: ${country.name.official}</h1>
   <p>Capital: ${country.capital}</p> 
   <p>Population: ${country.population} </p>
   <p>Languages: ${Object.values(country.languages)}</p>`
    )
    .join(' ');
  infoCountry.innerHTML = set;
}

function shablonList(event) {
  const list = event
    .map(countries => {
      return `<h1>Name official: ${countries.name.official}</h1>
      <img src='${countries.flags.svg}' alt='country name' width='50' />`;
    })
    .join('');
  return (listCountry.innerHTML = list);
}
