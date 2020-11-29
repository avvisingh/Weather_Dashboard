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
const contentHolder1 = document.querySelector('.content-holder-1');
const contentHolder2 = document.querySelector('.content-holder-2');
const contentHolder3 = document.querySelector('.content-holder-3');
var searchHistory = [];
let latestSearch = JSON.parse(localStorage.getItem('searchHistory'));

if (localStorage.getItem('searchHistory')) {
    geocode(latestSearch[0]);
} else {
    contentHolder1.setAttribute('style', 'display:none');
    contentHolder2.setAttribute('style', 'display:none');
    contentHolder3.setAttribute('style', 'display:none');
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

submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

    searchHistory.unshift(locationInput.value);
    console.log(searchHistory);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log(localStorage.getItem('searchHistory'));
})
