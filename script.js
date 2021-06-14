
//  Assignments
var APIkey = "6ca38b593072c5ff245976d803e5f35b";
var cityNameList = [];
var inputuserform = document.querySelector("#user-form");
var CitynameEntry = document.querySelector("#city-name");
var todayscity = document.querySelector("#today-city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var citiesdropdown = document.getElementById("search-input-container");
//Todays forecast Assignments
var displayCurrentDate = document.querySelector("#city-current-date");
var displaycurrentIcon = document.querySelector("#city-current-icon");
var displaycurrentTemp = document.querySelector("#temp-today");
var displaycurrentHumidity = document.querySelector("#humidity-today");
var displaycurrentWind = document.querySelector("#wind-today");
var currentUV = document.querySelector("#uv-input")


//API Call current weather data   By city name ;For temperature in F use units=imperial
//The below syntax concepts of response.ok & catch  is from Bootcamp Week6 Server Side APIs Ins and Stu Exercises-Day3
var getCityWeathertoday = function(city) {
    var URLfortoday = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    
    fetch(URLfortoday).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                Todayweather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    //  network error conditions -I was able to test this -Use the proprer parantheseis 
    .catch(function(error) {
        alert("Unable to connect to Open ");
    })
}

// Displaying current weather data ; moment L formats; Date Icon Temp Humidity WindSpeed UV
var Todayweather = function(city, citisearchDisp) {
    todayscity.textContent = '';
    citySearchTerm.textContent = citisearchDisp;
   
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(L)");
       
    var currentIcon = "https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png"
    displaycurrentIcon.setAttribute ("src", currentIcon);
       
    var todayTemp = Math.round(city.main.temp) + " °F";
    displaycurrentTemp.textContent = todayTemp; 
       
    var todayHumidity = city.main.humidity + "%";
    displaycurrentHumidity.textContent = todayHumidity; 
        
    var todayWindspeed = city.wind.speed + " MPH";
    displaycurrentWind.textContent = todayWindspeed;
   
    var newlyaddedCity = document.createElement("li");
    newlyaddedCity.className = "list-group-item";
    newlyaddedCity.textContent = citisearchDisp;
    newlyaddedCity.addEventListener("click", previousdisplayedcityclick);
    citiesdropdown.appendChild(newlyaddedCity);
      
       var lon = city.coord.lon; 
       var lat = city.coord.lat; 
   
       CityUV(lon, lat);   
};

// UV index API -Working on ot
//Refer Bootcamp class week 6 exercises Ex21 Ex22 onwards
var CityUV = function(lon, lat) {
      let uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat) {
                dispUv(lon, lat);
            });
       } else {
            alert("Error:" + response.statusText);
        }
       })
                .catch(function(error) {
            alert("Unable to connect to Open App");
    })
};

// display UV
var dispUv = function(data) {
    var uv = data.value;
        if (uv >= 6) {
            currentUV.classList="danger"
            currentUV.innerHTML=" " + uv + " ";
        } else if (uv > 3 ) {
            currentUV.classList="warning"
           currentUV.innerHTML=" " + uv + " ";
        } else {
            currentUV.classList="success"
            currentUV.innerHTML=" " + uv + " ";
        }
};

// 5 day forecast API 
////Refer Bootcamp class week 6 exercises Ex21 Ex22 onwards-Day3 videos for the below syntax
var fivedayforecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;

    // if response was successful 
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayfivedayForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // for network connectivity issues
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

// Displaying 5 day forecast  
//Example moment().format('L');    // 06/07/2021
//Example moment().format('l');    //   6/7/2021   
var displayfivedayForecast = function (list) { 
            for (var i = 0; i <= 4; i++) {

        //date 5 consecutive
        var displayDay1 = document.querySelector("#day-1");
        var forecastDay1 = moment().add(1, "days").format("L");
        displayDay1.textContent = forecastDay1;

        var displayDay2 = document.querySelector("#day-2");
        var forecastDay2 = moment().add(2, "days").format("L");
        displayDay2.textContent = forecastDay2;

        var displayDay3 = document.querySelector("#day-3");
        var forecastDay3 = moment().add(3, "days").format("L");
        displayDay3.textContent = forecastDay3;

        var displayDay4 = document.querySelector("#day-4");
        var forecastDay4 = moment().add(4, "days").format("L");
        displayDay4.textContent = forecastDay4;

        var displayDay5 = document.querySelector("#day-5");
        var forecastDay5 = moment().add(5, "days").format("L");
        displayDay5.textContent = forecastDay5;

        // temperature disp
        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = list[i].main.temp + " °F";
        displayTemp.textContent = forecastTemp; 

        //humidity disp
        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = list[i].main.humidity + "%";
        displayHumidity.textContent = forecastHumidity;
        
        // weather icons disp
        var forecastIconday1 = document.querySelector("#city-icon-1");
        var Icon1 = "https://openweathermap.org/img/wn/" + list[1].weather[0].icon + ".png"
        forecastIconday1.setAttribute ("src", Icon1);

        var forecastIconday2 = document.querySelector("#city-icon-2");
        var Icon2 = "https://openweathermap.org/img/wn/" + list[2].weather[0].icon  + ".png"
        forecastIconday2.setAttribute ("src", Icon2);

        var forecastIconday3 = document.querySelector("#city-icon-3");
        var Icon3 = "https://openweathermap.org/img/wn/" + list[3].weather[0].icon  + ".png"
        forecastIconday3.setAttribute ("src", Icon3);

        var forecastIconday4 = document.querySelector("#city-icon-4");
        var Icon4 = "https://openweathermap.org/img/wn/" + list[4].weather[0].icon  + ".png"
        forecastIconday4.setAttribute ("src", Icon4);

        var forecastIconday5 = document.querySelector("#city-icon-5");
        var Icon5 = "https://openweathermap.org/img/wn/" + list[5].weather[0].icon  + ".png"
        forecastIconday5.setAttribute ("src", Icon5);
       
        }
}; 


// search city for input and move in local storage
var userinputclick = function(event) {
    event.preventDefault();
var city = CitynameEntry.value.trim();  
if (city) {
        getCityWeathertoday(city);
        fivedayforecast(city);
        cityNameList.push(city);
        localStorage.setItem("city", JSON.stringify(cityNameList));
        CitynameEntry.value = "";
     } else {
        alert("Key in a valid city name! ");
    }
};

// Only and only button click for city input
inputuserform.addEventListener("submit", userinputclick);

// previous searched city
var previousdisplayedcityclick = function (event) {
    var clickCity = event.currentTarget.textContent;
    getCityWeathertoday(clickCity);
    fivedayforecast(clickCity);
};
