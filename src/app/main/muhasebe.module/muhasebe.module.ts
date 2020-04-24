import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MuhasebeComponent } from './muhasebe/muhasebe.component';
import { MuhasebeRoutingModule } from './muhasebe-routing.module';
import { TirKamyonCalismaFormuComponent } from './tir-kamyon-calisma-formu/tir-kamyon-calisma-formu.component';
import { IsMakinesiCalismaFormuComponent } from './is-makinesi-calisma-formu/is-makinesi-calisma-formu.component';
import { YedekParcaFormuComponent } from './yedek-parca-formu/yedek-parca-formu.component';
import { FirmaCarileriComponent } from './firma-carileri/firma-carileri.component';
import { TahsilatComponent } from './tahsilat/tahsilat.component';
import { SerferFisiComponent } from './serfer-fisi/serfer-fisi.component';
import { TirKamyonCalismaCreateEditComponent } from './tir-kamyon-calisma-create-edit/tir-kamyon-calisma-create-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IsMakinesiCalismaCreateEditComponent } from './is-makinesi-calisma-create-edit/is-makinesi-calisma-create-edit.component';
import { GelenYakitFormuComponent } from './gelen-yakit-formu/gelen-yakit-formu.component';
import { GelenYakitFormuCreateEditComponent } from './gelen-yakit-formu-create-edit/gelen-yakit-formu-create-edit.component';
import { GidenYakitFormuComponent } from './giden-yakit-formu/giden-yakit-formu.component';
import { GidenYakitFormuCreateEditComponent } from './giden-yakit-formu-create-edit/giden-yakit-formu-create-edit.component';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

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
    GidenYakitFormuCreateEditComponent
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
