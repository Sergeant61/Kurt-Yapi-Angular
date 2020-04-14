import { Component, OnInit } from '@angular/core';
import { OzelBinekArac } from '../../models/OzelBinekArac';
import { ActivatedRoute, Router } from '@angular/router';
import { OzelBinekAracService } from '../../rest.module/ozel-binek-arac.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ozel-binek-arac-form',
  templateUrl: './ozel-binek-arac-form.component.html',
  styleUrls: ['./ozel-binek-arac-form.component.css']
})
export class OzelBinekAracFormComponent implements OnInit {

  editing: boolean = false;
  ozelBinekArac: OzelBinekArac = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlOzelbinekarac;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private ozelBinekAracService: OzelBinekAracService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      ozelBinekAracService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.ozelBinekArac = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.ozelBinekArac = new OzelBinekArac();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.ozelBinekAracService.put(this.ozelBinekArac._id, this.ozelBinekArac).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.ozelBinekAracService.post(this.ozelBinekArac).subscribe(data => {
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
