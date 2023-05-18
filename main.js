const submit = document.getElementById('check');
var mainContent = document.getElementById('main-content');
mainContent.style.display = 'none';
submit.addEventListener('click', (e) => {
    e.preventDefault()
    const location = document.getElementById('location').value.trim();
    const choose = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    if (location === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter a location to check the weather condition.'
        })
    } else {
        const apiKey = '715c2c7e59aa4cb9b2c33911231205';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
        // const apiKey = 'ae7c233ae5736594cf5d9b5d1f5ca05c';
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},np&appid=${apiKey}`;

        const getData = async (url) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (!response.ok) {
                    const error = data.error.message;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error
                    })
                }
                placeName = data.location.name + " , " + data.location.country;
                if (choose === 'celsius') {
                    var feelsLikeV = data.current.feelslike_c + "°C";
                    var currentTemperature = data.current.temp_c + "°C";
                } else {
                    var feelsLikeV = data.current.feelslike_f + "°F";
                    var currentTemperature = data.current.temp_f + "°F";
                }
                const humidityV = data.current.humidity + "%";
                const windV = data.current.wind_kph + " Km/hr";
                const conditionText = data.current.condition.text;
                const conditionIcon = 'https:'+ data.current.condition.icon;
                const cardBody = document.getElementById('cardBody');
                const placeContainer = document.createElement('h4');
                placeContainer.className = 'mb-1 sfw-normal';
                placeContainer.innerText = placeName;
                cardBody.appendChild(placeContainer);
                const temperatureField = document.createElement('p');
                temperatureField.className = 'mb-2';
                temperatureField.innerText = 'Current temperature: ';
                const temperatureValueField = document.createElement('strong');
                temperatureValueField.innerText = currentTemperature;
                temperatureField.appendChild(temperatureValueField);
                cardBody.appendChild(temperatureField);
                const feelsLike = document.createElement('p');
                feelsLike.innerText = 'Feels like: ';
                const feelsLikeValueField = document.createElement('strong');
                feelsLikeValueField.innerText = feelsLikeV;
                feelsLike.appendChild(feelsLikeValueField);
                cardBody.appendChild(feelsLike);
                const humidity = document.createElement('p');
                humidity.innerText = 'Humidity: ';
                const humidityValueField = document.createElement('strong');
                humidityValueField.innerText = humidityV;
                humidity.appendChild(humidityValueField);
                cardBody.appendChild(humidity);
                const wind = document.createElement('p');
                wind.innerText = 'Wind : ';
                const windValueField = document.createElement('strong');
                windValueField.innerText = windV;
                wind.appendChild(windValueField);
                cardBody.appendChild(wind);
                const flexContainer = document.createElement('div');
                flexContainer.className = 'd-flex flex-row align-items-center';
                const condition = document.createElement('p');
                condition.className = 'mb-0 me-4';
                condition.innerText = conditionText;
                flexContainer.appendChild(condition);
                const conIcon = document.createElement('img');
                conIcon.src = conditionIcon;
                conIcon.alt = "Weather Condition";
                flexContainer.appendChild(conIcon);
                cardBody.append(flexContainer);
                mainContent.style.display = 'block';
                document.getElementById('location').value = '';
                Swal.fire(
                    'Success!',
                    'Thankyou for choosing us!',
                    'success'
                )
            } catch (error) {
                document.getElementById('location').value = '';
            }
        }
        getData(url);
    }
})


