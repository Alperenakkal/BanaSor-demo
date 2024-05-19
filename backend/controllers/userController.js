const User = require('../models/kullaniciModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const genareteTokenAndSetCokkie = require('../utils/generateToken.js');

// Login fonksiyonu
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        genareteTokenAndSetCokkie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server error" });
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
const getUser = async (req,res) =>{
    try {
        const username = req.params.userName; // veya req.body.username
        const filter = { userName: username };

        const user = await User.findOne(filter);
        res.status(200).json(user);

    } catch (error) {
        console.log("Error in getUser controller",error.message);
        res.status(500).json({error:"Böyle bir kullanici bulunamdi"})
    }
}

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
            genareteTokenAndSetCokkie(newUser._id, res);
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

module.exports = { login, logout, signup,getUser };
