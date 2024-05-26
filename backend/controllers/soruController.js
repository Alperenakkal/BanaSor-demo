const Soru = require('../models/soruModel');
const User = require('../models/kullaniciModel');


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
  
  



module.exports = { getSoruByDers,getUserSoru,};
