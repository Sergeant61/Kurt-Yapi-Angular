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

@Component({
  selector: 'app-is-makinesi-calisma-create-edit',
  templateUrl: './is-makinesi-calisma-create-edit.component.html',
  styleUrls: ['./is-makinesi-calisma-create-edit.component.css']
})
export class IsMakinesiCalismaCreateEditComponent implements OnInit {

  isMakinesiList: IsMakinesi[] = [];
  firmaList: Firma[] = [];
  personelList: Personel[] = [];

  isMakinesiGunlukCalisma: IsMakinesiGunlukCalisma = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  baseUrl: string = environment.baseUrlIsMakinesiCalisma;
  newIsmakinesiUrl: string = environment.baseUrlIsmakinesi;
  newFirmaBaseUrl: string = environment.baseUrlFirma;
  newPersonelBaseUrl: string = environment.baseUrlPersonel;

  constructor(
    private isMakinesiService: IsMakinesiService,
    private firmaService: FirmaService,
    private personelService: PersonelService,
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
          localStorage.removeItem('isMakinesiGunlukCalisma');
        } else {

        }
      }, err => {

      });
    } else {
      const gunlukCalisma: IsMakinesiGunlukCalisma = JSON.parse(localStorage.getItem('isMakinesiGunlukCalisma'));

      if (gunlukCalisma !== undefined && gunlukCalisma !== null) {
        if (gunlukCalisma._id !== undefined && gunlukCalisma._id !== null) {
          localStorage.removeItem('isMakinesiGunlukCalisma');
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

  }

  save(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      if (this.editing) {

        this.isMakinesiGunlukCalisma.lastEditUserId = this.authService.currentUser._id;
        this.isMakinesiGunlukCalismaFormuService.put(this.isMakinesiGunlukCalisma._id, this.isMakinesiGunlukCalisma).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
            localStorage.removeItem('isMakinesiGunlukCalisma');
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
            localStorage.removeItem('isMakinesiGunlukCalisma');
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
    localStorage.setItem('isMakinesiGunlukCalisma', JSON.stringify(this.isMakinesiGunlukCalisma));
  }

}
