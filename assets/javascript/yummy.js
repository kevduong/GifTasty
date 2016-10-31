var food = ['curry', 'tacos', 'burgers', 'tikka misala'];

    function displayGif() {
        
        var foodValue = $(this).attr('data-name');
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + foodValue "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({url: queryURL; method: 'GET'}).done(function(response){
            
            var foodDiv = $('<div class="food">');
            
            var imageURL = response.data.image_original_url;
            
            var foodImage = $("<img>");
            
            foodImage.attr('src', imageURL);
            
            $('#food-display').prepend(foodImage);
            
        })
    }

    function renderButtons() {
        
        $("#buttonView").empty();
        
        for (var i = 0; i < food.length; i++) {
            var a = $('<button>')
            
            a.addClass('foodValue');
            a.attr('data-name', food[i]);
            a.text(food[i]);
            $('#buttonView').append(a);
        }
    }
    
    $("#searchBtn").on('click', function(){
        
        var foodValue = $('#foodInput').val().trim();
        food.push(foodValue);
        renderButtons();
        return false;
        
    })
    
    renderButtons();
    
    
    