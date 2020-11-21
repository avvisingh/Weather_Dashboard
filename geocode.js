const submitBttn = document.getElementById('location-search-button');
const locationInput = document.getElementById('search-location');

const geocode = (address, callback) => {
    address = encodeURIComponent(locationInput.value);

    const queryURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZ2aXNpbmdoIiwiYSI6ImNrZ2l4YjFnMzBhd3kzMnBpNnJxd25uMXgifQ.UyfTNowjHn_ZL1OuGedYug&limit=1';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(({ features }) => {
        var lat = features[0].center[0];
        var long = features[0].center[1];

        console.log(lat);
        console.log(long);
    })
}


submitBttn.addEventListener('click', geocode);


