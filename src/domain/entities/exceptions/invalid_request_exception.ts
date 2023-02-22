import { ValidationErrors } from "../../types/validation";

class InvalidRequestException extends Error {
  private _errors: ValidationErrors;

  constructor(errors: ValidationErrors) {
    super(JSON.stringify(errors));

    this._errors = errors;
  }

  public get errors() {
    return this._errors;
  }
}

export default InvalidRequestException;
