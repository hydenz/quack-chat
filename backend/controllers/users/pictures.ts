import { Response, Request } from 'express';
import UserService from 'services/UserService';

const pictures = async (req: Request, res: Response) => {
  const { base64Image } = req.body;
  await UserService.savePicture(req.userId!, base64Image);
  return res.sendStatus(200);
};

export default pictures;
