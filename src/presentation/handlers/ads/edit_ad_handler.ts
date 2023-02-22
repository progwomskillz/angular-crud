import BaseAuthHandler from "./../base_auth_handler";
import EditAdRequest from "./../../../domain/entities/ads/requests/edit_ad_request";
import Ad from "./../../../domain/entities/ads/ad";
import Principal from "./../../../domain/entities/auth/principal";

type RequestData = {
  principal: Principal,
  id: number,
  title: string,
  body: string,
  startsAt: Date,
  endsAt: Date
}

class EditAdHandler extends BaseAuthHandler<EditAdRequest, Ad> {
  protected async execute(data: RequestData): Promise<Ad | never> {
    const request = new EditAdRequest(
      data.principal,
      data.id,
      data.title,
      data.body,
      data.startsAt,
      data.endsAt
    );
    return this.useCase.process(request).then(result => result as Ad);
  }
}

export default EditAdHandler;
