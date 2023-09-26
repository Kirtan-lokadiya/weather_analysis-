document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "d811007a67c490bd3aa52a9d6a6a776c"; 
    
    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");
    const cityNameElement = document.getElementById("cityName");
    const weatherDescriptionElement = document.getElementById("weatherDescription");
    const temperatureElement = document.getElementById("temperature");
    const minMaxTempElement = document.getElementById("minMaxTemp");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");

    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location === "") return;

        fetchWeatherData(location);
    });

    locationInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const location = locationInput.value.trim();
            if (location === "") return;

            fetchWeatherData(location);
        }
    });

    async function fetchWeatherData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("Weather data not found.");
            }

            const data = await response.json();

            cityNameElement.textContent = data.name + ", " + data.sys.country;
            weatherDescriptionElement.textContent = data.weather[0].description;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            minMaxTempElement.textContent = `Min/Max Temperature: ${data.main.temp_min}°C / ${data.main.temp_max}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            cityNameElement.textContent = "Location not found.";
            clearWeatherData();
        }
    }

    function clearWeatherData() {
        weatherDescriptionElement.textContent = "";
        temperatureElement.textContent = "";
        minMaxTempElement.textContent = "";
        humidityElement.textContent = "";
        windSpeedElement.textContent = "";
    }
});
