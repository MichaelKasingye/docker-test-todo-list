import crypto from 'crypto';

export function generateVerificationToken(): string {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}
