import { Router, Request, Response } from 'express';
import { APIResponse, FileUploadResponse } from '../@types';
import { multerProvider } from '../utils/multer';
import { VIDEO_DEST_PATH_NAME } from '../constants';
import path from 'path';
import { addMessageToDockerQueue } from '../utils/message-queue';
const routes = Router();

routes.post(
  '/upload',
  multerProvider.single('video'),
  async (req: Request, res: Response) => {
    const file = req.file;
    const fileName = file?.filename;
    const url = `http://localhost:3000/api/video/download?v_id=${fileName}`;
    const size = file?.size;

    const data: FileUploadResponse = {
      name: fileName,
      url,
      size,
    };

    const task = await addMessageToDockerQueue<FileUploadResponse>(data);
    

    const response: APIResponse<FileUploadResponse> = {
      message: 'successfully uploaded',
      code: 201,
      data,
    };
    res.status(201).json(response);
  }
);

routes.get('/download', async (req: Request, res: Response) => {
  const { v_id } = req.query;
  const rootDir = path.resolve(__dirname, '..', '..');
  const downloadDistPath = path.join(
    rootDir,
    VIDEO_DEST_PATH_NAME,
    v_id as string
  );
  res.sendFile(downloadDistPath);
});

export default routes;
