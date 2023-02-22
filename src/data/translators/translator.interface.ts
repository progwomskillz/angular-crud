interface ITranslator<T> {
  toObject(entity: T): object;
  fromObject(data: object): T;
}

export default ITranslator;
