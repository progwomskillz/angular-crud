import Ad from "./../../../domain/entities/ads/ad";
import Page from "./../../../domain/entities/shared/page";

interface IAdsRepository {
  create(ad: Ad): Promise<Ad>;
  getById(id: number): Promise<Ad | null>;
  delete(ad: Ad): Promise<null>;
  edit(ad: Ad): Promise<Ad>;
  getPage(page: number, filter?: string): Promise<Page<Ad>>;
}

export default IAdsRepository;
