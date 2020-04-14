import { Component, OnInit } from '@angular/core';
import { TirKamyon } from '../../models/TirKamyon';
import { environment } from 'src/environments/environment';
import { TirKamyonService } from '../../rest.module/tir-kamyon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tir-kamyon-form',
  templateUrl: './tir-kamyon-form.component.html',
  styleUrls: ['./tir-kamyon-form.component.css']
})
export class TirKamyonFormComponent implements OnInit {

  editing: boolean = false;
  tirKamyon: TirKamyon = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlTirKamyon;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private tirKamyonService: TirKamyonService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      tirKamyonService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.tirKamyon = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.tirKamyon = new TirKamyon();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.tirKamyonService.put(this.tirKamyon._id, this.tirKamyon).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.tirKamyonService.post(this.tirKamyon).subscribe(data => {
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
