// Wait until the HTML document is fully loaded before running JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // ▼▼▼ Get references to HTML elements using their IDs ▼▼▼
  const cityInput = document.getElementById("city-input"); // Text input for city name
  const getWeatherBtn = document.getElementById("get-weather-btn"); // "Get Weather" button
  const weatherInfo = document.getElementById("weather-info"); // Container for weather results
  const cityNameDisplay = document.getElementById("city-name"); // Element to show city name
  const temperatureDisplay = document.getElementById("temperature"); // Element to show temperature
  const descriptionDisplay = document.getElementById("description"); // Element to show weather description
  const errorMessageDisplay = document.getElementById("error-message"); // Element for error messages

  // ▲▲▲ These variables now hold references to our HTML elements ▲▲▲

  // Add click event listener to the "Get Weather" button
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim(); // Get user input and remove whitespace
    if (!city) {
      // Check if input is empty
      return; // If empty, do nothing and exit
    }

    try {
      // Try to get weather data (might fail if city is invalid)
      const data = await fetchWeatherData(city); // Wait for API response
      displayWeatherData(data); // If successful, show weather data
    } catch (error) {
      showError(); // If failed, show error message
    }
  });

  // ▼▼▼ Function to get weather data from API ▼▼▼
  async function fetchWeatherData(city) {
    const API_KEY = "fb212eb52f5cd8a573331cf7862700e1"; // Secret key for OpenWeatherMap API
    // Create API URL with city name and units (metric = Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url); // Send request to API
    if (!response.ok) {
      // Check if response failed (404, 500 errors etc.)
      throw new Error("City not found"); // Trigger catch block
    }
    return response.json(); // Convert response to JSON format
  }

  // ▲▲▲ This function handles communication with the weather API ▲▲▲

  // ▼▼▼ Function to display weather data ▼▼▼
  function displayWeatherData(data) {
    // Extract needed information from API response
    const cityName = data.name; // City name from response
    const temp = data.main.temp; // Temperature from main data
    const description = data.weather[0].description; // First weather description

    // Update HTML elements with new data
    cityNameDisplay.textContent = cityName; // Set city name
    temperatureDisplay.textContent = `Temperature: ${temp}°C`; // Show temperature
    descriptionDisplay.textContent = `Weather: ${description}`; // Show description

    // Make weather info visible by removing 'hidden' class
    weatherInfo.classList.remove("hidden");
  }

  // ▼▼▼ Function to handle errors ▼▼▼
  function showError() {
    errorMessageDisplay.classList.remove("hidden"); // Show error message
    weatherInfo.classList.add("hidden"); // Hide weather info if visible
  }
});
