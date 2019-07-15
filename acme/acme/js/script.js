

// variable creation


let contentContainer = document.getElementById('firstSection');
let secondContainer = document.getElementById('secondSection');
// local storage
var storage = window.localStorage;





// Changes Page based on click in the Nav


pageNav = document.getElementById('navBar');

pageNav.addEventListener('click', function(evt){
contentContainer.setAttribute('class', 'hide'); // hides the status container

  // Get the City Name
  
  let productName = evt.target.innerHTML;
  switch (productName) {
    
    // Checks Product names
   
    case "Home":
    contentContainer.setAttribute('class', '');
    secondContainer.setAttribute('class', 'hide');
    break;
    case "Anvil":
    secondContainer.setAttribute('class', '');
    break;
    case "Explosives":
    secondContainer.setAttribute('class', '');
    break;
    case "Decoys":  
    secondContainer.setAttribute('class', '');
    break;
    case "Traps":
    secondContainer.setAttribute('class', '');
   
   
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
      document.getElementById('pTitle').innerHTML = product;
      console.log(product);

      let image = d.path;
      document.getElementById('pImage').src = image;

      let description = d.description;
      document.getElementById("pDescription").innerHTML = description;

      let manufacturer = d.manufacturer;
      document.getElementById("creator").innerHTML = " " + manufacturer; 

      let reviews = d.reviews;
      document.getElementById('stars').innerHTML = " " + reviews;

      let price = d.price;
      document.getElementById('cost').innerHTML = " " + price;
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
        
         let productData = Object.keys(data);
        console.log(productData);
   
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
  
  for (let i = 0, x = productNav.length; i < x; i++) {
          
    navListItems += '<li>' + '<a>' + productNav[i] + '</a>' + '</li>';
  }

    return navListItems;
    }
    
    // Displays the list elements in the HTML
    document.getElementById("navList").innerHTML = buildNavData(productNav);
   console.log(buildNavData(productNav));
    // Adds padding to the list elements
    var c = document.getElementById('navList').children;
        var i;
        for (i = 0; i < c.length; i++) {
        c[i].setAttribute("class", "padding");
        }

 