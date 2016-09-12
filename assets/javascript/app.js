$(document).ready(function(){

//array of cartoons to start with
var cartoonList = ["THE SIMPSONS", "POPEYE", "STEVEN UNIVERSE", "ANIMANIACS", "TEENAGE MUTANT NINJA TURTLES", "DEXTER'S LABORATORY"];
var APIkey = "dc6zaTOxFJmzC";

//appending the cartoon information in the gifs div
function displayCartoonInfo(){
    $('#gifs').empty();
    var cartoon = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon +"&api_key=" + APIkey + "&limit=10";
        
         
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
        console.log(response);
        var result = response.data;
        var cartoonDiv = $('<div class="cartoon">');
        for (var i=0; i<result.length; i++){
            var rate = $('<p>').text( "Rating: " + result[i].rating.toUpperCase());
            //conditions for if gif does not have a rating in object
            if (result[i].rating == "") {
                rate = $('<p>').text("Rating: N/A");
            } else {
                rate = $('<p>').text( "Rating: " + result[i].rating.toUpperCase());
            }
            cartoonDiv.append(rate);
            var image = $('<img alt="cartoon gif">');
            image.addClass("marshmellow");
            image.attr("src", result[i].images.fixed_height_still.url);
            // image.attr("src", result[i].images.downsized_still.url);
            image.attr("data-still", result[i].images.fixed_height_still.url);
            // image.attr("data-still", result[i].images.downsized_still.url);
            image.attr("data-animate", result[i].images.fixed_height.url);
            // image.attr("data-animate", result[i].images.downsized.url);
            image.attr("data-state", "still");
            cartoonDiv.append(image);
            $('#gifs').prepend(cartoonDiv);
        }
    });

}

//creating buttons from array
function makeButtons(){ 
    $('#buttons').empty();
    for (var i = 0; i < cartoonList.length; i++){
        var a = $('<button type="button" class="btn btn-primary">');
        a.addClass('give-me-something'); 
        a.attr('data-name', cartoonList[i]); 
        a.text(cartoonList[i]); 
        $('#buttons').append(a); 
    }
}

//adding user input to array and creating button for it
$('#addCartoon').on('click', function(){ 
    var cartoon = $('#cartoon-input').val().trim().toUpperCase(); 
    //conditions to prevent blanks and repeats to turn into buttons
    if (!cartoon) {
        alert("Please type in a cartoon of your choice");
        return false;
    } else if (($.inArray(cartoon, cartoonList)) > -1) { 
        alert("That cartoon has already been added");
        return false;
    } else {
        cartoonList.push(cartoon);
        makeButtons();
        return false;
    }
});

//appends gifs and rating as soon as it is clicked  
$(document).on('click', '.give-me-something', displayCartoonInfo);

makeButtons();


//conditions for switching still to moving gifs

$(document).on('click', '.marshmellow', function(){
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


});