const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let heartsDonated = 0;

app.get('/api/hearts', (req, res) => {
    res.json({ hearts: heartsDonated });
});

app.post('/api/donate', (req, res) => {
    heartsDonated += 1;
    res.json({ hearts: heartsDonated });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
