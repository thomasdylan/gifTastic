var search = "tool band";
var apiKey = "bB8FrIVzuWKq1ovd36ElbBSdYruDc9FJ";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&rating=pg-13&apikey=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
        var row = $("<div>");
        var gif = $("<img>");
        var rating = $("<p>");
        gif.attr("src", response.data[i].images.fixed_height.url);
        rating.append(response.data[i].rating);
        row.append(gif);
        row.append(rating);
        $("#gifs").prepend(row);
    }
    console.log(response)
});