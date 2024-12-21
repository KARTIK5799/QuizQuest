const express = require ('express');
const bcrypt = require ('bcryptjs');
const User =require ('../models/User');
const jwt = require('jsonwebtoken'); 

const registerUser = async (req,res)=>{
    const {name,email,password}= req.body;

    try {
        const isUserExist =await User.findOne({email});

        if(isUserExist){
            return res.json({message: "User Is Present"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        
        const user= new User ({
            name,
            email,
            password:hashedPassword,
        })

        await user.save();
res.json({message:'New User isCreated'});

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const isUserExist=await User.findOne({email});

        if(!isUserExist){
            return res.json({message: "User Is Not Present"});
        }


        isPasswordCorrect = await bcrypt.compare(password,isUserExist.password)
        
        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const payload = {
            userId:isUserExist._id
        }

        const token= jwt.sign(payload , process.env.JWT_SECRET,{expiresIn:'1h'});


        return res.status(200).json({message:"Login Successful",token});
   

    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

module.exports = {registerUser , loginUser}