import data from "./data.js"
const itemsContainer = document.getElementById("items")


// The length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i++) {
    // Create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // Create an image element
    let img = document.createElement('img');
    // This will change each time we go through the loop because i is incremented with each iteration
    img.src = data[i].image
    img.width = 300
    img.height = 300
    // Add the image to the div
    newDiv.appendChild(img)

    // Create a paragraph element for the description
    let description = document.createElement('p')
    // Grab the text from the data  
    description.innerText = data[i].desc
    // Append the paragraph to the div element
    newDiv.appendChild(description)

    // Create a paragraph element for the price
    let price = document.createElement('p')
    // Grab the text from the data 
    price.innerText = data[i].price
    // Append the paragraph to the div element
    newDiv.appendChild(price)

    // Create a button element
    let button = document.createElement("button")
    // Make the id of each button unique
    button.id = data[i].name

    // Create a custom attribute called data-price, which will hold the price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

    // Put a new div inside items container
    itemsContainer.appendChild(newDiv)
}
