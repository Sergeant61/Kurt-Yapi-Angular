import { Component, OnInit } from '@angular/core';
import { Personel } from '../../models/Personel';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonelService } from '../../rest.module/personel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personel-form',
  templateUrl: './personel-form.component.html',
  styleUrls: ['./personel-form.component.css']
})
export class PersonelFormComponent implements OnInit {

  editing: boolean = false;
  personel: Personel = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlPersonel;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private personelService: PersonelService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      personelService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.personel = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.personel = new Personel();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.personelService.put(this.personel._id, this.personel).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.personelService.post(this.personel).subscribe(data => {
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
