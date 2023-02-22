interface IValidationUtil<T> {
  validate(value: T): void | never;
}

export default IValidationUtil;
