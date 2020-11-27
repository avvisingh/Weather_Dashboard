const geocode = (address) => {
    address = encodeURIComponent(locationInput.value) || latestSearch[0];


    const query1URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZ2aXNpbmdoIiwiYSI6ImNrZ2l4YjFnMzBhd3kzMnBpNnJxd25uMXgifQ.UyfTNowjHn_ZL1OuGedYug&limit=1';

    try {
        $.ajax({
            url: query1URL,
            method: "GET",
            success: ({ features }) => {
                console.dir(features);

                var locationSearched = features[0].place_name;
                var lat = encodeURIComponent(features[0].center[1]);
                var long = encodeURIComponent(features[0].center[0]);

                console.log(locationSearched);
                console.log(lat);
                console.log(long);

                const query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=821c074a78abf4fa2fadf03d18db1e79`;

                try {
                    $.ajax({
                        url: query2URL,
                        method: "GET",
                        success: (res) => {
                            console.dir(res);

                            const unixTimeStamp = res.current.dt;
                            const milliseconds = unixTimeStamp * 1000;
                            const dateObject = new Date(milliseconds);
                            const currentTemp = res.current.temp;
                            const currentHumidity = res.current.humidity;
                            const currentWindSpeed = res.current.wind_speed;
                            const weatherIcon = res.current.weather[0].icon;
                            const weatherIconSrc = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                            const weatherDescriptionType = res.current.weather[0].description;
                            const UVRating = res.current.uvi;
                            console.log(typeof UVRating);

                            const weekday = dateObject.toLocaleString('en-US', { weekday: 'long' });
                            const day = dateObject.toLocaleString('en-US', { day: 'numeric' });
                            const month = dateObject.toLocaleString('en-US', { month: 'long' });
                            const year = dateObject.toLocaleString('en-US', { year: 'numeric' });
                            const dateOfSearch = `Date: ${weekday}, ${day}-${month}-${year}`;

                            dateDisplay.textContent = dateOfSearch;
                            locationDisplay.textContent = locationSearched;
                            currentTempDisplay.textContent = `Current Temperature: ${currentTemp} Degrees`;
                            currentHumidityDisplay.textContent = `Current Humidity: ${currentHumidity}%`;
                            currentWindSpeedDisplay.textContent = `Current Wind Speed: ${currentWindSpeed} metres/second`;
                            weatherIconDisplay.setAttribute('src', weatherIconSrc);
                            weatherDescription.textContent = `The current Weather Description is: "${weatherDescriptionType}"`;

                            if (UVRating <= 2) {
                                let UVDisplayHTML = `The Midday UV Index today is ${UVRating}, which is rated as "Favourable" <div id="UV-Colour"></div>`;
                                UVIDisplay.innerHTML = UVDisplayHTML;
                                let UVColourDisplay = document.getElementById('UV-Colour');
                                UVColourDisplay.setAttribute('style', 'background-color:#40e02b');
                                weatherIconBackground.setAttribute('style', 'background-color:#f0e181');
                            } else if (UVRating > 2 && UVRating <= 5) {
                                let UVDisplayHTML = `The Midday UV Index today is ${UVRating}, which is rated as "Moderate". It is not recommended to spend time under the Sun unprotected. <div id="UV-Colour"></div>`;
                                UVIDisplay.innerHTML = UVDisplayHTML;
                                let UVColourDisplay = document.getElementById('UV-Colour');
                                UVColourDisplay.setAttribute('style', 'background-color:#ebe70e');
                                weatherIconBackground.setAttribute('style', 'background-color:#f0e181');
                            } else {
                                let UVDisplayHTML = `The Midday UV Index today is ${UVRating}, which is rated as "Severe". It is not recommended to spend time under the Sun unprotected. <div id="UV-Colour"></div>`;
                                UVIDisplay.innerHTML = UVDisplayHTML;
                                let UVColourDisplay = document.getElementById('UV-Colour');
                                UVColourDisplay.setAttribute('style', 'background-color:#e31809');
                                weatherIconBackground.setAttribute('style', 'background-color:#f0e181');
                            }
                        }
                    })
                } catch (err) {
                    console.log(err);
                }

            }
        })
    } catch (err) {

    }

};