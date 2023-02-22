import Principal from "../principal";

interface IPrincipalListener {
  onPrincipalChanged(principal: Principal): void;
}

export default IPrincipalListener;
