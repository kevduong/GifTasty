var food = ['sushi', 'tacos', 'burgers', 'curry rice', 'fries', 'ice cream', 'pasta', 'pho', ' steak'];

//*

    function renderButtons() {
        
        $("#buttonView").empty();
        
        for (var i = 0; i < food.length; i++) {
            var a = $('<li>')
            
            a.addClass('foodBtn');
            a.attr('data-name', food[i]);
			a.html('<button class="btn-lg btn-info">' + food[i] + '</button>');
            $('#buttonView').append(a);
        }
    };
//*

    function displayGif(event) {

		event.preventDefault();
		
        var mhmm = $(this).data('name');
    
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + mhmm + "&api_key=dc6zaTOxFJmzC&limit=4";
        
        $.ajax({
			url: queryURL, 
			method: 'GET'
		}).done(function(response){
            console.log(response);   
            
			var results = response.data;
			console.log(results);
			
			$('#gif-here').empty();
			for (var r=0; r < results.length; r++){
				
				var imgURL = results[r].images.downsized_still.url;
				var gifDiv = $('<span id="giphy">');
				var foodImg = $('<img style="width: 300px; height: 200px;" class="img-rounded">');
				gifDiv.html(foodImg);
				foodImg.addClass('image');
				foodImg.attr('src', imgURL);
				foodImg.attr('data-animatedgif', results[r].images.downsized_medium.url);
				foodImg.attr('data-stillgif', imgURL);
				foodImg.attr('data-staticimage', true);
				$('#gif-here').append(gifDiv);
				gifDiv.prepend($('<div class="rating">' + 'Rating: ' + results[r].rating + '</div>'));
			

			}
        });
    };


//*
	function animationOnClick() {

		if ($(this).data('staticimage') === true) {
			var animatedImage = $(this).data('animatedgif');
			$(this).attr('src', animatedImage);
			$(this).data('staticimage', false);

		} else {
			var stillImage = $(this).data('stillgif');
			$(this).attr('src', stillImage);
			$(this).data('staticimage', true);
		};

	};

    
    function userInputButton() {
		var foodValue = $('#foodInput').val().trim();
        food.push(foodValue);
        renderButtons();
		$('#foodInput').val(' ');
        
    }
    

    

    $(document).on('click', '.foodBtn', displayGif);
	renderButtons();
    $(document).on('click', '.image', animationOnClick);

	$('#searchBtn').on('click', userInputButton);
    
    