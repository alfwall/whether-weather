$(document).ready(function () {
    function PerformFetch(cityName) {
        fullURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5";

        fetch(fullURL, {
            method: "GET",
            credentials: "same-origin",
            redirect: "follow", 
        })
            .then(function (response) {
                console.log("response: ");
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log("data: ");
                console.log(data);
            });

    }

    // Search button event listener
    $("#searchButton").on("click", function () {
        var searchInput = $("input#citySearchInput").val().trim();
        console.log(searchInput);
        if (searchInput == "") {
            //console.log("EMPTY SEARCH!")
            return;
        }
        // TODO: perform FETCH

    });
    
    // TODO: Clear the previous searches defaults
    var savedSearches = localStorage.getItem("savedSearches");
    console.log("savedSearches: ");
    console.log(savedSearches);
    // If no input, set it to an empty array
    if (savedSearches == null) {
        localStorage.setItem("savedSearches", []);
    }

    // TODO: Check for previous searches (localStorage)

    // TODO: If there are results, populate the list

    // TODO: Previous Search button event listener
    $("button.previousSearchInput").click(function () {
        // TODO: perform FETCH

    });



});