const mongoose = require('mongoose');

const db_URL=process.env.db_URL;

mongoose.connect(db_URL)
.then(()=>{
    console.log("MongoDB is connected...");
}).catch((err)=>{
    console.log('MongoDB connection failed!',err);
})