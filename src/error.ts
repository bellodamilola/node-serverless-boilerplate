import logger from './logger';
import { Response } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';

export const badRequestError = (message: string): ErrorHandler => {
  return new ErrorHandler(400, 'InvalidData', message);
};

export const authenticationError = (message: string): ErrorHandler => {
  return new ErrorHandler(401, 'InvalidToken', message);
};

export const unAuthorizedError = (message: string): ErrorHandler => {
  return new ErrorHandler(403, 'ActionNotPermitted', message);
};

export const unKnownResourceError = (message: string): ErrorHandler => {
  return new ErrorHandler(404, 'UnknownResource', message);
};

export const serverError = (message: string): ErrorHandler => {
  return new ErrorHandler(500, 'ServerError', message);
};

export class ErrorHandler extends Error {
  statusCode: number;
  errorCode: string;
  message: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ErrorHandler.prototype);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
  }
}

const handleKnownExceptions = (err: ErrorHandler, res: Response) => {
  logger.error(err);
  const { statusCode, errorCode, message } = err;
  const errorBody = {
    errorCode,
    message,
  };
  res.status(statusCode).json(errorBody);
};

const handleUnknownExceptions = (err: Error, res: Response) => {
  logger.error(err);
  return res
    .status(500)
    .json({ errorCode: 'SystemError', message: 'Something went wrong.' });
};

export const handleError = (
  err: ErrorHandler | Error | CelebrateError,
  res: Response
) => {
  if (isCelebrateError(err)) {
    const message = formatCelebrateErrors(err as CelebrateError);
    return res.status(400).send({ message });
  }

  err instanceof ErrorHandler
    ? handleKnownExceptions(err, res)
    : handleUnknownExceptions(err, res);
};

function formatCelebrateErrors(err: CelebrateError) {
  let message = '';
  err.details.forEach((validationError) => {
    if (message) {
      message += '\n';
    }
    message += validationError.message;
  });
  return message;
}
