class GetAdRequest {
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  public get id() {
    return this._id;
  }
}

export default GetAdRequest;
