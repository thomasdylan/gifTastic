var topics = ["csgo", "apex legends", "borderlands 3"];
var apiKey = "bB8FrIVzuWKq1ovd36ElbBSdYruDc9FJ";

for (var i = 0; i < topics.length; i++) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[i] + "&limit=1&rating=pg-13&apikey=" + apiKey;

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
            var gifImage = $("<img>");
            gifImage.attr("src", results[j].images.fixed_height.url);
            gifDiv.append(gifImage);
            gifDiv.append(p);

            $(".gifs").prepend(gifDiv);
        }
        
    });
}