const express = require('express')
const connectToDb = require('./config/database');
const AuthRouter = require('./Routes/Auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const SongRouter = require('./Routes/Song.routes');
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: (origin, callback) => {
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:5174',
      'http://localhost:5173',
      "https://moodify-qeyf.vercel.app/"
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

connectToDb()

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.use('/api/auth', AuthRouter)
app.use('/api/song', SongRouter)

module.exports = app