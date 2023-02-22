import IUseCase from "./../use_case.interface";
import EditAdRequest from "./../../entities/ads/requests/edit_ad_request";
import IValidationUtil from "./../../utils/validation/validation_util.interface";
import IAdsRepository from "./../../../data/repositories/ads/ads_repository.interface"
import Ad from "./../../entities/ads/ad";
import NotFoundException from "./../../entities/exceptions/not_found_exception";
import UnauthorizedException from "./../../entities/exceptions/unauthorized_exception";

class EditAdUseCase implements IUseCase<EditAdRequest, Ad> {
  private editAdValidationUtil: IValidationUtil<EditAdRequest>;
  private adsRepository: IAdsRepository;

  constructor(editAdValidationUtil: IValidationUtil<EditAdRequest>, adsRepository: IAdsRepository) {
    this.editAdValidationUtil = editAdValidationUtil;
    this.adsRepository = adsRepository;
  }

  async process(editAdRequest: EditAdRequest): Promise<Ad | never> {
    this.editAdValidationUtil.validate(editAdRequest);
    const ad = await this.adsRepository.getById(editAdRequest.id);
    if (!ad) {
      throw new NotFoundException();
    }
    if (ad.author.id != editAdRequest.principal.user?.id) {
      throw new UnauthorizedException();
    }
    ad.onChangeTitle(editAdRequest.title);
    ad.onChangeBody(editAdRequest.body);
    ad.onChangeStartsAt(editAdRequest.startsAt);
    ad.onChangeEndsAt(editAdRequest.endsAt);
    this.adsRepository.edit(ad);
    return ad;
  }
}

export default EditAdUseCase;
