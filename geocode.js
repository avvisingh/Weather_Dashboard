const geocode = (address) => {
    address = encodeURIComponent(locationInput.value) || latestSearch[0];


    const query1URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZ2aXNpbmdoIiwiYSI6ImNrZ2l4YjFnMzBhd3kzMnBpNnJxd25uMXgifQ.UyfTNowjHn_ZL1OuGedYug&limit=1';

    try {
        $.ajax({
            url: query1URL,
            method: "GET",
            success: ({ features }) => {
                var locationSearched = features[0].place_name;
                var lat = encodeURIComponent(features[0].center[1]);
                var long = encodeURIComponent(features[0].center[0]);

                const query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=821c074a78abf4fa2fadf03d18db1e79`;

                try {
                    $.ajax({
                        url: query2URL,
                        method: "GET",
                        success: (res) => {

                            contentHolder1.setAttribute('style', 'display:block');
                            contentHolder2.setAttribute('style', 'display:block');
                            contentHolder3.setAttribute('style', 'display:block');

                            // Code for current-day weather display
                            const unixTimeStamp = res.current.dt;
                            const currentTemp = parseInt(res.current.temp);
                            const currentHumidity = res.current.humidity;
                            const currentWindSpeed = res.current.wind_speed;
                            const weatherIcon = res.current.weather[0].icon;
                            const weatherIconSrc = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                            const weatherDescriptionType = res.current.weather[0].description;
                            const UVRating = res.current.uvi;

                            const dateOfSearch = convertToDate(unixTimeStamp);

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

                            // Code for Next 5 days' weather
                            let nextFiveDaysWeather = (i) => {
                                let futureDate = convertToDate(res.daily[i].dt);
                                let futureIcon = res.daily[i].weather[0].icon;
                                let futureIconSrc = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`;
                                let futureTempDescription = res.daily[i].weather[0].description;
                                let futureTemp = parseInt(res.daily[i].temp.day);
                                let futureHumidity = res.daily[i].humidity;

                                let futureForecastDate = document.getElementById(`date-next-5-${i}`);
                                let futureForecastTempDescription = document.getElementById(`temp-description-next-5-${i}`);
                                let futureIconImg = document.getElementById(`icon-next-5-${i}`);
                                let futureIconImgBackground = document.getElementById(`icon-next-5-${i}-background`)
                                let futureTempDisplay = document.getElementById(`temp-next-5-${i}`);
                                let futureHumidityDisplay = document.getElementById(`humidity-next-5-${i}`);

                                futureForecastDate.textContent = futureDate;
                                futureForecastTempDescription.textContent = `Forecasted Weather Conditions are ${futureTempDescription}`;
                                futureIconImg.setAttribute('src', futureIconSrc);
                                futureIconImgBackground.setAttribute('style', 'background-color:#f0e181');
                                futureTempDisplay.textContent = `Forecasted Temperature: ${futureTemp} Degrees`;
                                futureHumidityDisplay.textContent = `Forecasted Humidity: ${futureHumidity}%`
                            }

                            for (i = 1; i <= 5; i++) {
                                nextFiveDaysWeather(i);
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