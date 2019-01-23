var topic = ["beer", "wine", "vodka", "gin", "tequila"];

function createButton(){
    $("#buttons-here").empty();
    for(i=0; i<topic.length; i++){
        // var button = document.getElementById("buttons-here").innerHTML += "<button>" + topic[i] + "</button>";
        // button.setAttribute("data-drink", topic[i]);
        // document.write("<div>");
        // document.write("<input type='button' value='" + topic[i] + "'/>");
        // document.write("</div>");
        var a = $("<button>");
        a.addClass("drink");
        a.attr("data-drink", topic[i]);
        a.text(topic[i]);
        $("#buttons-here").append(a);

    }
}
// createButton()
$("#add-drink").on("click", function(event){
    event.preventDefault();
    var drinks = $("#drink-input").val().trim();
    topic.push(drinks);
    createButton();
})
createButton();

$(document).on("click", ".drink", function(){
    $("#gifs-here").empty();
    var drink = $(this).attr("data-drink");
    console.log($(this).attr("data-drink"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    drink + "&api_key=RWDFNcZjNeG9mcngWHqfz4VI50lezycc&limit=10";

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){
        // console.log(queryURL);
        console.log(response);
        var results = response.data;
        console.log(results)
        for(i=0; i<results.length;i++){
            var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var drinkImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              drinkImage.attr("src", results[i].images.fixed_height_still.url);
              drinkImage.attr("data-still", results[i].images.fixed_height_still.url);
              drinkImage.attr("data-animate", results[i].images.fixed_height.url);
              drinkImage.attr("data-state", "still")
              drinkImage.addClass("gif");
              gifDiv.append(p);
              gifDiv.append(drinkImage);
              $("#gifs-here").append(gifDiv)
        }
    })


});
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

}
else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
