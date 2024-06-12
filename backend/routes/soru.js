// routes/products.js
const express = require('express');

const {  getSoruByDers, getUserSoru, soruSor, getSorular, updateSoru, searchSorular, addRating, getSoruById } = require('../controllers/soruController');


const protectRoute = require('../middleware/protectRoute');
const upload = require('../utils/mulerConfig');
const router = express.Router();


// Define a route
router.get('/ders/:dersName',getSoruByDers)
router.get('/user/:userName',getUserSoru)
router.get('/soru/:soruid', getSoruById)
router.post('/sor',protectRoute, upload.single('soruPic') ,soruSor)
router.get('/sorular',getSorular)
router.put('/guncelle/:soruId',updateSoru)
router.get('/search', searchSorular)
router.put('/rate/:questionId',addRating)




// export the router module so that server.js file can use it
module.exports = router;