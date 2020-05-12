import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../rest.module/auth.service';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../../rest.module/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User;
  editing: boolean;
  errorMessage: string;
  errorMessage1: string;
  errorMessage2: string;
  passOld: string;
  passNew1: string;
  passNew2: string;
  usernameNew: string;
  isLoading = false;
  isLoading1 = false;
  isLoading2 = false;

  baseUrl: string = environment.baseUrlProfile;

  @ViewChild('closebutton1') closebutton1;
  @ViewChild('closebutton2') closebutton2;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService,
    private activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      this.user = {
        name: authService.currentUser.name,
        surname: authService.currentUser.surname,
        birthDate: authService.currentUser.birthDate
      };
    } else {

    }
  }

  ngOnInit(): void {
  }

  save(form) {
    if (form.valid) {
      this.isLoading = true;
      if (this.editing) {

        this.userService.put(this.user).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            this.authService.currentUser.name = this.user.name;
            this.authService.currentUser.surname = this.user.surname;
            this.authService.currentUser.birthDate = this.user.birthDate;
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        // Yeni Kayıt
      }
    } else {
      this.errorMessage = 'Formu doğru şekilde doldurunuz.';
    }
  }

  sendPassChange() {
    if (this.passOld !== undefined && this.passOld !== '') {
      if (this.passNew1 !== undefined && this.passNew1 !== '' && this.passNew2 !== undefined && this.passNew2 !== '') {
        if (this.passNew1 === this.passNew2) {
          if (this.passNew1.length > 5) {

            this.isLoading1 = true;
            const passUser = { passNew: this.passNew1, passOld: this.passOld };

            this.userService.putPassword(passUser).subscribe(data => {
              if (data.success) {
                this.clear();
                this.alertifyService.success('Şifreniz barıyla değiştirildi.');

                this.closebutton1.nativeElement.click();
              } else {
                this.errorMessage1 = data.message;
              }
              this.isLoading1 = false;
            }, err => { });
          } else {
            this.errorMessage1 = 'Yeni şifre en az 6 karakterli olmak zorunda, lütfen formu doğru şekilde doldurunuz.';
          }
        } else {
          this.errorMessage1 = 'Şifreler uyuşmuyor, lütfen formu doğru şekilde doldurunuz.';
        }
      } else {
        this.errorMessage1 = 'Yeni şifre alanları boş bırakılamaz, lütfen formu doğru şekilde doldurunuz.';
      }
    } else {
      this.errorMessage1 = 'Eski şifre boş bırakılamaz, lütfen formu doğru şekilde doldurunuz.';
    }

  }

  sendPassMail() {
    if (this.passOld !== undefined && this.passOld !== '') {

      if (this.usernameNew !== undefined && this.usernameNew !== '') {
        if (this.usernameNew.length > 5) {
          this.isLoading2 = true;
          const usernameUser = { username: this.usernameNew, pass: this.passOld };

          this.userService.putUsername(usernameUser).subscribe(data => {
            if (data.success) {
              this.clear();
              this.alertifyService.success('Kullanıcı adınız başarıyla ' + this.usernameNew +
                ' olarak değiştirildi. Lütfen tekrar giriş yapın.');
              this.closebutton2.nativeElement.click();
              this.authService.logout();
            } else {
              this.errorMessage2 = data.message;
            }
            this.isLoading2 = false;
          }, err => { });

        } else {
          this.errorMessage2 = 'Yeni kullanıcı en az 6 karakterli olmak zorunda, formu doğru şekilde doldurunuz.';

        }
      } else {
        this.errorMessage2 = 'Yeni kullanıcı adı boş bırakılamaz, formu doğru şekilde doldurunuz.';

      }
    } else {
      this.errorMessage2 = 'Şifre boş bırakılamaz, lütfen formu doğru şekilde doldurunuz.';

    }
  }

  clear() {
    this.passOld = '';
    this.usernameNew = '';
    this.passNew1 = '';
    this.passNew2 = '';
    this.errorMessage1 = '';
    this.errorMessage2 = '';
  }


}
