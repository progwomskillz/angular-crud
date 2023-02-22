import { ValidationError } from "../../../types/validation";
import IDatesRangeValidator from "./dates_range_validator.interface";

class DatesRangeValidator implements IDatesRangeValidator {
  private _error: ValidationError;

  constructor() {
    this._error = {
      "message": "Should be less",
      "code": "dates_range"
    }
  }

  public get error() {
    return this._error;
  }

  isValid(start: Date, end: Date): boolean {
    return end > start;
  }
}

export default DatesRangeValidator;
