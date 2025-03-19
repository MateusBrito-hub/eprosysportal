import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey  = process.env.JWT_SECRET || "chave_token";

export const generateToken = (userId: number): string => {
	const payload = { userId }; 

	return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};