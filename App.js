let appid='534c920c8bf282912d9f1d2cf3567045';
let units='imperial';
let searchMethod;


function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`)
    .then(result => {
        return result.json();
    })
    .then( result => {
        init(result);
    })
}

function init(resultFromServer){
        switch(resultFromServer.weather[0].main){
            case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpeg")';
            break;

            case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpeg")';
            break;

            case 'Rain':
            case 'Drizzle':
            case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

            case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

            case 'Thunderstrom':
            document.body.style.backgroundImage = 'url("strom.jpg")';
            break;

            case 'Cloudy':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
            
            default:
                break;
        }
    let weatherDescHeader = document.getElementById('weatherdescheader');
    let temperatureElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humitdity');
    let windspeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityheader');
    let weatherIcon = document.getElementById('docIdImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultdescription = resultFromServer.weather[0].description;
    weatherDescHeader.innerText = resultdescription.charAt(0).toUpperCase() + resultdescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windspeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML= resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at  ' + resultFromServer.main.humidity + '%';

    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})