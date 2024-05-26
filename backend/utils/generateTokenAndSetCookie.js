const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 gün
        httpOnly: true,
        sameSite: "lax", // Geliştirme ortamında 'lax' kullanabilirsiniz
        secure: false, // Geliştirme ortamında HTTPS kullanmıyorsanız false yapın
    });

    return token; // Token'ı döndürüyoruz, yanıtı burada göndermiyoruz
};

module.exports = generateTokenAndSetCookie;
