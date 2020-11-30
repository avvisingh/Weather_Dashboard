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
const dropdownContent = document.getElementById('dropdown-content');
let latestSearch = JSON.parse(localStorage.getItem('searchHistory'));

let convertToDate = (unixTimeStamp) => {
    let milliseconds = unixTimeStamp * 1000;
    let dateObject = new Date(milliseconds);
    let weekday = dateObject.toLocaleString('en-US', { weekday: 'long' });
    let day = dateObject.toLocaleString('en-US', { day: 'numeric' });
    let month = dateObject.toLocaleString('en-US', { month: 'long' });
    let year = dateObject.toLocaleString('en-US', { year: 'numeric' });
    return `Date: ${weekday}, ${day}-${month}-${year}`;
}

if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(`This is what init searchHistory looks like: ${searchHistory}`);
    console.log(`This is from within the 'if' statement which checks to see if localStorage is empty: ${searchHistory}`);
    geocode(latestSearch[0]);
    searchHistory.forEach((el) => {
        let newpara = document.createElement('P');
        newpara.innerHTML = el;
        dropdownContent.appendChild(newpara);
    });
} else {
    searchHistory = [];
    console.log(`This is what init searchHistory looks like: ${searchHistory}`);
    contentHolder1.setAttribute('style', 'display:none');
    contentHolder2.setAttribute('style', 'display:none');
    contentHolder3.setAttribute('style', 'display:none');
}

submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

    searchHistory.unshift(locationInput.value);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
})
