import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuhasebeComponent } from './muhasebe/muhasebe.component';
import { TirKamyonCalismaFormuComponent } from './tir-kamyon-calisma-formu/tir-kamyon-calisma-formu.component';
import { IsMakinesiCalismaFormuComponent } from './is-makinesi-calisma-formu/is-makinesi-calisma-formu.component';
import { YedekParcaFormuComponent } from './yedek-parca-formu/yedek-parca-formu.component';
import { FirmaCarileriComponent } from './firma-carileri/firma-carileri.component';
import { TahsilatComponent } from './tahsilat/tahsilat.component';
import { SerferFisiComponent } from './serfer-fisi/serfer-fisi.component';
import { TirKamyonCalismaCreateEditComponent } from './tir-kamyon-calisma-create-edit/tir-kamyon-calisma-create-edit.component';
import { IsMakinesiCalismaCreateEditComponent } from './is-makinesi-calisma-create-edit/is-makinesi-calisma-create-edit.component';
import { GelenYakitFormuComponent } from './gelen-yakit-formu/gelen-yakit-formu.component';
import { GelenYakitFormuCreateEditComponent } from './gelen-yakit-formu-create-edit/gelen-yakit-formu-create-edit.component';
import { GidenYakitFormuComponent } from './giden-yakit-formu/giden-yakit-formu.component';
import { GidenYakitFormuCreateEditComponent } from './giden-yakit-formu-create-edit/giden-yakit-formu-create-edit.component';


const routes: Routes = [
  {
    path: '', component: MuhasebeComponent, children: [
      { path: 'tirkamyon', component: TirKamyonCalismaFormuComponent },
      { path: 'tirkamyon/:mode/:id', component: TirKamyonCalismaCreateEditComponent },
      { path: 'tirkamyon/:mode', component: TirKamyonCalismaCreateEditComponent },
      { path: 'ismakinesi', component: IsMakinesiCalismaFormuComponent },
      { path: 'ismakinesi/:mode/:id', component: IsMakinesiCalismaCreateEditComponent },
      { path: 'ismakinesi/:mode', component: IsMakinesiCalismaCreateEditComponent },
      { path: 'yedekparca', component: YedekParcaFormuComponent },
      { path: 'gelenyakitformu', component: GelenYakitFormuComponent },
      { path: 'gelenyakitformu/:mode/:id', component: GelenYakitFormuCreateEditComponent },
      { path: 'gelenyakitformu/:mode', component: GelenYakitFormuCreateEditComponent },
      { path: 'gidenyakitformu', component: GidenYakitFormuComponent },
      { path: 'gidenyakitformu/:mode/:id', component: GidenYakitFormuCreateEditComponent },
      { path: 'gidenyakitformu/:mode', component: GidenYakitFormuCreateEditComponent },
      { path: 'firmacarileri', component: FirmaCarileriComponent },
      { path: 'tahsilat', component: TahsilatComponent },
      { path: 'seferfisi', component: SerferFisiComponent }

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuhasebeRoutingModule { }
