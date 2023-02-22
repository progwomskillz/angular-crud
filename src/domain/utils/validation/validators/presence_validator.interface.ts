import { ValidationError } from "./../../../types/validation";

interface IPresenceValidator {
  error: ValidationError;
  isValid(value: any): boolean;
}

export default IPresenceValidator;
