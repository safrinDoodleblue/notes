const Joi=require('joi');

const signUpUserSchema=Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


const loginUserSchema=Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty':"Email is required",
    "string.email":"Email must be valid"
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty':"password is required",
    "string.min":"Password must be at least 6 characters"
  }),
})


module.exports = {
    signUpUserSchema,
  loginUserSchema
};