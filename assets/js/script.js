$(document).ready(function(){
    // Search button event listener
    $("#searchButton").on("click", function(){
        var searchInput = $("input#citySearchInput").val().trim();
        console.log(searchInput);
        if (searchInput == "") {
            //console.log("EMPTY SEARCH!")
            return;
        }
        // TODO: perform FETCH

    });
    // TODO: Clear the previous searches defaults
    
    // TODO: Check for previous searches (localStorage)

    // TODO: If there are results, populate the list

    // TODO: Previous Search button event listener
    $("button.previousSearchInput").click(function(){
        // TODO: perform FETCH

    });

    

});