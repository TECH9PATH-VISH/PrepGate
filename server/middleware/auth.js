import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'prepgate-fallback-secret-2026';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware validation error:', error.message);
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
};
