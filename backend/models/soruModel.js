const mongoose =require('mongoose')
const { Schema, model } = mongoose;

const soruSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true

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
    cevaplar: [{
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        cevaplar:String
        
      }]

    },{timestamps:true});

const Soru = model('Soru', soruSchema);
module.exports= Soru;