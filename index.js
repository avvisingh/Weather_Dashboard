const submitBttn = document.getElementById('location-search-button');
const locationInput = document.getElementById('search-location');


submitBttn.addEventListener('click', (e) => {
    e.preventDefault();

    geocode(locationInput);

})