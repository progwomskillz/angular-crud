import IPrincipalListener from "./listeners/principal_listener.interface";
import User from "./user";
import TokensPair from "./tokens_pair";
import Profile from "./profile";

class Principal {
  private accessListeners: Array<IPrincipalListener>;
  private _user?: User;
  private _tokensPair?: TokensPair;

  constructor(user: User | undefined, tokensPair: TokensPair | undefined) {
    this.accessListeners = [];
    this._user = user;
    this._tokensPair = tokensPair;
  }

  public get user() {
    return this._user;
  }

  public get tokensPair() {
    return this._tokensPair;
  }

  // Mock
  public onLogin() {
    const profile = new Profile(1, "John", "Smith", 4.88);
    this._user = new User(1, profile);
    this._tokensPair = new TokensPair("access_token", "refresh_token");
    this.notifyListeners();
  }

  public onLogout() {
    this._user = undefined;
    this._tokensPair = undefined;
    this.notifyListeners();
  }

  public addListener(listener: IPrincipalListener): void {
    this.accessListeners.push(listener);
  }

  private notifyListeners(): void {
    this.accessListeners.forEach(listener => listener.onPrincipalChanged(this));
  }
}

export default Principal;
