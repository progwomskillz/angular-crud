class GetAdsPageRequest {
  private _page: number;
  private _relevance?: string;
  private _title?: string;

  constructor(page: number, relevance?: string, title?: string) {
    this._page = page;
    this._relevance = relevance;
    this._title = title;
  }

  public get page() {
    return this._page;
  }

  public get relevance() {
    return this._relevance;
  }

  public get title() {
    return this._title;
  }
}

export default GetAdsPageRequest;
