import { mkdir } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { profile_pic } from './../constants/file-path-constants';

export const imageStorage = diskStorage({
  destination: profile_pic.PROFILE_IMAGE_PATH,
  filename: (req: any, file: Express.Multer.File, callback: any) => {
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const imgFirstName = 'local-profile';
    callback(
      null,
      `${imgFirstName}-${randomName}-${uuid()}${extname(file.originalname)}`,
    );
  },
});

export const DocsStorage = diskStorage({
  destination: function (req: any, file: Express.Multer.File, cb: any) {
    var folderName = process.env.DOCS_PATH;
    mkdir(folderName, { recursive: true }, (err) => {
      if (err) return err;
    });
    cb(null, folderName);
  },
  filename: (req: any, file: Express.Multer.File, callback: any) => {
    const docFirstName = 'local-doc';
    const randomName = Array(3)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(
      null,
      `${docFirstName}-${randomName}-${uuid()}${extname(file.originalname)}`,
    );
  },
});
