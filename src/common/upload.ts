import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import util from "util";
import { NextFunction, Request, Response } from "express";
import moment from "moment";

const storage = multer.memoryStorage();
var multerFile = multer({ storage: storage });

// Set up AWS S3
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAUBKFCJYP2UJDMJYK",
    secretAccessKey: "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",
  },
});

// const s3Client = new S3Client({
//     region: process?.env?.REGION ?? "ap-south-1",
//     credentials: {
//         accessKeyId: process?.env?.ACCESS_KEY_ID ?? "AKIAYMI5KXNR7R4J77IE",
//         secretAccessKey: process?.env?.SECRET_ACCESS_KEY ?? "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"
//     },
// });

// Permanent Presigned URL
async function generatePermanentPresignedUrl(
  bucketName: string,
  key: string
): Promise<string> {
  const expiresIn = 600000;
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn }); // 1 year in seconds
  return signedUrl;
}

// Upload User File
async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    const upload = util.promisify(multerFile.single("FILE"));
    await upload(req, res);

    const file = req?.file;
    if (!file) {
      // return res.status(400).json({ status: false, msg: 'Please Upload User Avatar' });
      return {
        status: false,
      };
    } else {
      const fileKey = `${moment().unix()}-${file.originalname}`;
      const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";

      const uploadParams = {
        Bucket: `${bucketName}`,
        Key: `${fileKey}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const presignedUrl = await generatePermanentPresignedUrl(
        bucketName,
        `${fileKey}`
      );

      if (!presignedUrl) {
        return res
          .status(400)
          .json({ status: false, message: "AWS upload error." });
      }

      return {
        status: true,
        FILE: presignedUrl,
        BUCKET_NAME: bucketName,
        KEY: `${fileKey}`,
      };
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}

async function uploadMultipleFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const upload = util.promisify(
      multerFile.fields([{ name: "FILES" }, { name: "FILE", maxCount: 1 }])
    );
    await upload(req, res);

    const file = req?.files as any;
    const checkImage = file?.FILE?.length ?? 0;
    const checkMutipleImage = file?.FILES?.length ?? 0;

    console.log(file.FILE);
    console.log(file.FILES);
    if (checkImage <= 0 || checkMutipleImage <= 0) {
      // return res.status(400).json({ status: false, msg: 'Please Upload User Avatar' });
      return {
        status: false,
      };
    } else {
      const fileKey = `${moment().unix()}-${file?.FILE?.[0].originalname}`;
      const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";

      const uploadParams = {
        Bucket: `${bucketName}`,
        Key: `${fileKey}`,
        Body: file?.FILE?.[0]?.buffer,
        ContentType: file?.FILE?.[0]?.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const presignedUrl = await generatePermanentPresignedUrl(
        bucketName,
        `${fileKey}`
      );

      if (!presignedUrl) {
        return res
          .status(400)
          .json({ status: false, message: "AWS upload error." });
      }

      const ITEM_IMAGES = [];

      for (let index = 0; index < file?.FILES?.length; index++) {
        const fileKey = `${moment().unix()}-${
          file?.FILES?.[index]?.originalname
        }`;
        const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";

        const uploadParams = {
          Bucket: `${bucketName}`,
          Key: `${fileKey}`,
          Body: file?.FILES?.[index]?.buffer,
          ContentType: file?.FILES?.[index]?.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        const presignedUrl = await generatePermanentPresignedUrl(
          bucketName,
          `${fileKey}`
        );
        ITEM_IMAGES.push({
          FILE: presignedUrl,
          BUCKET_NAME: bucketName,
          KEY: `${fileKey}`,
          INDEX: index + 1,
        });
      }

      return {
        status: true,
        FILE: presignedUrl,
        BUCKET_NAME: bucketName,
        KEY: `${fileKey}`,
        ITEM_IMAGES,
      };
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}

// delete File
async function deleteFile(bucketName: string, key: string): Promise<boolean> {
  try {
    const data = await s3Client.send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: key })
    );
    return !!data;
  } catch (error) {
    return false;
  }
}

async function uploadVip(req: Request, res: Response, next: NextFunction) {
  try {
    const upload = util.promisify(multerFile.any());
    await upload(req, res);
    const file = req?.files as any;
    let VIP_CARD_IMAGE: any;
    const IMAGE_LIST = [];
    const EMOJI_IMAGES = [];
    for (let index = 0; index < file.length; index++) {
      const fieldname = file[index].fieldname;
      const fileKey = `${moment().unix()}-${file?.[index]?.originalname}`;
      const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";
      // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
      const uploadParams = {
        Bucket: `${bucketName}`,
        Key: `${fileKey}`,
        Body: file[index]?.buffer,
        ContentType: file[index]?.mimetype,
      };
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      const presignedUrl = await generatePermanentPresignedUrl(
        bucketName,
        `${fileKey}`
      );
      if (fieldname === "VIP_CARD_IMAGE") {
        VIP_CARD_IMAGE = {
          KEY: fileKey,
          BUCKET_NAME: bucketName,
          FILE: presignedUrl,
        };
      } else {
        if (fieldname !== "EMOJI") {
          IMAGE_LIST.push({
            TYPE: fieldname,
            KEY: fileKey,
            BUCKET_NAME: bucketName,
            FILE: presignedUrl,
          });
        } else {
          EMOJI_IMAGES.push({
            KEY: fileKey,
            BUCKET_NAME: bucketName,
            FILE: presignedUrl,
          });
        }
      }
    }
    console.log(IMAGE_LIST);
    console.log(EMOJI_IMAGES);
    console.log(VIP_CARD_IMAGE);
    return {
      status: true,
      IMAGE_LIST,
      EMOJI_IMAGES,
      VIP_CARD_IMAGE,
    };
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function uploadVipBenefit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const upload = util.promisify(multerFile.any());
    await upload(req, res);
    const file = req?.files as any;
    let BENEFIT_IMAGE: any;
    const EMOJI_IMAGES = [];
    for (let index = 0; index < file.length; index++) {
      const fieldname = file[index].fieldname;
      const fileKey = `${moment().unix()}-${file?.[index]?.originalname}`;
      const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";
      // COINS, DIAMONDS, XP, BENEFIT_IMAGE, EMOJI, VIP_CARD_IMAGE
      const uploadParams = {
        Bucket: `${bucketName}`,
        Key: `${fileKey}`,
        Body: file[index]?.buffer,
        ContentType: file[index]?.mimetype,
      };
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      const presignedUrl = await generatePermanentPresignedUrl(
        bucketName,
        `${fileKey}`
      );
      if (fieldname === "BENEFIT_IMAGE") {
        BENEFIT_IMAGE = {
          KEY: fileKey,
          BUCKET_NAME: bucketName,
          FILE: presignedUrl,
        };
      } else {
        EMOJI_IMAGES.push({
          KEY: fileKey,
          BUCKET_NAME: bucketName,
          FILE: presignedUrl,
        });
      }
    }

    return {
      status: true,
      EMOJI_IMAGES,
      BENEFIT_IMAGE,
    };
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function uploadSeasonRewardFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const upload = util.promisify(
      multerFile.fields([{ name: "FILES" }, { name: "FILE", maxCount: 1 }])
    );
    await upload(req, res);

    const file = req?.files as any;
    const checkImage = file?.FILE?.length ?? 0;
    const checkMutipleImage = file?.FILES?.length ?? 0;

    console.log(file.FILE);
    console.log(file.FILES);
    if (checkImage <= 0) {
      return {
        status: false,
      };
    } else {
      const fileKey = `${moment().unix()}-${file?.FILE?.[0].originalname}`;
      const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";

      const uploadParams = {
        Bucket: `${bucketName}`,
        Key: `${fileKey}`,
        Body: file?.FILE?.[0]?.buffer,
        ContentType: file?.FILE?.[0]?.mimetype,
      };

      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const ITEM_IMAGES = [];

      for (let index = 0; index < file?.FILES?.length; index++) {
        const fileKey = `${moment().unix()}-${
          file?.FILES?.[index]?.originalname
        }`;
        const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";

        const uploadParams = {
          Bucket: `${bucketName}`,
          Key: `${fileKey}`,
          Body: file?.FILES?.[index]?.buffer,
          ContentType: file?.FILES?.[index]?.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        ITEM_IMAGES.push({
          BUCKET_NAME: bucketName,
          KEY: `${fileKey}`,
        });
      }

      return {
        status: true,
        BUCKET_NAME: bucketName,
        KEY: `${fileKey}`,
        ITEM_IMAGES,
      };
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
}

export {
  uploadFile,
  deleteFile,
  uploadMultipleFile,
  uploadVip,
  generatePermanentPresignedUrl,
  uploadVipBenefit,
  uploadSeasonRewardFile,
};
