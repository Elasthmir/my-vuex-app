const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '500mb' })); // Zwiększenie limitu rozmiaru JSON

const dataFilePath = path.join(__dirname, '..', 'data.json');

// Endpoint do odczytu danych
app.get('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint do zapisu danych
app.post('/api/data', (req, res) => {
    console.log('Received data:', req.body); // Logowanie odebranych danych
    const newData = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write data' });
        }
        res.json({ success: true });
    });
});

module.exports = app;
