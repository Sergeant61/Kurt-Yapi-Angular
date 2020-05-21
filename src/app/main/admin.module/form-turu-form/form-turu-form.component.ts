import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormTuru } from '../../models/FormTuru';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTuruService } from '../../rest.module/form-turu.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-turu-form',
  templateUrl: './form-turu-form.component.html',
  styleUrls: ['./form-turu-form.component.css']
})
export class FormTuruFormComponent implements OnInit {


  editing: boolean = false;
  formTuru: FormTuru = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlFormTuru;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private formTuruService: FormTuruService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      formTuruService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.formTuru = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.formTuru = new FormTuru();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.formTuruService.put(this.formTuru._id, this.formTuru).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.formTuruService.post(this.formTuru).subscribe(data => {
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
