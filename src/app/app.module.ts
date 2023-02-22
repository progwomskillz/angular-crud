import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { HeaderComponent } from './header/header.component';
import { AdComponent } from './ad/ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { AdsComponent } from './ads/ads.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAdComponent,
    HeaderComponent,
    AdComponent,
    EditAdComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
