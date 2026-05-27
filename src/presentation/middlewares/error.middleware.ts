
import { NextFunction, Request, Response } from "express";
import { statusCodes } from "../constants/status.codes";


export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = statusCodes.SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err : AppError, req : Request, res : Response, _next : NextFunction) => {
  console.error("ERROR:", err);

  const statusCode = err.statusCode || statusCodes.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || statusCodes.SERVER_ERROR,
  });
};