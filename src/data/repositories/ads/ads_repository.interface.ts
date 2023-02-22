import Ad from "./../../../domain/entities/ads/ad";
import Page from "./../../../domain/entities/shared/page";
import GetAdsPageRequest from "./../../../domain/entities/ads/requests/get_ads_page_request";

interface IAdsRepository {
  create(ad: Ad): Promise<Ad>;
  getById(id: number): Promise<Ad | null>;
  delete(ad: Ad): Promise<null>;
  edit(ad: Ad): Promise<Ad>;
  getPage(getAdsPageRequest: GetAdsPageRequest): Promise<Page<Ad>>;
}

export default IAdsRepository;
