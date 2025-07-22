const userService=require('./userService');
// const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { sendWelcomeEmail } = require('../utils/emailService');
exports.signUpUser=async (req,res) => {
    try {
        const {username,email,password}=req.body;
        const user=await userService.signUpUser({username,email,password});
        await sendWelcomeEmail(email,username);
        res.status(201).json({ message: 'User created', user});
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, err => {
      if (err) return next(err);
      res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    });
  })(req, res, next);
};

// exports.loginUser=async (req,res) => {
//    const {email,password}=req.body;
//   try {
//    const user=await userService.getUserByEmail(email);
//    if (!user) {
//       return res.status(401).json({message:'Invalid Email'});
//    }
//    const isMatch=await bcrypt.compare(password,user.password);
//    if (!isMatch) {
//     return res.status(401).json({message:'Invalid Password'});
//    }
//    const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn: '1h'});
//    res.json({
//     message: 'Login Successful',
//     token,
//     user:{id:user.id,username:user.username,email:user.email},
//    });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({message:'Internal server error'});
//   }
// };