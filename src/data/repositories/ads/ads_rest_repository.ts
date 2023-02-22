import BaseRESTRepository from "../base_rest_repository";
import IAdsRepository from "./ads_repository.interface";
import Ad from "./../../../domain/entities/ads/ad";
import Page from "./../../../domain/entities/shared/page";

class AdsRESTRepository extends BaseRESTRepository<Ad> implements IAdsRepository {
  public async create(ad: Ad): Promise<Ad> {
    return this.request("", "POST", this.translator.toObject(ad))
      .then(data => {
        return this.translator.fromObject(data.json());
      });
  }

  public async getById(id: number): Promise<Ad | null> {
    return this.request(`${id}`, "GET")
      .then(data => {
        return this.translator.fromObject(data.json());
      }).catch(() => {
        return null;
      });
  }

  public async delete(ad: Ad): Promise<null> {
    return this.request(`${ad.id}`, "DELETE").then(() => null);
  }

  public async edit(ad: Ad): Promise<Ad> {
    return this.request(`${ad.id}`, "PUT", this.translator.toObject(ad))
      .then(data => {
        return this.translator.fromObject(data.json());
      });
  }

  public async getPage(page: number, filter?: string): Promise<Page<Ad>> {
    let qs = "";
    if (filter) {
      qs += `&filter=${filter}`
    }
    return this.request(`?page=${page}${qs}`, "GET")
      .then(data => {
        data = data.json();
        return new Page(
          data.page,
          data.pageCount,
          (data.items as Array<Ad>).map(item => this.translator.fromObject(item))
        );
      });
  }
}

export default AdsRESTRepository;
