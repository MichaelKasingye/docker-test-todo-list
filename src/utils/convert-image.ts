import fs from 'fs';
import sharp from 'sharp';

import cloudinary from '../config/cloudinary';

export async function getConvertedImage(req: any, res: any) {
    const convertedImages = [];
    if (req.method == 'PATCH' || req.method == 'POST' || req.method == 'PUT') {
        const reqData = [];
        await reqData.push(req);
        const reqFiles: any = reqData[0].files;

        for (const file of reqFiles) {
            const imagePath = await file.path;

            const bufferedImage = await sharp(imagePath)
                .toFormat('webp')
                .webp({ quality: 75 })
                .toBuffer();

            convertedImages.push(bufferedImage);
        }
    } else {
        res.status(405).json({ err: 'Image not uploaded successfully' });
    }

    const uploadImage = (imageBuffer) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                .end(imageBuffer);
        });
    };

    const promiseImages = Promise.all(convertedImages.map(uploadImage))
        .then((results: any) => {
            // results is an array of responses from Cloudinary for each uploaded image

            const secure_url: any = results.map((url) => url.secure_url);
            if (secure_url.length >= 0) {
                req.body.image = secure_url[0];

                return secure_url;
            }
            secure_url;
        })
        .catch((error) => {
            return error;
        });
    return await promiseImages;
}

// UPLOAD MULTIPLE IMAGES
export async function getConvertedImages(req: any, res: any) {
    const convertedImages = [];
    if (req.method == 'PATCH' || req.method == 'POST' || req.method == 'PUT') {
        const reqData = [];
        await reqData.push(req);
        const reqFiles: any = reqData[0].files;

        for (const file of reqFiles) {
            const imagePath = await file.path;

            const bufferedImage = await sharp(imagePath)
                .toFormat('webp')
                .webp({ quality: 75 })
                .toBuffer();

            convertedImages.push(bufferedImage);
        }
    } else {
        res.status(405).json({ err: 'Image not uploaded successfully' });
    }

    const uploadImage = (imageBuffer) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                .end(imageBuffer);
        });
    };

    const promiseImages = Promise.all(convertedImages.map(uploadImage))
        .then((results: any) => {
            // results is an array of responses from Cloudinary for each uploaded image

            const secure_url: any = results.map((url) => url.secure_url);
            if (secure_url.length >= 0) {
                req.body.images = secure_url;

                return secure_url;
            }
            secure_url;
        })
        .catch((error) => {
            return error;
        });
    return await promiseImages;
}
