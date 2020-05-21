import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Firma } from 'src/app/main/models/Firma';
import { IsBirimi } from 'src/app/main/models/IsBirimi';
import { SahaOlcumFormu } from 'src/app/main/models/SahaOlcumFormu';
import { NgForm } from '@angular/forms';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { SahaOlcumFormuService } from 'src/app/main/rest.module/saha-olcum-formu.service';
import { IsBirimiService } from 'src/app/main/rest.module/is-birimi.service';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';


@Component({
  selector: 'app-saha-olcum-formu-create-edit',
  templateUrl: './saha-olcum-formu-create-edit.component.html',
  styleUrls: ['./saha-olcum-formu-create-edit.component.css']
})
export class SahaOlcumFormuCreateEditComponent implements OnInit {

  firmaList: Firma[] = [];
  isBirimilList: IsBirimi[] = [];
  santiyeList: Santiye[] = [];

  sahaOlcumFormu: SahaOlcumFormu = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  baseUrl: string = environment.baseUrlSahaOlcum;
  urls = environment;

  tag = 'sahaOlcumFormu';

  constructor(
    private isBirimiService: IsBirimiService,
    private firmaService: FirmaService,
    private santiyeService: SantiyeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private sahaOlcumFormuService: SahaOlcumFormuService
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      sahaOlcumFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.sahaOlcumFormu = data.data;
          localStorage.removeItem(this.tag);
        } else {

        }
      }, err => {

      });
    } else {
      const gunlukCalisma: SahaOlcumFormu = JSON.parse(localStorage.getItem(this.tag));

      if (gunlukCalisma !== undefined && gunlukCalisma !== null) {
        if (gunlukCalisma._id !== undefined && gunlukCalisma._id !== null) {
          localStorage.removeItem(this.tag);
          this.sahaOlcumFormu = new SahaOlcumFormu();
        } else {
          this.sahaOlcumFormu = gunlukCalisma;
        }
      } else {
        this.sahaOlcumFormu = new SahaOlcumFormu();
      }
    }
  }

  ngOnInit(): void {
    this.isBirimiService.getAll().subscribe(data => {
      if (data.success) {
        this.isBirimilList = data.data;
      }
    });

    this.firmaService.getAll().subscribe(data => {
      if (data.success) {
        this.firmaList = data.data;
      }
    });

    this.santiyeService.getAll().subscribe(data => {
      if (data.success) {
        this.santiyeList = data.data;
      }
    });

  }

  save(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.editing) {

        this.sahaOlcumFormu.lastEditUserId = this.authService.currentUser._id;
        this.sahaOlcumFormuService.put(this.sahaOlcumFormu._id, this.sahaOlcumFormu).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            localStorage.removeItem(this.tag);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        this.sahaOlcumFormu.createdUserId = this.authService.currentUser._id;
        this.sahaOlcumFormu.lastEditUserId = this.authService.currentUser._id;
        this.sahaOlcumFormuService.post(this.sahaOlcumFormu).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            localStorage.removeItem(this.tag);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      }
    } else {
      this.errorMessage = 'Formu doğru şekilde doldurunuz.';
    }
  }

  formChange(form: NgForm) {
    localStorage.setItem(this.tag, JSON.stringify(this.sahaOlcumFormu));
  }


}
