const express=require('express');
const upload = require('../Middlewares/upload.middeware');
const SongController=require('../controller/SongController')
const SongRouter=express.Router();


SongRouter.post('/',upload.single("song"),SongController.uploadSong)
SongRouter.get('/',SongController.getsong)


module.exports=SongRouter