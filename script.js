const url = 'https://open-weather13.p.rapidapi.com/city/landon';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '79b66f9aebmshaa58184e50a2f12p1adb38jsna000e4f0c8e7',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

function getWeather(city) {
  const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;

  try {
      fetchWeather(url, city); // Pass city name to fetchWeather
  } catch (error) {
      console.error(error);
  }
}

async function fetchWeather(url, city) {
  // Assuming these elements exist in your HTML
  const cityName = document.getElementById('cityName'); // Define cityName here

  cityName.innerHTML = city; // Set city name

  try {
      const response = await fetch(url, options);
      const data = await response.json(); // Parse response JSON

      // Assuming these elements exist in your HTML
      const cloud_pct = document.getElementById('cloud_pct');
      const temp = document.getElementById('temp');
      const temp2 = document.getElementById('temp2');
      const feels_like = document.getElementById('feels_like');
      const humidity = document.getElementById('humidity');
      const humidity2 = document.getElementById('humidity2');
      const min_temp = document.getElementById('min_temp');
      const max_temp = document.getElementById('max_temp');
      const wind_speed = document.getElementById('wind_speed');
      const wind_speed2 = document.getElementById('wind_speed2');
      const sunrise = document.getElementById('sunrise');
      const sunset = document.getElementById('sunset');

      // Set innerHTML with data from the response
      cloud_pct.innerHTML = data.cloud_pct;
      temp.innerHTML = data.temp;
      temp2.innerHTML = data.temp;
      feels_like.innerHTML = data.feels_like;
      humidity.innerHTML = data.humidity;
      humidity2.innerHTML = data.humidity;
      min_temp.innerHTML = data.min_temp;
      max_temp.innerHTML = data.max_temp; // corrected case of 'max_temp'
      wind_speed.innerHTML = data.wind_speed;
      wind_speed2.innerHTML = data.wind_speed;
      sunrise.innerHTML = data.sunrise;
      sunset.innerHTML = data.sunset;

      console.log(data);
  } catch (error) {
      console.error(error);
  }
}

// Assuming you have these elements in your HTML
const cityInput = document.getElementById('city');
const submitButton = document.getElementById('submit');

// Call the function to trigger the API call
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(cityInput.value); // Pass cityInput value
});

// Initial call with default city
getWeather("Delhi");

function updateExistingCitiesWeatherInTable() {
  const existingCities = ['Kolkata', 'Lucknow', 'Moradabad', 'Kanpur', 'Gorakhpur'];
  existingCities.forEach(async (city) => {
      const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
      try {
          const response = await fetch(url, options);
          const data = await response.json();
          // Update weather data for the city
          updateTableRow(city, data);
      } catch (error) {
          console.error(error);
      }
  });
}

// Function to update table row with weather data for a given city
function updateTableRow(city, data) {
  const row = document.getElementById(city);
  if (row) {
      row.querySelector('#' + city + '_temp').innerText = data.temp;
      row.querySelector('#' + city + '_min_temp').innerText = data.min_temp;
      row.querySelector('#' + city + '_max_temp').innerText = data.max_temp;
      row.querySelector('#' + city + '_cloud_pct').innerText = data.cloud_pct;
      row.querySelector('#' + city + '_feels_like').innerText = data.feels_like;
      row.querySelector('#' + city + '_humidity').innerText = data.humidity;
      row.querySelector('#' + city + '_wind_speed').innerText = data.wind_speed;
      row.querySelector('#' + city + '_sunrise').innerText = data.sunrise;
      row.querySelector('#' + city + '_sunset').innerText = data.sunset;
  }
}

// Call the function to update weather details for existing cities in the table
updateExistingCitiesWeatherInTable();

// Function to fetch weather data for a specific city and update background
async function fetchWeatherAndUpdateBackground(city) {
  const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;

  try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Update weather data for the city
      updateTableRow(city, data);

      // Set background based on current temperature
      setBackgroundByTemperature(data.temp);

  } catch (error) {
      console.error(error);
  }
}

// Call the function to trigger the API call for the default city
fetchWeatherAndUpdateBackground('Delhi');

// Update background and weather info when the submit button is clicked
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  fetchWeatherAndUpdateBackground(city);
});

// Define temperature ranges and corresponding background images
const temperatureBackgrounds = [
  { minTemp: -Infinity, maxTemp: 10, backgroundImage: 'url(winter.jpg)' }, // Example: 'winter.jpg' is the background image for temperatures below 10°C
  { minTemp: 11, maxTemp: 20, backgroundImage: 'url(spring.jpg)' },
  { minTemp: 21, maxTemp: 30, backgroundImage: 'url(summer.jpg)' },
  { minTemp: 31, maxTemp: Infinity, backgroundImage: 'url(summer.jpg)' } // Example: 'summer.jpg' is the background image for temperatures above 30°C
];

// Function to set background image based on temperature
function setBackgroundByTemperature(temperature) {
  const body = document.body;
  let backgroundImage = '';

  // Find the background image corresponding to the temperature range
  temperatureBackgrounds.forEach(range => {
      if (temperature >= range.minTemp && temperature <= range.maxTemp) {
          backgroundImage = range.backgroundImage;
      }
  });

  // If a matching temperature range is found, set the background image
  if (backgroundImage) {
      body.style.backgroundImage = backgroundImage;
  } else {
      // Set default background image to the last defined background image
      const lastIndex = temperatureBackgrounds.length - 1;
      body.style.backgroundImage = temperatureBackgrounds[lastIndex];
  }
}

// Assuming you have these elements in your HTML
// Assuming you have these elements in your HTML
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Add event listener to each dropdown item
dropdownItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default action of anchor tag
        const cityName = event.target.textContent;
        fetchWeatherAndUpdateBackground(cityName); // Fetch weather and update background for selected city
        updateCityName(cityName); // Update the display name in "Weather for [City Name]"
        updateWeatherForDropdownCities(cityName); // Update weather details for dropdown cities
    });
});

// Function to update the display name in "Weather for [City Name]"
function updateCityName(cityName) {
    const cityNameElement = document.getElementById('cityName');
    cityNameElement.textContent = cityName;
}

// Function to update weather details for dropdown cities
//getWeather(cityName);
async function updateWeatherForDropdownCities(cityName) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        getWeather(cityName);
        //updateTableRow(cityName, data); // Update weather data for the selected city in the table
    } catch (error) {
        console.error(error);
    }
}