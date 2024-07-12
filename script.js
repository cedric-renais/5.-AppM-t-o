///////////////////////////////////////////////////////////////////////////////
// Selectionne les éléments du DOM pour le loader et l'affichage des erreurs //
///////////////////////////////////////////////////////////////////////////////

const loader = document.querySelector('.meteo-loader');
const errorTxt = document.querySelector('.meteo-error__txt');
const errorInfo = document.querySelector('.meteo-error__info');

//////////////////////////////////////////////////////////////////////////////////////
// Fonction récupérer les données de la météo                                       //
// On try/catch pour gérer les erreurs                                              //
// On fetch les données de l'API                                                    //
// On vérifie si la réponse est ok                                                  //
// Si non, on lance une erreur                                                      //
// Si oui, on récupère les données en JSON                                          //
// On stocke les données necessaires dans un objet                                  //
// On appelle la fonction populateUI pour afficher les données                      //
// Si une erreur est attrapée, on cache le loader et on affiche un message d'erreur //
//////////////////////////////////////////////////////////////////////////////////////

async function getMeteoData() {
  try {
    const response = await fetch(
      'https://api.airvisual.com/v2/nearest_city?key=8c38863c-e12b-4537-b545-31a03a3126e2'
    );
    if (!response.ok) {
      throw new Error(`${response.status}, ${response.statusText}`);
    }
    const responseData = await response.json();
    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      temperature: responseData.data.current.weather.tp,
      iconId: responseData.data.current.weather.ic,
    };
    populateUI(sortedData);
  } catch (error) {
    loader.classList.remove('meteo-loader--active');
    errorTxt.textContent = 'Une erreur est survenue';
    errorInfo.textContent = error.message;
  }
}
getMeteoData();

//////////////////////////////////////////////////////////////////
// Selectionne les éléments du DOM pour l'affichage des données //
//////////////////////////////////////////////////////////////////

const city = document.querySelector('.meteo-city');
const country = document.querySelector('.meteo-country');
const temperature = document.querySelector('.meteo-temperature');
const icon = document.querySelector('.meteo-icon__img');

/////////////////////////////////////////////////////////////////
// Fonction pour afficher les données                          //
// On affiche la ville                                         //
// On affiche le pays                                          //
// On affiche la température en Celsius                        //
// On affiche l'icone correspondant à la météo                 //
// Donne un width de 150px à l'icone avec une logical property //
// On cache le loader                                          //
/////////////////////////////////////////////////////////////////

function populateUI(data) {
  city.textContent = data.city;
  country.textContent = data.country;
  temperature.textContent = `${data.temperature}°C`;
  icon.src = `./sources/icons/${data.iconId}.svg`;
  icon.style.inlineSize = '150px';
  loader.classList.remove('meteo-loader--active');
}
