import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HomeGuard } from '../rest.module/home.guard';
import { LoginGuard } from '../rest.module/login.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';




const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'home', component: HomePageComponent, canActivate: [HomeGuard]
      },
      {
        path: 'login', component: LoginPageComponent, canActivate: [LoginGuard]
      },
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
