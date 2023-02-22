import Principal from "./../../auth/principal";

class DeleteAdRequest {
  private _principal: Principal;
  private _id: number;

  constructor(principal: Principal, id: number) {
    this._principal = principal;
    this._id = id;
  }

  public get principal() {
    return this._principal;
  }

  public get id() {
    return this._id;
  }
}

export default DeleteAdRequest;
