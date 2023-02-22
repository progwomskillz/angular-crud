import BaseValidationUil from "./../base_validation_util";
import IValidationUil from "./../validation_util.interface";
import EditAdRequest from "./../../../entities/ads/requests/edit_ad_request";
import Principal from "./../../../entities/auth/principal";
import IPresenceValidator from "./../validators/presence_validator.interface";
import IDatesRangeValidator from "./../validators/dates_range_validator.interface";

class EditAdValidationUtil extends BaseValidationUil implements IValidationUil<EditAdRequest> {
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

  public validate(editAdRequest: EditAdRequest): void | never {
    this.principalValidationUtil.validate(editAdRequest.principal);

    this.errors = {};
    if (!this.presenceValidator.isValid(editAdRequest.id)) {
      this.appendError("id", this.presenceValidator.error)
    }
    if (!this.presenceValidator.isValid(editAdRequest.title)) {
      this.appendError("title", this.presenceValidator.error)
    }
    if (!this.presenceValidator.isValid(editAdRequest.body)) {
      this.appendError("body", this.presenceValidator.error)
    }
    if (!this.datesRangeValidator.isValid(editAdRequest.startsAt, editAdRequest.endsAt)) {
      this.appendError("startsAt", this.datesRangeValidator.error)
    }
    this.processErrors();
  }
}

export default EditAdValidationUtil;
