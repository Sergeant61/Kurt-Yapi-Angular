import { Component, OnInit } from '@angular/core';
import { Santiye } from '../../models/Santiye';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { SantiyeService } from '../../rest.module/santiye.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-santiye-form',
  templateUrl: './santiye-form.component.html',
  styleUrls: ['./santiye-form.component.css']
})
export class SantiyeFormComponent implements OnInit {

  editing: boolean = false;
  santiye: Santiye = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlSantiye;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private santiyeService: SantiyeService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      santiyeService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.santiye = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.santiye = new Santiye();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.santiyeService.put(this.santiye._id, this.santiye).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.santiyeService.post(this.santiye).subscribe(data => {
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
