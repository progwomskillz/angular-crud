import BaseHandler from "./../base_handler";
import GetAdRequest from "./../../../domain/entities/ads/requests/get_ad_request";
import Ad from "./../../../domain/entities/ads/ad";

type RequestData = {
  id: number,
}

class GetAdHandler extends BaseHandler<GetAdRequest, Ad> {
  protected async execute(data: RequestData): Promise<Ad | never> {
    const request = new GetAdRequest(data.id);
    return this.useCase.process(request).then(result => result as Ad);
  }
}

export default GetAdHandler;
