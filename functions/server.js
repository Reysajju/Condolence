const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const heartsFilePath = path.join(__dirname, 'data', 'hearts.json');

// Middleware to parse JSON body
app.use(express.json());

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
