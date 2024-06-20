const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    // Path to the JSON file
    const filePath = path.resolve(__dirname, '../../data/hearts.json');

    // Read the current count from the JSON file
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const currentCount = data.count;

    // Update the count
    const newCount = currentCount + 138;
    data.count = newCount;

    // Write the updated count back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    return {
        statusCode: 200,
        body: JSON.stringify({ count: newCount })
    };
};
