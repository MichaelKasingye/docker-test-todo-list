import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (payloadData: any) => {
    const accessToken = jwt.sign(payloadData, config.JWT_TOKEN_SECRET, {
        expiresIn: config.token_expiresIn,
    });
    return accessToken;
};
