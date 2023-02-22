import Profile from "./profile";

class User {
  private _id: number;
  private _profile: Profile;

  constructor(id: number, profile: Profile) {
    this._id = id;
    this._profile = profile;
  }

  public get id() {
    return this._id;
  }

  public get profile() {
    return this._profile;
  }
}

export default User;
