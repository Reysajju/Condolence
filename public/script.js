document.getElementById('donateButton').addEventListener('click', async function() {
    try {
        const response = await fetch('/.netlify/functions/donate-heart', {
            method: 'POST'
        });
        const data = await response.json();
        document.getElementById('counter').innerText = data.hearts;
    } catch (error) {
        console.error('Error donating heart:', error);
    }
});
