import BaseMockRepository from "../base_mock_repository";
import IAdsRepository from "./ads_repository.interface";
import Ad from "./../../../domain/entities/ads/ad";
import Page from "./../../../domain/entities/shared/page";
import User from "./../../../domain/entities/auth/user";
import Profile from "./../../../domain/entities/auth/profile";

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const weekAgo = new Date(now);
weekAgo.setDate(weekAgo.getDate() - 7);
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);

const ads: Array<Ad> = [];
for (let i = 0; i < 12; i++) {
  const id = i + 1;
  const profile = new Profile(id, "John", "Smith", 4.8);
  const user = new User(id, profile);
  const ad = new Ad(
    id,
    user,
    `Title ${id}`,
    `Body ${id}`,
    now,
    now,
    now,
    tomorrow
  );
  ads.push(ad);
}
ads.push(
  new Ad(
    13,
    new User(13, new Profile(13, "John", "Smith", 4.8)),
    "Title 13",
    "Body 13",
    weekAgo,
    weekAgo,
    weekAgo,
    yesterday
  )
);

class AdsMockRepository extends BaseMockRepository<Ad> implements IAdsRepository {
  public async create(ad: Ad): Promise<Ad> {
    const data = this.translator.toObject(ad);
    return this.translator.fromObject({...data, id: 1, createdAt: now.toISOString(), modifiedAt: now.toISOString() });
  }

  public async getById(id: number): Promise<Ad | null> {
    if (id > 12) {
      return null;
    }

    const data = {
      id,
      author: {
        id: id,
        profile: {
          id: id,
          firstName: "John",
          lastName: "Smith",
          rating: 4.8,
        }
      },
      title: `Title ${id}`,
      body: `Body ${id}`,
      createdAt: now.toISOString(),
      modifiedAt: now.toISOString(),
      startsAt: now.toISOString(),
      endsAt: tomorrow.toISOString()
    };
    return this.translator.fromObject(data);
  }

  public async delete(ad: Ad): Promise<null> {
    return null;
  }

  public async edit(ad: Ad): Promise<Ad> {
    return ad;
  }

  public async getPage(page: number, filter?: string): Promise<Page<Ad>> {
    const pageSize = 10;
    const getFilter = () => {
      if (filter == "actual") {
        return (item: Ad) => {
          return item.startsAt <= now && item.endsAt >= now;
        }
      }
      return () => true
    }
    const resultItems = ads.filter(getFilter()).filter((_, index: number) => {
      if (index >= ((page - 1) * pageSize) && (index < page * pageSize)) {
        return true;
      }
      return false;
    });
    return new Page(page, Math.round(ads.length / pageSize + 0.5), resultItems);
  }
}

export default AdsMockRepository;
