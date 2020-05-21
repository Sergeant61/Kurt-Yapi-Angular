import { Component, OnInit, ViewChild } from '@angular/core';
import { TirKamyonService } from '../../../rest.module/tir-kamyon.service';
import { TirKamyon } from '../../../models/TirKamyon';
import { FirmaService } from '../../../rest.module/firma.service';
import { Firma } from '../../../models/Firma';
import { DokumSahasi } from '../../../models/DokumSahasi';
import { DokumSahasiService } from '../../../rest.module/dokum-sahasi.service';
import { PersonelService } from '../../../rest.module/personel.service';
import { Personel } from '../../../models/Personel';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TirKamyonGunlukCalismaFormuService } from '../../../rest.module/tir-kamyon-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalisma } from '../../../models/TirKamyonGunlukCalisma';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../rest.module/auth.service';
import { SeferTonaj } from '../../../models/SeferTonaj';
import { FormTuru } from 'src/app/main/models/FormTuru';
import { Santiye } from 'src/app/main/models/Santiye';
import { FormTuruService } from 'src/app/main/rest.module/form-turu.service';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';

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
  formTuruList: FormTuru[] = [];
  santiyeList: Santiye[] = [];

  seferTonajList: SeferTonaj[] = [];

  tirKamyonGunlukCalisma: TirKamyonGunlukCalisma = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  urls = environment;
  baseUrl: string = environment.baseUrlTirKamyonCalisma;

  @ViewChild('closebutton') closebutton;

  tag = 'tirKamyonGunlukCalisma';

  constructor(
    private tirKamyonService: TirKamyonService,
    private firmaService: FirmaService,
    private dokumSahasiService: DokumSahasiService,
    private personelService: PersonelService,
    private formTuruService: FormTuruService,
    private santiyeService: SantiyeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      tirKamyonGunlukCalismaFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.tirKamyonGunlukCalisma = data.data;
          this.setTonajList(this.tirKamyonGunlukCalisma.seferSayisi);
          localStorage.removeItem(this.tag);
        }
      }, err => {

      });
    } else {
      const gunlukCalisma: TirKamyonGunlukCalisma = JSON.parse(localStorage.getItem(this.tag));

      if (gunlukCalisma !== undefined && gunlukCalisma !== null) {
        if (gunlukCalisma._id !== undefined && gunlukCalisma._id !== null) {
          localStorage.removeItem(this.tag);
          this.tirKamyonGunlukCalisma = new TirKamyonGunlukCalisma();
        } else {
          this.tirKamyonGunlukCalisma = gunlukCalisma;
        }
      } else {
        this.tirKamyonGunlukCalisma = new TirKamyonGunlukCalisma();
      }
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

    this.formTuruService.getAll().subscribe(data => {
      if (data.success) {
        this.formTuruList = data.data;
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

        this.tirKamyonGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.tirKamyonGunlukCalismaFormuService.put(this.tirKamyonGunlukCalisma._id, this.tirKamyonGunlukCalisma).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            localStorage.removeItem(this.tag);
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
    localStorage.setItem(this.tag, JSON.stringify(this.tirKamyonGunlukCalisma));
  }

  setTonajList(event: any) {

    this.seferTonajList = [];

    for (let index = 0; index < +event; index++) {
      this.seferTonajList.push(new SeferTonaj(''));
    }

    if (this.tirKamyonGunlukCalisma.tonajList !== undefined) {
      for (let index = 0; index < +this.seferTonajList.length; index++) {
        this.seferTonajList[index].tonaj = this.tirKamyonGunlukCalisma.tonajList[index];
      }
    }

  }

  tonajSave() {
    this.tirKamyonGunlukCalisma.tonajList = [];
    for (let index = 0; index < +this.seferTonajList.length; index++) {
      this.tirKamyonGunlukCalisma.tonajList.push(this.seferTonajList[index].tonaj);
    }
    this.closebutton.nativeElement.click();
  }
}
