import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req: Request, res: Response, next) => {
  const statusCode = res.statusCode || 500;
  console.log('test');
  console.log(err);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
