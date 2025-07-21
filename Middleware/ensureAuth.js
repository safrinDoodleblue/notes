module.exports = function ensureAuth(req, res, next) {
  console.log("Authenticated?", req.isAuthenticated());
  console.log("Session:", req.session);
  console.log("User:", req.user);

  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'Unauthorized' });
};
