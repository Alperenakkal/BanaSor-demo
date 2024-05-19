const http = require('http');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const upload = require('./utils/mulerConfig.js');
const app = express();
const connectToMongoDB = require('./db/connectToMongoDb');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// .env dosyasını yükle
dotenv.config();

// Cloudinary yapılandırması
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Orta katmanlar
app.use(express.json());
app.use(cookieParser());

// Rotalar
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const kullaniciRoute = require('./routes/kullanici.js');
const soruRoute = require('./routes/soru');
app.use('/kullanici', kullaniciRoute);
app.use('/soru', soruRoute);



// Sunucuyu başlat
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server Running on Port ${port}`);
});
