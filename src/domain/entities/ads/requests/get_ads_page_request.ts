class GetAdsPageRequest {
  private _page: number;
  private _filter?: string;

  constructor(page: number, filter?: string) {
    this._page = page;
    this._filter = filter;
  }

  public get page() {
    return this._page;
  }

  public get filter() {
    return this._filter;
  }
}

export default GetAdsPageRequest;
