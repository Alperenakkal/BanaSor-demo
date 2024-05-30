const User = require('../models/kullaniciModel.js');
const mongoose = require('mongoose'); // Mongoose kütüphanesini ekleyin

const multer = require('multer');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage(); // Dosyaları bellek üzerinde tutmak için
const upload = multer({ storage: storage });
// Login fonksiyonu
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        console.log('Login attempt:', { userName, password }); // Gelen verileri loglayın

        if (!userName || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ userName });
        console.log('User found:', user); // Bulunan kullanıcıyı loglayın

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Password match:', isPasswordCorrect); // Şifre doğrulama sonucunu loglayın

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            token // Token'ı yanıtla birlikte gönderiyoruz
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Logout fonksiyonu
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};
const getUser = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUser controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getUserJwt = async(req,res)=>{
try {
        const id = req.user._id;
        console.log("Received ID:", id); // ID'yi loglayın

      

        const user = await User.findById(id);
        console.log("User found:", user); // Bulunan kullanıcıyı loglayın

        if (!user) {
            return res.status(404).json({ error: "Giris Yapılmamis" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserId controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
// Kullanıcı ID'si ile kullanıcıyı getiren fonksiyon
const getUserId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Received ID:", id); // ID'yi loglayın

        // ID'nin geçerli bir MongoDB ObjectId olup olmadığını kontrol edin
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findById(id);
        console.log("User found:", user); // Bulunan kullanıcıyı loglayın

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserId controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Signup fonksiyonu
const signup = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender ,seviye} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let profilePicUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profile_pics'
            });
            profilePicUrl = result.secure_url;
        } else {
            profilePicUrl = gender === 'male' 
                ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
                : `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        }

        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            gender,
            profilePic: profilePicUrl,
            seviye
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                seviye:newUser.seviye
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};



const updateUser = async function (req, res) {
    try {
        // Form verilerini al
        let { fullName, userName, email, password, gender, seviye } = req.body;

        // Kullanıcı adını al ve filtreleme objesini oluştur
        let username = req.params.userName;
        let filter = { userName: username };

        // Kullanıcıyı veritabanından bul
        let user = await User.findOne(filter);
        if (!user) {
            return res.status(400).json({ error: "Kullanıcı bulunamadı" });
        }

        // Eğer yeni şifre verilmişse, şifreyi hash'le
        if (password) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Kullanıcı bilgilerini güncelle
        user.fullName = fullName || user.fullName;
        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.seviye = seviye || user.seviye; // Seviye değerini güncelle

        // Profil resmi URL'sini belirle
        let profilePicUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profile_pics'
            });
            profilePicUrl = result.secure_url;
        } else {
            profilePicUrl = gender === 'male' 
                ? `https://avatar.iran.liara.run/public/boy?username=${userName}`
                : `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        }

        // Kullanıcıyı kaydet
        user = await user.save();

        // Güncellenmiş kullanıcı bilgilerini JSON formatında döndür
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: "Güncelleme başarısız" });
        console.error(error.message);
    }
};
const followUnFollowUser = async (req, res) => {
    try {
        const username = req.params.userName;
        console.log('Follow/Unfollow attempt for username:', username);
        console.log('Current user:', req.user.userName);

        const userToModify = await User.findOne({ userName: username });
        const currentUser = await User.findOne({ userName: req.user.userName });

        if (username === req.user.userName) {
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
        }

        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User not found" });
        }

        console.log('User to modify:', userToModify);
        console.log('Current user:', currentUser);

        const isFollowing = currentUser.following.includes(userToModify._id);
        console.log('Is following:', isFollowing);

        if (isFollowing) {
            // Unfollow user
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: userToModify._id } });
            await User.findByIdAndUpdate(userToModify._id, { $pull: { followers: currentUser._id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            // Follow user
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: userToModify._id } });
            await User.findByIdAndUpdate(userToModify._id, { $push: { followers: currentUser._id } });
            res.status(200).json({ message: "User followed successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in followUnFollowUser:", error.message);
    }
};

module.exports = followUnFollowUser;

// Yorum ekleme fonksiyonu
const yorumEkle = async (req, res) => {
    try {
        const { soruId, yorum } = req.body;

        if (!soruId || !yorum) {
            return res.status(400).json({ error: "Soru ID ve yorum gereklidir" });
        }

        const yeniYorum = new Yorum({
            soruId,
            userId: req.user._id,
            yorum
        });

        await yeniYorum.save();
        res.status(201).json(yeniYorum);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
};

// Yorum silme fonksiyonu
const yorumSil = async (req, res) => {
    try {
        const yorumId = req.params.yorumId;

        if (!yorumId) {
            return res.status(400).json({ error: "Yorum ID gereklidir" });
        }

        const yorum = await Yorum.findById(yorumId);

        if (!yorum) {
            return res.status(404).json({ error: "Yorum bulunamadı" });
        }

        if (yorum.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Bu yorumu silmeye yetkiniz yok" });
        }

        await yorum.remove();
        res.status(200).json({ message: "Yorum silindi" });
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
};



module.exports = { login, logout, signup ,updateUser,getUser,getUserId,followUnFollowUser,getUserJwt,yorumEkle,yorumSil};

