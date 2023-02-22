class Page<T> {
  private _page: number;
  private _pageCount: number;
  private _items: Array<T>;

  constructor(page: number, pageCount: number, items: Array<T>) {
    this._page = page;
    this._pageCount = pageCount;
    this._items = items;
  }

  public get page() {
    return this._page;
  }

  public get pageCount() {
    return this._pageCount;
  }

  public get items() {
    return this._items;
  }
}

export default Page;
