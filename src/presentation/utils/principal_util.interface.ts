import Principal from "./../../domain/entities/auth/principal";

interface IPrincipalUtil {
  get(): Principal;
}

export default IPrincipalUtil;
