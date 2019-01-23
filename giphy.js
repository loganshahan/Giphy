var topic = ["beer", "wine", "vodka", "gin", "tequila"];

function createButton(){
    for(i=0; i<topic.length; i++){
        // var button = document.getElementById("buttons-here").innerHTML += "<button>" + topic[i] + "</button>";
        // button.setAttribute("data-drink", topic[i]);
        document.write("<div>");
        document.write("<input type='button' value='" + topic[i] + "'/>");
        document.write("</div>");
    }
}
createButton()

$("input").on("click", function(){
    var drink = $(this).attr("value");
    console.log($(this).attr("value"));
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
              drinkImage.attr("src", results[i].images.fixed_height.url);
              gifDiv.append(p);
              gifDiv.append(drinkImage);
              $("#gifs-here").append(gifDiv)
        }
    })


})
