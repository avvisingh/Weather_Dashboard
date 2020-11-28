const submitBttn = document.getElementById('location-search-button');
const locationInput = document.getElementById('search-location');
const locationDisplay = document.getElementById('location-searched');
const dateDisplay = document.getElementById('date-display');
const currentTempDisplay = document.getElementById('current-temp');
const currentHumidityDisplay = document.getElementById('current-humidity');
const currentWindSpeedDisplay = document.getElementById('current-wind-speed');
const weatherIconDisplay = document.getElementById('current-weather-icon');
const weatherIconBackground = document.getElementById('img-background');
const weatherDescription = document.getElementById('weather-description');
const UVIDisplay = document.getElementById('uv-index');
const NextFiveOne = document.getElementById('next-five-one');
var searchHistory = [];
let latestSearch = JSON.parse(localStorage.getItem('searchHistory'));

if (searchHistory != []) {
    geocode(latestSearch[0]);
}

let convertToDate = (unixTimeStamp) => {
    let milliseconds = unixTimeStamp * 1000;
    let dateObject = new Date(milliseconds);
    let weekday = dateObject.toLocaleString('en-US', { weekday: 'long' });
    let day = dateObject.toLocaleString('en-US', { day: 'numeric' });
    let month = dateObject.toLocaleString('en-US', { month: 'long' });
    let year = dateObject.toLocaleString('en-US', { year: 'numeric' });
    return `Date: ${weekday}, ${day}-${month}-${year}`;
}

// let nextFiveDaysWeather = (i) => {
//     let futureDate = convertToDate(res.daily[i].dt);
//     let futureIcon = res.daily[i].weather[0].icon;
//     let futureIconSrc = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`;
//     let futureTempDescription = res.daily[i].weather[0].description;
//     let futureTemp = res.daily[i].temp.day;
//     let futureHumidity = res.daily[i].humidity;

//     return
//     `
//         <div class="col col-lg-3 display-icons text-center">
//         ${futureDate}
//         </div>

//         <div class="col col-lg-3 display-icons text-center">
//             <div>
//                 <p class="future-weather-description">
//                     The forecasted weather description is ${futureTempDescription}
//                 </p>
//             </div>
//             <div class="future-img-background">
//                 <img src="${futureIconSrc}">
//             </div>
//         </div>

//         <div class="col col-lg-3 display-icons text-center">
//             <p>Forecasted day-time temperature: ${futureTemp}</p>
//         </div>

//         <div class="class="col col-lg-3 display-icons text-center">
//             <p>Forecasted Humidity: ${futureHumidity}</p>
//         </div>
//     `;
// }

submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

    searchHistory.unshift(locationInput.value);
    console.log(searchHistory);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log(localStorage.getItem('searchHistory'));
})
