const User = require('./userModel');
 
exports.signUpUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  const newUser = new User({ username, email, password });
await newUser.save();
return newUser;
};

exports.getUserByEmail=async (email) => {
  return await User.findOne({email});
}

exports.getUserById=async (id) => {
  return await User.findById(id);
}