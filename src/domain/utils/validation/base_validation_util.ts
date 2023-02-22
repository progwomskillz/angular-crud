import { ValidationError, ValidationErrors } from "./../../types/validation";
import InvalidRequestException from "../../entities/exceptions/invalid_request_exception";

class BaseValidationUtil {
  protected errors: ValidationErrors;

  constructor() {
    this.errors = {};
  }

  protected appendError(key: string, error: ValidationError): void {
    if (!(key in this.errors)) {
      this.errors[key] = [];
    }
    this.errors[key].push(error);
  }

  protected processErrors(): void | never {
    if (!Object.keys(this.errors).length) {
      return;
    }
    throw new InvalidRequestException(this.errors);
  }
}

export default BaseValidationUtil;
