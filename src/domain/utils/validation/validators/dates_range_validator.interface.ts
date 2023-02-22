import { ValidationError } from "./../../../types/validation";

interface IDatesRangeValidator {
  error: ValidationError;
  isValid(start: Date, end: Date): boolean;
}

export default IDatesRangeValidator;
