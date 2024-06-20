document.getElementById('donateButton').addEventListener('click', async function() {
    try {
        // Disable the button to prevent multiple clicks
        this.disabled = true;

        // Send donation request to server
        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST',
            body: JSON.stringify({ hearts: 1 }), // Always donate 1 heart per click
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
