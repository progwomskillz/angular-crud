import { Component } from '@angular/core';
import { Router } from '@angular/router';
import IPrincipalListener from 'src/domain/entities/auth/listeners/principal_listener.interface';
import Principal from 'src/domain/entities/auth/principal';
import { principal, createAdHandler } from 'src/application/structure';
import { ValidationErrors } from 'src/domain/types/validation';
import Ad from 'src/domain/entities/ads/ad';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements IPrincipalListener {
  private router: Router;
  private principal: Principal;
  private title: string;
  private body: string;
  private startsAt: string;
  private endsAt: string;
  private _errors: ValidationErrors;

  constructor(router: Router) {
    this.router = router;
    this.principal = principal;
    this.title = "";
    this.body = "";
    this.startsAt = "";
    this.endsAt = "";
    this._errors = {};

    this.onPrincipalChanged(principal);

    principal.addListener(this);
  }

  public onPrincipalChanged(principal: Principal): void {
    this.principal = principal;
  }

  public get isButtonActive() {
    return this.title.length && this.body.length && this.startsAt.length && this.endsAt.length && this.principal.user;
  }

  public onChangeTitle(event: any): void {
    this.title = event.target.value;
  }

  public onChangeBody(event: any): void {
    this.body = event.target.value;
  }

  public onChangeStartsAt(event: any): void {
    this.startsAt = event.target.value;
  }

  public onChangeEndsAt(event: any): void {
    this.endsAt = event.target.value;
  }

  public get errors() {
    return this._errors;
  }

  public async create(event: any): Promise<void> {
    event.preventDefault();
    this._errors = {};

    if (!this.isButtonActive) {
      return;
    }

    const data = {
      principal: this.principal,
      title: this.title,
      body: this.body,
      startsAt: new Date(this.startsAt),
      endsAt: new Date(this.endsAt)
    }

    createAdHandler.handle(data)
      .then(ad => this.router.navigate([`/ads/${(ad as Ad).id}`]))
      .catch((errors: ValidationErrors) => {
        this._errors = errors;
      });
  }
}
