interface IUseCase<T, U> {
  process(request: T): Promise<U | never | null>;
}

export default IUseCase;
