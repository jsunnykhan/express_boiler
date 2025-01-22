import { v4 as uuid } from 'uuid';
import multer from 'multer';
import path from 'path';
import { VIDEO_DEST_PATH } from '../constants';

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, VIDEO_DEST_PATH);
  },
  filename: function (res, file, cb) {
    cb(null, file.fieldname + '-' + uuid() + path.extname(file.originalname));
  },
});

export const multerProvider = multer({ storage: diskStorage });
