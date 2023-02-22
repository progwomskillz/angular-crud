import BaseHandler from "./base_handler";
import IUseCase from "./../../domain/use_cases/use_case.interface";
import { ValidationErrors } from "./../../domain/types/validation";
import IPrincipalUtil from "./../utils/principal_util.interface";
import Principal from "./../../domain/entities/auth/principal";

abstract class BaseAuthHandler<T, U> extends BaseHandler<T, U> {
  private principalUtil: IPrincipalUtil;

  constructor(useCase: IUseCase<T, U>, principalUtil: IPrincipalUtil) {
    super(useCase);

    this.principalUtil = principalUtil;
  }

  override async handle(data: { [key: string]: any, principal: Principal }): Promise<U | ValidationErrors | object> {
    data.principal = this.principalUtil.get();
    return super.handle(data);
  }
}

export default BaseAuthHandler;
