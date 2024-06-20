document.getElementById('donateButton').addEventListener('click', () => {
    fetch('https://your-backend-url.vercel.app/api/donate', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('counter').innerText = data.hearts;
    })
    .catch(error => console.error('Error:', error));
});

// Fetch initial hearts count
fetch('https://your-backend-url.vercel.app/api/hearts')
    .then(response => response.json())
    .then(data => {
        document.getElementById('counter').innerText = data.hearts;
    })
    .catch(error => console.error('Error:', error));
