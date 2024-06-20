const fs = require('fs');
const path = require('path');
const heartsDataPath = path.resolve('functions/hearts.json'); // Path to JSON file

exports.handler = async function(event) {
    try {
        // Read hearts count from JSON file
        const heartsData = JSON.parse(fs.readFileSync(heartsDataPath, 'utf8'));
        const heartsCount = heartsData.count;

        // Return the current heart count
        return {
            statusCode: 200,
            body: JSON.stringify({ count: heartsCount })
        };
    } catch (error) {
        console.error('Error reading hearts data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch heart count' })
        };
    }
};
