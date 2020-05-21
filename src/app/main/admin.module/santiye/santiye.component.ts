import { Component, OnInit, ViewChild } from '@angular/core';
import { Santiye } from '../../models/Santiye';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { SantiyeService } from '../../rest.module/santiye.service';

@Component({
  selector: 'app-santiye',
  templateUrl: './santiye.component.html',
  styleUrls: ['./santiye.component.css']
})
export class SantiyeComponent implements OnInit {

  selectedSantiye: Santiye;
  santiyeList: Santiye[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlSantiye;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private santiyeService: SantiyeService) { }

  ngOnInit(): void {
    this.santiyeService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.santiyeList = data.data;
        } else {
          this.santiyeList = [];
        }

      }, err => { });

  }

  setSelected(data: Santiye) {
    this.selectedSantiye = data;
  }

  delete() {
    this.isLoading = true;
    this.santiyeService.delete(this.selectedSantiye._id).subscribe(data => {
      if (data.success) {
        const index = this.santiyeList.findIndex(makine => data.data._id === makine._id);
        this.santiyeList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
