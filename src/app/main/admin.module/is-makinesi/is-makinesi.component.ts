import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IsMakinesi } from '../../models/IsMakinesi';
import { IsMakinesiService } from '../../rest.module/is-makinesi.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-is-makinesi',
  templateUrl: './is-makinesi.component.html',
  styleUrls: ['./is-makinesi.component.css']
})
export class IsMakinesiComponent implements OnInit {

  selectedIsMakinesi: IsMakinesi;
  isMakinesiList: IsMakinesi[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlIsmakinesi;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private isMakinesiService: IsMakinesiService) { }

  ngOnInit(): void {
    this.isMakinesiService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.isMakinesiList = data.data;
        } else {
          this.isMakinesiList = [];
        }

      }, err => { });

  }

  setSelected(data: IsMakinesi) {
    this.selectedIsMakinesi = data;
  }

  delete() {
    this.isLoading = true;
    this.isMakinesiService.delete(this.selectedIsMakinesi._id).subscribe(data => {
      if (data.success) {
        const index = this.isMakinesiList.findIndex(makine => data.data._id === makine._id);
        this.isMakinesiList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }
}

