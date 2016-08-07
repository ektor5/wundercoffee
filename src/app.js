var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

// var myAPIKey = '6346c6bdb533a4dda430f3a754d93245';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'WunderCoffee',
  subtitle:'by UDOOTEAM'
});

var logo_image = new UI.Image({
  position: new Vector2(50, 50),
  size: new Vector2(50, 50),
  backgroundColor: 'clear',
  image: 'images/coffee.png',
});

card.add(logo_image);
// Display the Card
card.show();

// Construct URL
// var cityName = 'London';
var URL = 'http://192.168.100.1:8080/ajax_view';

// Make the request
function getCoffee(URL){
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched coffee data!");

    // Extract data
    //var location = data.name;
    var temperature = (data.temp/1000) + "C";

    // Always upper-case first letter of description
    //var description = data.weather[0].description;
    //description = description.charAt(0).toUpperCase() + description.substring(1);
    var state;
    if (temperature > 50 ) {
        state = "hot";
    }
    else if (temperature > 40 ) {
        state = "warm";
    }
    else {
        state = "cold";
    }

    // Show to user
    card.subtitle(temperature);
    card.body("Your coffee is " + state);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching coffee data: ' + error);
  }
  // Register for 'tap' events

  
);
}

card.on('accelTap', function(e) {
  console.log('TAP!');
  console.log('axis: ' + e.axis + ', direction:' + e.direction);
  getCoffee(URL);
});

