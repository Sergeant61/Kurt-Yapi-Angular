import { Component, OnInit } from '@angular/core';
import { TirKamyonService } from '../../rest.module/tir-kamyon.service';
import { TirKamyon } from '../../models/TirKamyon';
import { FirmaService } from '../../rest.module/firma.service';
import { Firma } from '../../models/Firma';
import { DokumSahasi } from '../../models/DokumSahasi';
import { DokumSahasiService } from '../../rest.module/dokum-sahasi.service';
import { PersonelService } from '../../rest.module/personel.service';
import { Personel } from '../../models/Personel';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TirKamyonGunlukCalismaFormuService } from '../../rest.module/tir-kamyon-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalisma } from '../../models/TirKamyonGunlukCalisma';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../rest.module/auth.service';
import { Mode } from '../../enums/mode.enum';

@Component({
  selector: 'app-tir-kamyon-calisma-create-edit',
  templateUrl: './tir-kamyon-calisma-create-edit.component.html',
  styleUrls: ['./tir-kamyon-calisma-create-edit.component.css']
})
export class TirKamyonCalismaCreateEditComponent implements OnInit {

  tirKamyonList: TirKamyon[] = [];
  firmaList: Firma[] = [];
  dokumSahasiList: DokumSahasi[] = [];
  personelList: Personel[] = [];

  tirKamyonGunlukCalisma: TirKamyonGunlukCalisma = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  baseUrl: string = environment.baseUrlTirKamyonCalisma;
  newTirBaseUrl: string = environment.baseUrlTirKamyon;
  newFirmaBaseUrl: string = environment.baseUrlFirma;
  newDokumBaseUrl: string = environment.baseUrlDokumSahasi;
  newPersonelBaseUrl: string = environment.baseUrlPersonel;

  constructor(
    private tirKamyonService: TirKamyonService,
    private firmaService: FirmaService,
    private dokumSahasiService: DokumSahasiService,
    private personelService: PersonelService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      tirKamyonGunlukCalismaFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.tirKamyonGunlukCalisma = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.tirKamyonGunlukCalisma = new TirKamyonGunlukCalisma();
    }
  }

  ngOnInit(): void {
    this.tirKamyonService.getAll().subscribe(data => {
      if (data.success) {
        this.tirKamyonList = data.data;
      }
    });

    this.firmaService.getAll().subscribe(data => {
      if (data.success) {
        this.firmaList = data.data;
      }
    });

    this.dokumSahasiService.getAll().subscribe(data => {
      if (data.success) {
        this.dokumSahasiList = data.data;
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

        this.tirKamyonGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.tirKamyonGunlukCalismaFormuService.put(this.tirKamyonGunlukCalisma._id, this.tirKamyonGunlukCalisma).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        this.tirKamyonGunlukCalisma.createdUserId = this.authService.currentUser._id;
        this.tirKamyonGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.tirKamyonGunlukCalismaFormuService.post(this.tirKamyonGunlukCalisma).subscribe(data => {
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
