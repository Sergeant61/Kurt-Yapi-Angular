import { Component, OnInit } from '@angular/core';
import { MalzemeCinsi } from '../../models/MalzemeCinsi';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MalzemeCinsiService } from '../../rest.module/malzeme-cinsi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-malzeme-cinsi-form',
  templateUrl: './malzeme-cinsi-form.component.html',
  styleUrls: ['./malzeme-cinsi-form.component.css']
})
export class MalzemeCinsiFormComponent implements OnInit {

  editing: boolean = false;
  malzemeCinsi: MalzemeCinsi = null;
  errorMessage: string;
  baseUrl: string = environment.baseUrlMalzemeCinsi;
  isLoading: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private malzemeCinsiService: MalzemeCinsiService) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      malzemeCinsiService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.malzemeCinsi = data.data;
        } else {

        }
      }, err => {

      });
    } else {
      this.malzemeCinsi = new MalzemeCinsi();
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {
    this.isLoading = true;
    if (this.editing) {
      this.malzemeCinsiService.put(this.malzemeCinsi._id, this.malzemeCinsi).subscribe(data => {
        if (data.success) {
          this.router.navigateByUrl(this.baseUrl);
        } else {
          this.errorMessage = data.message;
        }
        this.isLoading = false;
      }, err => { });
    } else {
      this.malzemeCinsiService.post(this.malzemeCinsi).subscribe(data => {
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
