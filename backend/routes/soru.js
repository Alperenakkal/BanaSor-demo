// routes/products.js
const express = require('express');
const {  getSoruByDers, getUserSoru } = require('../controllers/soruController');
const protectRoute = require('../middleware/protectRoute');
const router = express.Router();


// Define a route
router.get('/ders/:dersName',getSoruByDers)
router.get('/user',protectRoute,getUserSoru)




// export the router module so that server.js file can use it
module.exports = router;