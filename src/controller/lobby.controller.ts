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
  createLobby,
  findLobby,
  findAllLobby,
  findOneLobby,
  updateLobby,
  deleteLobby,
  findLobbyNameService,
  findLobbyForDashboardService,
} from "src/services/lobby.service";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import moment from "moment";
import { uploadFile } from "src/common/upload";

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
        .json({ message: { file: "File field is required" } });
    }
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

    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
    };
    const result = JSON.parse(req.body.DATA);
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand(getObjectParams),
      { expiresIn: 604800 }
    );
    const body = {
      ...req.body,
      DATA: result,
      FILE: url,
      KEY: fileKey,
      BUCKET_NAME: process.env.BUCKET_NAME,
    };
    let data = await createLobby(body);
    if (!data) {
      return res
        .status(ErrorCodeMap.FORM_VALIDATION_ERROR)
        .json({ message: "lobby create Error." });
    }
    let encryptedData = encrypt(JSON.stringify(data), secretKey);
    return res.json({
      status: true,
      data: await encryptedData,
      message: "lobby created successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function list(req: Request, res: Response, next: NextFunction) {
  try {
    let data = await findLobby();
    return res.json({ status: true, data: data });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function getListForDashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { list } = await findLobbyForDashboardService();
    return res.json({ status: true, list });
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
    let data = await findAllLobby(query);
    let encryptedData = encrypt(JSON.stringify(data), secretKey);
    return res.json({
      status: true,
      data: await encryptedData,
      message: "Reward list",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function Delete(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteLobby(id);
    let encryptedData = encrypt(JSON.stringify(id), secretKey);
    return res.json({
      status: true,
      id: await encryptedData,
      msg: "deleted successfully",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    let isUploadFile = (await uploadFile(req, res, next)) as any;
    const { id } = req.params;
    if (isUploadFile.status) {
      let find = await findOneLobby(id);
      console.log(find);
      let key = find[0]?.KEY;
      if (!!key) {
        let deleteParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: find[0]?.KEY,
        };
        const deleteObjectCommand = new DeleteObjectCommand(deleteParams);
        await s3Client.send(deleteObjectCommand);
        console.log("Object deleted successfully.");
      }
      const result = JSON.parse(req.body.DATA);
      const body = {
        ...req.body,
        FILE: isUploadFile.FILE,
        BUCKET_NAME: isUploadFile.BUCKET_NAME,
        KEY: isUploadFile.KEY,
        DATA: result,
      };
      await updateLobby(id, body);
      let updatedReward = await findOneLobby(id);
      let encryptedData = encrypt(JSON.stringify(updatedReward), secretKey);
      return res.json({
        status: true,
        data: await encryptedData,
        message: "updated data sucessfully",
      });
    } else {
      const result = JSON.parse(req.body.DATA);
      const body = { ...req.body, DATA: result };
      await updateLobby(id, body);
      let updatedReward = await findOneLobby(id);
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

async function lobbyNameList(req: Request, res: Response, next: NextFunction) {
  try {
    let data = await findLobbyNameService();
    let encryptedData = await encrypt(JSON.stringify(data), secretKey);
    return res.json({
      status: true,
      data: encryptedData,
      message: "Lobby list",
    });
  } catch (error) {
    return res.json({ status: false, message: error?.message ?? "" });
  }
}

export {
  insert,
  list,
  allDataList,
  update,
  Delete,
  lobbyNameList,
  getListForDashboard,
};
