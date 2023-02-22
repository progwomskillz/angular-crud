import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { AdComponent } from './ad/ad.component';
import { AdsComponent } from './ads/ads.component';

const routes: Routes = [
  { path: 'ads/create', component: CreateAdComponent },
  { path: 'ads/:id/edit', component: EditAdComponent},
  { path: 'ads/:id', component: AdComponent},
  { path: 'ads', component: AdsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
