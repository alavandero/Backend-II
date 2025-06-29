import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// JWT Configuration
export const PRIVATE_KEY = "ashdguof4haew9sdDSFZAfd";

// Password hashing function using bcrypt.hashSync
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Password validation function using bcrypt.compareSync
export const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// JWT Token generation
export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
  return token;
};

// JWT Token verification
export const verifyToken = (token) => {
  try {
    const credentials = jwt.verify(token, PRIVATE_KEY);
    return credentials;
  } catch (error) {
    console.error("Invalid signature");
    return null;
  }
};

// Cookie extractor for JWT strategy
export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
}; 