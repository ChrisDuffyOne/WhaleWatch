$(document).ready( function() {

//WARNING FEATURE
	$('.warning').on("click", "#okButton", function (event) {
		//$('.warning').fadeOut();
		$('.warning').slideUp();
	});

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

//WHALE FEATURE
	$('.submitButton').submit( function(event){
		// Clears the previous results
		$('#results').empty();
		// Sets the Variables for species and location
		animal = $("input[type='radio']:checked", '#speciesType').val();
		waterPlace = $("input[type='radio']:checked", '#locationType').val();
		distancePlace = $("input[type='radio']:checked", '#radiusType').val();
		
		$.ajax({
			type: "GET",
			crossDomain: true,
			url: "http://hotline.whalemuseum.org/api.json?species="+animal+"&near="+waterPlace+"&radius="+distancePlace+"&limit=100&until=yesterday",
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