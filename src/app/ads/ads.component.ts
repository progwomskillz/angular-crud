import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Ad from 'src/domain/entities/ads/ad';
import Page from 'src/domain/entities/shared/page';
import { getAdsPageHandler } from 'src/application/structure';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent {
  private _page: number;
  private _pageCount: number;
  private _items: Array<Ad>;
  private _isLoading: boolean;

  constructor(route: ActivatedRoute) {
    this._page = 1;
    this._pageCount = 1;
    this._items = [];
    this._isLoading = true;
    this.getPage();

    route.queryParams.subscribe(() => this.reset());
  }

  private reset() {
    this._page = 1;
    this._pageCount = 1;
    this._items = [];
    this._isLoading = true;
    this.getPage();
  }

  public get page() {
    return this._page;
  }

  public get pageCount() {
    return this._pageCount;
  }

  public get items() {
    return this._items;
  }

  public get isLoading() {
    return this._isLoading;
  }

  private async getPage() {
    const data : { page: number, filter?: string } = { page: this._page };
    const filter = new URLSearchParams(window.location.search).get("filter");
    if (filter) {
      data.filter = filter;
    }

    this._isLoading = true;

    getAdsPageHandler.handle(data)
      .then(data => {
        this._page = (data as Page<Ad>).page;
        this._pageCount = (data as Page<Ad>).pageCount;
        this._items = (data as Page<Ad>).items;
      })
      .finally(() => {
        this._isLoading = false;
      });
  }

  public changePage(page: number) {
    this._page = page;
    this.getPage();
  }
}
