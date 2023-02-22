import { ValidationError } from "./../../../types/validation";
import IStringInArrayValidator from "./string_in_array_validator.interface";

class StringInArrayValidator implements IStringInArrayValidator {
  private _error: ValidationError;

  constructor() {
    this._error = {
      "message": "Not possible value",
      "code": "string_in_array"
    }
  }

  public get error() {
    return this._error;
  }

  isValid(value: string, values: Array<string>): boolean {
    return values.includes(value);
  }
}

export default StringInArrayValidator;
