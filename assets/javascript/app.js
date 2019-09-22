$(document).ready(function () {

var topics = ["csgo", "apex legends", "borderlands 3"];
var apiKey = "bB8FrIVzuWKq1ovd36ElbBSdYruDc9FJ";

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=3&rating=pg-13&apikey=" + apiKey;

function createButton() {
    $("#add-button").click(function() {
        console.log("clicked");
    })
}

function gifButton() {
    search = ""
    apiLoad();
}
    
function apiLoad() {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // shorten api response
        var results = response.data;
        // Looping through each index of response.data
        for (var j = 0; j < results.length; j++) {
            var gifDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[j].rating);
            p.css("text-align", "center");
            var gifImage = $("<img>");
            gifImage.addClass("gifs");
            gifImage.attr("src", results[j].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("data-still", results[j].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[j].images.fixed_height.url);
            gifDiv.css("display", "inline-block");
            gifDiv.css("padding", "5px");
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $(".gifHolder").prepend(gifDiv);
        }

        $("img").on("click", function () {
            console.log("Success: " + $(this).attr("data-state"));

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}
    
apiLoad();






});