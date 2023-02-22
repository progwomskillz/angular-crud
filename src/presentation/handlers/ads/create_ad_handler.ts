import BaseAuthHandler from "./../base_auth_handler";
import CreateAdRequest from "./../../../domain/entities/ads/requests/create_ad_request";
import Ad from "./../../../domain/entities/ads/ad";
import Principal from "./../../../domain/entities/auth/principal";

type RequestData = {
  principal: Principal,
  title: string,
  body: string,
  startsAt: Date,
  endsAt: Date
}

class CreateAdHandler extends BaseAuthHandler<CreateAdRequest, Ad> {
  protected async execute(data: RequestData): Promise<Ad | never> {
    const request = new CreateAdRequest(
      data.principal,
      data.title,
      data.body,
      data.startsAt,
      data.endsAt
    );
    return this.useCase.process(request).then(result => result as Ad);
  }
}

export default CreateAdHandler;
