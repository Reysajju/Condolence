document.getElementById('donateButton').addEventListener('click', async function() {
    try {
      // Get the current heart count
      const currentHearts = parseInt(document.getElementById('counter').innerText);
  
      // Send the number of hearts to donate (in this case, 1)
      const response = await fetch('/.netlify/functions/donate-heart', {
        method: 'POST',
        body: JSON.stringify({ hearts: 1 }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      const data = await response.json();
      document.getElementById('counter').innerText = data.hearts;
  
      // Re-enable the button after a short delay (if needed)
      setTimeout(() => {
        this.disabled = false;
      }, 1000);
    } catch (error) {
      console.error('Error donating heart:', error);
      // Re-enable the button in case of error
      this.disabled = false;
    }
  });