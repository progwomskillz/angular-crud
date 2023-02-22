import IUseCase from "./../use_case.interface";
import GetAdsPageRequest from "./../../entities/ads/requests/get_ads_page_request";
import Page from "./../../entities/shared/page";
import Ad from "./../../entities/ads/ad";
import IValidationUtil from "./../../utils/validation/validation_util.interface";
import IAdsRepository from "./../../../data/repositories/ads/ads_repository.interface"

class GetAdsPageUseCase implements IUseCase<GetAdsPageRequest, Page<Ad>> {
  private getAdsPageValidationUtil: IValidationUtil<GetAdsPageRequest>;
  private adsRepository: IAdsRepository;

  constructor(getAdsPageValidationUtil: IValidationUtil<GetAdsPageRequest>, adsRepository: IAdsRepository) {
    this.getAdsPageValidationUtil = getAdsPageValidationUtil;
    this.adsRepository = adsRepository;
  }

  async process(getAdsPageRequest: GetAdsPageRequest): Promise<Page<Ad>> {
    this.getAdsPageValidationUtil.validate(getAdsPageRequest);
    return this.adsRepository.getPage(getAdsPageRequest);
  }
}

export default GetAdsPageUseCase;
