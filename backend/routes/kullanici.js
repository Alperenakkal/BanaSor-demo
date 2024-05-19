const express = require('express');
<<<<<<< HEAD
const { login, logout, signup ,getUser} = require('../controllers/userController');
=======
const { login, logout, signup, updateUser } = require('../controllers/userController');
>>>>>>> 0f692c5c (updateUser)
const upload = require('../utils/mulerConfig'); // Multer yapılandırmasını içe aktar
const router = express.Router();
router.post("/login",login);
router.post('/signup', upload.single('profilePic'), signup); // Multer'ı kullanarak profilePic dosyasını al
router.post("/logout",logout);
<<<<<<< HEAD
router.get("/getUser/:userName",getUser)
=======

router.put("/updateUser/:userName",updateUser)


>>>>>>> 0f692c5c (updateUser)
module.exports= router;