import IUseCase from "./../use_case.interface";
import CreateAdRequest from "./../../entities/ads/requests/create_ad_request";
import IValidationUtil from "./../../utils/validation/validation_util.interface";
import IAdsRepository from "./../../../data/repositories/ads/ads_repository.interface"
import Ad from "./../../entities/ads/ad";
import User from "./../../entities/auth/user";

class CreateAdUseCase implements IUseCase<CreateAdRequest, Ad> {
  private createAdValidationUtil: IValidationUtil<CreateAdRequest>;
  private adsRepository: IAdsRepository;

  constructor(createAdValidationUtil: IValidationUtil<CreateAdRequest>, adsRepository: IAdsRepository) {
    this.createAdValidationUtil = createAdValidationUtil;
    this.adsRepository = adsRepository;
  }

  async process(createAdRequest: CreateAdRequest): Promise<Ad | never> {
    this.createAdValidationUtil.validate(createAdRequest);
    const ad = new Ad(
      undefined,
      createAdRequest.principal.user as User,
      createAdRequest.title,
      createAdRequest.body,
      undefined,
      undefined,
      createAdRequest.startsAt,
      createAdRequest.endsAt
    );
    return this.adsRepository.create(ad).then(resultAd => {
      ad.onCreate(
        resultAd.id as number,
        resultAd.createdAt as Date,
        resultAd.modifiedAt as Date
      );
      return ad;
    })
  }
}

export default CreateAdUseCase;
