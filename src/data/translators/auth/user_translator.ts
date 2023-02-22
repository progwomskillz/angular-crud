import ITranslator from "../translator.interface";
import User from "./../../../domain/entities/auth/user";
import Profile from "./../../../domain/entities/auth/profile";

type UserObject = object & {
  id: number,
  profile: object
};

class UserTranslator implements ITranslator<User> {
  private profileTranslator: ITranslator<Profile>;

  constructor(profileTranslator: ITranslator<Profile>) {
    this.profileTranslator = profileTranslator;
  }

  public toObject(user: User): UserObject {
    return {
      id: user.id,
      profile: this.profileTranslator.toObject(user.profile)
    }
  }

  public fromObject(user: UserObject): User {
    return new User(
      user.id,
      this.profileTranslator.fromObject(user.profile)
    )
  }
}

export default UserTranslator;
