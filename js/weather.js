const searchBtn = document.getElementById("searchWeather");
if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
        const city = document.getElementById("cityInput").value.trim();
        if (!city) {
            alert("Please enter a city name");
            return;
        }
        try {
            // Step 1: Get Coordinates
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
            );
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
                document.getElementById("weatherResult").innerHTML =
                    "<p>❌ City not found</p>";
                return;
            }
            const { latitude, longitude, name, country } =
                geoData.results[0];
            // Step 2: Get Weather
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
            );
            const weatherData = await weatherResponse.json();
            document.getElementById("weatherResult").innerHTML = `
                <h3>${name}, ${country}</h3>
                <p>🌡 Temperature: ${weatherData.current.temperature_2m} °C</p>
                <p>💧 Humidity: ${weatherData.current.relative_humidity_2m}%</p>
                <p>🌬 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
            `;
            localStorage.setItem("lastCity", city);
        } catch (error) {
            document.getElementById("weatherResult").innerHTML =
                "<p>⚠️ Error fetching weather data</p>";
        }

    });

}