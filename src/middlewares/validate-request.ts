import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

import RequestValidationError from '../errors/request-validation-error'

export default function ValidateRequest(req: Request, res: Response, next: NextFunction) {
  const erros = validationResult(req)

  if (!erros.isEmpty()) {
    throw new RequestValidationError(erros.array())
  }

  next();
}
