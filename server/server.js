const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

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