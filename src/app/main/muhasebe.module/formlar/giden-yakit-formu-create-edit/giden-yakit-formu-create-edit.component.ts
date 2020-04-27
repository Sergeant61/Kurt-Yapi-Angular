import { Component, OnInit } from '@angular/core';
import { IsMakinesi } from '../../../models/IsMakinesi';
import { TirKamyon } from '../../../models/TirKamyon';
import { Personel } from '../../../models/Personel';
import { GidenYakitFormu } from '../../../models/GidenYakitFormu';
import { environment } from 'src/environments/environment';
import { PersonelService } from '../../../rest.module/personel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../rest.module/auth.service';
import { GidenYakitFormuService } from '../../../rest.module/giden-yakit-formu.service';
import { NgForm } from '@angular/forms';
import { IsMakinesiService } from '../../../rest.module/is-makinesi.service';
import { TirKamyonService } from '../../../rest.module/tir-kamyon.service';

@Component({
  selector: 'app-giden-yakit-formu-create-edit',
  templateUrl: './giden-yakit-formu-create-edit.component.html',
  styleUrls: ['./giden-yakit-formu-create-edit.component.css']
})
export class GidenYakitFormuCreateEditComponent implements OnInit {

  personelList: Personel[] = [];
  tirKamyonList: TirKamyon[] = [];
  isMakinesiList: IsMakinesi[] = [];

  gidenYakitFormu: GidenYakitFormu = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;
  isTirMi: boolean = false;

  baseUrl: string = environment.baseUrlGidenYakitFormu;
  newPersonelBaseUrl: string = environment.baseUrlPersonel;
  newTirBaseUrl: string = environment.baseUrlTirKamyon;
  newIsmakinesiUrl: string = environment.baseUrlIsmakinesi;

  constructor(
    private personelService: PersonelService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private gidenYakitFormuService: GidenYakitFormuService,
    private isMakinesiService: IsMakinesiService,
    private tirKamyonService: TirKamyonService,
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      gidenYakitFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.gidenYakitFormu = data.data;
          if (this.gidenYakitFormu.isMakinesiPlakaId === undefined) {
            this.isTirMi = true;
          } else {
            this.isTirMi = false;
          }

        } else {

        }
      }, err => {

      });
    } else {
      this.gidenYakitFormu = new GidenYakitFormu();
    }
  }

  ngOnInit(): void {

    this.isMakinesiService.getAll().subscribe(data => {
      if (data.success) {
        this.isMakinesiList = data.data;
      }
    });

    this.tirKamyonService.getAll().subscribe(data => {
      if (data.success) {
        this.tirKamyonList = data.data;
      }
    });

    this.personelService.getAll().subscribe(data => {
      if (data.success) {
        this.personelList = data.data;
      }
    });

  }

  save(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.editing) {

        this.gidenYakitFormu.lastEditUserId = this.authService.currentUser._id;
        this.gidenYakitFormuService.put(this.gidenYakitFormu._id, this.gidenYakitFormu).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        this.gidenYakitFormu.createdUserId = this.authService.currentUser._id;
        this.gidenYakitFormu.lastEditUserId = this.authService.currentUser._id;
        this.gidenYakitFormuService.post(this.gidenYakitFormu).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
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


}
