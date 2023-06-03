// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "892a8a97aaa1de2c65c849ca5bce662d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?q="
}

const searchInput = document.getElementById('input-box');
searchInput.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13){
        console.log(searchInput.value);
        getWeatherReport(searchInput.value);
    }
});

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather){
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;
    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let tempmaxmin = document.getElementById('min-max');
    tempmaxmin.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;
    let datetime = document.getElementById('date');
    let todayDate = new Date();
    datetime.innerHTML = dateManage(todayDate);
}

function dateManage(todayDate){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = todayDate.getFullYear();
    let month = months[todayDate.getMonth()];
    let date = todayDate.getDate();
    let day = days[todayDate.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

