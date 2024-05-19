const express = require('express');
const { login, logout, signup } = require('../controllers/userController');
const upload = require('../utils/mulerConfig'); // Multer yapılandırmasını içe aktar
const router = express.Router();
router.post("/login",login);
router.post('/signup', upload.single('profilePic'), signup); // Multer'ı kullanarak profilePic dosyasını al
router.post("/logout",logout);
module.exports= router;