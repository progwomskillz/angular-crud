class Profile {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _rating: number;

  constructor(id: number, firstName: string, lastName: string, rating: number) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._rating = rating;
  }

  public get id() {
    return this._id;
  }

  public get firstName() {
    return this._firstName;
  }

  public get lastName() {
    return this._lastName;
  }

  public get rating() {
    return this._rating;
  }
}

export default Profile;
