import ITranslator from "../translator.interface";
import Ad from "./../../../domain/entities/ads/ad";
import User from "./../../../domain/entities/auth/user";

type AdObject = object & {
  id: number | undefined,
  author: object,
  title: string,
  body: string,
  createdAt: string | undefined,
  modifiedAt: string | undefined,
  startsAt: string,
  endsAt: string
};

class AdTranslator implements ITranslator<Ad> {
  private userTranslator: ITranslator<User>;

  constructor(userTranslator: ITranslator<User>) {
    this.userTranslator = userTranslator;
  }

  public toObject(ad: Ad): AdObject {
    return {
      id: ad.id,
      author: this.userTranslator.toObject(ad.author),
      title: ad.title,
      body: ad.body,
      createdAt: ad.createdAt?.toISOString(),
      modifiedAt: ad.modifiedAt?.toISOString(),
      startsAt: ad.startsAt.toISOString(),
      endsAt: ad.endsAt.toISOString()
    }
  }

  public fromObject(ad: AdObject): Ad {
    return new Ad(
      ad.id,
      this.userTranslator.fromObject(ad.author),
      ad.title,
      ad.body,
      new Date(ad.createdAt as string),
      new Date(ad.modifiedAt as string),
      new Date(ad.startsAt),
      new Date(ad.endsAt)
    )
  }
}

export default AdTranslator;
