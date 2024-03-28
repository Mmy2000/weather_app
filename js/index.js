var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        let data = await response.json();
        displayWeather(data.location, data.current, data.forecast.forecastday);
    } catch (error) {
        console.error(error.message);
        // Display error message to the user
    }
}

function displayWeather(location, current, forecast) {
    let forecastHTML = '';

    // Display current weather
    forecastHTML += `
        <div class="weather-card today">
            <div class="day">${days[new Date(current.last_updated).getDay()]}</div>
            <div class="date">${new Date(current.last_updated).getDate()} ${monthNames[new Date(current.last_updated).getMonth()]}</div>
            <div class="location">${location.name}</div>
            <div class="temperature">${current.temp_c}°C</div>
            <div class="weather-icon">
                <img src="https:${current.condition.icon}" alt="${current.condition.text}">
            </div>
            <div class="condition">${current.condition.text}</div>
            <div class="details">
                <span>Humidity: ${current.humidity}%</span>
                <span>Wind: ${current.wind_kph} km/h</span>
            </div>
        </div>
    `;

    // Display forecast for next days
    forecast.forEach((day, index) => {
        if (index !== 0) { // Skip today
            forecastHTML += `
                <div class="weather-card">
                    <div class="day">${days[new Date(day.date).getDay()]}</div>
                    <div class="temperature">${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C</div>
                    <div class="weather-icon">
                        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                    </div>
                    <div class="condition">${day.day.condition.text}</div>
                </div>
            `;
        }
    });

    document.getElementById("forecast").innerHTML = forecastHTML;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    let city = e.target.value.trim();
    if (city !== '') {
        search(city);
    }
    });
search("Cairo");
