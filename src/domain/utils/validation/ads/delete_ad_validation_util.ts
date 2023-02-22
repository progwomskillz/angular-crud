import BaseValidationUil from "./../base_validation_util";
import IValidationUil from "./../validation_util.interface";
import DeleteAdRequest from "./../../../entities/ads/requests/delete_ad_request";
import Principal from "./../../../entities/auth/principal";

class DeleteAdValidationUtil extends BaseValidationUil implements IValidationUil<DeleteAdRequest> {
  private principalValidationUtil: IValidationUil<Principal>;

  constructor(principalValidationUtil: IValidationUil<Principal>) {
    super();

    this.principalValidationUtil = principalValidationUtil;
  }

  public validate(deleteAdRequest: DeleteAdRequest): void | never {
    this.principalValidationUtil.validate(deleteAdRequest.principal);
  }
}

export default DeleteAdValidationUtil;
