import IUseCase from "./../use_case.interface";
import DeleteAdRequest from "./../../entities/ads/requests/delete_ad_request";
import IValidationUtil from "./../../utils/validation/validation_util.interface";
import IAdsRepository from "./../../../data/repositories/ads/ads_repository.interface"
import Ad from "./../../entities/ads/ad";
import NotFoundException from "./../../entities/exceptions/not_found_exception";
import UnauthorizedException from "./../../entities/exceptions/unauthorized_exception";

class DeleteAdUseCase implements IUseCase<DeleteAdRequest, Ad> {
  private deleteAdValidationUtil: IValidationUtil<DeleteAdRequest>;
  private adsRepository: IAdsRepository;

  constructor(deleteAdValidationUtil: IValidationUtil<DeleteAdRequest>, adsRepository: IAdsRepository) {
    this.deleteAdValidationUtil = deleteAdValidationUtil;
    this.adsRepository = adsRepository;
  }

  async process(deleteAdRequest: DeleteAdRequest): Promise<Ad | never | null> {
    this.deleteAdValidationUtil.validate(deleteAdRequest);
    const ad = await this.adsRepository.getById(deleteAdRequest.id);
    if (!ad) {
      throw new NotFoundException();
    }
    if (ad.author.id != deleteAdRequest.principal.user?.id) {
      throw new UnauthorizedException();
    }
    this.adsRepository.delete(ad);
    return null;
  }
}

export default DeleteAdUseCase;
