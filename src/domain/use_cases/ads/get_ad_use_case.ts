import IUseCase from "./../use_case.interface";
import GetAdRequest from "./../../entities/ads/requests/get_ad_request";
import IAdsRepository from "./../../../data/repositories/ads/ads_repository.interface"
import Ad from "./../../entities/ads/ad";
import NotFoundException from "./../../entities/exceptions/not_found_exception";

class GetAdUseCase implements IUseCase<GetAdRequest, Ad> {
  private adsRepository: IAdsRepository;

  constructor(adsRepository: IAdsRepository) {
    this.adsRepository = adsRepository;
  }

  async process(getAdRequest: GetAdRequest): Promise<Ad | never> {
    const ad = await this.adsRepository.getById(getAdRequest.id);
    if (!ad) {
      throw new NotFoundException();
    }
    return ad;
  }
}

export default GetAdUseCase;
