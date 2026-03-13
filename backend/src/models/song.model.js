const mongoose=require('mongoose')

const songSchema=new mongoose.Schema({

    songurl:{
        type:String,
        require:true
    },
    posterurl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    mood:{
        type:String,
        enum:{
            values:["sad","happy","surpised"],
            message:"this is enum"
        }
    }
})

const SongModel=mongoose.model("song",songSchema);

module.exports=SongModel