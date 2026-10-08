const input = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorMsg = document.getElementById('error');
const showWeatherDiv = document.getElementById('show-weather');

let catalogData = [];

const weatherData = {
    sunny: '☀️ Ачык күн',
    cloudy: '☁️ Булуттуу',
    rainy: '🌧 Жамгыр',
    snowy: '❄️ Кар'
};


async function loadData() {
    try {
        const response = await fetch('/data.json');
        catalogData = await response.json();
        console.log('Данные загружены');
        console.log(catalogData)
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

loadData();

searchBtn.addEventListener('click', () => {
    let query = input.value.trim();
    if (query === '') {
        errorMsg.hidden = false;
    }
    renderData(query);
    input.value = '';
})

function renderData(query) {
    let city = catalogData.find(el => el.name.toLowerCase() === query.toLowerCase());

    if (city === undefined) {
        showWeatherDiv.innerHTML = `❌ Кечиресиз, мындай шаар табылган жок.`;
    } else {
        let weatherTip = '';
        let weather = parseInt(city.temperature);

        if (weather >= 25) {
            weatherTip = '☀️ Бүгүн аба ысык.';
        } else if (weather >= 15 && weather <= 24) {
            weatherTip = '🌤 Аба ырайы жагымдуу.';
        } else if (weather >= 5 && weather <= 14) {
            weatherTip = '🧥 Аба салкын, жылуу кийиниңиз.';
        } else {
            weatherTip = '🥶 Аба абдан суук.';
        }
        showWeatherDiv.innerHTML = `
  <p class="city-name">📍${city.name}</p>
  <p class="temperature">🌡 Температура: ${city.temperature}°C</p>
  <p class="humidity">💧 Нымдуулук: ${city.humidity}%</p>
  <p class="wind">💨  Шамал: ${city.wind} км/саат</p>
  <p class="weather">${weatherData[city.weather]}</p>
  <p class="weatherTip">${weatherTip}</p>
`;
        errorMsg.hidden = true;
    }
}