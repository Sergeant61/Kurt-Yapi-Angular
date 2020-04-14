import { Component, OnInit } from '@angular/core';
import { Firma } from '../../models/Firma';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaService } from '../../rest.module/firma.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-firma-form',
  templateUrl: './firma-form.component.html',
  styleUrls: ['./firma-form.component.css']
})
export class FirmaFormComponent implements OnInit {

  editing: boolean = false;
  firma: Firma = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlFirma;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private firmaService: FirmaService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      firmaService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.firma = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.firma = new Firma();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.firmaService.put(this.firma._id, this.firma).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.firmaService.post(this.firma).subscribe(data => {
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
