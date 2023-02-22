import ITranslator from "../translator.interface";
import Profile from "./../../../domain/entities/auth/profile";

type ProfileObject = object & {
  id: number,
  firstName: string,
  lastName: string,
  rating: number
};

class ProfileTranslator implements ITranslator<Profile> {
  public toObject(profile: Profile): ProfileObject {
    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      rating: profile.rating
    }
  }

  public fromObject(profile: ProfileObject): Profile {
    return new Profile(
      profile.id,
      profile.firstName,
      profile.lastName,
      profile.rating
    )
  }
}

export default ProfileTranslator;
