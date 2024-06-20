// Selecting elements
const counterElement = document.getElementById('counter');
const donateButton = document.getElementById('donateButton');

// Function to fetch hearts count from JSON file
async function fetchHeartsCount() {
    try {
        const response = await fetch('/data/hearts.json'); // Assuming 'data' is at the root level
        if (!response.ok) {
            throw new Error('Failed to fetch hearts count');
        }
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error fetching hearts count:', error);
        return 0; // Default to 0 if there's an error
    }
}

// Function to update counter with fetched count
async function updateCounter() {
    const heartsCount = await fetchHeartsCount();
    counterElement.innerText = heartsCount;
}

// Function to increment hearts count in JSON file
async function incrementHeartsCount() {
    try {
        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST',
            body: JSON.stringify({ hearts: 1 }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to donate heart');
        }

        // Update counter on success
        const data = await response.json();
        counterElement.innerText = data.hearts;

        // Update hearts.json file with the new count
        const currentCount = await fetchHeartsCount();
        const newCount = currentCount + 1; // Incrementing the count
        await fetch('/data/hearts.json', {
            method: 'PUT', // Assuming you have a server-side endpoint to handle this
            body: JSON.stringify({ count: newCount }),
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error donating heart:', error);
    }
}

// Event listener for Donate Heart button click
donateButton.addEventListener('click', function() {
    incrementHeartsCount();
});

// Call updateCounter when the page loads
document.addEventListener('DOMContentLoaded', updateCounter);
