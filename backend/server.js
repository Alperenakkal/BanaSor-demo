const http = require('http');
const express = require('express');
const app = express();
const connectToMongoDB = require('./db/connectToMongoDb');
const dotenv = require('dotenv')

const cookieParser =require('cookie-parser')

// Express.js routes
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});
app.use(express.json());
app.use(cookieParser());
const kullaniciRoute = require('./routes/kullanici.js');
const soruRoute = require('./routes/soru');
app.use('/kullanici', kullaniciRoute);
app.use('/soru', soruRoute);

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server Running on Port ${port}`)
});
