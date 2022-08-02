const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 8080;

const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT, PATCH, UPDATE");
    next()
});

app.get('/', (req, res) => {
    axios.get("https://api.deezer.com/user/2529/flow")
    .then(response => {
        responseData = response.data
        res.json(responseData)
    })
});


app.listen(PORT, (err) => {
    if (err) {
        console.log("LISTEN ERROR: ", err);
        return;
    }
    console.log(`Server started on port ${PORT}`);
});