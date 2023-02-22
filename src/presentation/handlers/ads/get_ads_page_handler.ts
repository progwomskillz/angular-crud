import BaseHandler from "./../base_handler";
import GetAdsPageRequest from "./../../../domain/entities/ads/requests/get_ads_page_request";
import Page from "./../../../domain/entities/shared/page";
import Ad from "./../../../domain/entities/ads/ad";

type RequestData = {
  page: number,
  filter?: string,
}

class GetAdsPageHandler extends BaseHandler<GetAdsPageRequest, Page<Ad>> {
  protected async execute(data: RequestData): Promise<Page<Ad> | never> {
    const request = new GetAdsPageRequest(data.page, data.filter);
    return this.useCase.process(request).then(result => result as Page<Ad>);
  }
}

export default GetAdsPageHandler;
