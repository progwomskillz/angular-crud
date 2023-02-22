import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import IPrincipalListener from 'src/domain/entities/auth/listeners/principal_listener.interface';
import Principal from 'src/domain/entities/auth/principal';
import { principal } from 'src/application/structure';
import Ad from 'src/domain/entities/ads/ad';
import { getAdHandler, editAdHandler } from 'src/application/structure';
import { ValidationErrors } from 'src/domain/types/validation';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit, IPrincipalListener {
  private router: Router;
  private id: number;
  private _ad: Ad | undefined;
  private _isLoading: boolean;
  private principal: Principal;
  private _errors: ValidationErrors;

  constructor(route: ActivatedRoute, router: Router) {
    this.router = router;
    this.id = 0;
    this._ad = undefined;
    this._isLoading = true;
    this.principal = principal;
    this._errors = {};

    route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get("id") as string);
    });

    principal.addListener(this);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this._ad = await getAdHandler.handle({ id: this.id }) as Ad;
    } finally {
      this._isLoading = false;
    }
    this.checkPrincipal();
  }

  public onPrincipalChanged(principal: Principal): void {
    this.principal = principal;
    this.checkPrincipal();
  }

  private checkPrincipal() {
    if (this._ad?.author.id == this.principal.user?.id) {
      return;
    }
    this.router.navigate(['/ads']);
  }

  public get ad() {
    return this._ad as Ad;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public get errors() {
    return this._errors;
  }

  public get title() {
    return this.ad.title;
  }

  public get body() {
    return this.ad.body;
  }

  public get startsAt() {
    return this.dateToString(this.ad.startsAt);
  }

  public get endsAt() {
    return this.dateToString(this.ad.endsAt);
  }

  public get isButtonActive() {
    return this.ad.title.length && this.ad.body.length && this.ad.startsAt && this.ad.endsAt;
  }

  private dateToString(date: Date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  }

  public changeTitle(event: any) {
    this.ad.onChangeTitle(event.target.value);
  }

  public changeBody(event: any) {
    this.ad.onChangeBody(event.target.value);
  }

  public changeStartsAt(event: any) {
    if (!event.target.value) {
      return;
    }
    this.ad.onChangeStartsAt(new Date(event.target.value));
  }

  public changeEndsAt(event: any) {
    if (!event.target.value) {
      return;
    }
    this.ad.onChangeEndsAt(new Date(event.target.value));
  }

  public async edit(event: any) {
    event.preventDefault();
    this._errors = {};

    if (!this.isButtonActive) {
      return;
    }

    const data = {
      principal: this.principal,
      id: this.ad.id,
      title: this.ad.title,
      body: this.ad.body,
      startsAt: this.ad.startsAt,
      endsAt: this.ad.endsAt
    }

    editAdHandler.handle(data)
      .then(ad => this.router.navigate([`/ads/${(ad as Ad).id}`]))
      .catch((errors: ValidationErrors) => {
        this._errors = errors;
      });
  }
}
