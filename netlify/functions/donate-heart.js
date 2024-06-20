// Example serverless function to handle heart donation count
const fs = require('fs');
const path = require('path');
const heartsDataPath = path.resolve('./data/hearts.json'); // Path to JSON file

// Function to read hearts data from JSON file
function readHeartsData() {
    try {
        const heartsData = fs.readFileSync(heartsDataPath);
        return JSON.parse(heartsData);
    } catch (error) {
        console.error('Error reading hearts data:', error);
        return { count: 0 }; // Return initial count if file does not exist
    }
}

// Function to write hearts data to JSON file
function writeHeartsData(data) {
    try {
        fs.writeFileSync(heartsDataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing hearts data:', error);
    }
}

// Initialize hearts data if file does not exist
if (!fs.existsSync(heartsDataPath)) {
    writeHeartsData({ count: 0 });
}

// Main function to handle POST request to increment heart count
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Read current hearts data
        let heartsData = readHeartsData();

        // Increment heart count
        heartsData.count++;

        // Write updated hearts data
        writeHeartsData(heartsData);

        // Return updated count
        return {
            statusCode: 200,
            body: JSON.stringify({ hearts: heartsData.count })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to donate heart' })
        };
    }
};
