import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { UserRoutingModule } from './user-routing.module';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, ProfileComponent, UsersComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [MalihuScrollbarService]
})
export class UserModule { }
