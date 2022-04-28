import jwt, { JwtPayload } from 'jsonwebtoken';
const secret = 'kfbwfbkwfbkwnncnc';

export const signPayload = (payload: { [key: string]: any; }): string => {
  return jwt.sign(payload, secret, { expiresIn: '10h' });
};

export const verifyPayload = (payload: string): string | JwtPayload => {
  return jwt.verify(payload, secret);
};
