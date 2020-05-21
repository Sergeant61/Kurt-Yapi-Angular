import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { IsMakinesiComponent } from './is-makinesi/is-makinesi.component';
import { OzelBinekAracComponent } from './ozel-binek-arac/ozel-binek-arac.component';
import { TirKamyonComponent } from './tir-kamyon/tir-kamyon.component';
import { FirmaComponent } from './firma/firma.component';
import { PersonelComponent } from './personel/personel.component';
import { DokumSahasiComponent } from './dokum-sahasi/dokum-sahasi.component';
import { IsMakinesiFormComponent } from './is-makinesi-form/is-makinesi-form.component';
import { FormsModule } from '@angular/forms';
import { OzelBinekAracFormComponent } from './ozel-binek-arac-form/ozel-binek-arac-form.component';
import { TirKamyonFormComponent } from './tir-kamyon-form/tir-kamyon-form.component';
import { FirmaFormComponent } from './firma-form/firma-form.component';
import { PersonelFormComponent } from './personel-form/personel-form.component';
import { DokumSahasiFormComponent } from './dokum-sahasi-form/dokum-sahasi-form.component';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { IsBirimiComponent } from './is-birimi/is-birimi.component';
import { IsBirimiFormComponent } from './is-birimi-form/is-birimi-form.component';
import { FormTuruComponent } from './form-turu/form-turu.component';
import { FormTuruFormComponent } from './form-turu-form/form-turu-form.component';
import { SantiyeComponent } from './santiye/santiye.component';
import { SantiyeFormComponent } from './santiye-form/santiye-form.component';



@NgModule({
  declarations: [AdminComponent,
    IsMakinesiComponent,
    OzelBinekAracComponent,
    TirKamyonComponent,
    FirmaComponent,
    PersonelComponent,
    DokumSahasiComponent,
    IsMakinesiFormComponent,
    OzelBinekAracFormComponent,
    TirKamyonFormComponent,
    FirmaFormComponent,
    PersonelFormComponent,
    DokumSahasiFormComponent,
    IsBirimiComponent,
    IsBirimiFormComponent,
    FormTuruComponent,
    FormTuruFormComponent,
    SantiyeComponent,
    SantiyeFormComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [MalihuScrollbarService],
  exports: []
})
export class AdminModule { }
