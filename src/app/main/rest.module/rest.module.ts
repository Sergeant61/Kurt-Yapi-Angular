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


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    AdminGuard,
    HomeGuard,
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
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class RestModule { }
