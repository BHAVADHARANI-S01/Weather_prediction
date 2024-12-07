const apiKey = "a52798f9b25bd88a888e269b23ab4cf6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        // Fetch weather data from the API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();

        console.log(data); // Log API data for debugging purposes

        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        const weatherIcons = {
            clouds: "images/clouds.png",
            clear: "images/clear.png",
            rain: "images/rain.png",
            drizzle: "images/drizzle.png",
            mist: "images/mist.png",
        };

        // Show the matched icon or default to 'clouds.png'
        weatherIcon.src = weatherIcons[weatherCondition] || "images/clouds.png";
    } catch (error) {
        // Handle errors (e.g., invalid city name)
        alert(error.message);
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Get user input and trim whitespace
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
