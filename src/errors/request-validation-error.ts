import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export default class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(private erros: ValidationError[]) {
    super('Request validation failed')

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.erros.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      }
    })
  }
}
