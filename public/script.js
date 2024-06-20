// Initialize click counter
let clickCount = 0;

document.getElementById('donateButton').addEventListener('click', async function() {
    try {
        // Disable the button to prevent multiple clicks
        this.disabled = true;

        // Increment click count
        clickCount++;

        // Send the number of hearts to donate (based on click count)
        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST',
            body: JSON.stringify({ hearts: clickCount }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        document.getElementById('counter').innerText = data.hearts;

    } catch (error) {
        console.error('Error donating heart:', error);
    } finally {
        // Re-enable the button after the request completes (whether success or error)
        this.disabled = false;
    }
});
