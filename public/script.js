// Selecting the button and counter elements
const donateButton = document.getElementById('donateButton');
const counterElement = document.getElementById('counter');

// Initializing the count variable to track donated hearts
let heartsCount = 0;

// Adding event listener to the Donate Heart button
donateButton.addEventListener('click', function() {
    // Increment the hearts count
    heartsCount++;

    // Update the counter text content to display the new count
    counterElement.innerText = heartsCount;
});
