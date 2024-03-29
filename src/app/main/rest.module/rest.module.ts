import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { IsMakinesiService } from './is-makinesi.service';
import { OzelBinekAracService } from './ozel-binek-arac.service';
import { TirKamyonService } from './tir-kamyon.service';
import { FirmaService } from './firma.service';
import { PersonelService } from './personel.service';
import { DokumSahasiService } from './dokum-sahasi.service';
import { LoginGuard } from './login.guard';
import { TirKamyonGunlukCalismaFormuService } from './tir-kamyon-gunluk-calisma-formu.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminGuard } from './admin.guard';
import { HomeGuard } from './home.guard';
import { GidenYakitFormuService } from './giden-yakit-formu.service';
import { GelenYakitFormuService } from './gelen-yakit-formu.service';
import { IsMakinesiGunlukCalismaFormuService } from './is-makinesi-gunluk-calisma-formu.service';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { SahaOlcumFormuService } from './saha-olcum-formu.service';
import { FormTuruService } from './form-turu.service';
import { IsBirimiService } from './is-birimi.service';
import { SantiyeService } from './santiye.service';
import { MalzemeCinsiService } from './malzeme-cinsi.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AdminGuard,
    HomeGuard,
    UserService,
    IsMakinesiService,
    OzelBinekAracService,
    TirKamyonService,
    FirmaService,
    PersonelService,
    DokumSahasiService,
    TirKamyonGunlukCalismaFormuService,
    IsMakinesiGunlukCalismaFormuService,
    GelenYakitFormuService,
    GidenYakitFormuService,
    SahaOlcumFormuService,
    FormTuruService,
    IsBirimiService,
    SantiyeService,
    MalzemeCinsiService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DeviceDetectorService
  ]
})
export class RestModule { }
