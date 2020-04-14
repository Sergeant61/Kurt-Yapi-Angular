import { Component, OnInit } from '@angular/core';
import { DokumSahasi } from '../../models/DokumSahasi';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DokumSahasiService } from '../../rest.module/dokum-sahasi.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dokum-sahasi-form',
  templateUrl: './dokum-sahasi-form.component.html',
  styleUrls: ['./dokum-sahasi-form.component.css']
})
export class DokumSahasiFormComponent implements OnInit {

  editing: boolean = false;
  dokumSahasi: DokumSahasi = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlDokumSahasi;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private dokumSahasiService: DokumSahasiService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      dokumSahasiService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.dokumSahasi = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.dokumSahasi = new DokumSahasi();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.dokumSahasiService.put(this.dokumSahasi._id, this.dokumSahasi).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.dokumSahasiService.post(this.dokumSahasi).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    }
  }

}
