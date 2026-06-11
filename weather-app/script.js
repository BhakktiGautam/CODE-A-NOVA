const apiKey = "84dcbd0f74750c6df9e87aabffef6fd2";
const errorMsg = document.getElementById("error-msg");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
     errorMsg.textContent = ""; 
    searchBtn.textContent = "Loading...";
    searchBtn.disabled = true;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("❌ City not found! Check spelling.");
        
        const data = await response.json();
        updateWeatherDisplay(data); // ✅ function call
        fetchForecast(city);
    } catch (error) {
      errorMsg.textContent = error.message;
    }finally{
        searchBtn.textContent = "Go";
        searchBtn.disabled = false;
    }
}

// ✅ ye function tha hi nahi tere code mein
function updateWeatherDisplay(data) {
    document.getElementById("weather-desc").textContent = data.weather[0].description;
    document.getElementById("feels-like-display").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("temp-display").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("location-display").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("humidity-display").textContent = `${data.main.humidity}%`;
    document.getElementById("wind-display").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    const iconMap = {
        Clear: "☀️", Clouds: "☁️", Rain: "🌧️",
        Drizzle: "🌦️", Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️"
    };
    document.getElementById("weather-icon").textContent = iconMap[data.weather[0].main] || "🌤️";
     updateBackground(data.weather[0].main);
}

async function fetchForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const iconMap = {
        Clear: "☀️", Clouds: "☁️", Rain: "🌧️",
        Drizzle: "🌦️", Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️"
    };

    // Har din ka ek entry lo (noon ke aaspaas)
    const daily = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toDateString();
        if (!daily[day]) daily[day] = item;
    });

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    Object.values(daily).slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = days[date.getDay()];
        const temp = Math.round(item.main.temp);
        const icon = iconMap[item.weather[0].main] || "🌤️";

        forecastContainer.innerHTML += `
            <div class="forecast-card">
                <div class="day">${dayName}</div>
                <div class="fc-icon">${icon}</div>
                <div class="fc-temp">${temp}°C</div>
            </div>`;
    });
}
function updateBackground(condition) {
    const bgMap = {
        Clear: "sunny",
        Rain: "rainy",
        Drizzle: "rainy",
        Clouds: "cloudy",
        Snow: "snowy",
        Thunderstorm: "stormy",
        Mist: "cloudy",
        Fog: "cloudy"
    };

    // pehle saari classes hatao
    document.body.className = "";
    // nai class lagao
    document.body.classList.add(bgMap[condition] || "sunny");
}