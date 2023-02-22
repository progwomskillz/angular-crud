import { ValidationError } from "./../../../types/validation";

interface IStringInArrayValidator {
  error: ValidationError;
  isValid(value: string, values: Array<string>): boolean;
}

export default IStringInArrayValidator;
