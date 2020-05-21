import { Component, OnInit } from '@angular/core';
import { IsMakinesi } from '../../../models/IsMakinesi';
import { Firma } from '../../../models/Firma';
import { Personel } from '../../../models/Personel';
import { environment } from 'src/environments/environment';
import { IsMakinesiGunlukCalisma } from '../../../models/IsMakinesiGunlukCalisma';
import { IsMakinesiService } from '../../../rest.module/is-makinesi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonelService } from '../../../rest.module/personel.service';
import { FirmaService } from '../../../rest.module/firma.service';
import { AuthService } from '../../../rest.module/auth.service';
import { IsMakinesiGunlukCalismaFormuService } from '../../../rest.module/is-makinesi-gunluk-calisma-formu.service';
import { NgForm } from '@angular/forms';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { FormTuruService } from 'src/app/main/rest.module/form-turu.service';
import { FormTuru } from 'src/app/main/models/FormTuru';

@Component({
  selector: 'app-is-makinesi-calisma-create-edit',
  templateUrl: './is-makinesi-calisma-create-edit.component.html',
  styleUrls: ['./is-makinesi-calisma-create-edit.component.css']
})
export class IsMakinesiCalismaCreateEditComponent implements OnInit {

  isMakinesiList: IsMakinesi[] = [];
  firmaList: Firma[] = [];
  personelList: Personel[] = [];
  formTuruList: FormTuru[] = [];
  santiyeList: Santiye[] = [];

  isMakinesiGunlukCalisma: IsMakinesiGunlukCalisma = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  tag = 'isMakinesiGunlukCalisma';

  urls = environment;
  baseUrl: string = environment.baseUrlIsMakinesiCalisma;

  constructor(
    private isMakinesiService: IsMakinesiService,
    private firmaService: FirmaService,
    private personelService: PersonelService,
    private formTuruService: FormTuruService,
    private santiyeService: SantiyeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      isMakinesiGunlukCalismaFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.isMakinesiGunlukCalisma = data.data;
          localStorage.removeItem(this.tag);
        } else {

        }
      }, err => {

      });
    } else {
      const gunlukCalisma: IsMakinesiGunlukCalisma = JSON.parse(localStorage.getItem(this.tag));

      if (gunlukCalisma !== undefined && gunlukCalisma !== null) {
        if (gunlukCalisma._id !== undefined && gunlukCalisma._id !== null) {
          localStorage.removeItem(this.tag);
          this.isMakinesiGunlukCalisma = new IsMakinesiGunlukCalisma();
        } else {
          this.isMakinesiGunlukCalisma = gunlukCalisma;
        }
      } else {
        this.isMakinesiGunlukCalisma = new IsMakinesiGunlukCalisma();
      }
    }
  }

  ngOnInit(): void {
    this.isMakinesiService.getAll().subscribe(data => {
      if (data.success) {
        this.isMakinesiList = data.data;
      }
    });

    this.firmaService.getAll().subscribe(data => {
      if (data.success) {
        this.firmaList = data.data;
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

        this.isMakinesiGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.isMakinesiGunlukCalismaFormuService.put(this.isMakinesiGunlukCalisma._id, this.isMakinesiGunlukCalisma).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            localStorage.removeItem(this.tag);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        this.isMakinesiGunlukCalisma.createdUserId = this.authService.currentUser._id;
        this.isMakinesiGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.isMakinesiGunlukCalismaFormuService.post(this.isMakinesiGunlukCalisma).subscribe(data => {
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
    localStorage.setItem(this.tag, JSON.stringify(this.isMakinesiGunlukCalisma));
  }

}
