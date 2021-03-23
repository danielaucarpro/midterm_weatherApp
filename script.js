console.log("Loading script.js");
let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
let units = '';
let myAPIKey = 'af2e529daf727ec2cbec62e2e2a2484b'

/*Get Weather Fetch Data*/
console.log("Configure const getWeather");
const getWeather = (cityName) => {
    console.log("Getting the weather for " + cityName);
    //Fetch Data from the API I choose s
    fetch(`${url}${cityName}&units=metric&appid=${myAPIKey}`)
        .then(response => {
            console.log(response);
            //Then check the status of the request. If is different than 200 show me the error
            if (response.status !== 200) {
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
                    let timeZ = weather.timezone;

                    //append the content with Jquery
                    title.append(
                        `<h4>${name}, ${country} Weather</h4>`
                        // `<p>${dt}`
                    )
                    generalTemp.append(
                        `<p>${temp} C°</p>`
                    )
                    generalMain.append(
                        `<p>${main}</p>`
                    )
                    generalIcon.append(
                        `<img src="http://openweathermap.org/img/w/${icon}.png">`
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
                        // `<hr>` +
                        // `<p>Sunrise / Sunset ${sunrise} ${sunset}</p>` +
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
                        `<p> Sky <img src="http://openweathermap.org/img/w/${icon}.png"> ${sky}</p>`
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

//setting Vancouver as a default city when the page is loaded
// window.addEventListener("DOMContentLoaded", () => {
//     getWeather('Vancouver')
// });
$(document).ready(() => {
    getWeather("vancouver");
})

//updating my cityName parameter onclick
function changeCity(){
    let myInput = document.getElementById('myInput');
    if (myInput.value == null) {
        alert('Sorry, something went wrong. You must enter a city name! Please check spelling, if the error persist we might not have it in our catalog.');
    } 
    else{
        getWeather(myInput.value);
        myInput.value = '';
    }
}