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
    totalPoints: { 
        type: Number, 
        default: 0 
    },
    voteCount: {
         type: Number,
          default: 0 
        },
    cevaplar: [{
     
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cevap",
            
        
        
      }]

    },{timestamps:true});

    soruSchema.methods.addVote = function(points) {
        this.totalPoints += points;
        this.voteCount += 1;
        return this.save();
    };
    
    soruSchema.methods.getAverageRating = function() {
        if (this.voteCount === 0) return 0;
        return this.totalPoints / this.voteCount;
    };

const Soru = model('Soru', soruSchema);
module.exports= Soru;