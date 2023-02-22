import Principal from "./../../auth/principal";

class CreateAdRequest {
  private _principal: Principal;
  private _title: string;
  private _body: string;
  private _startsAt: Date;
  private _endsAt: Date;

  constructor(principal: Principal, title: string, body: string, startsAt: Date, endsAt: Date) {
    this._principal = principal;
    this._title = title;
    this._body = body;
    this._startsAt = startsAt;
    this._endsAt = endsAt;
  }

  public get principal() {
    return this._principal;
  }

  public get title() {
    return this._title;
  }

  public get body() {
    return this._body;
  }

  public get startsAt() {
    return this._startsAt;
  }

  public get endsAt() {
    return this._endsAt;
  }
}

export default CreateAdRequest;
