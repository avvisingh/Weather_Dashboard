const geocode = (address) => {
    address = encodeURIComponent(locationInput.value);

    const query1URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZ2aXNpbmdoIiwiYSI6ImNrZ2l4YjFnMzBhd3kzMnBpNnJxd25uMXgifQ.UyfTNowjHn_ZL1OuGedYug&limit=1';

    $.ajax({
        url: query1URL,
        method: "GET",
        success: ({ features }) => {
            var lat = encodeURIComponent(features[0].center[0]);
            var long = encodeURIComponent(features[0].center[1]);

            console.log(lat);
            console.log(long);

            const query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=821c074a78abf4fa2fadf03d18db1e79`;

            try {
                $.ajax({
                    url: query2URL,
                    method: "GET",
                    success: (res) => {
                        console.log(res);
                    }
                })
            } catch (err) {
                console.log(err);
            }

        }
    })
};