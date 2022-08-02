const { Router } = require('express');
const tracksController = require('../controllers/tracks.controller');

const router = new Router();


router.get('/', tracksController.getTracks);


module.exports = router;