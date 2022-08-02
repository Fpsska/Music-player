const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();



const app = express();



// middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT, PATCH, UPDATE");
    next()
});



// routes
app.get('/', (req, res) => {
    res.send('start route');
});

app.use('/api/data', async (req, res) => {

    const response = await fetch(process.env.API_URL)
    .then(data => data.json())
    .catch(err => console.error(err.message || err));

    res.json(response.data);
});



// connection
const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));