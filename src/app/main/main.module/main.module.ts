import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { FooterComponent } from './footer/footer.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { KurumsalComponent } from './kurumsal/kurumsal.component';
import { HizmetlerComponent } from './hizmetler/hizmetler.component';
import { AraclarComponent } from './araclar/araclar.component';
import { IletisimComponent } from './iletisim/iletisim.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainPageComponent,
    LoginPageComponent,
    FooterComponent,
    HomePageComponent,
    KurumsalComponent,
    HizmetlerComponent,
    AraclarComponent,
    IletisimComponent],
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LcjY-gUAAAAAD-SnuR97A6HQKmVFcj8upat8WSx',
    } as RecaptchaSettings
  }],
  exports: []
})
export class MainModule { }
