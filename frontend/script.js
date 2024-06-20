document.getElementById('donateButton').addEventListener('click', () => {
    fetch('https://condolence-lf38u6cmr-sajjadr742gmailcoms-projects.vercel.app', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('counter').innerText = data.hearts;
    })
    .catch(error => console.error('Error:', error));
});

// Fetch initial hearts count
fetch('https://my-backend.vercel.app/api/hearts')
    .then(response => response.json())
    .then(data => {
        document.getElementById('counter').innerText = data.hearts;
    })
    .catch(error => console.error('Error:', error));

