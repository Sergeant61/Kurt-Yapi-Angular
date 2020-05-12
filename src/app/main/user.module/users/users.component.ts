import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { UserService } from '../../rest.module/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  baseUrl: string = environment.baseUrlUsers;
  pageNumbers: Array<number> = new Array();
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton1') closebutton1;

  userList: User[] = [];
  roleList: Role[] = [{ id: 0, role: 'Yok' }];

  selectedUser: User;
  newUser: User = new User();
  passNew1: string;
  passNew2: string;

  isLoading = false;
  isLoading1 = false;

  errorMessage1: string;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => {
      if (data.success) {
        this.userList = data.data;
      }
    }, err => {

    });
  }

  setSelected(value: User) {
    this.selectedUser = value;
  }

  delete() {
    this.isLoading = true;
    this.userService.delete(this.selectedUser._id).subscribe(data => {
      if (data.success) {
        const index = this.userList.findIndex(user => this.selectedUser._id === user._id);
        this.userList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

  createNewUser(form: NgForm) {
    if (form.valid) {
      if (this.passNew1 === this.passNew2 && this.passNew1.length > 5) {
        this.isLoading1 = true;
        this.newUser.password = this.passNew1;
        this.newUser.email = this.newUser.username;

        this.userService.register(this.newUser).subscribe(data => {
          if (data.success) {
            this.ngOnInit();
            this.clear();
            this.closebutton1.nativeElement.click();
          } else {
            this.errorMessage1 = data.message;
          }
          this.isLoading1 = false;
        }, err => { });

      } else {
        this.errorMessage1 = 'Şifreler eşleşmiyor veya 6 basamaklı değil.';
      }
    } else {
      this.errorMessage1 = 'Lütfen formu duğru şekilde doldurunuz.';
    }

  }

  clear() {
    this.newUser = new User();
  }

}
