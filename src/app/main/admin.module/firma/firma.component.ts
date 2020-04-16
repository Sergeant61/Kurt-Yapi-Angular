import { Component, OnInit, ViewChild } from '@angular/core';
import { Firma } from '../../models/Firma';
import { FirmaService } from '../../rest.module/firma.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  selectedFirma: Firma;
  firmaList: Firma[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlFirma;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private firmaService: FirmaService) { }

  ngOnInit(): void {
    this.firmaService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.firmaList = data.data;
        } else {
          this.firmaList = [];
        }

      }, err => { });

  }

  setSelected(data: Firma) {
    this.selectedFirma = data;
  }

  delete() {
    this.isLoading = true;
    this.firmaService.delete(this.selectedFirma._id).subscribe(data => {
      if (data.success) {
        const index = this.firmaList.findIndex(makine => data.data._id === makine._id);
        this.firmaList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
