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
var searchHistory = [];
let latestSearch = JSON.parse(localStorage.getItem('searchHistory'));

if (searchHistory != []) {
    geocode(latestSearch[0]);
}

submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

    searchHistory.unshift(locationInput.value);
    console.log(searchHistory);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log(localStorage.getItem('searchHistory'));
})
