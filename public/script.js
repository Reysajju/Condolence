document.getElementById('donateButton').addEventListener('click', async function() {
    try {
        // Disable the button to prevent multiple clicks
        this.disabled = true;

        // Get the number of hearts to donate (can be dynamic, in this case, 1 per click)
        const heartsToDonate = 1; // You can adjust this dynamically if needed

        // Send the number of hearts to donate
        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST',
            body: JSON.stringify({ hearts: heartsToDonate }),
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
