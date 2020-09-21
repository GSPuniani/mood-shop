const itemsContainer = document.getElementById("items")
import data from "data.js"

// The length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; ++i) {
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
    console.log(img)
}