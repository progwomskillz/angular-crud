import User from "./../auth/user";

class Ad {
  private _id?: number;
  private _author: User;
  private _title: string;
  private _body: string;
  private _createdAt?: Date;
  private _modifiedAt?: Date;
  private _startsAt: Date;
  private _endsAt: Date;

  constructor(
    id: number | undefined, author: User, title: string, body: string,
    createdAt: Date | undefined, modifiedAt: Date | undefined, startsAt: Date,
    endsAt: Date
  ) {
    this._id = id;
    this._author = author;
    this._title = title;
    this._body = body;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._startsAt = startsAt;
    this._endsAt = endsAt;
  }

  public get id() {
    return this._id;
  }

  public get author() {
    return this._author;
  }

  public get title() {
    return this._title;
  }

  public get body() {
    return this._body;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get modifiedAt() {
    return this._modifiedAt;
  }

  public get startsAt() {
    return this._startsAt;
  }

  public get endsAt() {
    return this._endsAt;
  }

  public onCreate(id: number, createdAt: Date, modifiedAt: Date) {
    this._id = id;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
  }

  public onChangeTitle(title: string) {
    this._title = title;
  }

  public onChangeBody(body: string) {
    this._body = body;
  }

  public onChangeStartsAt(startsAt: Date) {
    this._startsAt = startsAt;
  }

  public onChangeEndsAt(endsAt: Date) {
    this._endsAt = endsAt;
  }
}

export default Ad;
