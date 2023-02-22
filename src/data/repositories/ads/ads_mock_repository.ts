import BaseMockRepository from "../base_mock_repository";
import IAdsRepository from "./ads_repository.interface";
import Ad from "./../../../domain/entities/ads/ad";
import Page from "./../../../domain/entities/shared/page";
import User from "./../../../domain/entities/auth/user";
import Profile from "./../../../domain/entities/auth/profile";
import GetAdsPageRequest from "./../../../domain/entities/ads/requests/get_ads_page_request";

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

  public async getPage(getAdsPageRequest: GetAdsPageRequest): Promise<Page<Ad>> {
    const pageSize = 10;
    const getRelevanceFilter = () => {
      if (getAdsPageRequest.relevance == "actual") {
        return (item: Ad) => {
          return item.startsAt <= now && item.endsAt >= now;
        }
      }
      return () => true
    }
    const getTitleFilter = () => {
      if (getAdsPageRequest.title) {
        return (item: Ad) => {
          return new RegExp(getAdsPageRequest.title as string, "i").test(item.title);
        }
      }
      return () => true
    }
    const filteredItems = ads
      .filter(getRelevanceFilter())
      .filter(getTitleFilter());
    const resultItems = filteredItems
      .filter((_, index: number) => {
      if (index >= ((getAdsPageRequest.page - 1) * pageSize) && (index < getAdsPageRequest.page * pageSize)) {
        return true;
      }
      return false;
    });
    return new Page(getAdsPageRequest.page, Math.round(filteredItems.length / pageSize + 0.5), resultItems);
  }
}

export default AdsMockRepository;
