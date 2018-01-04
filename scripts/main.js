var city = $('city');
var image = $('image');
var weather = $('weather');
var temperature = $('temperature');
var wind = $('wind');
var humidity = $('humidity');
var cloud = $('cloud');

$(document).ready(function(){
	navigator.geolocation.getCurrentPosition(function(position){
		console.log(position);
	});
	// console.log(pos);
});