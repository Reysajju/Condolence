document.getElementById('donateButton').addEventListener('click', async function() {
    try {
        // Disable the button to prevent multiple clicks
        this.disabled = true;

        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST'
        });
        const data = await response.json();
        document.getElementById('counter').innerText = data.hearts;
        
        // Re-enable the button after a short delay (if needed)
        // You can adjust the delay as per your preference
        setTimeout(() => {
            this.disabled = false;
        }, 1000); // Example delay of 1000 milliseconds (1 second)
        
    } catch (error) {
        console.error('Error donating heart:', error);
        // Re-enable the button in case of error
        this.disabled = false;
    }
});
