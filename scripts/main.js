var city = $('#city');
var image = $('#image');
var weather = $('#weather');
var temperature = $('#temperature');
var wind = $('#wind');
var humidity = $('#humidity');
var cloud = $('#cloud');
var dummyLat=22.3174703;
var dummyLon=87.3052147;
var currentWeather;

var container = $('.container-full');
var celsius_slider = $('#celsius-slider');
var box = $('.box');

//default is false -> Fahrenheit
var choice = celsius_slider.prop('checked');
var celsius_text = $('#celsius-text');


$(document).ready(function(){

	/*

		* getting location from ip
		* uncomment before staging

	*/
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position);
			getWeather(position,function(json){
			console.log('weather json: '+json);
	});

		},function(error){
			switch(error.code){
				case error.PERMISSION_DENIED:
				alert("User denied the request for Geolocation.");
				break;
				case error.POSITION_UNAVAILABLE:
				alert("Location information is unavailable.\nPlease choose location manually from sidebar.");
				break;
				case error.TIMEOUT:
				alert("Request timed out");
				break;
				case error.UNKNOWN_ERROR:
				alert("An unknown error occurred.");
				break;
			}
		});
	}else{
		alert("Can't get location!");
	}

	var dummyPos = {
		coords:{
			latitude:dummyLat,
			longitude:dummyLon
		}
	};

	box.hide();

	// getWeather(dummyPos,displayWeather);
});
var getWeather = function(position,callback){

	$.ajax({
		url:'https://api.openweathermap.org/data/2.5/weather?',
		dataType:'jsonp',
		data:{
	'lat':position.coords.latitude,
	'lon':position.coords.longitude,
	'APPID':'0c92710be80f1ccdf0d91f108c064280'
	

},
success:callback
});

}


// click listener on slider
celsius_slider.click(function(){
	choice = celsius_slider.prop('checked');
	console.log('slider clicked');
	displayWeather(currentWeather);
	if(choice){
		celsius_text.css('color','#2196F3');
	}else celsius_text.css('color','grey');
});

function displayWeather(json){
	console.log('displayWeather called');



	box.show('slow','swing',function(){

	});


	currentWeather=json;
	var name = json.name;
	var w = json.weather[0].main;
	var temp = json.main.temp;
	var temp_min = json.main.temp_min;
	var temp_max = json.main.temp_max;
	var p = json.main.pressure;
	var h = json.main.humidity;
	var windSpeed = json.wind.speed;
	var cloudiness = json.clouds.all;
	var icon = json.weather[0].icon;
	if(name)
		city.html(name);
	if(w)
		weather.html(w);
	if(temp){
		if(!choice){
			var cel = temp-273.15;
			var f = cel*(9);
			f/=5;
			f+=32;
			f = f.toFixed(2);

			temperature.html(f+'&degF');
		}
		else{
			var cel = temp-273.15;
			cel = cel.toFixed(2);
			temperature.html(cel+'&degC');

		}
	}
	if(windSpeed)
		wind.html('Wind('+windSpeed+' m/s)');
	if(h)
		humidity.html('Humidity '+h+'%');
	if(cloudiness!== undefined)
		cloud.html('Cloud Cover '+cloudiness+'%');
	// console.log(icon);
	if(icon)
		image.attr('src','https://openweathermap.org/img/w/'+icon+'.png');
	console.log(json);

}






