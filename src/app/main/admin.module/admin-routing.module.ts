import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IsMakinesiComponent } from './is-makinesi/is-makinesi.component';
import { OzelBinekAracComponent } from './ozel-binek-arac/ozel-binek-arac.component';
import { TirKamyonComponent } from './tir-kamyon/tir-kamyon.component';
import { FirmaComponent } from './firma/firma.component';
import { PersonelComponent } from './personel/personel.component';
import { DokumSahasiComponent } from './dokum-sahasi/dokum-sahasi.component';
import { IsMakinesiFormComponent } from './is-makinesi-form/is-makinesi-form.component';
import { OzelBinekAracFormComponent } from './ozel-binek-arac-form/ozel-binek-arac-form.component';
import { TirKamyonFormComponent } from './tir-kamyon-form/tir-kamyon-form.component';
import { FirmaFormComponent } from './firma-form/firma-form.component';
import { PersonelFormComponent } from './personel-form/personel-form.component';
import { DokumSahasiFormComponent } from './dokum-sahasi-form/dokum-sahasi-form.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'ismakinesi', component: IsMakinesiComponent },
      { path: 'ismakinesi/:mode/:id', component: IsMakinesiFormComponent },
      { path: 'ismakinesi/:mode', component: IsMakinesiFormComponent },
      { path: 'ozelbinekarac', component: OzelBinekAracComponent },
      { path: 'ozelbinekarac/:mode/:id', component: OzelBinekAracFormComponent },
      { path: 'ozelbinekarac/:mode', component: OzelBinekAracFormComponent },
      { path: 'tirkamyon', component: TirKamyonComponent },
      { path: 'tirkamyon/:mode/:id', component: TirKamyonFormComponent },
      { path: 'tirkamyon/:mode', component: TirKamyonFormComponent },
      { path: 'firma', component: FirmaComponent },
      { path: 'firma/:mode/:id', component: FirmaFormComponent },
      { path: 'firma/:mode', component: FirmaFormComponent },
      { path: 'personel', component: PersonelComponent },
      { path: 'personel/:mode/:id', component: PersonelFormComponent },
      { path: 'personel/:mode', component: PersonelFormComponent },
      { path: 'dokumsahasi', component: DokumSahasiComponent },
      { path: 'dokumsahasi/:mode/:id', component: DokumSahasiFormComponent },
      { path: 'dokumsahasi/:mode', component: DokumSahasiFormComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
