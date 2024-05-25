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
const getUserSoru = async (req,res) =>{
    try {
    const user = await User.findById(req.user._id);
    console.log('Current user:', req.user.userName);
    const sorular = await Soru.find({userId:user})
    if (!sorular) {
        return res.status(400).json({ error: "soru bulunamadi" });
    }
    res.status(200).json(sorular);
} catch (error) {
    console.log("Error in getUserSoru controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
}}



module.exports = { getSoruByDers,getUserSoru,};
