const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT

if (PORT == null || PORT == "") {
    PORT = 8000;
}

const app = express();

//  Serve the static files from the React app
app.use(express.static('/public'));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT, PATCH, UPDATE");
    next()
});

app.get('/api', (req, res) => {
    axios.get("https://api.deezer.com/user/2529/flow")
        .then(response => {
            responseData = response.data.response.players
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