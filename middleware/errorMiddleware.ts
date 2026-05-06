import { Request, Response, NextFunction } from "express";

export class ErrorResponse extends Error {
  statusCode: number;
  errorDetails: any;

  constructor(
    message: string,
    statusCode: number = 500,
    errorDetails: any = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
  }
}

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error =
    err instanceof ErrorResponse ? err : new ErrorResponse(err.message, 500);
  const message =
    err.response?.data?.message || err.message || "request failed";
  const statusCode = err.response?.status || 500;
  const errorDetails = err.response?.data || null;

  error = new ErrorResponse(message, statusCode, errorDetails);

  res.status(500).json({
    isOk: false,
    statusCode: error.statusCode,
    message: error.message,
    errorDetails: error.errorDetails,
  });
};

export default errorMiddleware;
