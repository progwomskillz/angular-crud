import { Component } from '@angular/core';
import IPrincipalListener from 'src/domain/entities/auth/listeners/principal_listener.interface';
import Principal from 'src/domain/entities/auth/principal';
import { principal } from 'src/application/structure';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements IPrincipalListener {
  private _isAuthed: boolean;

  constructor() {
    this._isAuthed = false;

    this.onPrincipalChanged(principal);

    principal.addListener(this);
  }

  public get isAuthed() {
    return this._isAuthed;
  }

  public onPrincipalChanged(principal: Principal): void {
    this._isAuthed = !!principal.user;
  }

  public login(): void {
    if (this.isAuthed) {
      return;
    }
    principal.onLogin();
  }

  public logout(): void {
    if (!this.isAuthed) {
      return;
    }
    principal.onLogout();
  }
}
