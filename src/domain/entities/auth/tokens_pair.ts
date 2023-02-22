class TokensPair {
  private _access: string;
  private _refresh: string;

  constructor(access: string, refresh: string) {
    this._access = access;
    this._refresh = refresh;
  }

  public get access() {
    return this._access;
  }

  public get refresh() {
    return this._refresh;
  }
}

export default TokensPair;
