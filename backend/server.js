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

// Resim yükleme rotası
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'folder_name'
        });

        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
});

// Sunucuyu başlat
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server Running on Port ${port}`);
});
