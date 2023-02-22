import ITranslator from "./../translators/translator.interface";

class BaseMockRepository<T> {
  protected translator: ITranslator<T>;

  constructor(translator: ITranslator<T>) {
    this.translator = translator;
  }
}

export default BaseMockRepository;
