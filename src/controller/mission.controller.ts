import { NextFunction } from "express";
import { Response, Request } from "express";
import { encrypt } from "src/common/encrypt";
import { ErrorCodeMap } from "src/common/error-type";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  createMission,
  findMission,
  findAllMission,
  updateMission,
  findOneMission,
  deleteMission,
} from "src/services/mission.service";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import moment from "moment";
import { uploadFile } from "src/connection/reward.gridfs";

dotenv.config();
const secretKey =
  process?.env?.SECRET_KEY ?? "SWS0zf0thg8T5Gz3scOSQ2W4r6r7GJAg";
const secretKeyGamePlay =
  process?.env?.SECRET_KEY_GAME_PLAY ?? "SM20zD0thg8T5Gz3scOSQ2W4r6r7GJqR";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAUBKFCJYP2UJDMJYK",
    secretAccessKey: "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",
  },
});

// const s3Client = new S3Client({
//     region: 'ap-south-1',
//     credentials: {
//         accessKeyId: 'AKIAYMI5KXNR7R4J77IE',
//         secretAccessKey: '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'
//     },
// });

async function insert(req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(ErrorCodeMap.API_VALIDATION_ERROR)
        .json({ message: "File field is required" });
    }
    const fileKey = `${moment().unix()}-${file.originalname}`;
    const bucketName = process?.env?.BUCKET_NAME ?? "cobra-bucket";
    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: fileKey,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const getObjectParams = {
      Bucket: bucketName,
      Key: fileKey,
    };
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand(getObjectParams),
      { expiresIn: 604800 }
    );
    const body = {
      ...req.body,
      MISSIONS: JSON.parse(req.body.MISSIONS),
      FILE: url,
      BUCKET_NAME: bucketName,
      KEY: fileKey,
    };
    let data = await createMission(body);

    if (!data) {
      return res
        .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
        .json({ message: "Mission create Error." });
    }

    let encryptedData = encrypt(JSON.stringify(data), secretKey);
    return res.json({
      status: true,
      data: await encryptedData,
      message: "Mission created successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    let data = await findMission();
    // let encryptedData = encrypt(JSON.stringify(data), secretKeyGamePlay);
    return res.json({ status: true, data });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function allDataList(req: Request, res: Response, next: NextFunction) {
  try {
    const { take, page, keyword } = req.query;
    const query = {
      take: take || 10,
      page: page || 1,
      keyword: keyword || "",
    };
    let data = await findAllMission(query);
    let encryptedData = await encrypt(JSON.stringify(data), secretKey);
    return res.json({
      status: true,
      data: encryptedData,
      message: "Mission list",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteMission(id);
    let encryptedData = await encrypt(JSON.stringify(id), secretKey);

    return res.json({
      status: true,
      id: encryptedData,
      msg: "deleted successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    let isUploadFile = (await uploadFile(req, res)) as any;
    if (isUploadFile.status) {
      const file = isUploadFile.filename;
      const { id } = req.params;
      let find = await findOneMission(id);
      let key = find.KEY;
      let deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      };

      const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
      await s3Client.send(deleteObjectCommand);

      const fileKey = `${moment().unix()}-${file.originalname}`;
      const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Body: file.buffer,
        Key: fileKey,
        ContentType: file.mimetype,
      };
      await s3Client.send(new PutObjectCommand(uploadParams));

      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileKey,
      };

      const url = await getSignedUrl(
        s3Client,
        new GetObjectCommand(getObjectParams),
        { expiresIn: 604800 }
      );
      const body = {
        ...req.body,
        FILE: url,
        MISSIONS: JSON.parse(req.body.MISSIONS),
      };
      await updateMission(id, body);
      let updatedReward = await findOneMission(id);
      let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);

      return res.json({
        status: true,
        data: await encryptedData,
        message: "updated data sucessfully",
      });
    } else {
      const { id } = req.params;
      const body = { ...req.body, MISSIONS: JSON.parse(req.body.MISSIONS) };
      await updateMission(id, body);
      let updatedReward = await findOneMission(id);
      let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);
      return res.json({
        status: true,
        data: await encryptedData,
        message: "updated data sucessfully",
      });
    }
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function Get(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    let find = (await findOneMission(id)) as any;

    let encryptedData = encrypt(JSON.stringify(find), secretKey);

    return res.json({
      status: true,
      id: await encryptedData,
      msg: "get successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

export { insert, list, allDataList, update, Delete, Get };
