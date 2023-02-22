import IPrincipalUtil from "./principal_util.interface";
import Principal from "./../../domain/entities/auth/principal";
import IPrincipalListener from "./../../domain/entities/auth/listeners/principal_listener.interface";

class PrincipalUtil implements IPrincipalUtil, IPrincipalListener {
  private principal: Principal;

  constructor(principal: Principal) {
    this.principal = principal;
    principal.addListener(this);
  }

  public onPrincipalChanged(principal: Principal): void {
    this.principal = principal;
  }

  public get(): Principal {
    return this.principal;
  }
}

export default PrincipalUtil;
