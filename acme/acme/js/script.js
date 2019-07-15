

// variable creation

let statusContainer = document.getElementById('status');

// local storage
var storage = window.localStorage;





// Changes Page based on click in the Nav


pageNav = document.getElementById('navBar');

pageNav.addEventListener('click', function(evt){

  // Get the City Name
  
  let productName = evt.target.innerHTML;
  switch (productName) {
    
    // Checks Product names
   
    case "Home":
    case "Anvil":
    case "Explosives":
    case "Decoys":  
    case "Traps":
   
    // Stops from loading new page. Gets Data from JSON
    
    evt.preventDefault();
   
    break;
  
  }


// Creates path to JSON File
let acmeURL = "../js/acme.json";

// Fetches data from JSON
fetch(acmeURL)
     .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK');
  })
    .then(function(data){
      // Check the data object that was retrieved
      console.log(data);
      // shorten the variable and focus only on the data we want to reduce typing
      let d = data[productName];
      console.log(d);

      let product = d.name;
      console.log(product);

    })
    
        })
        let acmeURL = "../js/acme.json";


        // Stores Data into Local Storage
        fetch(acmeURL)
        .then(function(response) {
       if(response.ok){
       return response.json();
       }
       throw new ERROR('Network response was not OK');
     })
       .then(function(data){
         // Check the data object that was retrieved
         console.log(data);
         // shorten the variable and focus only on the data we want to reduce typing
         let d = data;
         console.log(d);
   
         let productData = new Array(0);
         JSON.stringify(productData.push(d.Anvils.navName));
         JSON.stringify(productData.push(d.Explosives.navName));
         JSON.stringify(productData.push(d.Decoys.navName));
         JSON.stringify(productData.push(d.Traps.navName));
   
         storage.setItem("JSON Data", JSON.stringify(productData));
   
         let product = d.name;
         console.log(product);
    
       })




// Builds Navigation Bar

let productNav = JSON.parse(storage.getItem('JSON Data'));
buildNavData(productNav);
function buildNavData(productNav) {

  let navListItems = '<li>' + '<a>' + "Home" + '</a>' + '</li>';
  
  // Build the remaining list items using a for loop
  
  for (let i = 0, x = 3; i <= x; i++) {
          
    navListItems += ' <li>' + productNav[i] + '</li>';
  }

    return navListItems;
    }
    
    // Displays the list elements in the HTML
    document.getElementById("navList").innerHTML = buildNavData(productNav);
   
    // Adds padding to the list elements
    var c = document.getElementById('navList').children;
        var i;
        for (i = 0; i < c.length; i++) {
        c[i].setAttribute("class", "padding");
        }



