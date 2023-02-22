import IHandler from "./handler.interface";
import IUseCase from "./../../domain/use_cases/use_case.interface";
import { ValidationErrors } from "./../../domain/types/validation";
import InvalidRequestException from "./../../domain/entities/exceptions/invalid_request_exception";

abstract class BaseHandler<T, U> implements IHandler<U> {
  protected useCase: IUseCase<T, U>;

  constructor(useCase: IUseCase<T, U>) {
    this.useCase = useCase;
  }

  protected abstract execute(data: object): Promise<U | never | null>;

  async handle(data: object): Promise<U | ValidationErrors | object> {
    try {
      const result = await this.execute(data);
      if (result == null) {
        return {};
      }
      return result as U;
    }
    catch(e) {
      if (e instanceof InvalidRequestException) {
        throw e.errors;
      }
      else {
        throw {};
      }
    }
  }
}

export default BaseHandler;
