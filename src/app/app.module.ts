import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module/main.module';
import { RestModule } from './main/rest.module/rest.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './main/rest.module/auth.service';
import { AlertifyService } from './main/services/alertify.service';
import { ErrorService } from './main/services/error.service';
import { AuthGuard } from './main/rest.module/auth.guard';


import { registerLocaleData } from '@angular/common';
import localeTR from '@angular/common/locales/tr';

registerLocaleData(localeTR);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RestModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'main', loadChildren: () => import('./main/main.module/main.module').then(m => m.MainModule)
      },
      {
        path: 'muhasebe', loadChildren: () => import('./main/muhasebe.module/muhasebe.module').then(m => m.MuhasebeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin', loadChildren: () => import('./main/admin.module/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '/main/home' }
    ])
  ],
  providers: [AuthService, AlertifyService, ErrorService,{provide: LOCALE_ID, useValue: 'tr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
