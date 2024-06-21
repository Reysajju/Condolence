const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const heartsFilePath = path.join(__dirname, 'data', 'hearts.json');

// Middleware to parse JSON body
app.use(express.json());

// Function to get random heart count from a range
function getRandomHeartCount() {
    const heartsData = JSON.parse(fs.readFileSync(heartsFilePath));
    const counts = heartsData.map(entry => entry.count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    return Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
}

// Endpoint to get the random heart count
app.get('/.netlify/functions/get-hearts', (req, res) => {
    try {
        const randomCount = getRandomHeartCount();
        res.status(200).json({ count: randomCount });
    } catch (error) {
        console.error('Error getting hearts count:', error);
        res.status(500).json({ error: 'Failed to get hearts count' });
    }
});

// PUT endpoint to update hearts count
app.put('/.netlify/functions/update-hearts', (req, res) => {
    const { count } = req.body;

    try {
        const heartsData = { count: parseInt(count) }; // Ensure count is parsed as integer
        fs.writeFileSync(heartsFilePath, JSON.stringify(heartsData, null, 2));
        res.status(200).json({ message: 'Hearts count updated successfully' });
    } catch (error) {
        console.error('Error updating hearts count:', error);
        res.status(500).json({ error: 'Failed to update hearts count' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
