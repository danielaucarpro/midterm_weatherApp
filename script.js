//MAIN OBJECTIVE: Get the weather data from API and return data to user

$(document).ready(() => {
    //when we load the page load vancouver as default
    getWeather("Vancouver");

})

// when we search for a city
function changeCity() {
    getWeather('');
    var cityName = $("myInput").value;
    $("#general-info").empty();
    $("#current-weather").empty();
    $("#forecast").empty();
    getWeather(cityName);
}

/*Get Weather Fetch Data*/
const getWeather = (cityName) => {
    //Fetch Data from the API I choose 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=af2e529daf727ec2cbec62e2e2a2484b`)
        .then(response => {
            //Then check the status of the request. If is different than 200 show me the error
            if (response.status !== 200) {
                console.log(`Status Error ${response.status}`)
                return;
            }
            //Then Convert the data into json
            response.json().then(data => {
                //selecting the nodes from DOM with jquery
                let title = $("#title-general");
                let generalTemp = $("#general-temp");
                let generalMain = $("#general-main");
                let generalIcon = $("#general-icon");
                let generalMaxMin = $('#general-maxMin')
                let currentTitle = $("#title-current");
                let currentFeels = $("#current-feels");
                let currentFeelsText = $("#current-feels-text");
                let currentSun = $(".current-data");
                //convert json object into array.
                if (!Array.isArray(data)) data = [data];
                //console.log to help me find the data I want
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
                    var date = new Date();
                    dt = date;
                    let timeZ = weather.timezone;

                    //append the content with Jquery
                    title.append(
                        `<h4>${name}, ${country} Weather</h4>` +
                        `<p>${dt}`
                    )
                    generalTemp.append(
                        `<p>${temp} C°</p>`
                    )
                    generalMain.append(
                        `<p>${main}</p>`
                    )
                    generalIcon.append(
                        `<img src="http://openweathermap.org/img/w/${icon}">`
                    )
                    generalMaxMin.append(
                        `<p>${tempMax}° / ${tempMin}°</p>`
                    )
                    currentTitle.append(
                        `<h4>Current Weather in ${name}, ${country} </h4>`
                    )
                    currentFeels.append(
                        `${feel} C°`
                    )
                    currentFeelsText.append(
                        `<p>Feels Like</p>`
                    )
                    currentSun.append(
                        `<hr>` +
                        `<p>Sunrise / Sunset ${sunrise} ${sunset}</p>` +
                        `<hr>` +
                        `<p>Max / Min ${tempMax}° / ${tempMin}°</p>` +
                        `<hr>` +
                        `<p> Humidity ${hum}%</p>` +
                        `<hr>` +
                        `<p> Pressure ${press}mb</p>` +
                        `<hr>` +
                        `<p> Visibility ${vis}</p>` +
                        `<hr>` +
                        `<p> Wind ${windDeg}° / ${windSpeed}km/h</p>` +
                        `<hr>` +
                        `<p> Sky ${icon} ${sky}</p>`
                    )
                }
            })  //then catch any error it might have
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })

}

setTimeout(refresh, 120000)

function refresh() {
    location.reload();
}