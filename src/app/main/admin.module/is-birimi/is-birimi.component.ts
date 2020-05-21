import { Component, OnInit, ViewChild } from '@angular/core';
import { IsBirimi } from '../../models/IsBirimi';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { IsBirimiService } from '../../rest.module/is-birimi.service';

@Component({
  selector: 'app-is-birimi',
  templateUrl: './is-birimi.component.html',
  styleUrls: ['./is-birimi.component.css']
})
export class IsBirimiComponent implements OnInit {

  selectedIsBirimi: IsBirimi;
  isBirimiList: IsBirimi[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlIsBirimi;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private isBirimiService: IsBirimiService) { }

  ngOnInit(): void {
    this.isBirimiService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.isBirimiList = data.data;
        } else {
          this.isBirimiList = [];
        }

      }, err => { });

  }

  setSelected(data: IsBirimi) {
    this.selectedIsBirimi = data;
  }

  delete() {
    this.isLoading = true;
    this.isBirimiService.delete(this.selectedIsBirimi._id).subscribe(data => {
      if (data.success) {
        const index = this.isBirimiList.findIndex(makine => data.data._id === makine._id);
        this.isBirimiList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }


}
