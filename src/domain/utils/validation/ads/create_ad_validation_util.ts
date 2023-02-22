import BaseValidationUil from "./../base_validation_util";
import IValidationUil from "./../validation_util.interface";
import CreateAdRequest from "./../../../entities/ads/requests/create_ad_request";
import Principal from "./../../../entities/auth/principal";
import IPresenceValidator from "./../validators/presence_validator.interface";
import IDatesRangeValidator from "./../validators/dates_range_validator.interface";

class CreateAdValidationUtil extends BaseValidationUil implements IValidationUil<CreateAdRequest> {
  private principalValidationUtil: IValidationUil<Principal>;
  private presenceValidator: IPresenceValidator;
  private datesRangeValidator: IDatesRangeValidator;

  constructor(
    principalValidationUtil: IValidationUil<Principal>,
    presenceValidator: IPresenceValidator,
    datesRangeValidator: IDatesRangeValidator
  ) {
    super();

    this.principalValidationUtil = principalValidationUtil;
    this.presenceValidator = presenceValidator;
    this.datesRangeValidator = datesRangeValidator;
  }

  public validate(createAdRequest: CreateAdRequest): void | never {
    this.principalValidationUtil.validate(createAdRequest.principal);

    this.errors = {};
    if (!this.presenceValidator.isValid(createAdRequest.title)) {
      this.appendError("title", this.presenceValidator.error)
    }
    if (!this.presenceValidator.isValid(createAdRequest.body)) {
      this.appendError("body", this.presenceValidator.error)
    }
    if (!this.datesRangeValidator.isValid(createAdRequest.startsAt, createAdRequest.endsAt)) {
      this.appendError("startsAt", this.datesRangeValidator.error)
    }
    this.processErrors();
  }
}

export default CreateAdValidationUtil;
