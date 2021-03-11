//MAIN OBJECTIVE: Get the weather data from API and return data to user

/*Fetch Data*/
const getWeather = (cityName) => {
    //Fetch Data from the API I choose 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=af2e529daf727ec2cbec62e2e2a2484b`)
    .then(response => {
        //Then check the status of the request.
        if (response.status !== 200) {
            console.log(`Status Error ${response.status}`)
            return;
        }
        //Then Convert the data into json
        response.json().then(data => {
            //selecting the nodes from DOM with jquery
            let general = $("#general-info");
            let currentWeather = $("#current-weather");
            let forecast = $("#forecast");
            //convert json object into array.
            if (!Array.isArray(data)) data = [data];
            console.log(data);
            //function to create the page when load the document
            for (let weather of data) {
                // create variables from the object
                // city name, country
                let name = weather.name;
                let country = weather.sys.country;
                //temperature, temperature MAX n MIN
                let temp = weather.main.temp;
                let tempMax = weather.main.temp_max;
                let tempMin = weather.main.temp_min;
                //feels like, humidity, pressure
                let feel = weather.main.feels_like;
                let hum = weather.main.humidity;
                let press = weather.main.pressure;
                //sunrise and sunset
                let sunrise = weather.sys.sunrise;
                let sunset = weather.sys.sunset;
                //wind degrees and speed
                let windDeg = weather.wind.deg;
                let windSpeed = weather.wind.speed;
                //general info 
                let sky = weather.weather[0].description;
                let icon = weather.weather[0].icon;
                let main = weather.weather[0].main;
                let vis = weather.visibility;
                let dt = weather.dt;
                let timeZ = weather.timezone;

                //append the content with Jquery
                general.append(
                    `<h4>${name}, ${country} Weather</h4>` +
                    `<p>${temp} C°</p>` + 
                    `<p>${main}</p>` +
                    `${icon}` +
                    `<p>${tempMax}/${tempMin}`                  
                )
                currentWeather.append(
                    `<h4>Current Weather in ${name}, ${country} </h4>` + 
                    `${feel}` +
                    `<p> Feels Like</p>` + 
                    `Sunrise / Sunset ${sunrise} ${sunset}</p>` +
                    `<p>Max / Min ${tempMax}/${tempMin}</p>` +
                    `<p> Humidity ${hum}%</p>` +
                    `<p> Pressure ${press}mb</p>` +
                    `<p> Visibility ${vis}</p>` +
                    `<p> Wind ${windDeg}° / ${windSpeed}km/h</p>` + 
                    `<p> Sky ${icon} ${sky}</p>`
                )
                forecast.append(
                    `<h4>Daily Forecast`
                )
            }
        })  //then catch any error it might have
            .catch(error => {
                console.log(`We have some error ${error}`);
            })
    })

}

getWeather('Vancouver');

// $(document).ready(() => {

//     getWeather(); //when we load the page
//     let searchButton = $("#search");

//     //when we search for a city
//     searchButton.on('click', () => { 
//         $("current-weather").empty();
//         $("forecast").empty();
//         getWeather('Vancouver');
//     });

// })