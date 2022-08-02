const fetch = require('node-fetch');


class tracksController {
    async getTracks(req, res) {
        const response = await fetch(process.env.API_URL)
            .then(res => res.json())
            .catch(err => console.error(err.message || err));

        res.json(response.data);
    }
}

module.exports = new tracksController();


