const SongModel=require('../models/song.model')
const id3=require('node-id3')
const storageService=require('../services/Storage.service')


async function uploadSong(req,res) {
    const songbuffer=req.file.buffer
    const {mood}=req.body;
    const tages=id3.read(songbuffer)
    console.log(tages)

    const [songFile,posterfile]=await Promise.all([
         storageService.uploadFile({
        buffer:songbuffer,
        filename:tages.title +".mp3",
        folder:'/moodify/song'
    }),
    storageService.uploadFile({
        buffer:tages.image.imageBuffer,
        filename:tages.title +".jpeg",
        folder:'/moodify/poster'
    })


    ])

    const song=await SongModel.create({
        title:tages.title,
        songurl:songFile.url,
        posterurl:posterfile.url,
        mood
    })

    res.status(200).json({
        message:"song created sucessfully",
        song
    })
}

async function getsong(req,res) {

    const {mood}=req.query;

      const song = await SongModel.aggregate([
      { $match: { mood } },       // filter by mood
      { $sample: { size: 1 } }    // pick 1 random document
    ]);

    res.status(200).json({
        message:"song featced sucessufully",
        song
    })


    
}

module.exports={uploadSong,getsong}