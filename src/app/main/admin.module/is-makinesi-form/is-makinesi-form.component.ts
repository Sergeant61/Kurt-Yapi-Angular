import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IsMakinesiService } from '../../rest.module/is-makinesi.service';
import { IsMakinesi } from '../../models/IsMakinesi';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-is-makinesi-form',
  templateUrl: './is-makinesi-form.component.html',
  styleUrls: ['./is-makinesi-form.component.css']
})
export class IsMakinesiFormComponent implements OnInit {

  editing: boolean = false;
  isMakinesi: IsMakinesi = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlIsmakinesi;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private isMakinesiService: IsMakinesiService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      isMakinesiService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.isMakinesi = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.isMakinesi = new IsMakinesi();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.isMakinesiService.put(this.isMakinesi._id, this.isMakinesi).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.isMakinesiService.post(this.isMakinesi).subscribe(data => {
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
