import * as crypto from 'crypto';
import StandardError from './standard-error';
import { ErrorCodes } from './error-type';
import { error, info, success } from './logger';

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

async function encrypt(text: string, secretKey: string): Promise<{ public_key: string, content: string }> {
    try {
        info(`******************************************`);
        success(`Response : ${text}`);
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return {
            public_key: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    } catch (error) {
        throw new StandardError(
            ErrorCodes.FORM_VALIDATION_ERROR,
            "Don't try to hack. It's impossible."
        );
    }
}

async function decrypt(data: { public_key: string, content: string }, secretKey: string): Promise<string | { public_key: string, content: string }> {
    try {
        const { public_key, content } = data;
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(public_key, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
        info(`******************************************`);
        error(`Request : ${decrpyted.toString()}`);
        return decrpyted.toString();
    } catch (error) {
        throw new StandardError(
            ErrorCodes.FORM_VALIDATION_ERROR,
            "Don't try to hack. It's impossible."
        );
    }
}

export { encrypt, decrypt };


// console.log(decrypt({
//     "public_key": "4f28a17675b640b84c732aa77c08624d",
//     "content": "0e186adfc9e26790fce9119a0a29727cb576d92745ca66d3447a990a18a076e7cc616aea0f708c743da3aa1a638fb57350dfef17076b77ab106586c47735a68853c56c1bbf3a49768f144ef627ba0ffbff24d490dc27e1d8ab722e11cd303632"
// }, "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg"))
