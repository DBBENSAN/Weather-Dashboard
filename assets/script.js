const API_KEY = "0fb854934bc58130931f8acc673ec22f";

//set document query selectors

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const cityMain = document.querySelector("#city");
const temperatureMain = document.querySelector("#temperature");
const humidityMain = document.querySelector("#humidity");
const dateMain = document.querySelector("#mainDate");
const windMain = document.querySelector("#wind");
const forecastContainer = document.querySelector("#forecastContainer");

// adds functions to run on window load

window.addEventListener("load", function () {
    getPreviousSearches();
    getWeather("Berkeley")
    getForecast("Berkeley")
});



function getPreviousSearches() {
    let previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    let previousSearchesContainer = document.getElementById("previousSearchesContainer");
    previousSearchesContainer.innerHTML = "";
    for (let city of previousSearches) {
        let previousSearchElement = document.createElement("div");
        previousSearchElement.innerHTML = city;
        previousSearchElement.addEventListener("click", function () {
            getWeather(city);
            getForecast(city);
        });
        previousSearchesContainer.appendChild(previousSearchElement);
    }
}

//adds a searched item into localStorage
function addToLocalStorage(city) {
    let previousSearches = JSON.parse(localStorage.getItem("previousSearches")) || [];
    if (!previousSearches.includes(city)) {
        previousSearches.push(city);
        localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
    }
}


//Allows for search functionality or the main display

function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            const weatherData = data;
            const temperature = weatherData.main.temp;
            const date = new Date(weatherData.dt * 1000).toLocaleDateString();
            const humidity = weatherData.main.humidity;
            const cityName = weatherData.name;
            const windSpeed = weatherData.wind.speed;
            cityMain.innerText = cityName;
            dateMain.innerText = date;
            temperatureMain.innerText = temperature + "??F";
            humidityMain.innerText = "Humidity: " + humidity + "%";
            windMain.innerText = "Wind: " + windSpeed + "mph";
        })
};


//for the selected city, display also the 5 day forecast, returns HTML to make the card divs
function getForecast(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            // Update the forecast container with the 5 day forecast data
            const forecastData = data;
            forecastContainer.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                const forecast = forecastData.list[i * 8];
                const temperature = forecast.main.temp;
                const weather = forecast.weather[0].description;
                const date = new Date(forecast.dt * 1000).toLocaleDateString();
                const windSpeed = forecast.wind.speed;
                const humidity = forecast.main.humidity;
                const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

                const forecastElement = document.createElement("div");
                forecastElement.classList.add("forecast-card");
                forecastElement.classList.add("col");
                forecastElement.innerHTML = `
                <h2>${date}</h2>
                <img src="${icon}" alt="${weather}" />
                <p>Temperature: ${temperature}??F</p>
                <p>Wind Speed: ${windSpeed} mph</p>
                <p>Humidity: ${humidity}%</p>
              `;
                forecastContainer.appendChild(forecastElement);
            }
        });
}


searchButton.addEventListener("click", function () {
    const city = searchInput.value;
    getWeather(city);
    getForecast(city);
    addToLocalStorage(city);
    getPreviousSearches();
});



