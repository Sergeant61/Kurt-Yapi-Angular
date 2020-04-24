import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../rest.module/auth.service';
import { Router } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;
  isLoading: boolean = false;
  declarativeFormCaptchaValue: boolean;
  isReCaptcha: boolean = false;
  dogrulamaNumber: number = 0;


  constructor(
    private authService: AuthService,
    private router: Router,
    public recaptchaModule: RecaptchaModule,
    public recaptchaFormsModule: RecaptchaFormsModule) { }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    this.authService.login({ username: this.username, password: this.password }).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('main/home');
      } else {
        this.errorMessage = 'Hatalı Kullancı Adı veya Şifre';
      }
      this.isLoading = false;
    }, err => {
      this.errorMessage = 'Network hatası';
      this.isLoading = false;
    });
  }

  async resolved(captchaResponse: string) {
    await this.sendTokenToBackend(captchaResponse);
  }

  sendTokenToBackend(token) {
    this.dogrulamaNumber = 1;
    this.authService.sendCaptchaToken(token).subscribe(
      data => {
        this.isReCaptcha = data.success;
        this.dogrulamaNumber = 2;
      },
      err => {
        this.isReCaptcha = false;
        this.errorMessage = 'Doğrulama sağlanamadı sayfayı yeniledikten sonra tekrar deneyiniz.';
        this.dogrulamaNumber = 3;

      },
      () => { }
    );
  }


}
