import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MuhasebeComponent } from './muhasebe/muhasebe.component';
import { MuhasebeRoutingModule } from './muhasebe-routing.module';
import { TirKamyonCalismaFormuComponent } from './formlar/tir-kamyon-calisma-formu/tir-kamyon-calisma-formu.component';
import { IsMakinesiCalismaFormuComponent } from './formlar/is-makinesi-calisma-formu/is-makinesi-calisma-formu.component';
import { YedekParcaFormuComponent } from './formlar/yedek-parca-formu/yedek-parca-formu.component';
import { FirmaCarileriComponent } from './raporlar/firma-carileri/firma-carileri.component';
import { TahsilatComponent } from './raporlar/tahsilat/tahsilat.component';
import { SerferFisiComponent } from './raporlar/serfer-fisi/serfer-fisi.component';
import { TirKamyonCalismaCreateEditComponent } from './formlar/tir-kamyon-calisma-create-edit/tir-kamyon-calisma-create-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IsMakinesiCalismaCreateEditComponent } from './formlar/is-makinesi-calisma-create-edit/is-makinesi-calisma-create-edit.component';
import { GelenYakitFormuComponent } from './formlar/gelen-yakit-formu/gelen-yakit-formu.component';
import { GelenYakitFormuCreateEditComponent } from './formlar/gelen-yakit-formu-create-edit/gelen-yakit-formu-create-edit.component';
import { GidenYakitFormuComponent } from './formlar/giden-yakit-formu/giden-yakit-formu.component';
import { GidenYakitFormuCreateEditComponent } from './formlar/giden-yakit-formu-create-edit/giden-yakit-formu-create-edit.component';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { GunlukRaporComponent } from './raporlar/gunluk-rapor/gunluk-rapor.component';
import { FirmaRaporComponent } from './raporlar/firma-rapor/firma-rapor.component';
import { PerMesaiPuantajiComponent } from './raporlar/per-mesai-puantaji/per-mesai-puantaji.component';
import { PerMesaiOdemesiComponent } from './raporlar/per-mesai-odemesi/per-mesai-odemesi.component';
import { SahaOlcumFormuComponent } from './formlar/saha-olcum-formu/saha-olcum-formu.component';
import { SahaOlcumFormuCreateEditComponent } from './formlar/saha-olcum-formu-create-edit/saha-olcum-formu-create-edit.component';
import { HakedisListComponent } from './raporlar/hakedis-list/hakedis-list.component';
import { HakedisEditComponent } from './raporlar/hakedis-edit/hakedis-edit.component';

@NgModule({
  declarations: [
    MuhasebeComponent,
    TirKamyonCalismaFormuComponent,
    IsMakinesiCalismaFormuComponent,
    YedekParcaFormuComponent,
    FirmaCarileriComponent,
    TahsilatComponent,
    SerferFisiComponent,
    TirKamyonCalismaCreateEditComponent,
    IsMakinesiCalismaCreateEditComponent,
    GelenYakitFormuComponent,
    GelenYakitFormuCreateEditComponent,
    GidenYakitFormuComponent,
    GidenYakitFormuCreateEditComponent,
    GunlukRaporComponent,
    FirmaRaporComponent,
    PerMesaiPuantajiComponent,
    PerMesaiOdemesiComponent,
    SahaOlcumFormuComponent,
    SahaOlcumFormuCreateEditComponent,
    HakedisListComponent,
    HakedisEditComponent
  ],
  imports: [
    MuhasebeRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [MalihuScrollbarService],
  exports: []
})
export class MuhasebeModule { }
