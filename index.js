const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "bc71d1b4e1a2d355ac962b08aeb48774";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather } = data;
    const description = weather[0].description;
    const id = weather[0].id;

    // Clear previous content
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `Description: ${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
   switch(true){
    case(weatherId >= 200 && weatherId < 300):
    return "⛈️";
    case(weatherId >= 300 && weatherId < 400):
    return "⛈️";
    case(weatherId >= 500 && weatherId < 600):
    return "⛈️";
    case(weatherId >= 600 && weatherId < 700):
    return "❄️";
    case(weatherId >= 700 && weatherId < 800):
    return "🏳️";
    case(weatherId ===800 ):
    return "☀️";
    case(weatherId >= 801 && weatherId < 810):
    return "☁️";
    default:
        return"❔";
   }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
