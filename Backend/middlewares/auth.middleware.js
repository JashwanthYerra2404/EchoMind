// import jwt from 'jsonwebtoken';
// import User from '../models/Thread.js';

// export const authMiddleware = async(req, res, next) => {
//     try{
//         const token = req.cookies.jwt;

//         if(!token){
//             return res.status(401).json({ error: 'Unauthorized No token provided' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if(!decoded){
//             return res.status(401).json({ error: 'Unauthorized Invalid token' });
//         }

//         const user = await User.findById(decoded.userId).select('-password -__v'); // Exclude password and version field
//         if(!user){
//             return res.status(404).json({ error: 'User not found' });
//         }

//         req.user = user;

//         next();
//     }
//     catch(error) {
//         console.error('Authentication error:', error);
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
// }