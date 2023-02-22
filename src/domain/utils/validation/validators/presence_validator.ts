import { ValidationError } from "./../../../types/validation";
import IPresenceValidator from "./presence_validator.interface";

class PresenceValidator implements IPresenceValidator {
  private _error: ValidationError;

  constructor() {
    this._error = {
      "message": "Has to be present",
      "code": "presence"
    }
  }

  public get error() {
    return this._error;
  }

  isValid(value: any): boolean {
    return !!value;
  }
}

export default PresenceValidator;
