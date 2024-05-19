const express = require('express');

const { login, logout, signup, updateUser ,getUser} = require('../controllers/userController');
const upload = require('../utils/mulerConfig'); // Multer yapılandırmasını içe aktar
const router = express.Router();
router.post("/login",login);
router.post('/signup', upload.single('profilePic'), signup); // Multer'ı kullanarak profilePic dosyasını al
router.post("/logout",logout);

router.get("/getUser/:userName",getUser)

<<<<<<< HEAD
router.put("/updateUser/:userName",upload.single('profilePic') ,updateUser);
=======

router.put('/updateUser/:userName', upload.single('profilePic'), updateUser);
>>>>>>> refs/remotes/origin/main



module.exports= router;