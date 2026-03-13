

const express=require('express')
const connectToDb=require('./config/database');
const AuthRouter = require('./Routes/Auth.routes');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const SongRouter = require('./Routes/Song.routes');
const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // React URL
  credentials: true
}));
connectToDb()

app.use('/api/auth',AuthRouter)
app.use('/api/song',SongRouter)

module.exports=app