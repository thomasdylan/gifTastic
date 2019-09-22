$(document).ready(function () {

    var topics = ["csgo", "apex legends", "borderlands 3"];
    var apiKey = "bB8FrIVzuWKq1ovd36ElbBSdYruDc9FJ";

    //This stops the enter key from refreshing the page and clearing the buttons.
    $('form').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });


    function showTopicGifs() {
        var search = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=3&rating=pg-13&apikey=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // shorten api response
            var results = response.data;
            // Looping through each index of response.data
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.css("text-align", "center");
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifDiv.addClass("gifs")
                gifDiv.css("display", "inline-block");
                gifDiv.css("padding", "5px");
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $(".gifHolder").prepend(gifDiv);
            }
        })
    }

    function showButtons() {
        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("topic-button");
            topicButton.attr("data-name", topics[i]);
            topicButton.text(topics[i]);
            topicButton.css("margin", "5px");
            $("#button-holder").append(topicButton);
        }
    };

    $("#add-topic").on("click", function (e) {
        e.preventDefault();
        var newTopic = $("#input").val().trim();
        //prevents multiple buttons of the same value.
        if (topics.indexOf(newTopic) === -1) {
            topics.push(newTopic);
        }
        $("#button-holder").empty();
        $("#input").text("");
        showButtons();
    })

    function apiLoad() {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // shorten api response
            var results = response.data;
            // Looping through each index of response.data
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.css("text-align", "center");
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifDiv.addClass("gifs")
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

    showButtons();







});