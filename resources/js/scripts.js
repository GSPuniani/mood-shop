import data from "./data.js"
const itemsContainer = document.getElementById("items")

const itemList = document.getElementById("item-list")
// itemList.innerHTML = '<li>Hello World</li>'
const cartQty = document.getElementById("cart-qty")
const cartTotal = document.getElementById("cart-total")


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

const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"))
    showItems()
}))


const cart = []

// --------------------------------------------------------------------------
// Handle Change events on input ("update" class)
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains("update")) {
        // console.log(e.target)
        const name = e.target.dataset.name //data-name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

// --------------------------------------------------------------------------
// Handle clicks on list
itemList.onclick = function(e) {
    // console.log("Clicked list")
    // console.log(e.target)
    if (e.target && e.target.classList.contains("remove")) {
        const name = e.target.dataset.name //data-name
        removeItem(name)
    }
    else if (e.target && e.target.classList.contains("add-one")) {
        const name = e.target.dataset.name //data-name
        addItem(name)
    }
    else if (e.target && e.target.classList.contains("remove-one")) {
        const name = e.target.dataset.name //data-name
        removeItem(name, 1)
    }
}

// --------------------------------------------------------------------------
// Add an item with a name and a price
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item)
}

// --------------------------------------------------------------------------
// Display all items with prices and quantities in the cart
function showItems() {
    // Provide a special case for when cart has only 1 item so that message is grammatically correct
    if (getQty() === 1) {
        cartQty.innerHTML = `You have 1 item in your cart.`
    }
    else {
        cartQty.innerHTML = `You have ${getQty()} items in your cart.`
    }
    

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        // Assign key names to intermediate variables
        const {name, price, qty} = cart[i]
        itemStr += `<li>${name} $${price} x ${qty} = $${(price * qty).toFixed(2)} 
        <button class="remove" data-name="${name}">Remove</button> 
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>  
        <input class="update" type="number" min="0" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    cartTotal.innerHTML = `The total price of all items in the cart is $${getTotal()}.`
}

// --------------------------------------------------------------------------
// Calculate and return the total number of items in the cart
function getQty() {
    let quantity = 0
    for (let i = 0; i < cart.length; i += 1) {
        quantity += cart[i].qty
    }
    return quantity
}

// --------------------------------------------------------------------------
// Calculate and return the total price of all items in the cart
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].qty * cart[i].price
    }
    return total.toFixed(2)
}

// --------------------------------------------------------------------------
// Remove one or more items from the cart
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
}

// --------------------------------------------------------------------------
// Update the cart quantities based on the quantity specified in the input field
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name)
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}

// --------------------------------------------------------------------------
// addItem('Apple', 0.99)
// addItem('Orange', 1.29)
// addItem('Opinion', 0.02)
// addItem('Apple', 0.99)
// addItem('Frisbee', 9.92)
// addItem('Apple', 0.99)
// addItem('Orange', 1.29)

// showItems()

// removeItem('Apple', 1)
// removeItem('Frisbee')

// showItems()

// console.log(all_items_button)