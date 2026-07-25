// http://api.weatherapi.com/v1/current.json?key=b40cfb9e8ac148c69bd45424260707&q=${targetLocation}&aqi=no
const temp = document.querySelector('.temp .temp-value');
const locationNameElement = document.querySelector('.temp .location-name');
const locationText = document.querySelector('.time_location p:first-child');
const time = document.querySelector('.time_location p:last-child');
const condition = document.querySelector('.condition p:last-child');
const weatherIcon = document.querySelector('.weather-icon');
const searchInput = document.querySelector('input.search-bar');
const form = document.querySelector('form');

form.addEventListener('submit', searchLocation);

let targetLocation = 'London';

const fetchResults = async () => {
    let url = `https://api.weatherapi.com/v1/current.json?key=b40cfb9e8ac148c69bd45424260707&q=${targetLocation}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    let locationName = data.location.name;
    let locationTime = data.location.localtime;
    let locationTemp = data.current.temp_c;
    let locationCondition = data.current.condition.text;
    updateUI(locationName, locationTime, locationTemp, locationCondition);
};

function updateUI(locationName, locationTime, locationTemp, locationCondition) {
    let splitTime = locationTime.split(' ');
    let splitDate = splitTime[0].split('-');
    let [year, month, day] = splitDate.map(Number);
    let currentDate = getDayName(new Date(year, month - 1, day).getDay());
    let formattedDate = `${month}/${day}/${year}`;

    locationNameElement.textContent = locationName;
    time.textContent = `${currentDate} ${formattedDate} ${splitTime[1]}`;
    temp.textContent = `${locationTemp}°C`;
    condition.textContent = locationCondition;
    weatherIcon.innerHTML = `<span style="font-size: 3rem;">${getWeatherEmoji(locationCondition)}</span>`;
}

function searchLocation(event) {
    event.preventDefault();
    targetLocation = searchInput.value;
    fetchResults(targetLocation);
}

fetchResults(targetLocation);

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}

function getWeatherEmoji(condition) {
    const text = condition.toLowerCase();

    if (text.includes('sun')) return '☀️';
    if (text.includes('cloud')) return '☁️';
    if (text.includes('rain')) return '🌧️';
    if (text.includes('snow')) return '❄️';
    if (text.includes('thunder')) return '⛈️';
    if (text.includes('mist') || text.includes('fog')) return '🌫️';

    return '🌤️';
}