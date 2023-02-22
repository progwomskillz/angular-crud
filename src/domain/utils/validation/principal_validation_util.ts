import IValidationUtil from "./validation_util.interface";
import Principal from "./../../entities/auth/principal";
import UnauthenticatedException from "../../entities/exceptions/unauthenticated_exception";

class PrincipalValidationUtil implements IValidationUtil<Principal> {
  public validate(principal: Principal): void | never {
    if (principal.user) {
      return;
    }
    throw new UnauthenticatedException();
  }
}

export default PrincipalValidationUtil;
