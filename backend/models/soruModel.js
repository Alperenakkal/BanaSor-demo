const mongoose =require('mongoose')
const { Schema, model } = mongoose;

const soruSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        

    },
    dersName:{
        type:String,
        required:true
    },
    soru:{
        type:String,
        required:true,
        unique:true
    },
    soruPic:{
        type:String 
        
    },
    cevaplar: [{
     
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cevap",
            
        
        
      }]

    },{timestamps:true});

const Soru = model('Soru', soruSchema);
module.exports= Soru;