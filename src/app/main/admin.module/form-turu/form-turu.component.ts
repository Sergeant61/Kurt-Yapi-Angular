import { Component, OnInit, ViewChild } from '@angular/core';
import { FormTuru } from '../../models/FormTuru';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { FormTuruService } from '../../rest.module/form-turu.service';

@Component({
  selector: 'app-form-turu',
  templateUrl: './form-turu.component.html',
  styleUrls: ['./form-turu.component.css']
})
export class FormTuruComponent implements OnInit {


  selectedFormTuru: FormTuru;
  formTuruList: FormTuru[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlFormTuru;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private formTuruService: FormTuruService ) { }

  ngOnInit(): void {
    this.formTuruService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.formTuruList = data.data;
        } else {
          this.formTuruList = [];
        }

      }, err => { });

  }

  setSelected(data: FormTuru) {
    this.selectedFormTuru = data;
  }

  delete() {
    this.isLoading = true;
    this.formTuruService.delete(this.selectedFormTuru._id).subscribe(data => {
      if (data.success) {
        const index = this.formTuruList.findIndex(makine => data.data._id === makine._id);
        this.formTuruList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }


}
