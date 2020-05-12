import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from '../rest.module/home.guard';
import { LoginGuard } from '../rest.module/login.guard';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/:mode/:id', component: ProfileEditComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  { path: '**', redirectTo: '/profile' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
