import express from 'express';
import cors from "cors";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT  || 4000;
connectDB();

const allowedOrigins = ['https://mern-auth-frontend-3j6s.onrender.com']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));

app.get('/',(req,res)=>{
    res.send("API is working absolutely fine")
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(port, ()=>{
    console.log(`Server started on PORT:${port}`)
});