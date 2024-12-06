const express =require ("express");
const connectDb=require("./config/db")

const app =express();
connectDb();
const port = process.env.PORT || 8000;



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
} )