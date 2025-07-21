const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const userModel = require('../User/userModel');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) return done(null, false, { message: 'Email not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Wrong password' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});










// const passport = require('passport');
// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const userService = require('../User/userService');
// require('dotenv').config();

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     console.log('JWT payload:', jwt_payload);
//     try {
//       const user = await userService.getUserById(jwt_payload.id);
//       if (user) return done(null, user);
//       return done(null, false);
//     } catch (error) {
//       return done(error, false);
//     }
//   })
// );

// module.exports = passport;
