import { Component, OnInit } from '@angular/core';
import { IsBirimi } from '../../models/IsBirimi';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { IsBirimiService } from '../../rest.module/is-birimi.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-is-birimi-form',
  templateUrl: './is-birimi-form.component.html',
  styleUrls: ['./is-birimi-form.component.css']
})
export class IsBirimiFormComponent implements OnInit {

  editing: boolean = false;
  isBirimi: IsBirimi = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlIsBirimi;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private isBirimiService: IsBirimiService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      isBirimiService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.isBirimi = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.isBirimi = new IsBirimi();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.isBirimiService.put(this.isBirimi._id, this.isBirimi).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.isBirimiService.post(this.isBirimi).subscribe(data => {
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
