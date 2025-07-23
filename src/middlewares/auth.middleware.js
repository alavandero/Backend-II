import passport from "passport";

// JWT authentication middleware
export function authMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

// Admin role check middleware
export function isAdmin(req, res, next) {
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({ status: "error", message: "Forbidden: Admins only" });
}

// User role check middleware
export function isUser(req, res, next) {
  if (req.user && (req.user.role === "USER" || req.user.role === "PREMIUM")) {
    return next();
  }
  return res.status(403).json({ status: "error", message: "Forbidden: Users only" });
}