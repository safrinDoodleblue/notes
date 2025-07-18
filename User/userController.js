const userService=require('./userService');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUpUser=async (req,res) => {
    try {
        const {username,email,password}=req.body;
        const user=await userService.signUpUser({username,email,password});
        res.status(201).json({ message: 'User created', user});
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.loginUser=async (req,res) => {
   const {email,password}=req.body;
  try {
   const user=await userService.getUserByEmail(email);
   if (!user) {
      return res.status(401).json({message:'Invalid Email'});
   }
   const isMatch=await bcrypt.compare(password,user.password);
   if (!isMatch) {
    return res.status(401).json({message:'Invalid Password'});
   }
   const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '1h'});
   res.json({
    message: 'Login Successful',
    token,
    user:{id:user.id,username:user.username,email:user.email},
   });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({message:'Internal server error'});
  }
};