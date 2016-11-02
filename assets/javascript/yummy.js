var food = ['curry', 'tacos', 'burgers', 'tikka misala'];

    function displayGif() {
        
        var foodValue = $(this).data(food);
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + foodValue + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({url: queryURL, method: 'GET'})
			
			.done(function(response){
            console.log(response);   
            
			var results = response.data;
			console.log(results);
			
			for (var i=0; i < results.length; i++){
				var gifDiv = $('<div id="gifphy">');
				
				var foodImg = $('<img>');
				foodImg.attr('src', results[i].images.fixed_height.url);
				
				gifDiv.append(foodImg)
				console.log(gifDiv)
				
				$('#gif-here').prepend(gifDiv);
			}
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
    
    $(".foodValue").on('click', function(){
        
        displayGif();
    })
    
    