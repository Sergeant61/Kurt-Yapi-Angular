import { Component, OnInit, ViewChild } from '@angular/core';
import { OzelBinekArac } from '../../models/OzelBinekArac';
import { ActivatedRoute, Router } from '@angular/router';
import { OzelBinekAracService } from '../../rest.module/ozel-binek-arac.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-ozel-binek-arac',
  templateUrl: './ozel-binek-arac.component.html',
  styleUrls: ['./ozel-binek-arac.component.css']
})
export class OzelBinekAracComponent implements OnInit {

  selectedOzelBinekArac: OzelBinekArac;
  ozelBinekAracList: OzelBinekArac[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlOzelbinekarac;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private ozelBinekAracService: OzelBinekAracService) { }

  ngOnInit(): void {
    this.ozelBinekAracService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.ozelBinekAracList = data.data;
        } else {
          this.ozelBinekAracList = [];
        }

      }, err => { });

  }

  setSelected(data: OzelBinekArac) {
    this.selectedOzelBinekArac = data;
  }

  delete() {
    this.isLoading = true;
    this.ozelBinekAracService.delete(this.selectedOzelBinekArac._id).subscribe(data => {
      if (data.success) {
        const index = this.ozelBinekAracList.findIndex(makine => data.data._id === makine._id);
        this.ozelBinekAracList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
