//MAIN OBJECTIVE: Get the weather data from API and return data to user

//function to get data from API
//city is a parameter because the API expects a city
function getWeather(cityName) {
    //if statement parameter to check if a city name was pass by user
    //else show error
    if (cityName) {
        //if is true then request from server
        var weatherHTTP = new XMLHttpRequest();
        //onreadystatechange return the loading status of current document
        // QUESTION is it like $(document).ready();
        weatherHTTP.onreadystatechange = function () {
            //so we request from server via XML
            //then we checked if document and server is ready
            if (this.readyState == 4 && this.status == 200) {
                //if is true, if both are ready
                //convert string data into json (obejcts), otherwise JavaScript wont be able to read it. Using JSON.parse
                // then display it as my displayWeather function says.
                var weatherData = displayWeather(JSON.parse(weatherHTTP.responseText));

                console.log(weatherData);
                document.getElementById('weather-display').innerHTML = weatherData;
                document.getElementById('city-name').value = '';
            }
        };
        //sending a request to server using open and send methods
        //syntax resume GET the data from the API + cityName (from user) + use metrics units + my API key
        weatherHTTP.open('GET', 'api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=af2e529daf727ec2cbec62e2e2a2484b')
        weatherHTTP.send();
    }
    //if something went wrong, show a error message
    else {
        alert('Sorry, something went wrong. You must enter a city name! Check spelling, if the error persist we might not have it in our catalog.')
    }
    return false;
}

function displayWeather(weatherData) {
    console.log(weatherData.name)
}