import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuhasebeComponent } from './muhasebe/muhasebe.component';
import { TirKamyonCalismaFormuComponent } from './formlar/tir-kamyon-calisma-formu/tir-kamyon-calisma-formu.component';
import { IsMakinesiCalismaFormuComponent } from './formlar/is-makinesi-calisma-formu/is-makinesi-calisma-formu.component';
import { YedekParcaFormuComponent } from './formlar/yedek-parca-formu/yedek-parca-formu.component';
import { FirmaCarileriComponent } from './raporlar/firma-carileri/firma-carileri.component';
import { TahsilatComponent } from './raporlar/tahsilat/tahsilat.component';
import { SerferFisiComponent } from './raporlar/serfer-fisi/serfer-fisi.component';
import { TirKamyonCalismaCreateEditComponent } from './formlar/tir-kamyon-calisma-create-edit/tir-kamyon-calisma-create-edit.component';
import { IsMakinesiCalismaCreateEditComponent } from './formlar/is-makinesi-calisma-create-edit/is-makinesi-calisma-create-edit.component';
import { GelenYakitFormuComponent } from './formlar/gelen-yakit-formu/gelen-yakit-formu.component';
import { GelenYakitFormuCreateEditComponent } from './formlar/gelen-yakit-formu-create-edit/gelen-yakit-formu-create-edit.component';
import { GidenYakitFormuComponent } from './formlar/giden-yakit-formu/giden-yakit-formu.component';
import { GidenYakitFormuCreateEditComponent } from './formlar/giden-yakit-formu-create-edit/giden-yakit-formu-create-edit.component';
import { GunlukRaporComponent } from './raporlar/gunluk-rapor/gunluk-rapor.component';
import { PerMesaiPuantajiComponent } from './raporlar/per-mesai-puantaji/per-mesai-puantaji.component';
import { PerMesaiOdemesiComponent } from './raporlar/per-mesai-odemesi/per-mesai-odemesi.component';
import { FirmaRaporComponent } from './raporlar/firma-rapor/firma-rapor.component';
import { SahaOlcumFormuComponent } from './formlar/saha-olcum-formu/saha-olcum-formu.component';
import { SahaOlcumFormuCreateEditComponent } from './formlar/saha-olcum-formu-create-edit/saha-olcum-formu-create-edit.component';
import { HakedisListComponent } from './raporlar/hakedis-list/hakedis-list.component';
import { HakedisEditComponent } from './raporlar/hakedis-edit/hakedis-edit.component';


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
      { path: 'sahaolcumformu', component: SahaOlcumFormuComponent },
      { path: 'sahaolcumformu/:mode/:id', component: SahaOlcumFormuCreateEditComponent },
      { path: 'sahaolcumformu/:mode', component: SahaOlcumFormuCreateEditComponent },
      { path: 'firmacarileri', component: FirmaCarileriComponent },
      { path: 'firmarapor', component: FirmaRaporComponent },
      { path: 'tahsilat', component: TahsilatComponent },
      { path: 'seferfisi', component: SerferFisiComponent },
      { path: 'gunlukrapor', component: GunlukRaporComponent },
      { path: 'mesaipuantaji', component: PerMesaiPuantajiComponent },
      { path: 'mesaiodemesi', component: PerMesaiOdemesiComponent },
      { path: 'hakedis', component: HakedisListComponent },
      { path: 'hakedis/:mode/:id', component: HakedisEditComponent },

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuhasebeRoutingModule { }
