// These will work together to get weather information and to create the page
'use strict';



// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - mor18023@byui.edu"
    }
  };






  // Setup localStorage
var storage = window.localStorage;




// Call the function to get our location
getGeoLocation();

// Gets longitude and latitude of current location
function getGeoLocation() {


    const status = document.getElementById('status2');
    status.innerHTML = 'Getting Location...';


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
        
         
        //  Rounds Lat and Long and stores into local storage
         let latr = Math.floor(lat * 100) / 100;
         let longr = Math.floor(long * 100) / 100;
         storage.setItem("long", longr); 
         storage.setItem("lat", latr); 
        
        
        
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);
      


        // Call getLocation function, send locale
                getLocation(locale);
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else

} // end getGeoLocation



// *******************  Gets location information from the NWS API **************************

function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader,) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
      // storage.setItem('hourly', data.properties.periods[13]);
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      let hourlyForcast = data.properties.forecastHourly;
      // Call the function to get the list of weather stations
      console.log(hourlyForcast);
    
        getStationId(stationsURL); 
        getHourly(hourlyForcast);
    
    }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function



   function getHourly(hourlyForcastURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(hourlyForcastURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getHourly function:'); 
      console.log(data);
    
      // Store Hourly Forcast Data 
      let hourlyForcast = [data.properties.periods[1].temperature, data.properties.periods[2].temperature, 
                           data.properties.periods[3].temperature, data.properties.periods[4].temperature,
                           data.properties.periods[5].temperature, data.properties.periods[6].temperature,
                           data.properties.periods[7].temperature, data.properties.periods[8].temperature,
                           data.properties.periods[9].temperature, data.properties.periods[10].temperature,
                           data.properties.periods[11].temperature, data.properties.periods[12].temperature,
                           data.properties.periods[13].temperature]; 
      
      // Create Variables from Object
      let windDirection = data.properties.periods[0].windDirection;
      let windSpeed = data.properties.periods[0].windSpeed;
      let tempNow = data.properties.periods[0].temperature;
     
      // Test variables
      console.log('Hourly Forcast is ' + hourlyForcast); 
      console.log( 'Wind Direction is ' + windDirection);
      console.log('Wind Speed is ' + windSpeed);
      console.log('Temperature now is ' + tempNow);
     
     
      // Store data to localstorage 
      storage.setItem("Hourly Forcast", hourlyForcast); 
      storage.setItem('windDirection', windDirection);
      storage.setItem('windSpeed', windSpeed);
      storage.setItem('tempNow', tempNow);
   
   
   

    
    }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function


function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
     
    
    
        getWeather(stationId);
    
    }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // *********** Gets weather station list and the nearest weather station ID from the NWS API

   function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
     
    
    
        getWeather(stationId);
    
    }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function


   // ***********   Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("Condition", data.properties.textDescription); 
      storage.setItem('Wind Gust', data.properties.windGust.value);
   
      // Build the page for viewing 
      
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function


    buildPage();
   function buildPage(){

    
    // Sets the Weather Conditions
    let conditionNow = storage.getItem('Condition');
    document.getElementById('sky').innerHTML = conditionNow;
   
    // Sets the Temperature
    let tempNow = storage.getItem('tempNow');
    document.getElementById("tempnow").innerHTML = tempNow;

    //Sets the Windspeed
    let windSpeed = storage.getItem('windSpeed');
    document.getElementById("windspeed").innerHTML = windSpeed;
  
    // Sets the Wind Direction
    let windDirection = storage.getItem('windDirection');
    document.getElementById('wdirection').innerHTML = windDirection;

    // Sets the Location
    let city = storage.getItem('locName');
    let state = storage.getItem('locState');
    document.getElementById('contentHeading').innerHTML = city + ", " + state;

    // Set Lat and Long
    
    let long = storage.getItem('long');
    let lat = storage.getItem('lat');
    
    document.getElementById('long').innerHTML = long;
    document.getElementById('lat').innerHTML = lat;

    // Set the Elevation
    let elevation = storage.getItem('stationElevation');
    document.getElementById('meters').innerHTML = elevation;

    // Set the Wind Gusts
    let windGusts = storage.getItem('Wind Gust');
    document.getElementById('gust').innerHTML = windGusts;

  }

 
 
 
    // ******************  set Hourly  ************************************

        // Convert, Format time to 12 hour format
        function format_time(hour) {
          if(hour > 23){ 
          hour -= 24; 
          } 
          let amPM = (hour > 11) ? "pm" : "am"; 
          if(hour > 12) { 
          hour -= 12; 
          } 
          if(hour == 0) { 
          hour = "12"; 
          } 
          return hour + amPM;
        } 


  // Get the next hour based on the current time
     
      let date = new Date(); 
      let nextHour = date.getHours() + 1;
      let hourlyTemps = storage.getItem('Hourly Forcast');

      buildHourlyData(nextHour, hourlyTemps);
  
  // Build the hourly temperature list

      function buildHourlyData(nextHour,hourlyTemps) {


  // Data comes from a JavaScript object of hourly temp name - value pairs
  // Next hour should have a value between 0-23
  // The hourlyTemps variable holds an array of temperatures
  // Line 8 builds a list item showing the time for the next hour 
  // and then the first element (value in index 0) from the hourly temps array
      
      let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
      
      // Build the remaining list items using a for loop
      
        for (let i = 1, x = hourlyTemps.length; i < x; i++) {
          hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F |</li>';
        }
        console.log('HourlyList is: ' +hourlyListItems);
        return hourlyListItems;
        }



     document.getElementById("hourlyforcast").innerHTML = buildHourlyData(nextHour, hourlyTemps);


   
    
    
    
    
    
    
      
     
 
 

