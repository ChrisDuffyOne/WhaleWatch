$(document).ready( function() {

//CHROME WARNING
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	if(isChrome === true){
		$('.chromeWarning').show();
		$('.searchArea').hide();
	};

//SELECT FEATURE
	$('.searchArea').on("click", ".speciesSelect", function (event) {
		$('#speciesType').slideToggle();
	});

	$('.searchArea').on("click", ".locationSelect", function (event) {
		$('#locationType').slideToggle();
	});

	$('.searchArea').on("click", ".radiusSelect", function (event) {
		$('#radiusType').slideToggle();
	});



//SELECTION HIGHLIGHT
	//speciesSelect
	$('#speciesType').on("click", ".answer", function (event) {
		$('#speciesType .answer').removeClass('answerSelect')
		$(this).toggleClass('answerSelect');
	});

	//locationSelect 
	$('#locationType').on("click", ".answer", function (event) {
		$('#locationType .answer').removeClass('answerSelect')
		$(this).toggleClass('answerSelect');
	});

	//radiusSelect 
	$('#radiusType').on("click", ".answer", function (event) {
		$('#radiusType .answer').removeClass('answerSelect')
		$(this).toggleClass('answerSelect');
	});


//WHALE FEATURE
	$('.submitButton').submit( function(event){
		// Clears the previous results
		$('#results').empty();
		
		// Sets the Variables for species and location
		testSpecies=$('#speciesType span.answerSelect').data('species');
		testLocation=$('#locationType span.answerSelect').data('coordinates');
		testRadius=$('#radiusType span.answerSelect').data('radius');
		

		$.ajax({
			type: "GET",
			crossDomain: true,
			url: "http://hotline.whalemuseum.org/api.json?species="+testSpecies+"&near="+testLocation+"&radius="+testRadius+"&limit=100&until=yesterday",
			contentType: "application/javascript; charset=utf-8",
			dataType: "jsonp",
			async: false,
			success: function(jsonp){
				//Reverses the Array so the newest dates show first
				jsonp.reverse();

				if (jsonp.length == 0) {
					alert("No Sightings Located");
				} else {
					for (i = 0; i < jsonp.length; i++) {
						var answerBlock = '<div class="result"><span class="resultLabel">Species: </span><span class="info">'+jsonp[i].species+'</span><br /><span class="resultLabel">Quanity: </span><span class="info">'+jsonp[i].quantity+'</span><br /><span class="resultLabel"><p>Description: </p></span><span class="info">'+jsonp[i].description+'</span><br /><span class="resultLabel">Location: </span><span class="info">'+jsonp[i].location+'</span><br /><span class="resultLabel">Date: </span><span class="info">'+jsonp[i].sighted_at+'</span><br /></div>';
						$('#results').prepend(answerBlock);
					}
				};
			},
		});
	});

//SCROLLTOP RESULTS 
	$("#submitButton").click(function() {
	    $('html,body').animate({
	        scrollTop: $("#results").offset().top},
	        'slow');
	});
	
});	