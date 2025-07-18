const express=require('express');
const mongoose=require('mongoose');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');
const routes=require('./Routes')

const app=express();

app.use(express.json());
app.use(passport.initialize());
const PORT=process.env.PORT ||3000;
app.use('/api',routes);

const startServer=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
         console.log('MongoDB connected');
        app.listen(PORT,()=>{
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        })
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
startServer();