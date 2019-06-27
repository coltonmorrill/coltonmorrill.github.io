// variable creation
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');
let hourlyList = document.getElementById("hourlyData");

pageNav.addEventListener('click', function(evt){

// Get the City Name

let cityName = evt.target.innerHTML;
switch (cityName) {
  
  // Checks city names
 
  case "Franklin":
  case "Greenville":
  case "Springfield":  
 
  // Stops from loading new page. Gets Data from JSON
  
  evt.preventDefault();
 
  break;

}




// Creates path to weather.json
let weatherURL = "js/weather.json";



// fetchData(weatherURL);


// Gets Json data

// function fetchData(weatherURL){
    
//      let cityName = 'Greenville'; // The data we want from the weather.json file
   
fetch(weatherURL)
    .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the greenville part
      // shorten the variable and focus only on the data we want to reduce typing
      let g = data[cityName];
  
      // ************ Get the content ******************************
  
      // Get the location data
      let locName = g.City;
      let locState = g.State;
      // Put them together
      let fullName = locName+', '+locState;
      // See if it worked
      console.log('fullName is: '+fullName);
  
      // Get the temperature data
      let temp = g.Temp;

      // test
      console.log(temp);
  
      // Get the wind data 
      let wind = g.Wind;

      // test
      console.log(wind);
  
      // Get the current conditions
      let condition = g.Summary;
      // let conditionString = JSON.stringify(condition);
      // test
      console.log(condition);
      // console.log(conditionString);
      // Get the hourly data 
      let hourly = g.Hourly;

      // test
      console.log(hourly);
      
      // Get Wind Direction
      let direction = g.Direction;
      
      // test
      console.log (direction); 


      // Get Gusts
      let gust = g.Gusts

      // test
      console.log(gust);
     
      // Get Elevation
      let elevation = g.Elevation;

      // test
      console.log(elevation);
      
      // Get Zipcode
      let zip = g.Zip;

      // test
      console.log(zip);

      // Get Longitude
      let long = g.Longitude;
      long = Math.floor(long *100)/100;
      // test
      console.log(long);

      // Get Latitude
      let lat = g.Latitude;
      lat = Math.floor(lat*100)/100;
      // test
      console.log(lat);
      
      // ************ Display the content ******************************
     
      // Set the title with the location name at the first
      
      // Gets the title element so it can be worked with
      let pageTitle = document.getElementById('page-title');
     
      // Create a text node containing the full name 
      let fullNameNode = document.createTextNode(fullName);
     
      // inserts the fullName value before any other content that might exist
      pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
     
      // When this is done the title should look something like this:
      
      // Greenville, SC | The Weather Site
  
      // Set the Location information
     
      // Get the h1 to display the city location
      let contentHeading = document.getElementById('contentHeading');
      contentHeading.innerHTML = fullName;
      // The h1 in main h1 should now say "Greenville, SC"
  
  
      // Set the temperature information
      document.getElementById("tempnow").innerHTML = temp;
   
      // Set the wind information
      document.getElementById("windspeed").innerHTML = wind;
      


      // set zipcode
      document.getElementById('newzip').innerHTML = zip;

      // set long and lat
      document.getElementById("long").innerHTML = long;
      document.getElementById("lat").innerHTML = lat;


      // Set the Wind Chill
      buildWC(wind,temp);
      console.log(wind,temp);

      // Set the current wind gusts
      document.getElementById("gust").innerHTML = gust;
     
  

      // Set the Conditions
      let lower = condition.toLowerCase();
      document.getElementById("sky").innerHTML = condition; 
      let conditionset = getCondition(lower);
      changeSummaryImage(conditionset);
      console.log(conditionset);

      // Set the hourly temperature information
     
      // Set the Wind Direction
      document.getElementById("wdirection").innerHTML = direction;
      

      // set the wind dial
      windDial(direction);
      console.log(direction);
      

         
      // Set Elevation
      
  

   


     
     
     
     
     
      // Change the status of the containers
      contentContainer.setAttribute('class', ''); // removes the hide class
      statusContainer.setAttribute('class', 'hide'); // hides the status container
   
   
   
   
   
   
   
    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
    


  })
  // }