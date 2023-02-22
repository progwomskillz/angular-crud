import IPrincipalListener from "./../../domain/entities/auth/listeners/principal_listener.interface";
import ITranslator from "./../translators/translator.interface";
import Principal from "./../../domain/entities/auth/principal";

class BaseRESTRepository<T> implements IPrincipalListener {
  private baseUrl: string;
  private tokenType: string;
  private access: string;
  protected translator: ITranslator<T>;

  constructor(baseUrl: string, tokenType: string = "Bearer", principal: Principal, translator: ITranslator<T>) {
    this.baseUrl = baseUrl;
    this.tokenType = tokenType;
    this.access = "";
    this.translator = translator;
    principal.addListener(this);
  }

  public onPrincipalChanged(principal: Principal) {
    this.access = principal.tokensPair?.access || "";
  }

  protected request(url: string, method: string, data?: object): Promise<any> {
    return fetch(
      `${this.baseUrl}${url}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${this.tokenType} ${this.access}`
        },
        body: JSON.stringify(data) || "",
      }
    );
  }
}

export default BaseRESTRepository;
