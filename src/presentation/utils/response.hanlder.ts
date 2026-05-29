import { Response } from "express";

export const successResponse = <T>(res : Response, data : T, message: string = "Success", status : number = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
