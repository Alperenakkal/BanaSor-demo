const express = require('express');


const { login, logout, signup, updateUser ,getUser,getUserId, followUnFollowUser, getUserJwt } = require('../controllers/userController');
const upload = require('../utils/mulerConfig'); // Multer yapılandırmasını içe aktar
const  protectRoute  = require('../middleware/protectRoute');
const router = express.Router();
router.post("/login",login);
router.post('/signup', upload.fields([{ name: 'profilePic', maxCount: 1 }]), signup); // Multer'ı kullanarak profilePic dosyasını al
router.post("/logout",logout);

router.get("/getUser/username/:userName", getUser); // Kullanıcı adına göre kullanıcı al
router.get("/getUser/id/:id", getUserId); // ID'ye göre kullanıcı al




router.put("/updateUser/:userName",upload.single('profilePic') ,updateUser);

router.post("/follow/:userName",protectRoute,followUnFollowUser);
router.get("/getUser/kayitli",protectRoute,getUserJwt);

router.post('/:userName/yorum', koruma, yorumEkle);
router.delete('/:userName/yorum/:yorumId', koruma, yorumSil);







module.exports= router;