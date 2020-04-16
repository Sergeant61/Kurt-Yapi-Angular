import { Component, OnInit, ViewChild } from '@angular/core';
import { DokumSahasi } from '../../models/DokumSahasi';
import { DokumSahasiService } from '../../rest.module/dokum-sahasi.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-dokum-sahasi',
  templateUrl: './dokum-sahasi.component.html',
  styleUrls: ['./dokum-sahasi.component.css']
})
export class DokumSahasiComponent implements OnInit {

  selectedDokumSahasi: DokumSahasi;
  dokumSahasiList: DokumSahasi[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlDokumSahasi;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private dokumSahasiService: DokumSahasiService) { }

  ngOnInit(): void {
    this.dokumSahasiService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.dokumSahasiList = data.data;
        } else {
          this.dokumSahasiList = [];
        }

      }, err => { });

  }

  setSelected(data: DokumSahasi) {
    this.selectedDokumSahasi = data;
  }

  delete() {
    this.isLoading = true;
    this.dokumSahasiService.delete(this.selectedDokumSahasi._id).subscribe(data => {
      if (data.success) {
        const index = this.dokumSahasiList.findIndex(makine => data.data._id === makine._id);
        this.dokumSahasiList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });
  }


}
