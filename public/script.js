// Selecting elements from the DOM
const counterElement = document.getElementById('counter');
const donateButton = document.getElementById('donateButton');

// Function to increment hearts count and update server
async function incrementHeartsCount() {
    try {
        // Increment local counter
        let currentCount = parseInt(counterElement.innerText);
        currentCount++;
        counterElement.innerText = currentCount;

        // Update hearts.json file with the new count
        const response = await fetch('/.netlify/functions/update-hearts', {
            method: 'PUT',
            body: JSON.stringify({ count: currentCount }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to update hearts count on server');
        }

        console.log('Hearts count updated successfully on server');

    } catch (error) {
        console.error('Error donating heart:', error);
    }
}

// Event listener for Donate Heart button click
donateButton.addEventListener('click', incrementHeartsCount);

// Function to fetch and update initial heart count on page load
async function updateInitialHeartCount() {
    try {
        const response = await fetch('/data/hearts.json'); // Assuming hearts.json location
        if (!response.ok) {
            throw new Error('Failed to fetch initial hearts count');
        }
        const data = await response.json();
        counterElement.innerText = data.count;
    } catch (error) {
        console.error('Error fetching initial hearts count:', error);
    }
}

// Call updateInitialHeartCount when the page loads
document.addEventListener('DOMContentLoaded', updateInitialHeartCount);
