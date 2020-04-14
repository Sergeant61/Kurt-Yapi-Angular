import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module/main.module';
import { MainPageComponent } from './main/main.module/main-page/main-page.component';
import { LoginPageComponent } from './main/main.module/login-page/login-page.component';
import { RestModule } from './main/rest.module/rest.module';
import { AuthGuard } from './main/rest.module/auth.guard';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from './main/rest.module/login.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminGuard } from './main/rest.module/admin.guard';
import { AuthService } from './main/rest.module/auth.service';
import { HomeGuard } from './main/rest.module/home.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MainModule,
    RestModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: MainPageComponent, canActivate: [HomeGuard] },
      { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
      {
        path: 'muhasebe', loadChildren: () => import('./main/muhasebe.module/muhasebe.module').then(m => m.MuhasebeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin', loadChildren: () => import('./main/admin.module/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '/home' }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
