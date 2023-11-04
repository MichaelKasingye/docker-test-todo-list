import { Request } from 'express';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export function getUserIdFromRequest(req: Request): string | undefined {
    if (req.headers && req.headers.authorization) {
        const authToken = req.headers['authorization'];
        const token = authToken?.substring(7, authToken.length);
        const decodedToken = jwt_decode<JwtPayload & { id: string }>(token);
        return decodedToken.id;
    }
    return undefined;
}
