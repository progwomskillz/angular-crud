import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import IPrincipalListener from 'src/domain/entities/auth/listeners/principal_listener.interface';
import Principal from 'src/domain/entities/auth/principal';
import { principal } from 'src/application/structure';
import Ad from 'src/domain/entities/ads/ad';
import { getAdHandler, deleteAdHandler } from 'src/application/structure';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit, IPrincipalListener {
  private router: Router;
  private id: number;
  private _ad: Ad | undefined;
  private _isLoading: boolean;
  private principal: Principal;

  constructor(route: ActivatedRoute, router: Router) {
    this.router = router;
    this.id = 0;
    this._ad = undefined;
    this._isLoading = true;
    this.principal = principal;

    route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get("id") as string);
    });

    principal.addListener(this);
  }

  public async ngOnInit(): Promise<void> {
    getAdHandler.handle({ id: this.id })
      .then(ad => {
        this._ad = ad as Ad;
      })
      .finally(() => {
        this._isLoading = false;
      });
  }

  public onPrincipalChanged(principal: Principal): void {
    this.principal = principal;
  }

  public get ad() {
    return this._ad as Ad;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public get isAuthor() {
    return this.principal.user?.id == this._ad?.author.id;
  }

  public async delete() {
    if (!this.ad) {
      return;
    }
    await deleteAdHandler.handle({ id: this.ad.id, principal: this.principal });
    this.router.navigate(['/ads']);
  }
}
