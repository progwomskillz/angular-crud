import BaseAuthHandler from "./../base_auth_handler";
import DeleteAdRequest from "./../../../domain/entities/ads/requests/delete_ad_request";
import Ad from "./../../../domain/entities/ads/ad";
import Principal from "./../../../domain/entities/auth/principal";

type RequestData = {
  principal: Principal,
  id: number
}

class DeleteAdHandler extends BaseAuthHandler<DeleteAdRequest, Ad> {
  protected async execute(data: RequestData): Promise<null | never> {
    const request = new DeleteAdRequest(
      data.principal,
      data.id
    );
    await this.useCase.process(request)
    return null;
  }
}

export default DeleteAdHandler;
