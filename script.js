const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b45e96323fmshf5e4bc50d3b8a90p1e091djsnfb21cde4eb87',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
const getWeather = (city) => {
    cityName.innerHTML = city
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {

            console.log(response)

            cloud_pct.innerHTML = response.cloud_pct
            temp.innerHTML = response.temp
            temp2.innerHTML = response.temp
            feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            humidity2.innerHTML = response.humidity
            min_temp.innerHTML = response.min_temp
            max_temp.innerHTML = response.max_temp
            wind_speed.innerHTML = response.wind_speed
            wind_speed2.innerHTML = response.wind_speed
            wind_degrees.innerHTML = response.wind_degrees
            sunrise.innerHTML = response.sunrise
            sunset.innerHTML = response.sunset

                // Convert sunrise timestamp to hh:mm format
            const sunriseTimestamp = response.sunrise;
            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            sunrise.innerHTML = sunriseTime;

            // Convert sunset timestamp to hh:mm format
            const sunsetTimestamp = response.sunset;
            const sunsetDate = new Date(sunsetTimestamp * 1000);
            const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            sunset.innerHTML = sunsetTime;

        })
        .catch(err => console.log(err));
}
submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
})
getWeather("Delhi")


const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 'Singapore', 'Dubai', 'Bangkok'];

const getWeatherCommonCities = (city) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            response.city = city; // Add city name to the response object (not adding this line was giving undefined city name because of the he asynchronous nature of the fetch request. The displayWeatherData function is being called immediately after making the fetch request, but the response may not have been received yet.)
            displayWeatherData(response);
        })
        .catch(err => console.log(err));
};

const displayWeatherData = (data) => {
    const weatherTable = document.getElementById('weatherTable');
    const weatherBody = document.getElementById('weatherBody');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td><strong>${data.city}</strong></td>
    <td>${data.cloud_pct}</td>
    <td>${data.feels_like} °C</td>
    <td>${data.humidity} %</td>
    <td>${data.max_temp} °C</td>
    <td>${data.min_temp} °C</td>
    <td>${formatTimestamp(data.sunrise)}</td>
    <td>${formatTimestamp(data.sunset)}</td>
    <td>${data.temp} °C</td>
    <td>${data.wind_degrees}°</td>
    <td>${data.wind_speed} m/s</td>
  `;

    weatherBody.appendChild(row);
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const loadWeatherData = () => {
    cities.forEach((city) => {
        getWeatherCommonCities(city);
    });
};

loadWeatherData();