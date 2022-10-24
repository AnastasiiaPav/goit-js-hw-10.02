
import Notiflix from "notiflix";


  export const fetchCountries = (name) => {
  return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`)
  .then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
.catch( error =>{
        Notiflix.Notify.failure('Oops, there is no country with that name');
        console.log(error)
     });
     }
