$(document).ready(function () {
    // My app key for openweather API calls.
    var appID = "66aa4510e0e4d6db5942f000c62d22bc";

    // LOCAL STORAGE HELPER
    function SetItemInLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    function GetItemInLocalStorage(key) {
        //console.log("Searching with key: " + key);
        //console.log(localStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key) || "[]");
    }



    /*                   */
    /* PREVIOUS SEARCHES */
    /*                   */
    // UPDATE RECENT SEARCHES
    function UpdateSearchHistoryButtons() {
        var searches = GetItemInLocalStorage("savedSearches");
        $("#previousSearches").html("");
        for (var i = 0; i < searches.length; i++) {
            var search = JSON.parse(searches[i]);
            cityName = search["cityName"];
            cityLat = search["coords"]["lat"];
            cityLon = search["coords"]["lon"];
            var newButton = "<li><button class='previousSearchInput' data-lat='" + cityLat + "' data-lon='" + cityLon + "'>" + cityName + "</button></li>"
            $("#previousSearches").append(newButton);
        }
    }
    // Immediately call it to populate past searches!
    UpdateSearchHistoryButtons();
    // And then default to the first button click
    //$("#previousSearches:first-child").click();

    /*                 */
    /* SEARCH REQUESTS */
    /*                 */
    // Function to update the current city info. Takes weather data.
    function UpdateCurrentCityWeather(cityData) {
        //console.log(cityData);
        currentWeather = cityData["list"][0];
        currentDate = dayjs(currentWeather["dt_txt"].split(" ")[0]).format("M/DD/YYYY");
        $("#currentCityName").text(cityData["city"]["name"]);
        $("#currentCityDate").text("(" + currentDate + ")");
        // TODO: REPLACE WEATHER SYMBOL!!
        var icon = "<img src='https://openweathermap.org/img/wn/" + currentWeather["weather"][0]["icon"] + "@2x.png' ><img />";
        //console.log(icon)
        $("#currentCityWeatherIcon").html(icon);

        $("#currentTemperatureText").text("Temp: " + currentWeather["main"]["temp"] + " °F");
        $("#currentWindSpeedText").text("Wind: " + currentWeather["wind"]["speed"] + " MPH");
        $("#currentHumidityText").text("Humidity: " + currentWeather["main"]["humidity"] + " %");

        var mostRecentDate = currentDate;
        var fiveDayForecastHTML = "";

        for (var i = 0; i < cityData["list"].length; i++) {
            var cityWeatherEntry = cityData["list"][i];
            var cityWeatherEntryDate = dayjs(cityWeatherEntry["dt_txt"].split(" ")[0]).format("M/DD/YYYY");
            // If the entry is a new day, update most recent date, create a forecast object for it!
            if (!dayjs(mostRecentDate).isSame(cityWeatherEntryDate)) {
                mostRecentDate = cityWeatherEntryDate;
                // cityWeatherEntry
                console.log(cityWeatherEntry)
                var forecastElement = "<li class='dayFrom5DayForecast'>";
                forecastElement += "<h2>" + cityWeatherEntryDate + "<span><img src='https://openweathermap.org/img/wn/" + cityWeatherEntry["weather"][0]["icon"] + "@2x.png' /></span></h2>";
                forecastElement += "<label>Temp: " + cityWeatherEntry["main"]["temp"] + " °F</label>";
                forecastElement += "<label>Wind: " + cityWeatherEntry["wind"]["speed"] + " MPH</label>";
                forecastElement += "<label>Humidity " + cityWeatherEntry["main"]["humidity"] + " %";
                forecastElement += "</li>"
                fiveDayForecastHTML += forecastElement;
                
                currentDate = dayjs(cityWeatherEntry["dt_txt"].split(" ")[0]).format("M/DD/YYYY");
                console.log(cityWeatherEntry["weather"][0]["icon"]);



                $("#currentCityName").text(cityData["city"]["name"]);
                $("#currentCityDate").text("(" + currentDate + ")");
                // TODO: REPLACE WEATHER SYMBOL!!
                var icon = "<img src='https://openweathermap.org/img/wn/" + cityWeatherEntry["weather"][0]["icon"] + "@2x.png' ><img />";
                //console.log(icon)
                $("#currentCityWeatherIcon").html(icon);

                $("#currentTemperatureText").text("Temp: " + cityWeatherEntry["main"]["temp"] + " °F");
                $("#currentWindSpeedText").text("Wind: " + cityWeatherEntry["wind"]["speed"] + " MPH");
                $("#currentHumidityText").text("Humidity: " + cityWeatherEntry["main"]["humidity"] + " %");


            }
        }
        // Once looped through sufficiently, html it
        $("#all5Forecasts").html(fiveDayForecastHTML);

        $("#currentCityData").show();
        $("#fiveDayForecast").show();
    }

    // Takes a city name and does 2 fetches: 1 to get the actual city coordinates, 1 to get the weather
    async function FetchWithCityName(cityName) {
        var fullURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + appID;
        var lat = "";
        var lon = "";
        // First fetch, to acquire the latitude and longitude.
        const firstResponse = await fetch(
            fullURL, {
            method: "GET",
            credentials: "same-origin",
            cache: "no-cache",
            redirect: "follow"
        });
        const firstData = await firstResponse.json();
        if (firstData.length == 0) {
            console.log("No cities found!! Returning.");
            return;
        }
        //console.log(firstData[0]);
        var cityName = firstData[0]["name"];
        var cityState = firstData[0]["state"];
        lat = firstData[0]["lat"];
        lon = firstData[0]["lon"];
        //console.log(cityName + ", " + cityState + ": lat " + lat + ", lon " + lon);

        // Second fetch, to acquire the actual data
        var otherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + appID;
        const secondResponse = await fetch(
            otherURL, {
            method: "GET",
            credentials: "same-origin",
            cache: "no-cache",
            redirect: "follow"
        });
        const secondData = await secondResponse.json();
        //console.log(secondData);
        if (secondData["list"].length == 0) {
            console.log("No weather data predictions?? Weird. Returning.");
            return;
        }

        // Update the displayed weather data
        UpdateCurrentCityWeather(secondData);

        // That search was successful! Save that to our previous searched list.
        var savedSearches = GetItemInLocalStorage("savedSearches");
        // If no input, set it to an empty array
        if (savedSearches == "[]") {
            SetItemInLocalStorage("savedSearches", []);
        }

        // TODO: IS THE CITY NAME ALREADY IN SAVED SEARCHES? DON'T HAVE DUPLICATES.

        searchInfo = JSON.stringify({
            "cityName": secondData["city"]["name"],
            "coords": secondData["city"]["coord"]
        });
        //console.log("searchInfo: " + searchInfo)
        savedSearches.push(searchInfo);
        SetItemInLocalStorage("savedSearches", savedSearches);

        UpdateSearchHistoryButtons();
    }

    // Takes lat and lon and fetches just once! Used by previous searches buttons.
    async function FetchWithLatAndLon(lat, lon) {
        var otherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + appID;
        const secondResponse = await fetch(
            otherURL, {
            method: "GET",
            credentials: "same-origin",
            cache: "no-cache",
            redirect: "follow"
        });
        const secondData = await secondResponse.json();
        //console.log(secondData);
        if (secondData["list"].length == 0) {
            console.log("No weather data predictions?? Weird. Returning.");
            return;
        }

        // Update the displayed weather data
        UpdateCurrentCityWeather(secondData);
    }

    // Search button event listener
    $("#searchButton").on("click", function () {
        var searchInput = $("input#citySearchInput").val().trim();
        //console.log(searchInput);
        if (searchInput == "") {
            //console.log("EMPTY SEARCH!")
            return;
        }
        // Perform FETCH
        FetchWithCityName(searchInput);
    });

    // Previous search buttons have latitude and longitude hidden within, saving us a fetch!
    $("button.previousSearchInput").click(function () {
        //console.log("city to search: " + $(this).text());
        FetchWithLatAndLon($(this).data("lat"), $(this).data("lon"));
    });

    // On reset click, wipe data and remove search history
    $("#RESETBUTTON").on("click", function () {
        SetItemInLocalStorage("savedSearches", []);
        $("#previousSearches").html("");
    });







});