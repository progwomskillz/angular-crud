export type ValidationError = {
  message: string,
  code: string
};

export type ValidationErrors = { [key: string]: Array<ValidationError> };
