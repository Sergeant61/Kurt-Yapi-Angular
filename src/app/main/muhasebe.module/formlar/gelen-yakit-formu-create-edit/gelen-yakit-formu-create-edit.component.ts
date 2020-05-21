import { Component, OnInit } from '@angular/core';
import { Personel } from '../../../models/Personel';
import { GelenYakitFormu } from '../../../models/GelenYakitFormu';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonelService } from '../../../rest.module/personel.service';
import { AuthService } from '../../../rest.module/auth.service';
import { GelenYakitFormuService } from '../../../rest.module/gelen-yakit-formu.service';
import { NgForm } from '@angular/forms';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';

@Component({
  selector: 'app-gelen-yakit-formu-create-edit',
  templateUrl: './gelen-yakit-formu-create-edit.component.html',
  styleUrls: ['./gelen-yakit-formu-create-edit.component.css']
})
export class GelenYakitFormuCreateEditComponent implements OnInit {

  personelList: Personel[] = [];
  santiyeList: Santiye[] = [];

  gelenYakitFormu: GelenYakitFormu = null;
  editing: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  baseUrl: string = environment.baseUrlGelenYakitFormu;
  urls = environment;

  constructor(
    private personelService: PersonelService,
    private santiyeService: SantiyeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private gelenYakitFormuService: GelenYakitFormuService
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      gelenYakitFormuService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.gelenYakitFormu = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.gelenYakitFormu = new GelenYakitFormu();
    }
  }

  ngOnInit(): void {
    this.personelService.getAll().subscribe(data => {
      if (data.success) {
        this.personelList = data.data;
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

        this.gelenYakitFormu.lastEditUserId = this.authService.currentUser._id;
        this.gelenYakitFormuService.put(this.gelenYakitFormu._id, this.gelenYakitFormu).subscribe(data => {
          if (data.success) {
            this.router.navigateByUrl(this.baseUrl);
          } else {
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        }, err => { });
      } else {

        this.gelenYakitFormu.createdUserId = this.authService.currentUser._id;
        this.gelenYakitFormu.lastEditUserId = this.authService.currentUser._id;
        this.gelenYakitFormuService.post(this.gelenYakitFormu).subscribe(data => {
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
