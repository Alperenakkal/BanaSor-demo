const Soru = require('../models/soruModel');
const User = require('../models/kullaniciModel');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const storage = multer.memoryStorage(); // Dosyaları bellek üzerinde tutmak için
const upload = multer({ storage: storage });

const getSoruByDers = async (req,res) =>{
    try {
    const dersname = req.params.dersName;
    const sorular = await Soru.find({dersName:dersname})
    if (!sorular) {
        return res.status(400).json({ error: "soru bulunamadi" });
    }
    res.status(200).json(sorular);
} catch (error) {
    console.log("Error in getSoruByDers controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
}}
const getUserSoru = async (req, res) => {
    try {
      const username = req.params.userName;
      const user = await User.findOne({ userName: username });
      
      if (!user) {
        return res.status(401).json({ error: "Boyle bir kisi yok" });
      }

      console.log(user._id);
      const sorular = await Soru.find({ userId: user._id });
  
      if (!sorular) {
        return res.status(400).json({ error: "Soru bulunamadi" });
      }
  
      res.status(200).json(sorular);
  
    } catch (error) {
      console.log("Error in getUserSoru controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  

  const soruSor=async(req,res)=>{
    try {        
      const id = req.user._id;
      const {  dersName, soru, cevaplar } = req.body;

      let soruPicUrl = '';
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
              folder: 'profile_pics'
          });
          soruPicUrl = result.secure_url;
      } 
      

      const newSoru = new Soru({
          userId:id,
          dersName,
          soru,
          cevaplar,
          soruPic: soruPicUrl,
      });

      const savedSoru = await newSoru.save();
      res.status(201).json(savedSoru);

    } catch (error) {
      res.status(500).json({ message:"bağlanamadı" });
      console.log(error.message)
    }



  }


  const getSorular = async (req, res) => {
    try {
        const sorular = await Soru.find(); // Tüm soruları getir

        if (!sorular || sorular.length === 0) {
            return res.status(404).json({ error: "Soru bulunamadı" });
        }

        res.status(200).json(sorular);
    } catch (error) {
        console.error( error.message);
        res.status(500).json({ error: "bağlanamadı " });
    }
};

const updateSoru = async (req, res) => {
  try {
    const soruId = req.params.soruId;
      let { dersName, soru, cevaplar } = req.body;

      // Mevcut soruyu veritabanından bul
      const existingSoru = await Soru.findById(soruId);
      if (!existingSoru) {  
          return res.status(404).json({ error: "Soru bulunamadı" });
      }

      
      let soruPicUrl = existingSoru.soruPic;
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
              folder: 'soru_pics'
          });
          soruPicUrl = result.secure_url;
      }

      
      existingSoru.dersName = dersName || existingSoru.dersName;
      existingSoru.soru = soru || existingSoru.soru;
      existingSoru.cevaplar = cevaplar || existingSoru.cevaplar;
      existingSoru.soruPic = soruPicUrl;

      
      const updatedSoru = await existingSoru.save();
      res.status(200).json(updatedSoru);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "bağlanamadı" });
  }
};

const searchSorular = async (req, res) => {
  const query = req.query.q;
  if (!query) {
      return res.status(400).send('Query parameter q is required');
  }

  try {
      // Hem title hem de content alanlarında arama yapıyoruz.
      const results = await Soru.find({
          $or: [
              { soru: new RegExp(query, 'i') },
              { dersName: new RegExp(query, 'i') },
              { dersName: new RegExp(query, 'i') }

          ]
      });
      res.json(results);
  } catch (error) {
      res.status(500).send('bağlanamadı');
      console.log(error.message)
  }
};



const addRating = async (req, res) => {
  try {
      const { questionId } = req.params;
      const { points } = req.body;

      if (!points || points < 1 || points > 5) {
          return res.status(400).json({ error: 'Invalid points. Points should be between 1 and 5.' });
      }

      const question = await Soru.findById(questionId);
      if (!question) {
          return res.status(404).json({ error: 'Question not found.' });
      }

      await question.addVote(points);
      const averageRating = question.getAverageRating();

      res.json({ averageRating, voteCount: question.voteCount });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

  


module.exports = { getSoruByDers,getUserSoru, soruSor, getSorular, updateSoru,searchSorular, addRating};
