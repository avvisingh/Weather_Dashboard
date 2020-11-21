const submitBttn = document.getElementById('location-search-button');
const locationInput = document.getElementById('search-location');




submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    const location = encodeURIComponent(locationInput.value);
    const queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'
})