const express=require('express');
const userController=require('./userController');
const validate = require('../Middleware/validate');
const { signUpUserSchema, loginUserSchema } = require('./userValidation');
const router=express.Router();

router.post('/signUp',validate(signUpUserSchema),userController.signUpUser);
router.post('/LogIn',validate(loginUserSchema),userController.loginUser);

module.exports=router;