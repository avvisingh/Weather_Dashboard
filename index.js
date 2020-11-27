const submitBttn = document.getElementById('location-search-button');
const locationInput = document.getElementById('search-location');
const locationDisplay = document.getElementById('location-searched');
const dateDisplay = document.getElementById('date-display');
const currentTempDisplay = document.getElementById('current-temp');
const currentHumidityDisplay = document.getElementById('current-humidity');
const currentWindSpeedDisplay = document.getElementById('current-wind-speed');
const weatherIconDisplay = document.getElementById('current-weather-icon');
const weatherDescription = document.getElementById('weather-description');
const UVIDisplay = document.getElementById('uv-index');

submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

    // localStorage.setItem()
})