const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));


const urlMap = {};
app.listen(4000, () => {
    console.log('Backend server is running on http://localhost:4000');
});
app.use(express.json())

app.post('/changeUrl', (req, res) => {
    const hash = uuidv4().split('-')[0]
    const {url} = req.body;
    
    urlMap[hash] = url;
    res.json({ hash })
});

app.post('/getUrl', (req, res) => {
    const {hash} = req.body;
    res.json({ url: urlMap[hash] })
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});