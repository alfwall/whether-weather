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
});