import jwt from 'jsonwebtoken';
import { Response } from 'express';
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application
import { Request,NextFunction} from 'express';

interface UpdatedRequest extends Request {
  UserId:string;
}
 export const authenticateJwt = (req: Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, Payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if(!Payload) {
        return res.sendStatus(403);
      }
      if(typeof Payload == "string"){
        return res.sendStatus(403);
         
      }
      req.headers["userId"] = Payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

