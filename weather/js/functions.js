// Weather Site Javascript Functions


// Javescript test 
console.log('My javascript is being read.');





// Wind Chill Function

function buildWC(speed, temp) {
    
    // Find Spot to put Data
    
    let feelTemp = document.getElementById('feelTemp');
  
   
    // Calulates the wind chill with the new data
    
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    
    // Round Down
   
    wc = Math.floor(wc);
   
   
    // If chill is greater than temp return the temp
    
    wc = (wc > temp)?temp:wc;

    // Display the Wind Chill
   
    console.log(wc);
    feelTemp.innerHTML = wc;

}

// Gathers Data to calculate wind chill
  
  let temp = parseFloat(document.getElementById('tempnow').innerHTML);
  let speed = parseFloat(document.getElementById('windspeed').innerHTML);

// Calls the function

  buildWC(speed, temp);




  // Wind Dial Function
function windDial(direction){


    // Get the wind dial container
        
        let dial = document.getElementById("dial");

    // Determine the dial class
        switch (direction){
        case "North":
        case "N":
        dial.setAttribute("class", "n"); //"n" is the CSS rule selector
        break;
        case "NE":
        case "NNE":
        case "ENE":
        dial.setAttribute("class", "ne");
        break;
        case "NW":
        case "NNW":
        case "WNW":
        dial.setAttribute("class", "nw");
        break;
        case "South":
        case "S":
        dial.setAttribute("class", "s");
        break;
        case "SE":
        case "SSE":
        case "ESE":
        dial.setAttribute("class", "se");
        break;
        case "SW":
        case "SSW":
        case "WSW":
        dial.setAttribute("class", "sw");
        break;
        case "East":
        case "E":
        dial.setAttribute("class", "e");
        break;
        case "West":
        case "W":
        dial.setAttribute("class", "w");
        break;
   }
}


// Gathers Information for windDial Function

  let direction = document.getElementById('wdirection').innerHTML;


// Calls windDial Function

  windDial(direction);




// Gets Information from HTML
let meters = document.getElementById('meters').innerHTML;

// Tests meters variable
console.log(meters);

// Calls convertMeters Function
convertMeters (meters); 
function convertMeters (meters) {
          
        
  let feet = meters * 3.281;
  
  feet = Math.floor(feet); 

  return feet + " ft.";
}



// Tests convertMeters Function
console.log(convertMeters(meters));

// Displays Return Value into Span Element
document.getElementById('meters').innerHTML = convertMeters(meters); 






// Background Image Change Function
let condition = document.getElementById("sky").innerHTML;

// Changes the "sky" string to lower case
let lower = condition.toLowerCase();


// Tests Variables
console.log(condition);
console.log(lower);

// Calls Function
getCondition(lower);

// Gets Condition Name
function getCondition(lower) {

if (lower.includes('clear')|| lower.includes("sunny")) {
           return "clear";
}
if (lower.includes('cloudy')|| lower.includes("overcast") || lower.includes("partlycloudy")) {
            return "cloud";
}
if (lower.includes('raining')|| lower.includes("rain") || lower.includes("storming") || lower.includes("lightningstorm") || lower.includes("thunderstorm") || lower.includes("thunderstorms")) {
            return "rain";
}
if (lower.includes('foggy')|| lower.includes("fog") || lower.includes('hazy')) {
             return "fog";
}
if (lower.includes('snowing')|| lower.includes("snow") || lower.includes('flurries') || lower.includes('snowstorm')) {
  return "snow";
}
}


// Tests Function
console.log(getCondition(lower));

// Returns keyword from getCondition into the weather variable
let weather = getCondition(lower);

// Tests Weather Variable
console.log(weather);

// Runs changeSummaryImage
changeSummaryImage(weather);

// Uses getCondition keyword to change background image
function changeSummaryImage(weather) {
        
  
  //  Inserts  data into HMTL
  let threecontainer = document.getElementById("threecontainer");
  let conditionimage = document.getElementById("conditionimage");
         
  
          if (weather == "clear") {
              threecontainer.setAttribute("class", "clear");
              conditionimage.setAttribute("class", "clear");
          }
          if (weather == "cloud") {
            threecontainer.setAttribute("class", "cloud");
            conditionimage.setAttribute("class", "cloud");
          }
          if (weather == "fog") {
            threecontainer.setAttribute("class", "fog");
            conditionimage.setAttribute("class", "fog");
          }
          if (weather == "rain") {
            threecontainer.setAttribute("class", "rain");
            conditionimage.setAttribute("class", "rain");
          }
          if (weather == "snow") {
            threecontainer.setAttribute("class", "snow");
            conditionimage.setAttribute("class", "snow");
          }




// variable creation




  

}
