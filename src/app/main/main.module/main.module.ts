import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { FooterComponent } from './footer/footer.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [NavbarComponent, MainPageComponent, LoginPageComponent, FooterComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LcjY-gUAAAAAD-SnuR97A6HQKmVFcj8upat8WSx',
    } as RecaptchaSettings
  }],
  exports: [NavbarComponent, FooterComponent]
})
export class MainModule { }
