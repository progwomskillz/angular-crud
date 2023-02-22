import BaseValidationUil from "./../base_validation_util";
import IValidationUil from "./../validation_util.interface";
import GetAdsPageRequest from "./../../../entities/ads/requests/get_ads_page_request";
import IStringInArrayValidator from "./../validators/string_in_array_validator.interface";

class GetAdsPageValidationUtil extends BaseValidationUil implements IValidationUil<GetAdsPageRequest> {
  private stringInArrayValidator: IStringInArrayValidator;

  constructor(stringInArrayValidator: IStringInArrayValidator) {
    super();

    this.stringInArrayValidator = stringInArrayValidator;
  }

  public validate(getAdsPageRequest: GetAdsPageRequest): void | never {
    this.errors = {};
    const availableRelevances: Array<string> = ["actual"];

    if (getAdsPageRequest.relevance && !this.stringInArrayValidator.isValid(getAdsPageRequest.relevance, availableRelevances)) {
      this.appendError("relevance", this.stringInArrayValidator.error)
    }
    this.processErrors();
  }
}

export default GetAdsPageValidationUtil;
