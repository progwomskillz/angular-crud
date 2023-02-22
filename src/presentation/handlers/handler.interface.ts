import { ValidationErrors } from "./../../domain/types/validation";

interface IHandler<T> {
  handle(data: object): Promise<T | ValidationErrors | object>;
}

export default IHandler;
